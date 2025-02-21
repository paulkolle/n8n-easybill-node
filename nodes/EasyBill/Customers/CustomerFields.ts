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
export const customerFields: INodeProperties[] = [
    // Optionale Felder als Collection von Get
    {
        displayName: 'Additional Fields',
        name: 'body',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        description: 'Additionial params for Customers',
        options: [
            {
                displayName: 'Additional Group ID',
                name: 'additional_group_id',
                type: 'string',
                default: '',
                // eslint-disable-next-line n8n-nodes-base/node-param-description-miscased-id
                description: 'Filter customers by additional_group_id. You can add multiple group ids separated by commas.',
                routing: {
                    request: {
                        qs: {
                            additional_group_id: '={{$value}}',
                        },
                    },
                },
            },
            {
                displayName: 'Company Name',
                name: 'company_name',
                type: 'string',
                default: '',
                description: 'Filter customers by company_name. You can add multiple names separated by commas like name,name,name.',
                routing: {
                    request: {
                        qs: {
                            company_name: '={{$value}}',
                        },
                    },
                },
            },
            {
                displayName: 'Country',
                name: 'country',
                type: 'string',
                default: '',
                description: 'Filter customers by country. You can add multiple countries separated by commas like DE,PL,FR.',
                routing: {
                    request: {
                        qs: {
                            country: '={{$value}}',
                        },
                    },
                },
            },
            {
                displayName: 'Created At',
                name: 'created_at',
                type: 'string',
                default: '',
                description: 'Filter customers by created_at. You can filter one date with created_at=2014-12-10 or between like 2015-01-01,2015-12-31.',
                routing: {
                    request: {
                        qs: {
                            created_at: '={{$value}}',
                        },
                    },
                },
            },
            {
                displayName: 'Emails',
                name: 'emails',
                type: 'string',
                default: '',
                description: 'Filter customers by emails. You can add multiple emails separated by commas like mail,mail,mail.',
                routing: {
                    request: {
                        qs: {
                            emails: '={{$value}}',
                        },
                    },
                },
            },
            {
                displayName: 'First Name',
                name: 'first_name',
                type: 'string',
                default: '',
                description: 'Filter customers by first_name. You can add multiple names separated by commas like name,name,name.',
                routing: {
                    request: {
                        qs: {
                            first_name: '={{$value}}',
                        },
                    },
                },
            },
            {
                displayName: 'Group ID',
                name: 'group_id',
                type: 'string',
                default: '',
                // eslint-disable-next-line n8n-nodes-base/node-param-description-miscased-id
                description: 'Filter customers by group_id. You can add multiple group ids separated by commas like id,id,id.',
                routing: {
                    request: {
                        qs: {
                            group_id: '={{$value}}',
                        },
                    },
                },
            },
            {
                displayName: 'Last Name',
                name: 'last_name',
                type: 'string',
                default: '',
                description: 'Filter customers by last_name. You can add multiple names separated by commas like name,name,name.',
                routing: {
                    request: {
                        qs: {
                            last_name: '={{$value}}',
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
                    minValue: 1
                },
            },
            {
                displayName: 'Number',
                name: 'number',
                type: 'string',
                default: '',
                description: 'Filter customers by number. You can add multiple numbers separated by commas like no,no,no.',
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
                displayName: 'Type',
                name: 'type',
                type: 'string',
                default: '',
                description: 'Controls the type of the customer. If "number" or "supplier_number" is empty, the type will force number generation if applicable. Available values: CUSTOMER, SUPPLIER, CUSTOMER,SUPPLIER. Default value: CUSTOMER.',
                routing: {
                    request: {
                        qs: {
                            type: '={{$value}}',
                        },
                    },
                },
            },
            {
                displayName: 'Zip Code',
                name: 'zip_code',
                type: 'string',
                default: '',
                description: 'Filter customers by zip_code. You can add multiple zip codes separated by commas like zip,zip,zip.',
                routing: {
                    request: {
                        qs: {
                            zip_code: '={{$value}}',
                        },
                    },
                },
            },
        ]
        ,
        displayOptions: {
            show: {
                customerOperation: ['getCustomerList'],
                resource: ['customer'],
            },
        }
    },


    // Pflichtfelder als einzelne Parameter
    {
        displayName: 'Type',
        name: 'type',
        type: 'string',
        default: 'CUSTOMER',
        description: 'Controls the type of the customer. If "number" or "supplier_number" is empty, the type will force number generation if applicable. Available values: CUSTOMER, SUPPLIER, CUSTOMER,SUPPLIER. Default value: CUSTOMER.',
        routing: {
            request: {
                qs: {
                    type: '={{$value}}',
                },
            },
        },
        displayOptions: {
            show: {
                customerOperation: ['createCustomer'],
                resource: ['customer'],
            },
        }
    },

    {
        displayName: 'Last Name',
        name: 'last_name',
        type: 'string',
        default: '',
        description: 'Nachname des Kunden',
        required: true, // Pflichtfeld
        displayOptions: {
            show: {
                customerOperation: ['createCustomer'],
                resource: ['customer'],
            },
        },
    },
    {
        displayName: 'Company Name',
        name: 'company_name',
        type: 'string',
        default: '',
        description: 'Firmenname des Kunden',
        required: true, // Pflichtfeld
        displayOptions: {
            show: {
                customerOperation: ['createCustomer'],
                resource: ['customer'],
            },
        },
    },
    {
        displayName: 'Customer ID*',
        name: 'customer_id',
        type: 'number',
        default: '',
        description: 'Customer ID',
        required: true, // Pflichtfeld
        displayOptions: {
            show: {
                customerOperation: ['getCustomer'],
                resource: ['customer'],
            },
        },
        routing: {
            request: {
                method: 'GET',
                url: '=/customers/{{$value}}',
            },
        },

    },
    //UPDATE CUSTOMER
    {
        displayName: 'Customer ID*',
        name: 'customer_id',
        type: 'number',
        default: '',
        description: 'Customer ID',
        required: true, // Pflichtfeld
        displayOptions: {
            show: {
                customerOperation: ['updateCustomer'],
                resource: ['customer'],
            },
        },
        routing: {
            request: {
                method: 'PUT',
                url: '=/customers/{{$value}}/{{$parameter["type"]}}',
            },
        },
    },
    //DELETECUSTOMER
    {
        displayName: 'Customer ID*',
        name: 'customer_id',
        type: 'number',
        default: '',
        description: 'Customer ID',
        required: true, // Pflichtfeld
        displayOptions: {
            show: {
                customerOperation: ['deleteCustomer'],
                resource: ['customer'],
            },
        },
        routing: {
            request: {
                method: 'DELETE',
                url: '=/customers/{{$value}}',
            },
        },
    },

    // Optionale Felder als Collection von create
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
                    "default": "",
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
                    "default": "",
                    "description": "Bank account"
                },
                {
                    "displayName": "Bank Account Owner",
                    "name": "bank_account_owner",
                    "type": "string",
                    "default": "",
                    "description": "Bank account owner"
                },
                {
                    "displayName": "Bank BIC",
                    "name": "bank_bic",
                    "type": "string",
                    "default": "",
                    "description": "Bank BIC"
                },
                {
                    "displayName": "Bank Code",
                    "name": "bank_code",
                    "type": "string",
                    "default": "",
                    "description": "Bank code"
                },
                {
                    "displayName": "Bank IBAN",
                    "name": "bank_iban",
                    "type": "string",
                    "default": "",
                    "description": "Bank IBAN"
                },
                {
                    "displayName": "Bank Name",
                    "name": "bank_name",
                    "type": "string",
                    "default": "",
                    "description": "Bank name"
                },
                {
                    "displayName": "Birth Date",
                    "name": "birth_date",
                    "type": "string",
                    "default": "",
                    "description": "Customer's birth date (YYYY-MM-DD)"
                },
                {
                    "displayName": "Cash Allowance",
                    "name": "cash_allowance",
                    "type": "number",
                    "default": 0,
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
                    "default": 0,
                    "description": "Cash discount"
                },
                {
                    "displayName": "Cash Discount Type",
                    "name": "cash_discount_type",
                    "type": "string",
                    "default": "",
                    "description": "Cash discount type"
                },
                {
                    "displayName": "City",
                    "name": "city",
                    "type": "string",
                    "default": "",
                    "description": "City"
                },
                {
                    "displayName": "Country",
                    "name": "country",
                    "type": "string",
                    "default": "",
                    "description": "Country"
                },
                {
                    "displayName": "Delivery City",
                    "name": "delivery_city",
                    "type": "string",
                    "default": "",
                    "description": "Delivery city"
                },
                {
                    "displayName": "Delivery Company Name",
                    "name": "delivery_company_name",
                    "type": "string",
                    "default": "",
                    "description": "Delivery company"
                },
                {
                    "displayName": "Delivery Country",
                    "name": "delivery_country",
                    "type": "string",
                    "default": "",
                    "description": "Delivery country"
                },
                {
                    "displayName": "Delivery First Name",
                    "name": "delivery_first_name",
                    "type": "string",
                    "default": "",
                    "description": "Delivery first name"
                },
                {
                    "displayName": "Delivery Last Name",
                    "name": "delivery_last_name",
                    "type": "string",
                    "default": "",
                    "description": "Delivery last name"
                },
                {
                    "displayName": "Delivery Personal",
                    "name": "delivery_personal",
                    "type": "boolean",
                    "default": false,
                    "description": "Is the delivery personal?"
                },
                {
                    "displayName": "Delivery Salutation",
                    "name": "delivery_salutation",
                    "type": "number",
                    "default": 0,
                    "description": "Delivery salutation (e.g. 0 for none)"
                },
                {
                    "displayName": "Delivery State",
                    "name": "delivery_state",
                    "type": "string",
                    "default": "",
                    "description": "Delivery state"
                },
                {
                    "displayName": "Delivery Street",
                    "name": "delivery_street",
                    "type": "string",
                    "default": "",
                    "description": "Delivery street"
                },
                {
                    "displayName": "Delivery Suffix 1",
                    "name": "delivery_suffix_1",
                    "type": "string",
                    "default": "",
                    "description": "Delivery suffix 1"
                },
                {
                    "displayName": "Delivery Suffix 2",
                    "name": "delivery_suffix_2",
                    "type": "string",
                    "default": "",
                    "description": "Delivery suffix 2"
                },
                {
                    "displayName": "Delivery Title",
                    "name": "delivery_title",
                    "type": "string",
                    "default": "",
                    "description": "Delivery title"
                },
                {
                    "displayName": "Delivery Zip Code",
                    "name": "delivery_zip_code",
                    "type": "string",
                    "default": "",
                    "description": "Delivery zip code"
                },
                {
                    "displayName": "Due in Days",
                    "name": "due_in_days",
                    "type": "number",
                    "default": 0,
                    "description": "Due in days"
                },
                {
                    "displayName": "Email",
                    "name": "emails",
                    "type": "string",
                    "default": "",
                    "description": "Email address"
                },
                {
                    "displayName": "Fax",
                    "name": "fax",
                    "type": "string",
                    "default": "",
                    "description": "Fax number"
                },
                {
                    "displayName": "Grace Period",
                    "name": "grace_period",
                    "type": "number",
                    "default": 0,
                    "description": "Grace period (days)"
                },
                {
                    "displayName": "Group ID",
                    "name": "group_id",
                    "type": "string",
                    "default": "",
                    "description": "Group ID"
                },
                {
                    "displayName": "Info 1",
                    "name": "info_1",
                    "type": "string",
                    "default": "",
                    "description": "Additional info field 1"
                },
                {
                    "displayName": "Info 2",
                    "name": "info_2",
                    "type": "string",
                    "default": "",
                    "description": "Additional info field 2"
                }
            ],
        displayOptions: {
            show: {
                customerOperation: ['createCustomer', 'updateCustomer'],
                resource: ['customer'],
            },
        },
        // Hier braucht die Collection keinen eigenen Routing-Eintrag, da wir sie später mit den Pflichtfeldern zusammenführen.
        routing: {
            request: {
                // Hier wird ein Objekt erstellt, das zuerst die Pflichtfelder enthält
                // und anschließend die optionalen Felder (aus der Collection) dazuhinzufügen.
                // Der Spread-Operator (...) fügt alle Key-Value-Paare des Collections-Objekts hinzu.
                body: '={{ { last_name: $parameter["last_name"], company_name: $parameter["company_name"], ...$parameter["body"] } }}',
            },
        },
    },



];