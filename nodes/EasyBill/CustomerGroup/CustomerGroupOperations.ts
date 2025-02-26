import { INodeProperties } from 'n8n-workflow';

/**
 * CUSTOMER ENDPOINTS
 *
 * Hier definieren wir alle Operationen, die sich auf Kunden beziehen.
 * Für den Moment sind nur die Endpunkte GET /customers (Liste abrufen) und POST /customers (Kunde anlegen) integriert.
 *
 * Hinweis: Wenn du später weitere Operationen (z. B. GET /customers/{id}, PUT /customers/{id}, DELETE /customers/{id}) hinzufügen möchtest,
 * kannst du diese hier ergänzen oder – für eine bessere Übersicht – in separate Dateien (z. B. CustomerOperations.ts) auslagern und importieren.
 */


export const customerGroupOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: { resource: ['customerGroup'] },
        },
        options: [
            {
                name: 'Create',
                value: 'createCustomerGroup',
                action: 'Create customer group',
                description: 'Creates a customer group',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/customer-groups',
                    },
                },
            },
            {
                name: 'Delete Customer Group',
                value: 'deleteCustomerGroup',
                action: 'Delete customer group',
                description: 'Delete a customer group',
            },
            {
                name: 'Get Customer Group',
                value: 'getCustomerGroup',
                action: 'Get customer group',
                description: 'Get a customer Group',
            },
            {
                name: 'Get Customer Group List',
                value: 'getCustomerGroupList',
                action: 'Fetch customer groups list',
                description: 'Fetch customer groups list',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/customer-groups',
                    },
                },
            },

            {
                name: 'Update Customer Group',
                value: 'updateCustomerGroup',
                action: 'Update customer group',
                description: 'Update a customer group',
            },
        ],
        default: 'getCustomerGroupList',
    },
];