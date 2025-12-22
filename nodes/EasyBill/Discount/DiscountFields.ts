import { INodeProperties } from 'n8n-workflow';

export const discountFields: INodeProperties[] = [
	/* ╔═══════════════╗ */
	/* ║  DISCOUNT ID  ║ */
	/* ╚═══════════════╝ */
	{
		displayName: 'Discount ID',
		name: 'discount_id',
		type: 'number',
		default: '',
		description: 'Die ID des Positionsrabatts',
		required: true,
		displayOptions: {
			show: {
				resource: ['discount'],
				operation: [
					'getDiscountPosition',
					'updateDiscountPosition',
					'deleteDiscountPosition',
					'getDiscountPositionGroup',
					'updateDiscountPositionGroup',
					'deleteDiscountPositionGroup',
				],
			},
		},
	},
	/* ╔════════════════════════════════════════════════╗ */
	/* ║  GET POSITION / POSITION GROUPS DISCOUNT LIST  ║ */
	/* ╚════════════════════════════════════════════════╝ */
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		description: 'Zusätzliche Query-Parameter für Positionsrabatte',
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
				description: 'Seitenzahl',
			},
			{
				displayName: 'Customer ID',
				name: 'customer_id',
				type: 'string',
				default: '',
				description: 'Seitenzahl',
			},
		],
		displayOptions: {
			show: {
				resource: ['discount'],
				operation: ['getDiscountsPosition', 'getDiscountsPositionGroup'],
			},
		},
	},
	/* ╔═════════════════════════════════════════════╗ */
	/* ║  CREATE POSITION / POSITION GROUP DISCOUNT  ║ */
	/* ╚═════════════════════════════════════════════╝ */
	{
		displayName: 'Customer ID',
		name: 'customer_id',
		type: 'number',
		default: 0,
		description: 'The identifier of the customer',
		required: true,
		displayOptions: {
			show: {
				resource: ['discount'],
				operation: ['createDiscountPosition', 'createDiscountPositionGroup'],
			},
		},
	},
	{
		displayName: 'Discount Value',
		name: 'discount',
		type: 'number',
		default: 0,
		description: 'The discount value for the position',
		displayOptions: {
			show: {
				resource: ['discount'],
				operation: ['createDiscountPosition', 'createDiscountPositionGroup'],
			},
		},
	},
	{
		displayName: 'Discount Type',
		name: 'discount_type',
		type: 'options',
		default: 'PERCENT',
		description:
			'AMOUNT subtracts the value in "discount" from the total, QUANTITY subtracts the value in "discount" multiplied by quantity, PERCENT uses the value in "discount" as a percentage ,FIX sets the value in "discount" as the new price',
		options: [
			{
				name: 'Amount',
				value: 'AMOUNT',
			},
			{
				name: 'Quantity',
				value: 'QUANTITY',
			},
			{
				name: 'Percent',
				value: 'PERCENT',
			},
			{
				name: 'Fix',
				value: 'FIX',
			},
		],
		displayOptions: {
			show: {
				resource: ['discount'],
				operation: ['createDiscountPosition', 'createDiscountPositionGroup'],
			},
		},
	},
	{
		displayName: 'Position ID',
		name: 'position_id',
		type: 'number',
		default: 0,
		description: 'The identifier for the position',
		required: true,
		displayOptions: {
			show: {
				resource: ['discount'],
				operation: ['createDiscountPosition', 'createDiscountPositionGroup'],
			},
		},
	},
	/* ╔═════════════════════════════════════════════╗ */
	/* ║  UPDATE DISCOUNT / DISCOUNT GROUP POSITION  ║ */
	/* ╚═════════════════════════════════════════════╝ */
	{
		displayName: 'Customer ID',
		name: 'customer_id',
		type: 'number',
		default: 0,
		description: 'The identifier of the customer',
		displayOptions: {
			show: {
				resource: ['discount'],
				operation: ['updateDiscountPosition', 'updateDiscountPositionGroup'],
			},
		},
	},
	{
		displayName: 'Discount Value',
		name: 'discount',
		type: 'number',
		default: 0,
		description: 'The discount value for the position',
		displayOptions: {
			show: {
				resource: ['discount'],
				operation: ['updateDiscountPosition', 'updateDiscountPositionGroup'],
			},
		},
	},
	{
		displayName: 'Discount Type',
		name: 'discount_type',
		type: 'options',
		default: 'PERCENT',
		description:
			'AMOUNT subtracts the value in "discount" from the total, QUANTITY subtracts the value in "discount" multiplied by quantity, PERCENT uses the value in "discount" as a percentage ,FIX sets the value in "discount" as the new price',
		options: [
			{
				name: 'Amount',
				value: 'AMOUNT',
			},
			{
				name: 'Quantity',
				value: 'QUANTITY',
			},
			{
				name: 'Percent',
				value: 'PERCENT',
			},
			{
				name: 'Fix',
				value: 'FIX',
			},
		],
		displayOptions: {
			show: {
				resource: ['discount'],
				operation: ['updateDiscountPosition', 'updateDiscountPositionGroup'],
			},
		},
	},
	{
		displayName: 'Position ID',
		name: 'position_id',
		type: 'number',
		default: 0,
		description: 'The identifier for the position',
		displayOptions: {
			show: {
				resource: ['discount'],
				operation: ['updateDiscountPosition', 'updateDiscountPositionGroup'],
			},
		},
	},
	/* ╔══════════════════════════════════════════╗ */
	/* ║  GET DISCOUNT / DISCOUNT GROUP POSITION  ║ */
	/* ╚══════════════════════════════════════════╝ */
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		description: 'Zusätzliche Query-Parameter für Positionsrabatte',
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
				description: 'Seitenzahl',
			},
		],
		displayOptions: {
			show: {
				resource: ['discount'],
				operation: ['getDiscountPosition', 'getDiscountPositionGroup'],
			},
		},
	},
];
