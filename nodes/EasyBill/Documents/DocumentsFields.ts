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
	//Parameter für GET /documents: Paginierung
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		description: 'Begrenzt die Anzahl der zurückgegebenen Dokumente',
		displayOptions: {
			show: {
				documentOperation: ['getDocList'],
				resource: ['document'],
			},
		},
		routing: {
            request: {
                qs: {
                    limit: '={{$value}}',
                },
            },
        },
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		description: 'Seitenzahl für die Paginierung',
		displayOptions: {
			show: {
				documentOperation: ['getDocList'],
				resource: ['document'],
			},
		},
		routing: {
            request: {
                qs: {
                    page: '={{$value}}',
                },
            },
        },
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
				documentOperation: [
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
				documentOperation: ['updateDocument'],
				resource: ['document'],
			},
		},
		routing: {
            request: {
                method: 'PUT',
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
				documentOperation: ['completeDocument'],
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
		displayName: 'Reason for change',
		name: 'reason_for_change',
		type: 'string',
		default: '',
		description: 'A string that is saved on the document version as reason',
		displayOptions: {
			show: {
				documentOperation:['completeDocument'],
				resource: ['document'],
			},
		},
		routing: {
            request: {
                qs: {
                    reason_for_change: '={{$value}}',
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
				documentOperation: ['deleteDocument'],
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
				documentOperation: ['cancelDocument'],
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
	{
		displayName: 'Use Text from Template',
		name: 'use_text_from_template',
		type: 'boolean',
		default: false,
		description: 'Use standard texts from the template.',
		displayOptions: {
			show: {
				documentOperation:['cancelDocument'],
				resource: ['document'],
			},
		},
		routing: {
            request: {
                qs: {
                    use_text_from_template: '={{$value}}',
                },
            },
        },    
	},
	//SEND DOCUMENT (TODO: Zu fixedCol machen oder so)
	{
		displayName: 'Document ID',
		name: 'document_id',
		type: 'string',
		default: '',
		description: 'Die ID des Dokuments',
		required: true,
		displayOptions: {
			show: {
				documentOperation: ['sendDocument'],
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
		displayName: 'Type',
		name: 'type',
		type: 'string',
		default: 'email',
		description: 'Available values : email, fax, post',
		displayOptions: {
			show: {
				documentOperation:['sendDocument'],
				resource: ['document'],
			},
		} 
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
				documentOperation: ['getPdf'],
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
				documentOperation: ['downloadJpeg'],
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
				documentOperation: ['convertDocument'],
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
		description: 'Available values : DUNNING, REMINDER, CHARGE_CONFIRM, CHARGE, CREDIT, DELIVERY, INVOICE, ORDER',
		displayOptions: {
			show: {
				documentOperation:['convertDocument'],
				resource: ['document'],
			},
		} 
	},
	{
		displayName: 'PDF Template',
		name: 'pdf_template',
		type: 'string',
		default: 'DE',
		description: 'The ID of the printer template to use. Defaults to \'DE\' if not given.',
		displayOptions: {
			show: {
				documentOperation:['convertDocument'],
				resource: ['document'],
			},
		},
		routing: {
            request: {
                qs: {
                    pdf_template: '={{$value}}',
                },
            },
        },    
	},




	// Felder für Create und Update Dokument (Body)


	// Optionale Felder als Collection für Create und Update
	{
		displayName: 'Additional Fields',
		name: 'additionalFieldsDocs',
		type: 'collection',
		placeholder: 'Füge weitere Felder hinzu',
		default: {},
		description: 'Weitere optionale JSON-Daten für das Dokument',
		options: [
			{
				displayName: "Anonymize Due Date",
				name: "anonymize_due_date",
				type: "dateTime",
				default: "2019-02-07",
				description: "The date on which the document should be anonymized."
			},
			{
				displayName: "Bank Debit Form",
				name: "bank_debit_form",
				type: "string",
				default: "",
				description: "The bank debit form associated with the document."
			},
			{
				displayName: "Calculate VAT From",
				name: "calc_vat_from",
				type: "number",
				default: 0,
				description: "The starting value for VAT calculation."
			},
			{
				displayName: "Cash Allowance",
				name: "cash_allowance",
				type: "number",
				default: "",
				description: "The cash allowance amount."
			},
			{
				displayName: "Cash Allowance Days",
				name: "cash_allowance_days",
				type: "number",
				default: "",
				description: "The number of days for the cash allowance."
			},
			{
				displayName: "Cash Allowance Text",
				name: "cash_allowance_text",
				type: "string",
				default: "",
				description: "Text describing the cash allowance."
			},
			{
				displayName: "Contact ID",
				name: "contact_id",
				type: "string",
				default: "",
				description: "The identifier for the contact."
			},
			{
				displayName: "Contact Label",
				name: "contact_label",
				type: "string",
				default: "",
				description: "The label for the contact."
			},
			{
				displayName: "Contact Text",
				name: "contact_text",
				type: "string",
				default: "",
				description: "Additional text for the contact."
			},
			{
				displayName: "Currency",
				name: "currency",
				type: "string",
				default: "EUR",
				description: "The currency code used in the document."
			},
			{
				displayName: "Customer ID",
				name: "customer_id",
				type: "string",
				default: "",
				description: "The identifier for the customer."
			},
			{
				displayName: "Discount",
				name: "discount",
				type: "number",
				default: "",
				description: "The discount amount applied."
			},
			{
				displayName: "Discount Type",
				name: "discount_type",
				type: "string",
				default: "",
				description: "The type of discount applied."
			},
			{
				displayName: "Document Date",
				name: "document_date",
				type: "dateTime",
				default: "2024-02-07",
				description: "The date the document was created."
			},
			{
				displayName: "External ID",
				name: "external_id",
				type: "string",
				default: "",
				description: "An external identifier for the document."
			},
			{
				displayName: "Replica URL",
				name: "replica_url",
				type: "string",
				default: "",
				description: "The URL for the document replica."
			},
			{
				displayName: "Grace Period",
				name: "grace_period",
				type: "number",
				default: "",
				description: "The grace period (in days) for payments."
			},
			{
				displayName: "Due In Days",
				name: "due_in_days",
				type: "number",
				default: "",
				description: "The number of days until the document is due."
			},
			{
				displayName: "Acceptable on Public Domain",
				name: "is_acceptable_on_public_domain",
				type: "boolean",
				default: false,
				description: "Indicates if a document can be accepted by the end customer through the document's public access page."
			},
			{
				displayName: "Is Archive",
				name: "is_archive",
				type: "boolean",
				default: false,
				description: "Indicates if the document is archived."
			},
			{
				displayName: "Is Replica",
				name: "is_replica",
				type: "boolean",
				default: false,
				description: "Marks a document as a replica from another software."
			},
			{
				displayName: "Is OSS",
				name: "is_oss",
				type: "boolean",
				default: false,
				description: "Indicates if the document is related to open source software."
			},
			// {
			// 	displayName: "Items",
			// 	name: "items",
			// 	type: "json",
			// 	default: "[\n\t{\n\t\t\"number\": null,\n\t\t\"description\": null,\n\t\t\"document_note\": \"Test Note\",\n\t\t\"quantity\": 1,\n\t\t\"quantity_str\": null,\n\t\t\"unit\": null,\n\t\t\"type\": \"POSITION\",\n\t\t\"position\": null,\n\t\t\"single_price_net\": null,\n\t\t\"single_price_gross\": 0,\n\t\t\"vat_percent\": 0,\n\t\t\"discount\": null,\n\t\t\"discount_type\": null,\n\t\t\"position_id\": null,\n\t\t\"booking_account\": null,\n\t\t\"export_cost_1\": null,\n\t\t\"export_cost_2\": null,\n\t\t\"cost_price_net\": null,\n\t\t\"itemType\": \"UNDEFINED\"\n\t}\n]",
			// 	description: "A list of items included in the document."
			// },
			{
				displayName: "Items",
				name: "items",
				type: "collection",
				default: [
					{
						"number": "1",
						"description": "FIX&FLIP Experten Gespräch mit Paul",
						"quantity": 1,
						"unit": "Stk",
						"type": "POSITION",
						"single_price_net": 12521,
						"vat_percent": 19
					}
				],
				description: "A list of items included in the document.",
				options: [
					{
						displayName: "Number",
						name: "number",
						type: "string",
						default: "",
						description: "The item number."
					},
					{
						displayName: "Description",
						name: "description",
						type: "string",
						default: "",
						description: "A brief description of the item."
					},
					{
						displayName: "Document Note",
						name: "document_note",
						type: "string",
						default: "Test Note",
						description: "A note associated with the item."
					},
					{
						displayName: "Quantity",
						name: "quantity",
						type: "number",
						default: 1,
						description: "The quantity of the item."
					},
					{
						displayName: "Quantity (String)",
						name: "quantity_str",
						type: "string",
						default: "",
						description: "The quantity as a string."
					},
					{
						displayName: "Unit",
						name: "unit",
						type: "string",
						default: "",
						description: "The unit of measurement for the item."
					},
					{
						displayName: "Type",
						name: "type",
						type: "string",
						default: "POSITION",
						description: "The type of the item."
					},
					{
						displayName: "Position",
						name: "position",
						type: "string",
						default: "",
						description: "The position identifier of the item."
					},
					{
						displayName: "Single Price Net",
						name: "single_price_net",
						type: "number",
						default: "",
						description: "The net unit price of the item."
					},
					{
						displayName: "Single Price Gross",
						name: "single_price_gross",
						type: "number",
						default: 0,
						description: "The gross unit price of the item."
					},
					{
						displayName: "VAT Percent",
						name: "vat_percent",
						type: "number",
						default: 0,
						description: "The VAT percentage applied to the item."
					},
					{
						displayName: "Discount",
						name: "discount",
						type: "number",
						default: "",
						description: "The discount amount applied to the item."
					},
					{
						displayName: "Discount Type",
						name: "discount_type",
						type: "string",
						default: "",
						description: "The type of discount applied to the item."
					},
					{
						displayName: "Position ID",
						name: "position_id",
						type: "string",
						default: "",
						description: "The identifier for the item position."
					},
					{
						displayName: "Booking Account",
						name: "booking_account",
						type: "string",
						default: "",
						description: "The booking account associated with the item."
					},
					{
						displayName: "Export Cost 1",
						name: "export_cost_1",
						type: "number",
						default: "",
						description: "The first export cost related to the item."
					},
					{
						displayName: "Export Cost 2",
						name: "export_cost_2",
						type: "number",
						default: "",
						description: "The second export cost related to the item."
					},
					{
						displayName: "Cost Price Net",
						name: "cost_price_net",
						type: "number",
						default: "",
						description: "The net cost price of the item."
					},
					{
						displayName: "Item Type",
						name: "itemType",
						type: "string",
						default: "UNDEFINED",
						description: "The defined type of the item."
					}
				]
			},

			{
				displayName: "Login ID",
				name: "login_id",
				type: "string",
				default: "",
				description: "The login identifier associated with the document."
			},
			{
				displayName: "Number",
				name: "number",
				type: "string",
				default: "",
				description: "The document number."
			},
			{
				displayName: "Order Number",
				name: "order_number",
				type: "string",
				default: "",
				description: "The order number associated with the document."
			},
			{
				displayName: "Buyer Reference",
				name: "buyer_reference",
				type: "string",
				default: "",
				description: "A reference provided by the buyer."
			},
			{
				displayName: "PDF Template",
				name: "pdf_template",
				type: "string",
				default: "",
				description: "The PDF template used for the document."
			},
			{
				displayName: "Project ID",
				name: "project_id",
				type: "string",
				default: "",
				description: "The project identifier linked to the document."
			},
			{
				displayName: "Recurring Options",
				name: "recurring_options",
				type: "collection",
				default: [],
				description: "This object is only available in document type RECURRING.",
				options: [
					{
						displayName: "Next Date",
						name: "next_date",
						type: "string",
						default: "2020-02-01",
						description: "The next date in format YYYY-MM-DD."
					},
					{
						displayName: "Frequency",
						name: "frequency",
						type: "string",
						default: "MONTHLY",
						description: "The recurrence frequency."
					},
					{
						displayName: "Frequency Special",
						name: "frequency_special",
						type: "string",
						default: "",
						description: "Special frequency parameters, if any."
					},
					{
						displayName: "Interval",
						name: "interval",
						type: "number",
						default: 1,
						description: "Interval count for frequency."
					},
					{
						displayName: "End Date Or Count",
						name: "end_date_or_count",
						type: "string",
						default: "",
						description: "End date or occurrence count."
					},
					{
						displayName: "Status",
						name: "status",
						type: "string",
						default: "WAITING",
						description: "Current status."
					},
					{
						displayName: "As Draft",
						name: "as_draft",
						type: "boolean",
						default: false,
						description: "Flag to indicate draft status."
					},
					{
						displayName: "Is Notify",
						name: "is_notify",
						type: "boolean",
						default: false,
						description: "Notification flag."
					},
					{
						displayName: "Send As",
						name: "send_as",
						type: "string",
						default: "",
						description: "Method to send the document."
					},
					{
						displayName: "Is Sign",
						name: "is_sign",
						type: "boolean",
						default: false,
						description: "Flag for signature requirement."
					},
					{
						displayName: "Is Paid",
						name: "is_paid",
						type: "boolean",
						default: false,
						description: "Flag indicating if paid."
					},
					{
						displayName: "Paid Date Option",
						name: "paid_date_option",
						type: "string",
						default: "created_date",
						description: "Option for paid date."
					},
					{
						displayName: "Is SEPA",
						name: "is_sepa",
						type: "boolean",
						default: false,
						description: "Flag for SEPA payment."
					},
					{
						displayName: "SEPA Local Instrument",
						name: "sepa_local_instrument",
						type: "string",
						default: "",
						description: "Local instrument for SEPA."
					},
					{
						displayName: "SEPA Sequence Type",
						name: "sepa_sequence_type",
						type: "string",
						default: "",
						description: "Sequence type for SEPA."
					},
					{
						displayName: "SEPA Reference",
						name: "sepa_reference",
						type: "string",
						default: "",
						description: "Reference for SEPA."
					},
					{
						displayName: "SEPA Remittance Information",
						name: "sepa_remittance_information",
						type: "string",
						default: "",
						description: "Remittance info for SEPA."
					},
					{
						displayName: "Target Type",
						name: "target_type",
						type: "string",
						default: "INVOICE",
						description: "Type of target document."
					}
				]

			},
			{
				displayName: "Reference ID",
				name: "ref_id",
				type: "string",
				default: "",
				description: "An internal reference identifier."
			},
			{
				displayName: "Service Date",
				name: "service_date",
				type: "collection",
				default: [],
				description: "This object is only available in document type INVOICE or CREDIT.",
				options: [
					{
						displayName: "Type",
						name: "type",
						type: "string",
						default: "DEFAULT",
						description: "With DEFAULT no other fields are required and this message will be printed: 'Invoice date coincides with the time of supply'. For SERVICE or DELIVERY exactly one of the following fields must be set: date, date_from and date_to or text."
					},
					{
						displayName: "Date",
						name: "date",
						type: "dateTime",
						default: "2019-02-01",
						description: "The date in format YYYY-MM-DD."
					},
					{
						displayName: "Date From",
						name: "date_from",
						type: "dateTime",
						default: "",
						description: "Start date (if applicable)."
					},
					{
						displayName: "Date To",
						name: "date_to",
						type: "dateTime",
						default: "",
						description: "End date (if applicable)."
					},
					{
						displayName: "Text",
						name: "text",
						type: "string",
						default: "",
						description: "Additional text."
					}
				]


			},
			{
				displayName: "Shipping Country",
				name: "shipping_country",
				type: "string",
				default: "",
				description: "The country where the document is shipped."
			},
			{
				displayName: "Status",
				name: "status",
				type: "string",
				default: "",
				description: "The current status of the document."
			},
			{
				displayName: "Text",
				name: "text",
				type: "string",
				default: "Vielen Dank für Ihren Auftrag!\n\nBitte begleichen Sie den offenen Betrag bis zum %DOKUMENT.DATUM-FAELLIG%.\n\nMit freundlichen Grüßen\n\n%FIRMA.FIRMA%\n",
				description: "The main text content of the document."
			},
			{
				displayName: "Text Prefix",
				name: "text_prefix",
				type: "string",
				default: "%KUNDE.ANREDE%,\nnachfolgend berechnen wir Ihnen wie vorab besprochen:\n",
				description: "Preface text included at the beginning of the document."
			},
			{
				displayName: "Text Tax",
				name: "text_tax",
				type: "string",
				default: "",
				description: "Tax-related text for the document."
			},
			{
				displayName: "Title",
				name: "title",
				type: "string",
				default: "",
				description: "The title of the document."
			},
			{
				displayName: "Type",
				name: "type",
				type: "string",
				default: "INVOICE",
				description: "Can only set on create. Enum: [ INVOICE, RECURRING, CREDIT, OFFER, REMINDER, DUNNING, STORNO, STORNO_CREDIT, DELIVERY, PDF, CHARGE, CHARGE_CONFIRM, LETTER, ORDER, PROFORMA_INVOICE, STORNO_PROFORMA_INVOICE ]",
			},
			{
				displayName: "Use Shipping Address",
				name: "use_shipping_address",
				type: "boolean",
				default: false,
				description: "Flag indicating whether to use the shipping address."
			},
			{
				displayName: "VAT Country",
				name: "vat_country",
				type: "string",
				default: "",
				description: "The country code for VAT purposes."
			},
			{
				displayName: "Fulfillment Country",
				name: "fulfillment_country",
				type: "string",
				default: "",
				description: "The country where the order is fulfilled."
			},
			{
				displayName: "VAT Option",
				name: "vat_option",
				type: "string",
				default: "",
				description: "The VAT calculation option for the document."
			},
			{
				displayName: "File Format Config",
				name: "file_format_config",
				type: "collection",
				default: [],
				description: "Configuration settings for the file format.",
				options: [
					{
						displayName: "Type",
						name: "type",
						type: "string",
						default: "default",
						description: "[ default, default_without_stationery, zugferd1, zugferd2_2, xrechnung2_2_xml, xrechnung2_3_xml, xrechnung3_0_xml ]"
					},
				]
			}
		],
		displayOptions: {
			show: {
				documentOperation: ['createDoc', 'updateDocument'],
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
