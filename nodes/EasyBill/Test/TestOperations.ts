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
				value: 'createTest',
				action: 'Create test 1',
				description: 'Bricht ein Dokument ab',
				routing: {
					request: {
						method: "POST",

					}
				}
			},
			{
				name: 'Get',
				value: 'getTest',
				action: 'Get test 1',
				description: 'Markiert ein Dokument als abgeschlossen',
			},	
		],
		default: 'createTest',
	},
]


