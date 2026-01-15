import { INodeProperties } from 'n8n-workflow';

export const sepaPaymentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
			},
		},
		options: [
			{
				name: 'Create SEPA Payment',
				value: 'createSepaPayment',
				action: 'Create sepa payment',
				description: 'Creates a new SEPA payment',
			},
			{
				name: 'Delete SEPA Payment',
				value: 'deleteSepaPayment',
				action: 'Delete sepa payment',
				description: 'Deletes a SEPA payment',
			},
			{
				name: 'Get SEPA Payment',
				value: 'getSepaPayment',
				action: 'Fetch sepa payment',
				description: 'Fetches a specific SEPA payment',
			},
			{
				name: 'Get SEPA Payments List',
				value: 'getSepaPayments',
				action: 'Fetch sepa payments list',
				description: 'Fetches the list of SEPA payments',
			},
			{
				name: 'Update SEPA Payment',
				value: 'updateSepaPayment',
				action: 'Update sepa payment',
				description: 'Updates an existing SEPA payment',
			},
		],
		default: 'getSepaPayments',
	},
];
