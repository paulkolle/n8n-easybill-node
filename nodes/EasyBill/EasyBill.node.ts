import { INodeType, INodeTypeDescription } from 'n8n-workflow';
// import { NodeConnectionType } from 'n8n-workflow';
import { customerOperations } from './Customers/CustomerOperations';
import { customerFields } from './Customers/CustomerFields';
import { documentFields } from './Documents/DocumentsFields';
import { documentOperations } from './Documents/DocumentsOperations';
import { hints } from './Hints';
import { customerGroupOperations } from './CustomerGroup/CustomerGroupOperations';
import { customerGroupFields } from './CustomerGroup/CustomerGroupFields';



/**
 * HAUPTEINSTIEG: EasyBill Node
 *
 * Diese Klasse implementiert INodeType und kombiniert alle Felder und Operationen,
 * die für den Kundenbereich definiert wurden. Für mehr Übersichtlichkeit können weitere
 * Ressourcengruppen (wie Dokumente oder Lager) in eigenen Dateien organisiert werden.
 *
 * In diesem Beispiel konzentrieren wir uns nur auf den "customer"-Bereich.
 */
export class EasyBill implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'EasyBill',
        name: 'easyBill',
        //@ts-no-check
        icon: 'file:easybill.png',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["customerOperation"] + ": Customer"}}',
        description: 'Kommuniziert mit der EasyBill API für Kunden',
        defaults: {
            name: 'EasyBill',
        },
        // inputs: [NodeConnectionType.Main],
        // outputs: [NodeConnectionType.Main],
        //@ts-ignore
        inputs: ['main'],
        //@ts-ignore
        outputs: ['main'],
        credentials: [
            {
                name: 'easyBillApi',
                required: true,
            },
        ],
        requestDefaults: {
            // baseURL: 'https://api.easybill.de/rest/v1',
            baseURL: 'https://webhook.site/a51c3921-8a81-4fcb-8834-805a12bf8f8f',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        hints: [...hints],
        // Nur der Kundenbereich wird hier integriert.
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    { name: 'Customer', value: 'customer', },
                    { name: 'Document', value: 'document', },
                    { name: 'Customer Group', value: 'customerGroup', },

                    // Weitere Ressourcen können hier ergänzt werden.
                ],
                default: 'customer',
            },
            ...customerOperations,
            ...documentOperations,
            ...documentFields,
            ...customerFields,
            ...customerGroupOperations,
            ...customerGroupFields

        ],
    };
}
