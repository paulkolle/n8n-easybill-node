import {
	type IDataObject,
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

async function easyBillApiRequest<T = unknown>(
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
			detailedErrorDescription += ` ${faultyArguments.length === 1 ? 'Feld: ' : 'Felder: '}${faultyArguments.join(', ')}`;
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

const MAX_PAGINATION_REQUESTS = 200;
const MAX_PAGE_SIZE = 1000;

type PaginatedResponse = IDataObject & {
	items?: IDataObject[];
	limit?: number;
	page?: number;
	pages?: number;
	total?: number;
};

const sanitizePaginationQuery = (query: IDataObject = {}) => {
	const sanitizedQuery: IDataObject = {};

	for (const [key, value] of Object.entries(query)) {
		if (key === 'limit' || key === 'page') {
			continue;
		}
		sanitizedQuery[key] = value;
	}

	return sanitizedQuery;
};

async function fetchPaginatedList(
	this: IExecuteFunctions,
	endpoint: string,
	query: IDataObject = {},
): Promise<IDataObject | undefined> {
	const baseQuery = sanitizePaginationQuery(query);
	let aggregatedResponse: PaginatedResponse | undefined;
	const aggregatedItems: IDataObject[] = [];
	let apiReportedTotal: number | undefined;
	let apiReportedPageLimit: number | undefined;
	let apiReportedPages: number | undefined;
	let nextPage = 1;
	let previousPage: number | undefined;

	for (let requestIndex = 0; requestIndex < MAX_PAGINATION_REQUESTS; requestIndex++) {
		const qs: IDataObject = { ...baseQuery, limit: MAX_PAGE_SIZE, page: nextPage };
		const options: IHttpRequestOptions = {
			headers: {
				Accept: 'application/json',
			},
			method: 'GET',
			url: endpoint,
			json: true,
			qs,
		};

		const rawResponse = await easyBillApiRequest.call(this, options);

		if (Array.isArray(rawResponse)) {
			return {
				items: rawResponse,
				total: rawResponse.length,
				page: 1,
				limit: rawResponse.length,
				pages: 1,
			} as IDataObject;
		}

		if (!rawResponse || typeof rawResponse !== 'object') {
			return undefined;
		}

		const responseObject: PaginatedResponse = { ...(rawResponse as IDataObject) };
		const items = Array.isArray(responseObject.items)
			? (responseObject.items as IDataObject[])
			: [];

		if (!aggregatedResponse) {
			aggregatedResponse = { ...responseObject };
		}

		if (typeof responseObject.total === 'number') {
			apiReportedTotal = responseObject.total;
		}
		if (typeof responseObject.limit === 'number') {
			apiReportedPageLimit = responseObject.limit;
		}
		if (typeof responseObject.pages === 'number') {
			apiReportedPages = responseObject.pages;
		}

		aggregatedItems.push(...items);

		const currentPage = typeof responseObject.page === 'number' ? responseObject.page : nextPage;
		const reachedApiTotal =
			apiReportedTotal !== undefined && aggregatedItems.length >= apiReportedTotal;
		const reachedLastPageByReport =
			apiReportedPages !== undefined && currentPage >= apiReportedPages;
		const noMoreItems = items.length === 0;
		const stuckOnSamePage = previousPage !== undefined && currentPage === previousPage;

		if (reachedApiTotal || reachedLastPageByReport || noMoreItems || stuckOnSamePage) {
			break;
		}

		previousPage = currentPage;
		nextPage = currentPage + 1;
	}

	if (!aggregatedResponse) {
		return undefined;
	}

	const effectivePageSize = apiReportedPageLimit ?? MAX_PAGE_SIZE;
	const totalItemsReturned = aggregatedItems.length;
	const resultTotal = apiReportedTotal ?? totalItemsReturned;

	aggregatedResponse.items = aggregatedItems;
	aggregatedResponse.total = resultTotal;
	aggregatedResponse.page = 1;
	aggregatedResponse.limit = apiReportedPageLimit ?? totalItemsReturned;

	if (apiReportedPages !== undefined) {
		aggregatedResponse.pages = apiReportedPages;
	} else if (effectivePageSize > 0) {
		aggregatedResponse.pages = Math.max(1, Math.ceil(totalItemsReturned / effectivePageSize));
	}

	return aggregatedResponse;
}

export { easyBillApiRequest, fetchPaginatedList };
