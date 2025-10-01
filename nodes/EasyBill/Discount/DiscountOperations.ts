import { INodeProperties } from 'n8n-workflow';

export const discountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['discount'],
			},
		},
		options: [
			{
				name: 'Create Position Discount',
				value: 'createDiscountPosition',
				action: 'Create position discount',
				description: 'Legt einen neuen Positionsrabatt an',
			},
			{
				name: 'Create Position Group Discount',
				value: 'createDiscountPositionGroup',
				action: 'Create position group discount',
				description: 'Legt einen neuen Positionsgruppenrabatt an',
			},
			{
				name: 'Delete Position Discount',
				value: 'deleteDiscountPosition',
				action: 'Delete position discount',
				description: 'Löscht einen Positionsrabatt',
			},
			{
				name: 'Delete Position Group Discount',
				value: 'deleteDiscountPositionGroup',
				action: 'Delete position group discount',
				description: 'Löscht einen Positionsgruppenrabatt',
			},
			{
				name: 'Get Position Discount',
				value: 'getDiscountPosition',
				action: 'Fetch position discount',
				description: 'Ruft einen spezifischen Positionsrabatt ab',
			},
			{
				name: 'Get Position Discount List',
				value: 'getDiscountsPosition',
				action: 'Fetch list of position discounts',
				description: 'Ruft die Liste der Positionsrabatte ab',
			},
			{
				name: 'Get Position Group Discount',
				value: 'getDiscountPositionGroup',
				action: 'Fetch position group discount',
				description: 'Ruft einen spezifischen Positionsgruppenrabatt ab',
			},
			{
				name: 'Get Position Group Discount List',
				value: 'getDiscountsPositionGroup',
				action: 'Fetch list of position group discounts',
				description: 'Ruft die Liste der Positionsgruppenrabatte ab',
			},
			{
				name: 'Update Position Discount',
				value: 'updateDiscountPosition',
				action: 'Update position discount',
				description: 'Aktualisiert einen Positionsrabatt',
			},
			{
				name: 'Update Position Group Discount',
				value: 'updateDiscountPositionGroup',
				action: 'Update position group discount',
				description: 'Aktualisiert einen Positionsgruppenrabatt',
			},
		],

		default: 'getDiscountsPosition',
	},
];
