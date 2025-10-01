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
//BACKUP
// export const customerOperations: INodeProperties[] = [
//     {
//         displayName: 'Operation',
//         name: 'operation',
//         type: 'options',
//         noDataExpression: true,
//         displayOptions: {
//             show: { resource: ['customer'] },
//         },
//         options: [
//             {
//                 name: 'Create',
//                 value: 'createCustomer',
//                 action: 'Create customer',
//                 description: 'Legt einen neuen Kunden an',
//                 routing: {
//                     request: {
//                         method: 'POST',
//                         url: '/customers',
//                     },
//                 },
//             },
//             {
//                 name: 'Delete Customer',
//                 value: 'deleteCustomer',
//                 action: 'Delete customer',
//                 description: 'Delete a customer',
//             },
//             {
//                 name: 'Get Customer',
//                 value: 'getCustomer',
//                 action: 'Get customer',
//                 description: 'Get a customer',
//             },
//             {
//                 name: 'Get List',
//                 value: 'getCustomerList',
//                 action: 'Fetch customers list',
//                 description: 'Ruft die Liste der Kunden ab',
//                 routing: {
//                     request: {
//                         method: 'GET',
//                         url: '/customers',
//                     },
//                 },
//             },

//             {
//                 name: 'Update Customer',
//                 value: 'updateCustomer',
//                 action: 'Update customer',
//                 description: 'Update a customer',
//             },

//             // Weitere Operationen wie Get (einzelner Kunde), Update und Delete können hier ergänzt werden.
//         ],
//         default: 'getCustomerList',
//     },
// ];

export const customerOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: { resource: ['customer'] },
        },
        options: [
            {
                name: 'Create Customer',
                value: 'createCustomer',
                action: 'Create customer',
                description: 'Creates a new customer',
            },
            {
                name: 'Delete Customer',
                value: 'deleteCustomer',
                action: 'Delete customer',
                description: 'Deletes a customer',
            },
            {
                name: 'Get Customer',
                value: 'getCustomer',
                action: 'Get customer',
                description: 'Retrieves a customer',
            },
            {
                name: 'Get Customer List',
                value: 'getCustomerList',
                action: 'Fetch customers list',
                description: 'Fetches the list of customers',
            },
            {
                name: 'Update Customer',
                value: 'updateCustomer',
                action: 'Update customer',
                description: 'Updates a customer',
            },
        ],
        default: 'getCustomerList',
    },
];
