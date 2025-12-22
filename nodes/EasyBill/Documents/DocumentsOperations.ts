import { INodeProperties } from 'n8n-workflow';

export const documentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['document'],
			},
		},
		options: [
			{
				name: 'Cancel Document',
				value: 'cancelDocument',
				action: 'Cancel document',
				description: 'Bricht ein Dokument ab',
			},
			{
				name: 'Complete Document',
				value: 'completeDocument',
				action: 'Complete document',
				description: 'Markiert ein Dokument als abgeschlossen',
			},
			{
				name: 'Convert Document',
				value: 'convertDocument',
				action: 'Convert document',
				description: 'Konvertiert ein Dokument in einen anderen Typ',
			},
			{
				name: 'Create Document',
				value: 'createDocument',
				action: 'Create document',
				description: 'Legt ein neues Dokument an',
			},
			{
				name: 'Delete Document',
				value: 'deleteDocument',
				action: 'Delete document',
				description: 'Löscht ein Dokument',
			},
			{
				name: 'Download Document As JPEG',
				value: 'downloadJpeg',
				action: 'Download document as JPEG',
				description: 'Lädt ein Dokument als JPEG herunter',
			},
			{
				name: 'Fetch PDF Of Document',
				value: 'getPdf',
				action: 'Fetch PDF document',
				description: 'Ruft das PDF des Dokuments ab',
			},
			{
				name: 'Get Document',
				value: 'getDocument',
				action: 'Fetch document',
				description: 'Ruft ein einzelnes Dokument ab',
			},
			{
				name: 'Get Document List',
				value: 'getDocList',
				action: 'Fetch documents list',
				description: 'Ruft die Liste der Dokumente ab',
			},
			{
				name: 'Send Document',
				value: 'sendDocument',
				action: 'Send document',
				description: 'Sendet ein Dokument',
			},
			{
				name: 'Update Document',
				value: 'updateDocument',
				action: 'Update document',
				description: 'Aktualisiert ein Dokument',
			},
		],

		default: 'getDocList',
	},
];
