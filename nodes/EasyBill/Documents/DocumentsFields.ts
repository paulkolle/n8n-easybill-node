import { INodeProperties } from 'n8n-workflow'


/**
 * DOCUMENT FIELDS
 *
 * Hier definieren wir die Felder, die für die jeweiligen Dokumenten-Operationen benötigt werden.
 * Für GET /documents werden z. B. Parameter zur Paginierung angehängt.
 * Für POST /documents und PUT /documents/{id} wird ein JSON-Body erwartet.
 *
 * Die Felder werden über "displayOptions" bedingt eingeblendet, sodass nur die Felder angezeigt werden,
 * die zur aktuell gewählten Operation passen.
 */
export const documentFields: INodeProperties[] = [
	// Optionale Felder als Collection von Get
	{
		displayName: 'Additional Fields',
		name: 'body',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		description: 'Additionial params for Documents',
		options: [
			{
				displayName: 'Cancel ID',
				name: 'cancel_id',
				type: 'string',
				default: '',
				// eslint-disable-next-line n8n-nodes-base/node-param-description-miscased-id
				description: 'Filter documents by cancel_id. Multiple IDs separated by commas like id,id,id. Use cancel_id=null for not canceled documents.',
				routing: {
					request: {
						qs: {
							cancel_id: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Customer ID',
				name: 'customer_id',
				type: 'string',
				default: '',
				// eslint-disable-next-line n8n-nodes-base/node-param-description-miscased-id
				description: 'Filter documents by customer_id. You can add multiple customer_ids separated by commas like id,id,id.',
				routing: {
					request: {
						qs: {
							customer_id: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Document Date',
				name: 'document_date',
				type: 'string',
				default: '',
				description: 'Filter documents by document_date. One date: document_date=2014-12-10, or range: 2015-01-01,2015-12-31.',
				routing: {
					request: {
						qs: {
							document_date: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Fulfillment Country',
				name: 'fulfillment_country',
				type: 'string',
				default: '',
				description: 'Filter documents by fulfillment_country',
				routing: {
					request: {
						qs: {
							fulfillment_country: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Is Archive',
				name: 'is_archive',
				type: 'string',
				default: '',
				description: 'Filter documents by archive flag. Available values: 0, 1.',
				routing: {
					request: {
						qs: {
							is_archive: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Is Draft',
				name: 'is_draft',
				type: 'string',
				default: '',
				description: 'Filter documents by draft flag. Available values: 0, 1.',
				routing: {
					request: {
						qs: {
							is_draft: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				description: 'Max number of results to return',
				routing: {
					request: {
						qs: {
							limit: '={{$value}}',
						},
					},
				},
				typeOptions: {
					minValue: 1,
				},
			},
			{
				displayName: 'Number',
				name: 'number',
				type: 'string',
				default: '',
				description: 'Filter documents by number',
				routing: {
					request: {
						qs: {
							number: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Set current Page. Default is 1.',
				routing: {
					request: {
						qs: {
							page: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Paid At',
				name: 'paid_at',
				type: 'string',
				default: '',
				description: 'Filter documents by paid_at. One date: paid_at=2014-12-10, or range: 2015-01-01,2015-12-31. Use paid_at=null for unpaid documents.',
				routing: {
					request: {
						qs: {
							paid_at: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Project ID',
				name: 'project_id',
				type: 'string',
				default: '',
				// eslint-disable-next-line n8n-nodes-base/node-param-description-miscased-id
				description: 'Filter documents by project_id. You can add multiple project_ids separated by commas like ID,id,id.',
				routing: {
					request: {
						qs: {
							project_id: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Reference ID',
				name: 'ref_id',
				type: 'string',
				default: '',
				description: 'Filter documents by ref_id',
				routing: {
					request: {
						qs: {
							ref_id: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Shipping Country',
				name: 'shipping_country',
				type: 'string',
				default: '',
				description: 'Filter documents by shipping_country',
				routing: {
					request: {
						qs: {
							shipping_country: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'Filter documents by status. Not every document type has a status.',
				routing: {
					request: {
						qs: {
							status: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Filter documents by title',
				routing: {
					request: {
						qs: {
							title: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'string',
				default: '',
				description: 'Filter documents by type. Multiple types separated with commas, like type=INVOICE,CREDIT.',
				routing: {
					request: {
						qs: {
							type: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'VAT Country',
				name: 'vat_country',
				type: 'string',
				default: '',
				description: 'Filter documents by vat_country',
				routing: {
					request: {
						qs: {
							vat_country: '={{$value}}',
						},
					},
				},
			},
		],
		displayOptions: {
			show: {
				operation: ['getDocList'],
				resource: ['document'],
			},
		}
	},

	// Pflichtfeld für Operationen, die eine Dokument-ID benötigen
	{
		displayName: 'Document ID',
		name: 'document_id',
		type: 'string',
		default: '',
		description: 'Die ID des Dokuments',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'getDocument',
				],
				resource: ['document'],
			},
		},
		routing: {
			request: {
				method: 'GET',
				url: '=/documents/{{$value}}',
			},
		},

	},
	{
		displayName: 'Document ID',
		name: 'document_id',
		type: 'string',
		default: '',
		description: 'Die ID des Dokuments',
		required: true,
		displayOptions: {
			show: {
				operation: ['updateDocument'],
				resource: ['document'],
			},
		},
		routing: {
			request: {
				method: 'PUT',
				url: '=/documents/{{$value}}',
			},
		},
	}, {
		displayName: 'Refresh Customer Data',
		name: 'refresh_customer_data',
		type: 'boolean',
		default: false,
		description: 'Whether refresh_customer_data',
		displayOptions: {
			show: {
				operation: ['updateDocument'],
				resource: ['document'],
			},
		},
		routing: {
			request: {
				qs: {
					refresh_customer_data: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Document ID',
		name: 'document_id',
		type: 'string',
		default: '',
		description: 'Die ID des Dokuments',
		required: true,
		displayOptions: {
			show: {
				operation: ['completeDocument'],
				resource: ['document'],
			},
		},
		routing: {
			request: {
				method: 'PUT',
				url: '=/documents/{{$value}}/done',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additional_field',
		type: 'collection',
		placeholder: 'Add Reason for Change',
		default: {},
		description: 'Additional fields for cancel doc',
		options: [
			{
				displayName: 'Reason for Change',
				name: 'reason_for_change',
				type: 'string',
				default: '',
				description: 'A string that is saved on the document version as reason',
				routing: {
					request: {
						qs: {
							reason_for_change: '={{$value}}',
						},
					},
				},
			},
		],
		displayOptions: {
			show: {
				operation: ['completeDocument', 'updateDocument'],
				resource: ['document'],
			},
		},
	},

	{
		displayName: 'Document ID',
		name: 'document_id',
		type: 'string',
		default: '',
		description: 'Die ID des Dokuments',
		required: true,
		displayOptions: {
			show: {
				operation: ['deleteDocument'],
				resource: ['document'],
			},
		},
		routing: {
			request: {
				method: 'DELETE',
				url: '=/documents/{{$value}}',
			},
		},
	},
	//CANCEL DOCUMENT
	{
		displayName: 'Document ID',
		name: 'document_id',
		type: 'string',
		default: '',
		description: 'Die ID des Dokuments',
		required: true,
		displayOptions: {
			show: {
				operation: ['cancelDocument'],
				resource: ['document'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/documents/{{$value}}/cancel',
			},
		},
	},
	//CANCEL DOC
	{
		displayName: 'Additional Fields',
		name: 'additional_field',
		type: 'collection',
		placeholder: 'Add Use Text From Template',
		default: {},
		description: 'Additional fields for cancel doc',
		options: [
			{
				displayName: 'Use Text From Template',
				name: 'use_text_from_template',
				type: 'boolean',
				default: false,
				description: 'Whether to use standard texts from the template',
				routing: {
					request: {
						qs: {
							use_text_from_template: '={{$value}}',
						},
					},
				},
			},
		],
		displayOptions: {
			show: {
				operation: ['cancelDocument'],
				resource: ['document'],
			},
		},
	},

	//SEND DOCUMENT 
	{
		displayName: 'Document ID',
		name: 'document_id',
		type: 'string',
		default: '',
		description: 'Die ID des Dokuments',
		required: true,
		displayOptions: {
			show: {
				operation: ['sendDocument'],
				resource: ['document'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/documents/{{$value}}/send/{{$parameter["type"]}}',
			},
		},
	},
	{
		"displayName": "Type",
		"name": "type",
		"type": "options",
		"default": "email",
		options: [
			{
				"name": "Email",
				"value": "email"
			},
			{
				"name": "Fax",
				"value": "fax"
			},
			{
				"name": "Post",
				"value": "post"
			}
		],
		required: true,
		description: 'Available values : email, fax, post',
		displayOptions: {
			show: {
				operation: ['sendDocument'],
				resource: ['document'],
			},
		}
	},
	// Optionale Felder als Collection für Send
	{
		displayName: 'Additional Fields',
		name: 'additionalFieldsDocs',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		description: 'Additional Data for sending Doc',
		options: [
			{
				"displayName": "CC",
				"name": "cc",
				"type": "string",
				"default": "",
				"description": ""
			},
			{
				"displayName": "Date",
				"name": "date",
				"type": "dateTime",
				"default": "",
				"description": "($date)."
			},
			{
				"displayName": "Document File Type",
				"name": "document_file_type",
				"type": "string",
				"default": null,
				"description": "When set to null, the setting on the customer is used. Enum: Array [ 7 ]"
			},
			{
				"displayName": "From",
				"name": "from",
				"type": "string",
				"default": "",
				"description": ""
			},
			{
				"displayName": "Message",
				"name": "message",
				"type": "string",
				"default": "",
				"description": ""
			},
			{
				"displayName": "Post Send Type",
				"name": "post_send_type",
				"type": "options",
				"default": "",
				"description": "This value indicates what method is used when the document is send via mail. The different types are offered by the German post as additional services. The registered mail options will include a tracking number which will be added to the postbox when known. If omitted or empty for type \"POST\", post_send_type_standard will be used. For other types, this field will hold an empty string.",
				options: [
					{
						name: 'Post_send_type_standard',
						value: 'post_send_type_standard',
					},
					{
						name: 'Post_send_type_registered',
						value: 'post_send_type_registered',
					},
					{
						name: 'Post_send_type_registered_and_personal',
						value: 'post_send_type_registered_and_personal',
					},
					{
						name: 'Post_send_type_registered_and_receipt',
						value: 'post_send_type_registered_and_receipt',
					},
					{
						name: 'Post_send_type_registered_throwin',
						value: 'post_send_type_registered_throwin',
					},
				]
			},
			{
				"displayName": "Send By Self",
				"name": "send_by_self",
				"type": "boolean",
				"default": false,
				"description": "Example: false"
			},
			{
				"displayName": "Send With Attachment",
				"name": "send_with_attachment",
				"type": "boolean",
				"default": true,
				"description": "Example: true"
			},
			{
				"displayName": "Subject",
				"name": "subject",
				"type": "string",
				"default": "",
				"description": ""
			},
			{
				"displayName": "To",
				"name": "to",
				"type": "string",
				"default": "",
				"description": ""
			}
		]
		,
		displayOptions: {
			show: {
				operation: ['sendDocument'],
				resource: ['document'],
			},
		},
		// routing: {
		// 	request: {
		// 		// Hier wird ein Objekt erstellt, das zuerst die Pflichtfelder enthält
		// 		// und anschließend die optionalen Felder (aus der Collection) dazuhinzufügen.
		// 		// Der Spread-Operator (...) fügt alle Key-Value-Paare des Collections-Objekts hinzu.
		// 		body: '={{ { ...$parameter["additionalFieldsDocs"], items: $parameter["additionalFieldsDocs"].items ? (Array.isArray($parameter["additionalFieldsDocs"].items) ? $parameter["additionalFieldsDocs"].items : [$parameter["additionalFieldsDocs"].items]) : undefined, file_format_config: $parameter["additionalFieldsDocs"].file_format_config ? (Array.isArray($parameter["additionalFieldsDocs"].file_format_config) ? $parameter["additionalFieldsDocs"].file_format_config : [$parameter["additionalFieldsDocs"].file_format_config]) : undefined, service_date: $parameter["additionalFieldsDocs"].service_date ? (Array.isArray($parameter["additionalFieldsDocs"].service_date) ? $parameter["additionalFieldsDocs"].service_date : [$parameter["additionalFieldsDocs"].service_date]) : undefined, recurring_options: $parameter["additionalFieldsDocs"].recurring_options ? (Array.isArray($parameter["additionalFieldsDocs"].recurring_options) ? $parameter["additionalFieldsDocs"].recurring_options : [$parameter["additionalFieldsDocs"].recurring_options]) : undefined } }}'


		// 	},
		// },
	},


	//FETCH PDF
	{
		displayName: 'Document ID',
		name: 'document_id',
		type: 'string',
		default: '',
		description: 'Die ID des Dokuments',
		required: true,
		displayOptions: {
			show: {
				operation: ['getPdf'],
				resource: ['document'],
			},
		},
		routing: {
			request: {
				method: 'GET',
				url: '=/documents/{{$value}}/pdf',
				headers: {
					Accept: 'application/pdf',
				},
			},
		},
	},
	//FETCH JPG
	{
		displayName: 'Document ID',
		name: 'document_id',
		type: 'string',
		default: '',
		description: 'Die ID des Dokuments',
		required: true,
		displayOptions: {
			show: {
				operation: ['downloadJpeg'],
				resource: ['document'],
			},
		},
		routing: {
			request: {
				method: 'GET',
				url: '=/documents/{{$value}}/jpg',
			},
		},
	},
	//Convert Type
	{
		displayName: 'Document ID',
		name: 'document_id',
		type: 'string',
		default: '',
		description: 'Die ID des Dokuments',
		required: true,
		displayOptions: {
			show: {
				operation: ['convertDocument'],
				resource: ['document'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/documents/{{$value}}/{{$parameter["type"]}}',
			},
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'string',
		default: 'DUNNING',
		required: true,
		description: 'Available values : DUNNING, REMINDER, CHARGE_CONFIRM, CHARGE, CREDIT, DELIVERY, INVOICE, ORDER',
		displayOptions: {
			show: {
				operation: ['convertDocument'],
				resource: ['document'],
			},
		}
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFieldsDocs',
		type: 'collection',
		placeholder: 'Füge weitere Felder hinzu',
		default: {},
		description: 'Add PDF Template',
		options: [
			{
				displayName: 'PDF Template',
				name: 'pdf_template',
				type: 'string',
				default: 'DE',
				description: 'The ID of the printer template to use. Defaults to \'DE\' if not given.',
				routing: {
					request: {
						qs: {
							pdf_template: '={{$value}}',
						},
					},
				},
			},

		],
		displayOptions: {
			show: {
				operation: ['convertDocument'],
				resource: ['document'],
			},
		},
	},

	// {
	// 	displayName: 'Das Ist Ein Test',
	// 	name: "createTest",
	// 	type: "string",
	// 	default: "",
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['createDoc', 'updateDocument'],
	// 			resource: ['document'],
	// 		},
	// 	},
	// 	routing: {
	// 		request: {
	// 			body: {
	// 				test: '={{ $parameter["createTest"] }}',
	// 			},

	// 		},
	// 	},
	// },

	// Optionale Felder als Collection für Create und Update
	{
		displayName: 'Additional Fields',
		name: 'additionalFieldsDocs',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		description: 'Additional JSON data',
		
		options: [
			{
				displayName: 'Item Test',
				name: 'utemTest',
				placeholder: 'Add Item Test',
				type: 'fixedCollection',
				default: '',
				typeOptions: {
					multipleValues: true,
				},
				description: '',
				options: [
					{
						name: 'itemValues',
						displayName: 'Item',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: 'Name of the metadata key to add.',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value to set for the metadata key.',
							},
						],
					},
				],
				
			},
			{
				"displayName": "Acceptable on Public Domain",
				"name": "is_acceptable_on_public_domain",
				"type": "boolean",
				"default": false,
				"description": "Indicates if a document can be accepted by the end customer through the document's public access page."
			},
			{
				"displayName": "Anonymize Due Date",
				"name": "anonymize_due_date",
				"type": "dateTime",
				"default": "2019-02-07",
				"description": "The date on which the document should be anonymized."
			},
			{
				"displayName": "Bank Debit Form",
				"name": "bank_debit_form",
				"type": "string",
				"default": "",
				"description": "The bank debit form associated with the document."
			},
			{
				"displayName": "Buyer Reference",
				"name": "buyer_reference",
				"type": "string",
				"default": "",
				"description": "A reference provided by the buyer."
			},
			{
				"displayName": "Calculate VAT From",
				"name": "calc_vat_from",
				"type": "number",
				"default": 0,
				"description": "The starting value for VAT calculation."
			},
			{
				"displayName": "Cash Allowance",
				"name": "cash_allowance",
				"type": "number",
				"default": "",
				"description": "The cash allowance amount."
			},
			{
				"displayName": "Cash Allowance Days",
				"name": "cash_allowance_days",
				"type": "number",
				"default": "",
				"description": "The number of days for the cash allowance."
			},
			{
				"displayName": "Cash Allowance Text",
				"name": "cash_allowance_text",
				"type": "string",
				"default": "",
				"description": "Text describing the cash allowance."
			},
			{
				"displayName": "Contact ID",
				"name": "contact_id",
				"type": "number",
				"default": 0,
				"description": "The identifier for the contact."
			},
			{
				"displayName": "Contact Label",
				"name": "contact_label",
				"type": "string",
				"default": "",
				"description": "The label for the contact."
			},
			{
				"displayName": "Contact Text",
				"name": "contact_text",
				"type": "string",
				"default": "",
				"description": "Additional text for the contact."
			},
			{
				"displayName": "Currency",
				"name": "currency",
				"type": "string",
				"default": "EUR",
				"description": "The currency code used in the document."
			},
			{
				displayName: "Customer ID",
				name: "customer_id",
				type: "number",
				default: 0,
				description: 'The identifier for the customer',
			},
			{
				"displayName": "Discount",
				"name": "discount",
				"type": "number",
				"default": "",
				"description": "The discount amount applied."
			},
			{
				"displayName": "Discount Type",
				"name": "discount_type",
				"type": "string",
				"default": "",
				"description": "The type of discount applied."
			},
			{
				"displayName": "Document Date",
				"name": "document_date",
				"type": "dateTime",
				"default": "2024-02-07",
				"description": "The date the document was created."
			},
			{
				"displayName": "Due In Days",
				"name": "due_in_days",
				"type": "number",
				"default": "",
				"description": "The number of days until the document is due."
			},
			{
				"displayName": "External ID",
				"name": "external_id",
				"type": "string",
				"default": "",
				"description": "An external identifier for the document."
			},
			{
				"displayName": "File Format Config",
				"name": "file_format_config",
				"type": "collection",
				"default": [],
				"description": "Configuration settings for the file format.",
				"options": [
					{
						"displayName": "Type",
						"name": "type",
						"type": "string",
						"default": "default",
						"description": "[ default, default_without_stationery, zugferd1, zugferd2_2, xrechnung2_2_xml, xrechnung2_3_xml, xrechnung3_0_xml ]"
					}
				]
			},
			{
				"displayName": "Fulfillment Country",
				"name": "fulfillment_country",
				"type": "string",
				"default": "",
				"description": "The country where the order is fulfilled."
			},
			{
				"displayName": "Grace Period",
				"name": "grace_period",
				"type": "number",
				"default": "",
				"description": "The grace period (in days) for payments."
			},
			{
				"displayName": "Is Archive",
				"name": "is_archive",
				"type": "boolean",
				"default": false,
				"description": "Indicates if the document is archived."
			},
			{
				"displayName": "Is OSS",
				"name": "is_oss",
				"type": "boolean",
				"default": false,
				"description": "Indicates if the document is related to open source software."
			},
			{
				"displayName": "Is Replica",
				"name": "is_replica",
				"type": "boolean",
				"default": false,
				"description": "Marks a document as a replica from another software."
			},
			// Items Start
			{
				"displayName": "Items",
				"name": "items",
				"type": "collection",
				"default": [],
				"description": "An Item included in the document.",
				hint: "Currently, only one item can be sent per request. If you need to add multiple items to an invoice, consider using the HTTP Request node or the Custom JSON field.",
				"options": [
					{
						"displayName": "Booking Account",
						"name": "booking_account",
						"type": "string",
						"default": "",
						"description": "The booking account associated with the item."
					},
					{
						"displayName": "Cost Price Net",
						"name": "cost_price_net",
						"type": "number",
						"default": "",
						"description": "The net cost price of the item."
					},
					{
						"displayName": "Description",
						"name": "description",
						"type": "string",
						"default": "",
						"description": "A brief description of the item."
					},
					{
						"displayName": "Discount",
						"name": "discount",
						"type": "number",
						"default": "",
						"description": "The discount amount applied to the item."
					},
					{
						"displayName": "Discount Type",
						"name": "discount_type",
						"type": "string",
						"default": "",
						"description": "The type of discount applied to the item."
					},
					{
						"displayName": "Document Note",
						"name": "document_note",
						"type": "string",
						"default": "Test Note",
						"description": "A note associated with the item."
					},
					{
						"displayName": "Export Cost 1",
						"name": "export_cost_1",
						"type": "number",
						"default": "",
						"description": "The first export cost related to the item."
					},
					{
						"displayName": "Export Cost 2",
						"name": "export_cost_2",
						"type": "number",
						"default": "",
						"description": "The second export cost related to the item."
					},
					{
						"displayName": "Item Type",
						"name": "itemType",
						"type": "string",
						"default": "UNDEFINED",
						"description": "The defined type of the item."
					},
					{
						"displayName": "Number",
						"name": "number",
						"type": "string",
						"default": "",
						"description": "The item number."
					},
					{
						"displayName": "Position",
						"name": "position",
						"type": "string",
						"default": "",
						"description": "The position identifier of the item."
					},
					{
						"displayName": "Position ID",
						"name": "position_id",
						"type": "string",
						"default": "",
						"description": "The identifier for the item position."
					},
					{
						"displayName": "Quantity",
						"name": "quantity",
						"type": "number",
						"default": 1,
						"description": "The quantity of the item."
					},
					{
						"displayName": "Quantity (String)",
						"name": "quantity_str",
						"type": "string",
						"default": "",
						"description": "The quantity as a string."
					},
					{
						"displayName": "Single Price Gross",
						"name": "single_price_gross",
						"type": "number",
						"default": 0,
						"description": "The gross unit price of the item."
					},
					{
						"displayName": "Single Price Net",
						"name": "single_price_net",
						"type": "number",
						"default": 5000,
						"description": "The net unit price of the item."
					},
					{
						"displayName": "Type",
						"name": "type",
						"type": "string",
						"default": "POSITION",
						"description": "The type of the item."
					},
					{
						"displayName": "Unit",
						"name": "unit",
						"type": "string",
						"default": "",
						"description": "The unit of measurement for the item."
					},
					{
						"displayName": "VAT Percent",
						"name": "vat_percent",
						"type": "number",
						"default": 0,
						"description": "The VAT percentage applied to the item."
					}
				],
				routing: {
					request: {
						body: {
							items: '={{[$value]}}'
						}
					}
				}
			},
			// {
			// 	displayName: 'Items',
			// 	name: 'items_fixedCol',
			// 	placeholder: 'Add Item',
			// 	type: 'fixedCollection',
			// 	default: '',
			// 	typeOptions: {
			// 		multipleValues: false,
			// 	},
			// 	description: '',
			// 	options: [
			// 		{
			// 			name: 'items',
			// 			displayName: 'Item',
			// 			values: 
			// 			[
			// 				{
			// 					"displayName": "Booking Account",
			// 					"name": "booking_account",
			// 					"type": "string",
			// 					"default": "",
			// 					"description": "The booking account associated with the item."

			// 				},
			// 				{
			// 					"displayName": "Cost Price Net",
			// 					"name": "cost_price_net",
			// 					"type": "number",
			// 					"default": "",
			// 					"description": "The net cost price of the item."

			// 				},
			// 				{
			// 					"displayName": "Description",
			// 					"name": "description",
			// 					"type": "string",
			// 					"default": "",
			// 					"description": "A brief description of the item."
			// 				},
			// 				{
			// 					"displayName": "Discount",
			// 					"name": "discount",
			// 					"type": "number",
			// 					"default": "",
			// 					"description": "The discount amount applied to the item."
			// 				},
			// 				{
			// 					"displayName": "Discount Type",
			// 					"name": "discount_type",
			// 					"type": "string",
			// 					"default": "",
			// 					"description": "The type of discount applied to the item."
			// 				},
			// 				{
			// 					"displayName": "Document Note",
			// 					"name": "document_note",
			// 					"type": "string",
			// 					"default": "Test Note",
			// 					"description": "A note associated with the item."
			// 				},
			// 				{
			// 					"displayName": "Export Cost 1",
			// 					"name": "export_cost_1",
			// 					"type": "number",
			// 					"default": "",
			// 					"description": "The first export cost related to the item."
			// 				},
			// 				{
			// 					"displayName": "Export Cost 2",
			// 					"name": "export_cost_2",
			// 					"type": "number",
			// 					"default": "",
			// 					"description": "The second export cost related to the item."
			// 				},
			// 				{
			// 					"displayName": "Item Type",
			// 					"name": "itemType",
			// 					"type": "string",
			// 					"default": "UNDEFINED",
			// 					"description": "The defined type of the item."
			// 				},
			// 				{
			// 					"displayName": "Number",
			// 					"name": "number",
			// 					"type": "string",
			// 					"default": "",
			// 					"description": "The item number."
			// 				},
			// 				{
			// 					"displayName": "Position",
			// 					"name": "position",
			// 					"type": "string",
			// 					"default": "",
			// 					"description": "The position identifier of the item."
			// 				},
			// 				{
			// 					"displayName": "Position ID",
			// 					"name": "position_id",
			// 					"type": "string",
			// 					"default": "",
			// 					"description": "The identifier for the item position."
			// 				},
			// 				{
			// 					"displayName": "Quantity",
			// 					"name": "quantity",
			// 					"type": "number",
			// 					"default": 1,
			// 					"description": "The quantity of the item."
			// 				},
			// 				{
			// 					"displayName": "Quantity (String)",
			// 					"name": "quantity_str",
			// 					"type": "string",
			// 					"default": "",
			// 					"description": "The quantity as a string."
			// 				},
			// 				{
			// 					"displayName": "Single Price Gross",
			// 					"name": "single_price_gross",
			// 					"type": "number",
			// 					"default": 0,
			// 					"description": "The gross unit price of the item."
			// 				},
			// 				{
			// 					"displayName": "Single Price Net",
			// 					"name": "single_price_net",
			// 					"type": "number",
			// 					"default": 5000,
			// 					"description": "The net unit price of the item."
			// 				},
			// 				{
			// 					"displayName": "Type",
			// 					"name": "type",
			// 					"type": "string",
			// 					"default": "POSITION",
			// 					"description": "The type of the item."
			// 				},
			// 				{
			// 					"displayName": "Unit",
			// 					"name": "unit",
			// 					"type": "string",
			// 					"default": "",
			// 					"description": "The unit of measurement for the item."
			// 				},
			// 				{
			// 					"displayName": "VAT Percent",
			// 					"name": "vat_percent",
			// 					"type": "number",
			// 					"default": 0,
			// 					"description": "The VAT percentage applied to the item."
			// 				}
			// 			],
			// 			routing: {
			// 				request: {
			// 					body: {
			// 						items2: '={{ [$value] }}'
			// 					},
								
			// 				}
			// 			}
			// 		},
			// 	],
			// },

			// Items End
			{
				"displayName": "Login ID",
				"name": "login_id",
				"type": "string",
				"default": "",
				"description": "The login identifier associated with the document."
			},
			{
				"displayName": "Number",
				"name": "number",
				"type": "string",
				"default": "",
				"description": "The document number."
			},
			{
				"displayName": "Order Number",
				"name": "order_number",
				"type": "string",
				"default": "",
				"description": "The order number associated with the document."
			},
			{
				"displayName": "PDF Template",
				"name": "pdf_template",
				"type": "string",
				"default": "",
				"description": "The PDF template used for the document."
			},
			{
				"displayName": "Project ID",
				"name": "project_id",
				"type": "string",
				"default": "",
				"description": "The project identifier linked to the document."
			},
			{
				"displayName": "Reference ID",
				"name": "ref_id",
				"type": "string",
				"default": "",
				"description": "An internal reference identifier."
			},
			{
				"displayName": "Replica URL",
				"name": "replica_url",
				"type": "string",
				"default": "",
				"description": "The URL for the document replica."
			},
			{
				"displayName": "Recurring Options",
				"name": "recurring_options",
				"type": "collection",
				"default": [],
				"description": "This object is only available in document type RECURRING.",
				"options": [
					{
						"displayName": "As Draft",
						"name": "as_draft",
						"type": "boolean",
						"default": false,
						"description": "Flag to indicate draft status."
					},
					{
						"displayName": "End Date Or Count",
						"name": "end_date_or_count",
						"type": "string",
						"default": "",
						"description": "End date or occurrence count."
					},
					{
						"displayName": "Frequency",
						"name": "frequency",
						"type": "string",
						"default": "MONTHLY",
						"description": "The recurrence frequency."
					},
					{
						"displayName": "Frequency Special",
						"name": "frequency_special",
						"type": "string",
						"default": "",
						"description": "Special frequency parameters, if any."
					},
					{
						"displayName": "Interval",
						"name": "interval",
						"type": "number",
						"default": 1,
						"description": "Interval count for frequency."
					},
					{
						"displayName": "Is Notify",
						"name": "is_notify",
						"type": "boolean",
						"default": false,
						"description": "Notification flag."
					},
					{
						"displayName": "Is Paid",
						"name": "is_paid",
						"type": "boolean",
						"default": false,
						"description": "Flag indicating if paid."
					},
					{
						"displayName": "Is SEPA",
						"name": "is_sepa",
						"type": "boolean",
						"default": false,
						"description": "Flag for SEPA payment."
					},
					{
						"displayName": "Is Sign",
						"name": "is_sign",
						"type": "boolean",
						"default": false,
						"description": "Flag for signature requirement."
					},
					{
						"displayName": "Next Date",
						"name": "next_date",
						"type": "string",
						"default": "2020-02-01",
						"description": "The next date in format YYYY-MM-DD."
					},
					{
						"displayName": "Paid Date Option",
						"name": "paid_date_option",
						"type": "string",
						"default": "created_date",
						"description": "Option for paid date."
					},
					{
						"displayName": "Send As",
						"name": "send_as",
						"type": "string",
						"default": "",
						"description": "Method to send the document."
					},
					{
						"displayName": "SEPA Local Instrument",
						"name": "sepa_local_instrument",
						"type": "string",
						"default": "",
						"description": "Local instrument for SEPA."
					},
					{
						"displayName": "SEPA Reference",
						"name": "sepa_reference",
						"type": "string",
						"default": "",
						"description": "Reference for SEPA."
					},
					{
						"displayName": "SEPA Remittance Information",
						"name": "sepa_remittance_information",
						"type": "string",
						"default": "",
						"description": "Remittance info for SEPA."
					},
					{
						"displayName": "SEPA Sequence Type",
						"name": "sepa_sequence_type",
						"type": "string",
						"default": "",
						"description": "Sequence type for SEPA."
					},
					{
						"displayName": "Status",
						"name": "status",
						"type": "string",
						"default": "WAITING",
						"description": "Current status."
					},
					{
						"displayName": "Target Type",
						"name": "target_type",
						"type": "string",
						"default": "INVOICE",
						"description": "Type of target document."
					}
				]
			},
			{
				"displayName": "Service Date",
				"name": "service_date",
				"type": "collection",
				"default": [],
				"description": "This object is only available in document type INVOICE or CREDIT.",
				"options": [
					{
						"displayName": "Date",
						"name": "date",
						"type": "dateTime",
						"default": "2019-02-01",
						"description": "The date in format YYYY-MM-DD."
					},
					{
						"displayName": "Date From",
						"name": "date_from",
						"type": "dateTime",
						"default": "",
						"description": "Start date (if applicable)."
					},
					{
						"displayName": "Date To",
						"name": "date_to",
						"type": "dateTime",
						"default": "",
						"description": "End date (if applicable)."
					},
					{
						"displayName": "Text",
						"name": "text",
						"type": "string",
						"default": "",
						"description": "Additional text."
					},
					{
						"displayName": "Type",
						"name": "type",
						"type": "string",
						"default": "DEFAULT",
						"description": "With DEFAULT no other fields are required and this message will be printed: 'Invoice date coincides with the time of supply'. For SERVICE or DELIVERY exactly one of the following fields must be set: date, date_from and date_to or text."
					}
				]
			},
			{
				"displayName": "Shipping Country",
				"name": "shipping_country",
				"type": "string",
				"default": "",
				"description": "The country where the document is shipped."
			},
			{
				"displayName": "Status",
				"name": "status",
				"type": "string",
				"default": "",
				"description": "The current status of the document."
			},
			{
				"displayName": "Text",
				"name": "text",
				"type": "string",
				"default": "Vielen Dank für Ihren Auftrag!\n\nBitte begleichen Sie den offenen Betrag bis zum %DOKUMENT.DATUM-FAELLIG%.\n\nMit freundlichen Grüßen\n\n%FIRMA.FIRMA%\n",
				"description": "The main text content of the document."
			},
			{
				"displayName": "Text Prefix",
				"name": "text_prefix",
				"type": "string",
				"default": "%KUNDE.ANREDE%,\nnachfolgend berechnen wir Ihnen wie vorab besprochen:\n",
				"description": "Preface text included at the beginning of the document."
			},
			{
				"displayName": "Text Tax",
				"name": "text_tax",
				"type": "string",
				"default": "",
				"description": "Tax-related text for the document."
			},
			{
				"displayName": "Title",
				"name": "title",
				"type": "string",
				"default": "",
				"description": "The title of the document."
			},
			{
				"displayName": "Type",
				"name": "type",
				"type": "string",
				"default": "INVOICE",
				"description": "Can only set on create. Enum: [ INVOICE, RECURRING, CREDIT, OFFER, REMINDER, DUNNING, STORNO, STORNO_CREDIT, DELIVERY, PDF, CHARGE, CHARGE_CONFIRM, LETTER, ORDER, PROFORMA_INVOICE, STORNO_PROFORMA_INVOICE ]"
			},
			{
				"displayName": "Use Shipping Address",
				"name": "use_shipping_address",
				"type": "boolean",
				"default": false,
				"description": "Flag indicating whether to use the shipping address."
			},
			{
				"displayName": "VAT Country",
				"name": "vat_country",
				"type": "string",
				"default": "",
				"description": "The country code for VAT purposes."
			},
			{
				"displayName": "VAT Option",
				"name": "vat_option",
				"type": "string",
				"default": "",
				"description": "The VAT calculation option for the document."
			}
		]
		,
		displayOptions: {
			show: {
				operation: ['createDoc', 'updateDocument'],
				resource: ['document'],
			},
		},
		routing: {
			request: {
				// Hier wird ein Objekt erstellt, das zuerst die Pflichtfelder enthält
				// und anschließend die optionalen Felder (aus der Collection) dazuhinzufügen.
				// Der Spread-Operator (...) fügt alle Key-Value-Paare des Collections-Objekts hinzu.
				body: '={{ { ...$parameter["additionalFieldsDocs"], items: $parameter["additionalFieldsDocs"].items ? (Array.isArray($parameter["additionalFieldsDocs"].items) ? $parameter["additionalFieldsDocs"].items : [$parameter["additionalFieldsDocs"].items]) : undefined, file_format_config: $parameter["additionalFieldsDocs"].file_format_config ? (Array.isArray($parameter["additionalFieldsDocs"].file_format_config) ? $parameter["additionalFieldsDocs"].file_format_config : [$parameter["additionalFieldsDocs"].file_format_config]) : undefined, service_date: $parameter["additionalFieldsDocs"].service_date ? (Array.isArray($parameter["additionalFieldsDocs"].service_date) ? $parameter["additionalFieldsDocs"].service_date : [$parameter["additionalFieldsDocs"].service_date]) : undefined, recurring_options: $parameter["additionalFieldsDocs"].recurring_options ? (Array.isArray($parameter["additionalFieldsDocs"].recurring_options) ? $parameter["additionalFieldsDocs"].recurring_options : [$parameter["additionalFieldsDocs"].recurring_options]) : undefined } }}'


			},
		},
	},

]