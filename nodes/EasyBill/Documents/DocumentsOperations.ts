import { INodeProperties } from 'n8n-workflow'

/**
 * DOCUMENT ENDPOINTS
 *
 * Hier definieren wir alle Operationen, die sich auf Dokumente beziehen.
 * Folgende Endpunkte sind integriert:
 *
 * GET /documents              - Liste der Dokumente abrufen
 * POST /documents             - Dokument anlegen
 * GET /documents/{id}         - Ein einzelnes Dokument abrufen
 * PUT /documents/{id}         - Dokument aktualisieren
 * DELETE /documents/{id}      - Dokument löschen
 * PUT /documents/{id}/done    - Dokument abschließen
 * POST /documents/{id}/cancel - Dokument abbrechen
 * POST /documents/{id}/send/{type} - Dokument versenden
 * GET /documents/{id}/pdf     - PDF des Dokuments abrufen
 * GET /documents/{id}/jpg     - Dokument als JPEG herunterladen
 * POST /documents/{id}/{type} - Dokument in einen anderen Typ konvertieren
 */
// export const documentOperations: INodeProperties[] = [
// 	{
// 		displayName: 'Operation',
// 		name: 'operation',
// 		type: 'options',
// 		noDataExpression: true,
// 		displayOptions: {
// 			show: {
// 				resource: ['document'],
// 			},
// 		},
// 		options: [
// 			{
// 				name: 'Cancel Document',
// 				value: 'cancelDocument',
// 				action: 'Cancel document',
// 				description: 'Bricht ein Dokument ab',
// 			},
// 			{
// 				name: 'Complete Document',
// 				value: 'completeDocument',
// 				action: 'Complete document',
// 				description: 'Markiert ein Dokument als abgeschlossen',
// 			},	
// 			{
// 				name: 'Convert Document',
// 				value: 'convertDocument',
// 				action: 'Convert document',
// 				description: 'Konvertiert ein Dokument in einen anderen Typ',
// 			},
// 			{
// 				name: 'Create Document',
// 				value: 'createDoc',
// 				action: 'Create document',
// 				description: 'Legt ein neues Dokument an',
// 				routing: {
//                     request: {
//                         method: 'POST',
//                         // url: '/documents',
//                         url: '/',

//                     },
//                 },
// 			},		
// 			{
// 				name: 'Delete Document',
// 				value: 'deleteDocument',
// 				action: 'Delete document',
// 				description: 'Löscht ein Dokument',
// 			},
// 			{
// 				name: 'Get Doc List',
// 				value: 'getDocList',
// 				action: 'Fetch documents list',
// 				description: 'Ruft die Liste der Dokumente ab',
// 				routing: {
// 					request: {
// 						method: 'GET',
// 						url: '/documents',
// 					},
// 				}
// 			},
// 			{
// 				name: 'Get Document',
// 				value: 'getDocument',
// 				action: 'Fetch document',
// 				description: 'Ruft ein einzelnes Dokument ab',
// 			},	
// 			{
// 				name: 'Send Document',
// 				value: 'sendDocument',
// 				action: 'Send document',
// 				description: 'Sendet ein Dokument',
// 			},
// 			{
// 				name: 'Update Document',
// 				value: 'updateDocument',
// 				action: 'Update document',
// 				description: 'Aktualisiert ein Dokument',
				
// 			},
// 			//Doesnt Work
// 			// {
// 			// 	name: 'Get PDF',
// 			// 	value: 'getPdf',
// 			// 	action: 'Fetch pdf document',
// 			// 	description: 'Ruft das PDF des Dokuments ab',
// 			// },
// 			// {
// 			// 	name: 'Download as JPEG',
// 			// 	value: 'downloadJpeg',
// 			// 	action: 'Download document as JPEG',
// 			// 	description: 'Lädt ein Dokument als JPEG herunter',
// 			// },

// 		],
// 		default: 'getDocList',
// 	},
// ]

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
				value: 'createDoc',
				action: 'Create document',
				description: 'Legt ein neues Dokument an',
				routing: {
                    request: {
                        method: 'POST',
                        // url: '/documents',
                        url: '/',

                    },
                },
			},		
			{
				name: 'Delete Document',
				value: 'deleteDocument',
				action: 'Delete document',
				description: 'Löscht ein Dokument',
			},
			{
				name: 'Get Doc List',
				value: 'getDocList',
				action: 'Fetch documents list',
				description: 'Ruft die Liste der Dokumente ab',
				routing: {
					request: {
						method: 'GET',
						url: '/documents',
					},
				}
			},
			{
				name: 'Get Document',
				value: 'getDocument',
				action: 'Fetch document',
				description: 'Ruft ein einzelnes Dokument ab',
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
			//Doesnt Work
			// {
			// 	name: 'Get PDF',
			// 	value: 'getPdf',
			// 	action: 'Fetch pdf document',
			// 	description: 'Ruft das PDF des Dokuments ab',
			// },
			// {
			// 	name: 'Download as JPEG',
			// 	value: 'downloadJpeg',
			// 	action: 'Download document as JPEG',
			// 	description: 'Lädt ein Dokument als JPEG herunter',
			// },

		],
		default: 'getDocList',
	},
]

