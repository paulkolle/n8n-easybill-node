import { INodeProperties } from 'n8n-workflow'


export const testFields: INodeProperties[] = [
	{
		displayName: "Create",
		name: "createTest",
		type: "string",
		default: "",
		displayOptions: {
			show: {
				operation: ['createTest'],
				resource: ['test'],
			},
		},
		routing: {
			request: {
				body: {
					test: '={{ $parameter["createTest"] }}',

				},


			},
		},
	},
	{
		displayName: "Additional Fields",
		name: "additional_fields",
		type: "collection",
		default: {},
		description: 'Descri',
		options: [
			{
				displayName: "Erst Option",
				name: "first_option",
				type: "string",
				default: "",
				routing: {
					request: {
						body: {
							first_option: '={{$value}}',
						}
					}
				}
			},

			{
				displayName: "Zweite Option",
				name: "second_option",
				type: "string",
				default: "",
				routing: {
					request: {
						body: {
							second_option: '={{$value}}',
						}
					}
				}
			},
			
			{
				displayName: 'Items',
				name: 'items',
				type: 'collection',
				default: {},
				description: 'Liste von Items',
				// typeOptions: {
				// 	multipleValues: true, // Erlaubt mehrere Einträge
				// },
				options: [
					{
						displayName: "Erst Option Item",
						name: "first_option_item",
						type: "string",
						default: "",
					},
					{
						displayName: "Zweite Option Item",
						name: "second_option_item",
						type: "string",
						default: "",
					},
				],
				routing: {
					request: {
						body: {
							items: '={{[$value]}}'
						}
					}

				}
			},
		],
		displayOptions: {
			show: {
				operation: ['createTest'],
				resource: ['test'],
			},
		},
		// routing: {
		// 	request: {
		// 		body: {

		// 			firstOption: '={{ $parameter["additional_fields"]["first_option"] || "" }}',
		// 			secondOption: '={{ $parameter["additional_fields"]["second_option"] || "" }}',
		// 			nestedFirst: '={{ $parameter["additional_fields"]["additional_fields_2"]["first_option"] || "" }}',
		// 			nestedSecond: '={{ $parameter["additional_fields"]["additional_fields_2"]["second_option"] || "" }}',
		// 			//items: '={{ $parameter["additional_fields"]["items.item"] || [] }}',
		// 			//items: '={{ $parameter["additional_fields"]["items"] ? $parameter["additional_fields"]["items"].item : [] }}',
		// 			items: '={{ $parameter["additional_fields"].items ? (Array.isArray($parameter["additional_fields"].items) ? $parameter["additional_fields"].items : [$parameter["additional_fields"].items]) : undefined }}',
		// 			test2: '={{ $parameter["additional_fields"] }}',
		// 		},


		// 	},
		// },
	}
]
