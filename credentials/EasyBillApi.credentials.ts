import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class EasyBillApi implements ICredentialType {
	name = 'EasyBillApi';
	displayName = 'EasyBill Api';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
            typeOptions: {
				password: true, // Versteckt den API Key in der UI
			},
		},
	];
	authenticate = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{ "Bearer " + $credentials.apiKey }}',
			},
		},
	} as IAuthenticateGeneric;
    test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.easybill.de/rest/v1', // API-Base-URL
			url: '/customers', // Endpoint zum Testen der Credentials
		},
	};
}