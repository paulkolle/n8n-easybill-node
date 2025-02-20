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
    // Parameter für GET /customers: Paginierung
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 50,
        description: 'Begrenzt die Anzahl der zurückgegebenen Kunden',
        routing: {
            request: {
                qs: {
                    limit: '={{$value}}',
                },
            },
        },
        displayOptions: {
            show: {
                customerOperation: ['getCustomerList'],
                resource: ['customer'],
            },
        },
    },
    {
        displayName: 'Page',
        name: 'page',
        type: 'number',
        default: 1,
        description: 'Seitenzahl für die Paginierung',
        routing: {
            request: {
                qs: {
                    page: '={{$value}}',
                },
            },
        },
        displayOptions: {
            show: {
                customerOperation: ['getCustomerList'],
                resource: ['customer'],
            },
        },
    },
    {
        displayName: 'Group ID',
        name: 'group_id',
        type: 'string',
        default: '',
        description: 'Filter customers by group_id. You can add multiple group ids separated by commas like id,id,id.',
        routing: {
            request: {
                qs: {
                    group_id: '={{$value}}',
                },
            },
        },
        displayOptions: {
            show: {
                customerOperation: ['getCustomerList'],
                resource: ['customer'],
            },
        },
    },
    {
        displayName: 'Additional Group ID',
        name: 'additional_group_id',
        type: 'string',
        default: '',
        description: 'Filter customers by additional_group_id. You can add multiple group ids separated by commas.',
        routing: {
            request: {
                qs: {
                    additional_group_id: '={{$value}}',
                },
            },
        },
        displayOptions: {
            show: {
                customerOperation: ['getCustomerList'],
                resource: ['customer'],
            },
        },
    },
    {
        displayName: 'Number',
        name: 'number',
        type: 'string',
        default: '',
        description: 'Filter customers by number. You can add multiple numbers separated by commas.',
        routing: {
            request: {
                qs: {
                    number: '={{$value}}',
                },
            },
        },
        displayOptions: {
            show: {
                customerOperation: ['getCustomerList'],
                resource: ['customer'],
            },
        },
    },
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
                customerOperation: ['getCustomerList'],
                resource: ['customer'],
            },
        },
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
        displayName: 'Customer Id*',
        name: 'customer_id',
        type: 'number',
        default: '',
        description: 'Customer Id',
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
        displayName: 'Customer Id*',
        name: 'customer_id',
        type: 'number',
        default: '',
        description: 'Customer Id',
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
                customerOperation: ['getCustomerList'],
                resource: ['customer'],
            },
        },
    },
    //DELETECUSTOMER
    {
        displayName: 'Customer Id*',
        name: 'customer_id',
        type: 'number',
        default: '',
        description: 'Customer Id',
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
        options: [
            {
                displayName: 'Acquire Options',
                name: 'acquire_options',
                type: 'string',
                default: '',
                description: 'Acquire options',
            },
            {
                displayName: 'Additional Groups IDs',
                name: 'additional_groups_ids',
                type: 'json', // JSON-Typ, da hier ein Array erwartet wird.
                default: [],
                description: 'Zusätzliche Gruppen IDs',
            },
            {
                displayName: 'Bank Account',
                name: 'bank_account',
                type: 'string',
                default: '',
                description: 'Bank account',
            },
            {
                displayName: 'Bank Account Owner',
                name: 'bank_account_owner',
                type: 'string',
                default: '',
                description: 'Bank account owner',
            },
            {
                displayName: 'Bank BIC',
                name: 'bank_bic',
                type: 'string',
                default: '',
                description: 'Bank BIC',
            },
            {
                displayName: 'Bank Code',
                name: 'bank_code',
                type: 'string',
                default: '',
                description: 'Bank code',
            },
            {
                displayName: 'Bank IBAN',
                name: 'bank_iban',
                type: 'string',
                default: '',
                description: 'Bank IBAN',
            },
            {
                displayName: 'Bank Name',
                name: 'bank_name',
                type: 'string',
                default: '',
                description: 'Bank name',
            },
            {
                displayName: 'Birth Date',
                name: 'birth_date',
                type: 'string',
                default: '',
                description: 'Geburtsdatum des Kunden (YYYY-MM-DD)',
            },
            {
                displayName: 'Cash Allowance',
                name: 'cash_allowance',
                type: 'number',
                default: 0,
                description: 'Cash allowance',
            },
            {
                displayName: 'Cash Allowance Days',
                name: 'cash_allowance_days',
                type: 'number',
                default: 7,
                description: 'Anzahl der Tage für Cash Allowance',
            },
            {
                displayName: 'Cash Discount',
                name: 'cash_discount',
                type: 'number',
                default: 0,
                description: 'Cash discount',
            },
            {
                displayName: 'Cash Discount Type',
                name: 'cash_discount_type',
                type: 'string',
                default: '',
                description: 'Cash discount type',
            },
            {
                displayName: 'City',
                name: 'city',
                type: 'string',
                default: '',
                description: 'Stadt',
            },
            {
                displayName: 'State',
                name: 'state',
                type: 'string',
                default: 'NW',
                description: 'Bundesland',
            },
            {
                displayName: 'Country',
                name: 'country',
                type: 'string',
                default: '',
                description: 'Land',
            },
            {
                displayName: 'Delivery Title',
                name: 'delivery_title',
                type: 'string',
                default: '',
                description: 'Liefer-Titel',
            },
            {
                displayName: 'Delivery City',
                name: 'delivery_city',
                type: 'string',
                default: '',
                description: 'Lieferstadt',
            },
            {
                displayName: 'Delivery State',
                name: 'delivery_state',
                type: 'string',
                default: '',
                description: 'Lieferbundesland',
            },
            {
                displayName: 'Delivery Company Name',
                name: 'delivery_company_name',
                type: 'string',
                default: '',
                description: 'Lieferfirma',
            },
            {
                displayName: 'Delivery Country',
                name: 'delivery_country',
                type: 'string',
                default: '',
                description: 'Lieferland',
            },
            {
                displayName: 'Delivery First Name',
                name: 'delivery_first_name',
                type: 'string',
                default: '',
                description: 'Liefer-Vorname',
            },
            {
                displayName: 'Delivery Last Name',
                name: 'delivery_last_name',
                type: 'string',
                default: '',
                description: 'Liefer-Nachname',
            },
            {
                displayName: 'Delivery Personal',
                name: 'delivery_personal',
                type: 'boolean',
                default: false,
                description: 'Ist die Lieferung persönlich?',
            },
            {
                displayName: 'Delivery Salutation',
                name: 'delivery_salutation',
                type: 'number',
                default: 0,
                description: 'Lieferansprache (z.B. 0 für keine)',
            },
            {
                displayName: 'Delivery Street',
                name: 'delivery_street',
                type: 'string',
                default: '',
                description: 'Lieferstraße',
            },
            {
                displayName: 'Delivery Suffix 1',
                name: 'delivery_suffix_1',
                type: 'string',
                default: '',
                description: 'Lieferzusatz 1',
            },
            {
                displayName: 'Delivery Suffix 2',
                name: 'delivery_suffix_2',
                type: 'string',
                default: '',
                description: 'Lieferzusatz 2',
            },
            {
                displayName: 'Delivery Zip Code',
                name: 'delivery_zip_code',
                type: 'string',
                default: '',
                description: 'Liefer-PLZ',
            },
            {
                displayName: 'Email',
                name: 'emails',
                type: 'string',
                default: '',
                description: 'E-Mail-Adresse',
            },
            {
                displayName: 'Fax',
                name: 'fax',
                type: 'string',
                default: '',
                description: 'Faxnummer',
            },
            {
                displayName: 'Grace Period',
                name: 'grace_period',
                type: 'number',
                default: 0,
                description: 'Grace Period (Tage)',
            },
            {
                displayName: 'Due in Days',
                name: 'due_in_days',
                type: 'number',
                default: 0,
                description: 'Fällig in Tagen',
            },
            {
                displayName: 'Group ID',
                name: 'group_id',
                type: 'string',
                default: '',
                description: 'Gruppen ID',
            },
            {
                displayName: 'Info 1',
                name: 'info_1',
                type: 'string',
                default: '',
                description: 'Zusätzliches Info-Feld 1',
            },
            {
                displayName: 'Info 2',
                name: 'info_2',
                type: 'string',
                default: '',
                description: 'Zusätzliches Info-Feld 2',
            },
            {
                displayName: 'Internet',
                name: 'internet',
                type: 'string',
                default: '',
                description: 'Internetseite',
            },
            {
                displayName: 'Login ID',
                name: 'login_id',
                type: 'number',
                default: 0,
                description: 'Login ID',
            },
            {
                displayName: 'Mobile',
                name: 'mobile',
                type: 'string',
                default: '',
                description: 'Handynummer',
            },
            {
                displayName: 'Note',
                name: 'note',
                type: 'string',
                default: '',
                description: 'Notiz',
            },
            {
                displayName: 'Number',
                name: 'number',
                type: 'string',
                default: '',
                description: 'Kundennummer',
            },
            {
                displayName: 'Supplier Number',
                name: 'supplier_number',
                type: 'string',
                default: '',
                description: 'Lieferantennummer',
            },
            {
                displayName: 'Payment Options',
                name: 'payment_options',
                type: 'string',
                default: '',
                description: 'Zahlungsoptionen',
            },
            {
                displayName: 'Personal',
                name: 'personal',
                type: 'boolean',
                default: false,
                description: 'Angabe, ob der Kunde persönlich ist',
            },
            {
                displayName: 'Phone 1',
                name: 'phone_1',
                type: 'string',
                default: '',
                description: 'Telefonnummer 1',
            },
            {
                displayName: 'Phone 2',
                name: 'phone_2',
                type: 'string',
                default: '',
                description: 'Telefonnummer 2',
            },
            {
                displayName: 'Postbox',
                name: 'postbox',
                type: 'string',
                default: '',
                description: 'Postfach',
            },
            {
                displayName: 'Postbox City',
                name: 'postbox_city',
                type: 'string',
                default: '',
                description: 'Postfachstadt',
            },
            {
                displayName: 'Postbox State',
                name: 'postbox_state',
                type: 'string',
                default: '',
                description: 'Bundesland des Postfachs',
            },
            {
                displayName: 'Postbox Country',
                name: 'postbox_country',
                type: 'string',
                default: '',
                description: 'Land des Postfachs',
            },
            {
                displayName: 'Postbox Zip Code',
                name: 'postbox_zip_code',
                type: 'string',
                default: '',
                description: 'PLZ des Postfachs',
            },
            {
                displayName: 'Sale',
                name: 'sale',
                type: 'string',
                default: '',
                description: 'Sale Field',
            },
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