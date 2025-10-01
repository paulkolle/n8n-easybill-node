import { INodeProperties } from 'n8n-workflow';

export const documentPaymentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['documentPayment'],
			},
		},
		options: [
			{
				name: 'Create Document Payment',
				value: 'createDocumentPayment',
				action: 'Create document payment',
				description: 'Creates a new Document Payment',
			},
			{
				name: 'Delete Document Payment',
				value: 'deleteDocumentPayment',
				action: 'Delete document payment',
				description: 'Deletes a Document Payment',
			},
			{
				name: 'Get Document Payment',
				value: 'getDocumentPayment',
				action: 'Fetch document payment',
				description: 'Fetches a specific Document Payment',
			},
			{
				name: 'Get Document Payment List',
				value: 'getDocumentPayments',
				action: 'Fetch document payments list',
				description: 'Fetches the list of Document Payments',
			},
		],
		default: 'getDocumentPayments',
	},
];
