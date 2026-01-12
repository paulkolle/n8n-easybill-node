import {
	NodeApiError,
	sleep,
	type IExecuteFunctions,
	type IHookFunctions,
	type IHttpRequestOptions,
	type ILoadOptionsFunctions,
	type IPollFunctions,
} from 'n8n-workflow';

const TOTAL_RETRIES = 9;
const BASE_URL = 'https://api.easybill.de/rest/v1';

type ErrorResponseBody = {
	code?: number;
	message?: string;
	arguments?: string[];
};

export async function easyBillApiRequest<T = unknown>(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions | IPollFunctions,
	options: Omit<IHttpRequestOptions, 'baseURL' | 'returnFullResponse' | 'ignoreHttpStatusErrors'>,
): Promise<T> {
	const requestOptions: IHttpRequestOptions = {
		...options,
		baseURL: BASE_URL,
		// Documentation for these options: https://docs.n8n.io/integrations/creating-nodes/build/reference/http-helpers/#usage
		returnFullResponse: true, // return more than just the response body. statusCode, statusMessage etc
		ignoreHttpStatusErrors: true, // do not throw on non 2xx status response
	};

	let response: {
		body: T;
		headers: Record<string, string>;
		statusCode: number;
		statusMessage: string;
	};

	let remainingRetries = TOTAL_RETRIES;

	do {
		response = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'easyBillApi',
			requestOptions,
		);

		if (response.statusCode === 429) {
			await sleep(60 * 1_000);
			remainingRetries = remainingRetries - 1;
		} else {
			remainingRetries = 0;
		}
	} while (remainingRetries > 0);

	if (response.statusCode === 429) {
		throw new NodeApiError(
			this.getNode(),
			{},
			{
				message: response.statusMessage,
				httpCode: response.statusCode.toString(),
				description: 'The maximum number of retries has been reached.',
			},
		);
	} else if (response.statusCode >= 400) {
		const errorResponseBody = response.body as ErrorResponseBody;
		let detailedErrorDescription = `${errorResponseBody.message ?? response.statusMessage}`;
		const faultyArguments = errorResponseBody.arguments;
		if (faultyArguments) {
			detailedErrorDescription += ` ${faultyArguments.length === 1 ? "Feld: " : "Felder: "}${faultyArguments.join(', ')}`;
		}
		throw new NodeApiError(
			this.getNode(),
			{},
			{
				message: response.statusMessage,
				httpCode: response.statusCode.toString(),
				description: detailedErrorDescription,
			},
		);
	}

	return response.body;
}
