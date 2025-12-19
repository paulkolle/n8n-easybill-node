import { INodeProperties } from 'n8n-workflow';

export const customerGroupFields: INodeProperties[] = [
	/* ╔═════════════════════╗ */
	/* ║  CUSTOMER GROUP ID  ║ */
	/* ╚═════════════════════╝ */
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
				operation: ['getCustomerGroup', 'updateCustomerGroup', 'deleteCustomerGroup'],
			},
		},
	},
	/* ╔═══════════════════════════╗ */
	/* ║  GET CUSTOMER GROUP LIST  ║ */
	/* ╚═══════════════════════════╝ */
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		description: 'Additional query parameters for the Customer Groups',
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number',
			},
		],
		displayOptions: {
			show: {
				resource: ['customerGroup'],
				operation: ['getCustomerGroups'],
			},
		},
	},
	/* ╔═════════════════════════╗ */
	/* ║  CREATE CUSTOMER GROUP  ║ */
	/* ╚═════════════════════════╝ */
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
		type: 'string',
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
	/* ╔═════════════════════════╗ */
	/* ║  UPDATE CUSTOMER GROUP  ║ */
	/* ╚═════════════════════════╝ */
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
		displayName: 'Number',
		name: 'number',
		type: 'string',
		default: '',
		description: 'Name der Customer Group - Can be chosen freely',
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
];
