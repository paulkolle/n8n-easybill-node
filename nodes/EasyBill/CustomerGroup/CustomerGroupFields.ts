import { INodeProperties } from 'n8n-workflow';

/**
 * CUSTOMER FIELDS
 *
 * Hier definieren wir die Felder, die für die jeweiligen Operationen benötigt werden.
 * Für GET /customers werden z. B. Parameter zur Paginierung und Filterung (z. B. group_id) angehängt.
 * Für POST /customers wird ein JSON-Body erwartet.
 *
 * Die Felder werden über "displayOptions" bedingt eingeblendet, sodass nur die Felder angezeigt werden, 
 * die zur aktuell gewählten Operation passen.
 *
 * Hinweis: Bei einer umfangreicheren Implementierung könnten diese Felder ebenfalls in eine eigene Datei (z. B. CustomerFields.ts) ausgelagert werden.
 */
export const customerGroupFields: INodeProperties[] = [

    // GET CUSTOMER GROUPS LIST
    {
        displayName: 'Additional Fields',
        name: 'body',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        description: 'Additionial params for Customer Groups',
        options: [
           
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
                    minValue: 1
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
        ]
        ,
        displayOptions: {
            show: {
                operation: ['getCustomerGroupList'],
                resource: ['customerGroup'],
            },
        }
    },


    // CREATE AND UPDATE CUSTOMER GROUP

    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Example: Important customers',
        required: true, // Pflichtfeld
        displayOptions: {
            show: {
                operation: ['createCustomerGroup', 'updateCustomerGroup'],
                resource: ['customerGroup'],
            },
        },
        routing: {
            request: {
                body: {
                    name: '={{ $value }}'
                }
            }
        }
    },
    {
        displayName: 'Number',
        name: 'number',
        type: 'string',
        default: '',
        description: 'Can be chosen freely',
        required: true, // Pflichtfeld
        displayOptions: {
            show: {
                operation: ['createCustomerGroup', 'updateCustomerGroup'],
                resource: ['customerGroup'],
            },
        },
        routing: {
            request: {
                body: {
                    number: '={{ $value }}'
                }
            }
        }
    },
    {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Example: Our most important customers',
        displayOptions: {
            show: {
                operation: ['createCustomerGroup', 'updateCustomerGroup'],
                resource: ['customerGroup'],
            },
        },
        routing: {
            request: {
                body: {
                    description: '={{ $value }}'
                }
            }
        }
    },
    //UPDATE CUSTOMER GROUP
    {
        displayName: 'Customer Group ID*',
        name: 'customerGroup_id',
        type: 'number',
        default: '',
        description: 'Customer Groups ID',
        required: true, // Pflichtfeld
        displayOptions: {
            show: {
                operation: ['updateCustomerGroup'],
                resource: ['customerGroup'],
            },
        },
        routing: {
            request: {
                method: 'PUT',
                url: '=/customer-groups/{{$value}}',
            },
        },
    },
    // Optionale Felder als Collection von create und update
    {
        displayName: 'Additional Fields',
        name: 'body',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        description: 'Weitere optionale JSON-Daten für den neuen Kunden',
        options:
            [
                {
                    "displayName": "Acquire Options",
                    "name": "acquire_options",
                    "type": "string",
                    "default": null,
                    "description": "Acquire options"
                },
                {
                    "displayName": "Additional Groups IDs",
                    "name": "additional_groups_ids",
                    "type": "json",
                    "default": [],
                    "description": "Additional group IDs"
                },
                {
                    "displayName": "Bank Account",
                    "name": "bank_account",
                    "type": "string",
                    "default": null,
                    "description": "Bank account"
                },
                {
                    "displayName": "Bank Account Owner",
                    "name": "bank_account_owner",
                    "type": "string",
                    "default": null,
                    "description": "Bank account owner"
                },
                {
                    "displayName": "Bank BIC",
                    "name": "bank_bic",
                    "type": "string",
                    "default": null,
                    "description": "Bank BIC"
                },
                {
                    "displayName": "Bank Code",
                    "name": "bank_code",
                    "type": "string",
                    "default": null,
                    "description": "Bank code"
                },
                {
                    "displayName": "Bank IBAN",
                    "name": "bank_iban",
                    "type": "string",
                    "default": null,
                    "description": "Bank IBAN"
                },
                {
                    "displayName": "Bank Name",
                    "name": "bank_name",
                    "type": "string",
                    "default": null,
                    "description": "Bank name"
                },
                {
                    "displayName": "Birth Date",
                    "name": "birth_date",
                    "type": "string",
                    "default": "2016-12-31",
                    "description": "Customer's birth date (YYYY-MM-DD)"
                },
                {
                    "displayName": "Cash Allowance",
                    "name": "cash_allowance",
                    "type": "number",
                    "default": null,
                    "description": "Cash allowance"
                },
                {
                    "displayName": "Cash Allowance Days",
                    "name": "cash_allowance_days",
                    "type": "number",
                    "default": 7,
                    "description": "Number of days for cash allowance"
                },
                {
                    "displayName": "Cash Discount",
                    "name": "cash_discount",
                    "type": "number",
                    "default": null,
                    "description": "Cash discount"
                },
                {
                    "displayName": "Cash Discount Type",
                    "name": "cash_discount_type",
                    "type": "string",
                    "default": null,
                    "description": "Cash discount type"
                },
                {
                    "displayName": "City",
                    "name": "city",
                    "type": "string",
                    "default": "Kaarst",
                    "description": "City"
                },
                {
                    "displayName": "State",
                    "name": "state",
                    "type": "string",
                    "default": "NRW",
                    "description": "State"
                },
                {
                    "displayName": "Company Name",
                    "name": "company_name",
                    "type": "string",
                    "default": "easybill GmbH",
                    "description": "Company name"
                },
                {
                    "displayName": "Country",
                    "name": "country",
                    "type": "string",
                    "default": "DE",
                    "description": "Country"
                },
                {
                    "displayName": "Delivery Title",
                    "name": "delivery_title",
                    "type": "string",
                    "default": "Dr.",
                    "description": "Delivery title"
                },
                {
                    "displayName": "Delivery State",
                    "name": "delivery_state",
                    "type": "string",
                    "default": "NRW",
                    "description": "Delivery state"
                },
                {
                    "displayName": "email",
                    "name": "emails",
                    "type": "string",
                    "default": "max.mustermann@easybill.de",
                    "description": "Email addresses"
                },
                {
                    "displayName": "Fax",
                    "name": "fax",
                    "type": "string",
                    "default": "+49 2154 89701 29",
                    "description": "Fax number"
                },
                {
                    "displayName": "First Name",
                    "name": "first_name",
                    "type": "string",
                    "default": "Max",
                    "description": "First name"
                },
                {
                    "displayName": "Grace Period",
                    "name": "grace_period",
                    "type": "number",
                    "default": null,
                    "description": "Grace period (days)"
                },
                {
                    "displayName": "Last Name",
                    "name": "last_name",
                    "type": "string",
                    "default": "Mustermann",
                    "description": "Last name"
                },
                {
                    "displayName": "Internet",
                    "name": "internet",
                    "type": "string",
                    "default": "https://www.easybill.de",
                    "description": "Website URL"
                },
                {
                    "displayName": "Phone 1",
                    "name": "phone_1",
                    "type": "string",
                    "default": "+49 2154 89701 20",
                    "description": "Primary phone number"
                },
                {
                    "displayName": "Street",
                    "name": "street",
                    "type": "string",
                    "default": "Düsselstr. 21",
                    "description": "Street address"
                },
                {
                    "displayName": "Zip Code",
                    "name": "zip_code",
                    "type": "string",
                    "default": "41564",
                    "description": "Zip code"
                },
                {
                    "displayName": "VAT Identifier",
                    "name": "vat_identifier",
                    "type": "string",
                    "default": "DE814878557",
                    "description": "VAT identifier"
                }
            ],
        displayOptions: {
            show: {
                operation: ['createCustomer', 'updateCustomer'],
                resource: ['customer'],
            },
        },
        routing: {
            request: {
                body: '={{ $value }}',
            },
        },
    },
    // GET CUSTOMER GROUP BY ID
    {
        displayName: 'Customer Grooup ID*',
        name: 'customerGroup_id',
        type: 'number',
        default: '',
        description: 'Customer Group ID',
        required: true, // Pflichtfeld
        displayOptions: {
            show: {
                operation: ['getCustomerGroup'],
                resource: ['customerGroup'],
            },
        },
        routing: {
            request: {
                method: 'GET',
                url: '=/customers-groups/{{$value}}',
            },
        },

    },

    //DELETE CUSTOMER GROUP
    {
        displayName: 'Customer Group ID*',
        name: 'customerGroup_id',
        type: 'number',
        default: '',
        description: 'Customer Group ID',
        required: true, // Pflichtfeld
        displayOptions: {
            show: {
                operation: ['deleteCustomerGroup'],
                resource: ['customerGroup'],
            },
        },
        routing: {
            request: {
                method: 'DELETE',
                url: '=/customer-groups/{{$value}}',
            },
        },
    },

];