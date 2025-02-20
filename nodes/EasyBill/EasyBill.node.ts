import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import { customerOperations } from './Customers/CustomerOperations';
import { customerFields } from './Customers/CustomerFields';
import { documentFields } from './Documents/DocumentsFields';
import { documentOperations } from './Documents/DocumentsOperations';



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
        name: 'EasyBill',
        icon: 'file:easybill.png',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["customerOperation"] + ": Customer"}}',
        description: 'Kommuniziert mit der EasyBill API für Kunden',
        defaults: {
            name: 'EasyBill',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'EasyBillApi',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: 'https://api.easybill.de/rest/v1',
            //baseURL:'https://webhook-test.com/76208a0c872ce79441f063246ecf3c7a',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
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
                    // Weitere Ressourcen können hier ergänzt werden.
                ],
                default: 'customer',
            },
            ...customerOperations,
            
            ...documentOperations,
            ...documentFields,
            ...customerFields,
        ],
    };
}
