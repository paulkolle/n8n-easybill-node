import { INodeProperties } from 'n8n-workflow';

export const customerGroupFields: INodeProperties[] = [
	/* ╔══════════════════════════╗ */
	/* ║  GET CUSTOMER GROUPS     ║ */
	/* ╚══════════════════════════╝ */
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		description: 'Zusätzliche Query-Parameter für die Customer Groups',
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				description: 'Maximale Anzahl der Ergebnisse',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Seitenzahl',
			},
		],
		displayOptions: {
			show: {
				resource: ['customerGroup'],
				operation: ['getCustomerGroups'],
			},
		},
	},

	/* ╔══════════════════════════════╗ */
	/* ║  CREATE CUSTOMER GROUP       ║ */
	/* ╚══════════════════════════════╝ */
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		description: 'Name der Customer Group',
		required: true,
		displayOptions: {
			show: {
				resource: ['customerGroup'],
				operation: ['createCustomerGroup'],
			},
		},
	},
    {
		displayName: 'Number',
		name: 'number',
		type: 'number',
		default: '',
		description: 'Name der Customer Group - Can be chosen freely',
		required: true,
		displayOptions: {
			show: {
				resource: ['customerGroup'],
				operation: ['createCustomerGroup'],
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		description: 'Beschreibung der Customer Group',
		displayOptions: {
			show: {
				resource: ['customerGroup'],
				operation: ['createCustomerGroup'],
			},
		},
	},


	/* ╔══════════════════════════╗ */
	/* ║  GET CUSTOMER GROUP      ║ */
	/* ╚══════════════════════════╝ */
	{
		displayName: 'Customer Group ID',
		name: 'group_id',
		type: 'string',
		default: '',
		description: 'Die ID der Customer Group',
		required: true,
		displayOptions: {
			show: {
				resource: ['customerGroup'],
				operation: ['getCustomerGroup'],
			},
		},
	},

	/* ╔══════════════════════════════╗ */
	/* ║  UPDATE CUSTOMER GROUP       ║ */
	/* ╚══════════════════════════════╝ */
	{
		displayName: 'Customer Group ID',
		name: 'group_id',
		type: 'string',
		default: '',
		description: 'Die ID der Customer Group',
		required: true,
		displayOptions: {
			show: {
				resource: ['customerGroup'],
				operation: ['updateCustomerGroup'],
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		description: 'Name der Customer Group',
		displayOptions: {
			show: {
				resource: ['customerGroup'],
				operation: ['updateCustomerGroup'],
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		description: 'Beschreibung der Customer Group',
		displayOptions: {
			show: {
				resource: ['customerGroup'],
				operation: ['updateCustomerGroup'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		description: 'Weitere Felder für das Update',
		displayOptions: {
			show: {
				resource: ['customerGroup'],
				operation: ['updateCustomerGroup'],
			},
		},
		options: [
			{
				displayName: 'External ID',
				name: 'external_id',
				type: 'string',
				default: '',
				description: 'Externe Kennung',
			},
		],
	},

	/* ╔══════════════════════════╗ */
	/* ║  DELETE CUSTOMER GROUP   ║ */
	/* ╚══════════════════════════╝ */
	{
		displayName: 'Customer Group ID',
		name: 'group_id',
		type: 'string',
		default: '',
		description: 'Die ID der Customer Group',
		required: true,
		displayOptions: {
			show: {
				resource: ['customerGroup'],
				operation: ['deleteCustomerGroup'],
			},
		},
	},
];
