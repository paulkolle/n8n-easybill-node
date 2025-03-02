import { INodeProperties } from 'n8n-workflow'


export const testFields: INodeProperties[] = [
	{
		displayName: "Customer ID",
		name: "customer_id",
		type: "number",
		default: 0,
		description: 'The identifier for the customer',
		displayOptions: {
			show: {
				resource: [
					'test',
				],
				operation: [
					'createDocument',
				],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'test',
				],
				operation: [
					'createDocument',
				],
			},
		},
		options: [
			{
				displayName: 'Contact Text',
				name: 'contact_text',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Items',
				name: 'itemsFixedCol',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'itemsValues',
						displayName: 'Item',
						values: [
							{
								displayName: 'Description',
								name: 'description',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Quantity',
								name: 'quantity',
								type: 'number',
								default: 0,
							},
						],
					},
				]
			},
		],
	},
]