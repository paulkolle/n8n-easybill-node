import { INodeProperties } from 'n8n-workflow';

export const customerGroupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customerGroup'],
			},
		},
		options: [
			{
				name: 'Create Customer Group',
				value: 'createCustomerGroup',
				action: 'Create customer group',
				description: 'Legt eine neue Customer Group an',
			},
			{
				name: 'Delete Customer Group',
				value: 'deleteCustomerGroup',
				action: 'Delete customer group',
				description: 'Löscht eine Customer Group',
			},
			{
				name: 'Get Customer Group',
				value: 'getCustomerGroup',
				action: 'Fetch customer group',
				description: 'Ruft eine einzelne Customer Group ab',
			},
			{
				name: 'Get Customer Group List',
				value: 'getCustomerGroups',
				action: 'Fetch customer group list',
				description: 'Ruft die Liste der Customer Groups ab',
			},
			{
				name: 'Update Customer Group',
				value: 'updateCustomerGroup',
				action: 'Update customer group',
				description: 'Aktualisiert eine bestehende Customer Group',
			},
		],
		default: 'getCustomerGroups',
	},
];
