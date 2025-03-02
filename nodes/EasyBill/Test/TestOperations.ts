import { INodeProperties } from 'n8n-workflow'


export const testOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['test'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'createDocument',
				action: 'Create document',
				description: 'Creates Document',
				routing: {
					request: {
						method: "POST",

					}
				}
			},
		],
		default: 'createDocument',
	},
]


