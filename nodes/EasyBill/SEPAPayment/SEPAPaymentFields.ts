import { INodeProperties } from 'n8n-workflow';

export const sepaPaymentFields: INodeProperties[] = [
	/* ╔════════════════════════╗ */
	/* ║    SEPA PAYMENT ID     ║ */
	/* ╚════════════════════════╝ */
	{
		displayName: 'SEPA Payment ID',
		name: 'sepaPaymentId',
		type: 'number',
		default: 0,
		required: true,
		description: 'ID of the SEPA payment',
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
				operation: ['getSepaPayment', 'deleteSepaPayment', 'updateSepaPayment'],
			},
		},
	},
	/* ╔══════════════════════╗ */
	/* ║  GET SEPA PAYMENTS  ║ */
	/* ╚══════════════════════╝ */
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
				resource: ['sepaPayment'],
				operation: ['getSepaPayments'],
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		description: 'Page number to return',
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
				operation: ['getSepaPayments'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		description: 'Additional query parameters',
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
				operation: ['getSepaPayments'],
			},
		},
		options: [
			{
				displayName: 'Document IDs',
				name: 'document_id',
				type: 'string',
				default: '',
				description: 'Comma-separated document IDs (document_id)',
			},
		],
	},
	/* ╔══════════════════════════════════╗ */
	/* ║  CREATE / UPDATE SEPA PAYMENT   ║ */
	/* ╚══════════════════════════════════╝ */
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'number',
		default: 0,
		required: true,
		description: 'Identifier of the associated document',
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
				operation: ['createSepaPayment', 'updateSepaPayment'],
			},
		},
	},
	{
		displayName: 'Debitor Name',
		name: 'debitorName',
		type: 'string',
		default: '',
		required: true,
		description: 'Name of the debitor',
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
				operation: ['createSepaPayment'],
			},
		},
	},
	{
		displayName: 'Debitor IBAN',
		name: 'debitorIban',
		type: 'string',
		default: '',
		required: true,
		description: 'IBAN of the debitor',
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
				operation: ['createSepaPayment'],
			},
		},
	},
	{
		displayName: 'Mandate ID',
		name: 'mandateId',
		type: 'string',
		default: '',
		required: true,
		description: 'Mandate identifier',
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
				operation: ['createSepaPayment'],
			},
		},
	},
	{
		displayName: 'Mandate Date of Signature',
		name: 'mandateDateOfSignature',
		type: 'dateTime',
		default: '',
		required: true,
		description: 'Date the mandate was signed',
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
				operation: ['createSepaPayment'],
			},
		},
	},
	{
		displayName: 'Local Instrument',
		name: 'localInstrument',
		type: 'options',
		default: 'CORE',
		required: true,
		description: 'Type of direct debit instrument',
		options: [
			{
				name: 'CORE',
				value: 'CORE',
			},
			{
				name: 'COR1',
				value: 'COR1',
			},
			{
				name: 'B2B',
				value: 'B2B',
			},
		],
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
				operation: ['createSepaPayment'],
			},
		},
	},
	{
		displayName: 'Sequence Type',
		name: 'sequenceType',
		type: 'options',
		default: 'FRST',
		required: true,
		description: 'Type of SEPA sequence',
		options: [
			{
				name: 'First (FRST)',
				value: 'FRST',
			},
			{
				name: 'One-Off (OOFF)',
				value: 'OOFF',
			},
			{
				name: 'Final (FNAL)',
				value: 'FNAL',
			},
			{
				name: 'Recurring (RCUR)',
				value: 'RCUR',
			},
		],
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
				operation: ['createSepaPayment'],
			},
		},
	},
	{
		displayName: 'Amount (Cents)',
		name: 'amount',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		required: true,
		description: 'Amount in cents (e.g. 150 = 1.50€)',
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
				operation: ['createSepaPayment'],
			},
		},
	},
	{
		displayName: 'Reference',
		name: 'reference',
		type: 'string',
		default: '',
		required: true,
		description: 'Payment reference',
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
				operation: ['createSepaPayment'],
			},
		},
	},
	{
		displayName: 'Requested At',
		name: 'requestedAt',
		type: 'string',
		default: '',
		description: 'Booking date for the payment (YYYY-MM-DD or now)',
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
				operation: ['createSepaPayment'],
			},
		},
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		description: 'Fields to update on the SEPA payment',
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
				operation: ['updateSepaPayment'],
			},
		},
		options: [
			{
				displayName: 'Amount (Cents)',
				name: 'amount',
				type: 'number',
				default: 0,
				description: 'Amount in cents (e.g. 150 = 1.50€)',
			},
			{
				displayName: 'Debitor IBAN',
				name: 'debitorIban',
				type: 'string',
				default: '',
				description: 'IBAN of the debitor',
			},
			{
				displayName: 'Debitor Name',
				name: 'debitorName',
				type: 'string',
				default: '',
				description: 'Name of the debitor',
			},
			{
				displayName: 'Local Instrument',
				name: 'localInstrument',
				type: 'options',
				default: '__KEEP__',
				options: [
					{
						name: 'Do Not Update',
						value: '__KEEP__',
					},
					{
						name: 'CORE',
						value: 'CORE',
					},
					{
						name: 'COR1',
						value: 'COR1',
					},
					{
						name: 'B2B',
						value: 'B2B',
					},
				],
			},
			{
				displayName: 'Mandate Date of Signature',
				name: 'mandateDateOfSignature',
				type: 'dateTime',
				default: '',
				description: 'Date the mandate was signed',
			},
			{
				displayName: 'Mandate ID',
				name: 'mandateId',
				type: 'string',
				default: '',
				description: 'Mandate identifier',
			},
			{
				displayName: 'Reference',
				name: 'reference',
				type: 'string',
				default: '',
				description: 'Payment reference',
			},
			{
				displayName: 'Requested At',
				name: 'requestedAt',
				type: 'string',
				default: '',
				description: 'Booking date for the payment (YYYY-MM-DD or now)',
			},
			{
				displayName: 'Sequence Type',
				name: 'sequenceType',
				type: 'options',
				default: '__KEEP__',
				options: [
					{
						name: 'Do Not Update',
						value: '__KEEP__',
					},
					{
						name: 'Final (FNAL)',
						value: 'FNAL',
					},
					{
						name: 'First (FRST)',
						value: 'FRST',
					},
					{
						name: 'One-Off (OOFF)',
						value: 'OOFF',
					},
					{
						name: 'Recurring (RCUR)',
						value: 'RCUR',
					},
				],
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['sepaPayment'],
				operation: ['createSepaPayment', 'updateSepaPayment'],
			},
		},
		/* eslint-disable n8n-nodes-base/node-param-collection-type-unsorted-items */
		options: [
			{
				displayName: 'Creditor BIC',
				name: 'creditorBic',
				type: 'string',
				default: '',
				description: 'Creditor BIC (overwritten for DEBIT exports)',
			},
			{
				displayName: 'Creditor IBAN',
				name: 'creditorIban',
				type: 'string',
				default: '',
				description: 'Creditor IBAN (mandatory for CREDIT)',
			},
			{
				displayName: 'Creditor Name',
				name: 'creditorName',
				type: 'string',
				default: '',
				description: 'Creditor name (mandatory for CREDIT)',
			},
			{
				displayName: 'Debitor BIC',
				name: 'debitorBic',
				type: 'string',
				default: '',
				description: 'Debitor BIC (overwritten for CREDIT exports)',
			},
			{
				displayName: 'Debitor Address Line 1',
				name: 'debitorAddressLine1',
				type: 'string',
				default: '',
				description: 'Debitor address line 1 (required outside the EEA)',
			},
			{
				displayName: 'Debitor Address Line 2',
				name: 'debitorAddressLine2',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Debitor Country',
				name: 'debitorCountry',
				type: 'string',
				default: '',
				description: 'Debitor country code (required outside the EEA)',
			},
			{
				displayName: 'Export At',
				name: 'exportAt',
				type: 'dateTime',
				default: '',
				description: 'Mark payment as exported at this timestamp',
			},
			{
				displayName: 'Remittance Information',
				name: 'remittanceInformation',
				type: 'string',
				default: '',
				description: 'Additional remittance information',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				default: 'DEBIT',
				options: [
					{
						name: 'Credit',
						value: 'CREDIT',
					},
					{
						name: 'Debit',
						value: 'DEBIT',
					},
				],
				description: 'Payment type',
			},
		],
	},
];
