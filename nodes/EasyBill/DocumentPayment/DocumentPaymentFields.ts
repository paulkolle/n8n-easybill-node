import { INodeProperties } from 'n8n-workflow';

export const documentPaymentFields: INodeProperties[] = [
    /* ╔════════════════════════════════════╗ */
    /* ║  GET DOCUMENT PAYMENTS             ║ */
    /* ╚════════════════════════════════════╝ */
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        typeOptions: {
            minValue: 1,
        },
        default: 50,
        description: 'Max number of results to return',
        displayOptions: {
            show: {
                resource: ['documentPayment'],
                operation: ['getDocumentPayments'],
            },
        },
    },
    {
        displayName: 'Page',
        name: 'page',
        type: 'number',
        default: 1,
        description: 'Seitenzahl',
        displayOptions: {
            show: {
                resource: ['documentPayment'],
                operation: ['getDocumentPayments'],
            },
        },
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        description: 'Zusätzliche Query-Parameter (document_id, payment_at, reference)',
        options: [
            {
                displayName: 'Document ID',
                name: 'document_id',
                type: 'string',
                default: '',
                description: 'Filter payments by document_id (kommagetrennte IDs)',
            },
            {
                displayName: 'Payment At',
                name: 'payment_at',
                type: 'string',
                default: '',
                description: 'Filter payments by payment_at (ein Datum oder Datum-Bereich)',
            },
            {
                displayName: 'Reference',
                name: 'reference',
                type: 'string',
                default: '',
                description: 'Filter payments by reference (kommagetrennte Werte)',
            },
        ],
        displayOptions: {
            show: {
                resource: ['documentPayment'],
                operation: ['getDocumentPayments'],
            },
        },
    },

    /* ╔════════════════════════════════════╗ */
    /* ║  CREATE DOCUMENT PAYMENT           ║ */
    /* ╚════════════════════════════════════╝ */

    {
        displayName: 'Amount',
        name: 'amount',
        type: 'number',
        default: 0,
        description: 'The payment amount (integer)',
        required: true,
        displayOptions: {
            show: {
                resource: ['documentPayment'],
                operation: ['createDocumentPayment']
            }
        }
    },
    {
        displayName: 'Document ID',
        name: 'documentId',
        type: 'number',
        default: 0,
        description: 'The identifier of the document (integer)',
        required: true,
        displayOptions: {
            show: {
                resource: ['documentPayment'],
                operation: ['createDocumentPayment']
            }
        }
    },
    {
        displayName: 'Paid',
        name: 'paid',
        type: 'boolean',
        default: false,
        description: 'Whether the payment is already paid',
        displayOptions: {
            show: {
                resource: ['documentPayment'],
                operation: ['createDocumentPayment']
            }
        }
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['documentPayment'],
                operation: ['createDocumentPayment']
            }
        },
        options: [
            {
                displayName: 'Is Overdue Fee',
                name: 'isOverdueFee',
                type: 'boolean',
                default: false,
                description: 'Whether this payment is an overdue fee'
            },
            {
                displayName: 'Notice',
                name: 'notice',
                type: 'string',
                default: '',
                description: 'Additional information or notice for the payment'
            },
            {
                displayName: 'Payment At',
                name: 'paymentAt',
                type: 'dateTime',
                default: '',
                description: 'The date when the payment was made'
            },
            {
                displayName: 'Provider',
                name: 'provider',
                type: 'string',
                default: '',
                description: 'The payment provider (max 255 characters)'
            },
            {
                displayName: 'Reference',
                name: 'reference',
                type: 'string',
                default: '',
                description: 'Reference for the payment (max 255 characters)'
            },
            {
                displayName: 'Type',
                name: 'type',
                type: 'string',
                default: '',
                description: 'The type of payment'
            }
        ]
    },

    /* ╔════════════════════════════════════╗ */
    /* ║  GET DOCUMENT PAYMENT              ║ */
    /* ╚════════════════════════════════════╝ */
    {
        displayName: 'Document Payment ID',
        name: 'document_payment_id',
        type: 'string',
        default: '',
        description: 'Die ID des Document Payment',
        required: true,
        displayOptions: {
            show: {
                resource: ['documentPayment'],
                operation: ['getDocumentPayment'],
            },
        },
    },

    /* ╔════════════════════════════════════╗ */
    /* ║  DELETE DOCUMENT PAYMENT           ║ */
    /* ╚════════════════════════════════════╝ */
    {
        displayName: 'Document Payment ID',
        name: 'document_payment_id',
        type: 'string',
        default: '',
        description: 'Die ID des Document Payment',
        required: true,
        displayOptions: {
            show: {
                resource: ['documentPayment'],
                operation: ['deleteDocumentPayment'],
            },
        },
    },
];
