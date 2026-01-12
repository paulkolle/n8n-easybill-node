import type {
	GenericValue,
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, sleep } from 'n8n-workflow';
import { customerOperations } from './Customers/CustomerOperations';
import { customerFields } from './Customers/CustomerFields';
import { documentFields } from './Documents/DocumentsFields';
import { documentOperations } from './Documents/DocumentsOperations';
import { hints } from './Hints';
import { customerGroupOperations } from './CustomerGroup/CustomerGroupOperations';
import { customerGroupFields } from './CustomerGroup/CustomerGroupFields';
import { discountOperations } from './Discount/DiscountOperations';
import { discountFields } from './Discount/DiscountFields';
import { sepaPaymentOperations } from './SEPAPayment/SEPAPaymentOperations';
import { sepaPaymentFields } from './SEPAPayment/SEPAPaymentFields';
import { easyBillApiRequest } from './GenericFunctions';
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
		// eslint-disable-next-line @n8n/community-nodes/icon-validation,n8n-nodes-base/node-class-description-icon-not-svg
		icon: 'file:../../icons/easybill.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Kommuniziert mit der EasyBill API für Kunden',
		defaults: {
			name: 'EasyBill',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'easyBillApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.easybill.de/rest/v1',
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
					{ name: 'Customer', value: 'customer' },
					{ name: 'Customer Group', value: 'customerGroup' },
					{ name: 'Discount', value: 'discount' },
					{ name: 'Document', value: 'document' },
					{ name: 'SEPA Payment', value: 'sepaPayment' },

					// Weitere Ressourcen können hier ergänzt werden.
				],
				default: 'document',
			},

			...documentOperations,
			...documentFields,
			...customerOperations,
			...customerFields,
			...customerGroupOperations,
			...customerGroupFields,
			...discountOperations,
			...discountFields,
			...sepaPaymentOperations,
			...sepaPaymentFields,

			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add option',
				default: {},
				options: [
					{
						displayName: 'Batching',
						name: 'batching',
						placeholder: 'Add Batching',
						type: 'fixedCollection',
						typeOptions: {
							multipleValues: false,
						},
						default: {
							batch: {},
						},
						options: [
							{
								displayName: 'Batching',
								name: 'batch',
								values: [
									{
										displayName: 'Items per Batch',
										name: 'batchSize',
										type: 'number',
										typeOptions: {
											minValue: -1,
										},
										default: 50,
										description:
											'Input will be split in batches to throttle requests. -1 for disabled. 0 will be treated as 1.',
									},
									{
										// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
										displayName: 'Batch Interval (ms)',
										name: 'batchInterval',
										type: 'number',
										typeOptions: {
											minValue: 0,
										},
										default: 1000,
										description:
											'Time (in milliseconds) between each batch of requests. 0 for disabled.',
									},
								],
							},
						],
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// const baseUrl = 'https://webhook.site/7a3a6e3b-d001-4686-8f80-7c7fac939015'
		// Eingabedaten aus vorherigen Nodes
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			const { batching } = this.getNodeParameter('options', i, {}) as {
				batching: { batch: { batchSize: number; batchInterval: number } };
			};

			// defaults batch size to 1 of it's set to 0
			const batchSize = batching?.batch?.batchSize > 0 ? batching?.batch?.batchSize : 1;
			const batchInterval = batching?.batch.batchInterval;

			if (i > 0 && batchSize >= 0 && batchInterval > 0) {
				if (i % batchSize === 0) {
					await sleep(batchInterval);
				}
			}

			/* -------------------------------------------------------------------------- */
			/*                                 Document                                   */
			/* -------------------------------------------------------------------------- */
			if (resource === 'document') {
				/* ╔═══════════════════╗ */
				/* ║  CREATE DOCUMENT  ║ */
				/* ╚═══════════════════╝ */
				if (operation === 'createDocument') {
					// Retrieve parameters (which might be undefined or empty)
					const customer_id = this.getNodeParameter('customer_id', i) as number | undefined;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const itemsFixedCol = this.getNodeParameter('itemsFixedCol', i) as IDataObject;

					// Dynamically build the data object
					const data: IDataObject = {};

					if (customer_id !== undefined) {
						data.customer_id = customer_id;
					}

					if (itemsFixedCol && Object.keys(itemsFixedCol).length > 0) {
						data.itemsFixedCol = itemsFixedCol;
					}

					if (additionalFields && Object.keys(additionalFields).length > 0) {
						Object.assign(data, additionalFields);
					}

					// If file_format_config_type is provided, convert it to file_format_config
					if (data.file_format_config_type !== undefined && data.file_format_config_type !== '') {
						data.file_format_config = [
							{
								type: data.file_format_config_type,
							},
						];
						delete data.file_format_config_type;
					}

					// If fixedcol_recurring_options is defined and contains recurring_option,
					// convert it to recurring_options
					if (
						data.fixedcol_recurring_options &&
						typeof data.fixedcol_recurring_options === 'object' &&
						'recurring_option' in data.fixedcol_recurring_options &&
						data.fixedcol_recurring_options.recurring_option
					) {
						data.recurring_options = data.fixedcol_recurring_options.recurring_option;
						delete data.fixedcol_recurring_options;
					}

					// Alternatively: If recurring_options is defined but empty, remove it.
					if (
						data.recurring_options &&
						typeof data.recurring_options === 'object' &&
						Object.keys(data.recurring_options).length === 0
					) {
						delete data.recurring_options;
					}

					// If itemsFixedCol exists and contains the field itemsValues, transform it
					if (data.itemsFixedCol && typeof data.itemsFixedCol === 'object') {
						// Assert that itemsFixedCol is of type IDataObject so we can access 'itemsValues'
						const itemsFixedColObj = data.itemsFixedCol as IDataObject;
						if (
							'itemsValues' in itemsFixedColObj &&
							itemsFixedColObj.itemsValues != null &&
							Array.isArray(itemsFixedColObj.itemsValues)
						) {
							// Map over itemsValues to flatten the structure if nested under "test"
							data.items = (itemsFixedColObj.itemsValues as IDataObject[]).map(
								(item: IDataObject) => (item.item ? item.item : item),
							);
							delete data.itemsFixedCol;
						}
					}

					// Create the HTTP request options
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'POST',
						body: data,
						url: '/documents',
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═══════════════════╗ */
				/* ║  UPDATE DOCUMENT  ║ */
				/* ╚═══════════════════╝ */
				if (operation === 'updateDocument') {
					// Hole die Parameter (können auch undefined oder leer sein)
					const documentId = this.getNodeParameter('document_id', i) as number | undefined;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const itemsFixedCol = this.getNodeParameter('itemsFixedCol', i) as IDataObject;

					const refresh_customer_data = this.getNodeParameter('refresh_customer_data', i) as
						| boolean
						| undefined;
					const reason_for_change = this.getNodeParameter('reason_for_change', i) as
						| string
						| undefined;

					// Baue das Datenobjekt dynamisch auf (ohne documentId)
					const data: IDataObject = {};

					if (itemsFixedCol && Object.keys(itemsFixedCol).length > 0) {
						data.itemsFixedCol = itemsFixedCol;
					}

					if (additionalFields && Object.keys(additionalFields).length > 0) {
						Object.assign(data, additionalFields);
					}

					// Falls file_format_config_type angegeben ist, in file_format_config umwandeln
					if (data.file_format_config_type !== undefined && data.file_format_config_type !== '') {
						data.file_format_config = [
							{
								type: data.file_format_config_type,
							},
						];
						// Entferne das ursprüngliche Feld, damit es nicht doppelt übermittelt wird
						delete data.file_format_config_type;
					}

					// Falls fixedcol_recurring_options definiert ist und darin recurring_option existiert,
					// in recurring_options umwandeln
					if (
						data.fixedcol_recurring_options &&
						typeof data.fixedcol_recurring_options === 'object' &&
						'recurring_option' in data.fixedcol_recurring_options &&
						data.fixedcol_recurring_options.recurring_option
					) {
						data.recurring_options = data.fixedcol_recurring_options.recurring_option;
						delete data.fixedcol_recurring_options;
					}

					// If itemsFixedCol exists and contains the field itemsValues, transform it
					if (data.itemsFixedCol && typeof data.itemsFixedCol === 'object') {
						// Assert that itemsFixedCol is of type IDataObject so we can access 'itemsValues'
						const itemsFixedColObj = data.itemsFixedCol as IDataObject;
						if (
							'itemsValues' in itemsFixedColObj &&
							itemsFixedColObj.itemsValues != null &&
							Array.isArray(itemsFixedColObj.itemsValues)
						) {
							// Map over itemsValues to flatten the structure if nested under "test"
							data.items = (itemsFixedColObj.itemsValues as IDataObject[]).map(
								(item: IDataObject) => (item.item ? item.item : item),
							);
							delete data.itemsFixedCol;
						}
					}

					// Baue das qs-Objekt dynamisch auf
					const qs: IDataObject = {};
					if (refresh_customer_data !== undefined) {
						qs.refresh_customer_data = refresh_customer_data;
					}
					if (reason_for_change !== undefined && reason_for_change !== '') {
						qs.reason_for_change = reason_for_change;
					}

					// Erstelle die HTTP-Request-Optionen, documentId als Teil des Pfads
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'PUT',
						body: data,
						url: `/documents/${documentId}`,
						json: true,
						qs,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═════════════════════╗ */
				/* ║  GET DOCUMENT LIST  ║ */
				/* ╚═════════════════════╝ */
				if (operation === 'getDocList') {
					// Hole die Parameter; bei optionalen Parametern wird undefined zurückgegeben, falls nicht gesetzt
					const limit = this.getNodeParameter('limit', i) as number | undefined;
					const page = this.getNodeParameter('page', i) as number | undefined;
					const additionalFields = this.getNodeParameter('body', i) as IDataObject;

					// Baue das qs-Objekt dynamisch auf
					const qs: IDataObject = {};

					if (limit !== undefined && limit !== null) {
						qs.limit = limit;
					}
					if (page !== undefined && page !== null) {
						qs.page = page;
					}
					if (additionalFields && Object.keys(additionalFields).length > 0) {
						Object.assign(qs, additionalFields);
					}

					// Erstelle die HTTP-Request-Optionen für die GET-Anfrage
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/documents`,
						json: true,
						qs,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔════════════════╗ */
				/* ║  GET DOCUMENT  ║ */
				/* ╚════════════════╝ */
				if (operation === 'getDocument') {
					// Hole den Pflichtparameter document_id
					const documentId = this.getNodeParameter('document_id', i) as number;

					// Erstelle die HTTP-Request-Optionen mit documentId als Pfadparameter
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/documents/${documentId}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═══════════════════╗ */
				/* ║  DELETE DOCUMENT  ║ */
				/* ╚═══════════════════╝ */
				if (operation === 'deleteDocument') {
					// Hole den Pflichtparameter document_id
					const documentId = this.getNodeParameter('document_id', i) as number;

					// Erstelle die HTTP-Request-Optionen mit documentId als Pfadparameter
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'DELETE',
						url: `/documents/${documentId}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═════════════════════╗ */
				/* ║  COMPLETE DOCUMENT  ║ */
				/* ╚═════════════════════╝ */
				if (operation === 'completeDocument') {
					// Hole den Pflichtparameter document_id
					const documentId = this.getNodeParameter('document_id', i) as number;
					// Hole den optionalen Parameter reason_for_change
					const reason_for_change = this.getNodeParameter('reason_for_change', i) as
						| string
						| undefined;

					// Baue das qs-Objekt dynamisch auf
					const qs: IDataObject = {};
					if (reason_for_change !== undefined && reason_for_change !== '') {
						qs.reason_for_change = reason_for_change;
					}

					// Erstelle die HTTP-Request-Optionen mit documentId im Pfad und qs
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'PUT',
						url: `/documents/${documentId}/done`,
						json: true,
						qs,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═══════════════════╗ */
				/* ║  CANCEL DOCUMENT  ║ */
				/* ╚═══════════════════╝ */
				if (operation === 'cancelDocument') {
					// Hole den Pflichtparameter document_id
					const documentId = this.getNodeParameter('document_id', i) as number;
					// Hole den optionalen Parameter use_text_from_template
					const use_text_from_template = this.getNodeParameter('use_text_from_template', i) as
						| boolean
						| undefined;

					// Baue das qs-Objekt dynamisch auf
					const qs: IDataObject = {};
					if (use_text_from_template !== undefined) {
						qs.use_text_from_template = use_text_from_template;
					}

					// Erstelle die HTTP-Request-Optionen mit documentId im Pfad und qs
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'POST',
						url: `/documents/${documentId}/cancel`,
						json: true,
						qs,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═════════════════╗ */
				/* ║  SEND DOCUMENT  ║ */
				/* ╚═════════════════╝ */
				if (operation === 'sendDocument') {
					// Hole den Pflichtparameter document_id
					const documentId = this.getNodeParameter('document_id', i) as number;
					// Hole den Pflichtparameter type
					const type = this.getNodeParameter('type', i) as string;
					// Hole optional den Parameter additionalFieldsSend als JSON-Body
					const additionalFieldsSend = this.getNodeParameter(
						'additionalFieldsSend',
						i,
					) as IDataObject;

					// Erstelle das Datenobjekt dynamisch, falls additionalFieldsSend vorhanden ist
					const body: IDataObject = {};
					if (additionalFieldsSend && Object.keys(additionalFieldsSend).length > 0) {
						Object.assign(body, additionalFieldsSend);
					}

					// Erstelle die HTTP-Request-Optionen mit documentId und type als Pfadparameter
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'POST',
						url: `/documents/${documentId}/send/${type}`,
						json: true,
						body,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔══════════════════════╗ */
				/* ║  FETCH DOCUMENT PDF  ║ */
				/* ╚══════════════════════╝ */
				if (operation === 'getPdf') {
					// Hole den Pflichtparameter document_id
					const documentId = this.getNodeParameter('document_id', i) as number;

					// Erstelle die HTTP-Request-Optionen mit documentId als Pfadparameter
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/documents/${documentId}/pdf`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔══════════════════════════╗ */
				/* ║  DOWNLOAD DOCUMENT JPEG  ║ */
				/* ╚══════════════════════════╝ */
				if (operation === 'downloadJpeg') {
					// Hole den Pflichtparameter document_id
					const documentId = this.getNodeParameter('document_id', i) as number;
					// Hole die optionalen Parameter offset und limit
					const offset = this.getNodeParameter('offset', i) as number | undefined;
					const limit = this.getNodeParameter('limit', i) as number | undefined;

					// Baue das qs-Objekt dynamisch auf
					const qs: IDataObject = {};
					if (offset !== undefined) {
						qs.offset = offset;
					}
					if (limit !== undefined) {
						qs.limit = limit;
					}

					// Erstelle die HTTP-Request-Optionen mit documentId als Pfadparameter und qs
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/documents/${documentId}/jpg`,
						json: true,
						qs,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔════════════════════╗ */
				/* ║  CONVERT DOCUMENT  ║ */
				/* ╚════════════════════╝ */
				if (operation === 'convertDocument') {
					// Hole die Pflichtparameter document_id und type
					const documentId = this.getNodeParameter('document_id', i) as number;
					const type = this.getNodeParameter('type', i) as string;

					// Hole additionalFieldsDocs, um optional pdf_template zu extrahieren
					const additionalFieldsDocs = this.getNodeParameter(
						'additionalFieldsDocs',
						i,
					) as IDataObject;

					// Baue das qs-Objekt dynamisch auf
					const qs: IDataObject = {};
					if (
						additionalFieldsDocs &&
						additionalFieldsDocs.pdf_template !== undefined &&
						additionalFieldsDocs.pdf_template !== ''
					) {
						qs.pdf_template = additionalFieldsDocs.pdf_template;
					}

					// Erstelle die HTTP-Request-Optionen mit documentId und type als Pfadparameter
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'POST',
						url: `/documents/${documentId}/${type}`,
						json: true,
						qs,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
			}
			/* -------------------------------------------------------------------------- */
			/*                                 Customer                                   */
			/* -------------------------------------------------------------------------- */
			if (resource === 'customer') {
				/* ╔═══════════════════╗ */
				/* ║  CREATE CUSTOMER  ║ */
				/* ╚═══════════════════╝ */
				if (operation === 'createCustomer') {
					// Hole die Pflichtparameter last_name und company_name
					const last_name = this.getNodeParameter('last_name', i) as string;
					const company_name = this.getNodeParameter('company_name', i) as string;
					// Hole den optionalen Parameter type für den Query-String
					const type = this.getNodeParameter('type', i) as string | undefined;
					// Hole optional weitere Felder aus additionalFields
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					// Baue das Datenobjekt für den Request-Body auf
					const data: IDataObject = {
						last_name,
						company_name,
					};

					if (additionalFields && Object.keys(additionalFields).length > 0) {
						Object.assign(data, additionalFields);
					}

					// Baue das qs-Objekt dynamisch auf
					const qs: IDataObject = {};
					if (type !== undefined && type !== '') {
						qs.type = type;
					}

					// Erstelle die HTTP-Request-Optionen, verwende ${baseUrl} als Basis-URL
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'POST',
						url: `/customers`,
						json: true,
						qs,
						body: data,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═══════════════════╗ */
				/* ║  DELETE CUSTOMER  ║ */
				/* ╚═══════════════════╝ */
				if (operation === 'deleteCustomer') {
					// Hole den Pflichtparameter customer_id
					const customerId = this.getNodeParameter('customer_id', i) as number;

					// Erstelle die HTTP-Request-Optionen mit customerId als Pfadparameter
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'DELETE',
						url: `/customers/${customerId}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔════════════════╗ */
				/* ║  GET CUSTOMER  ║ */
				/* ╚════════════════╝ */
				if (operation === 'getCustomer') {
					// Hole den Pflichtparameter customer_id
					const customerId = this.getNodeParameter('customer_id', i) as number;

					// Erstelle die HTTP-Request-Optionen mit customerId als Pfadparameter
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/customers/${customerId}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═════════════════════╗ */
				/* ║  GET CUSTOMER LIST  ║ */
				/* ╚═════════════════════╝ */
				if (operation === 'getCustomerList') {
					// Hole optional additionalFields als Query-Parameter
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					// Baue das qs-Objekt dynamisch auf
					const qs: IDataObject = {};

					if (additionalFields && Object.keys(additionalFields).length > 0) {
						Object.assign(qs, additionalFields);
					}

					// Erstelle die HTTP-Request-Optionen für die GET-Anfrage
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/customers`,
						qs,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═══════════════════╗ */
				/* ║  UPDATE CUSTOMER  ║ */
				/* ╚═══════════════════╝ */
				if (operation === 'updateCustomer') {
					// Hole den Pflichtparameter customer_id
					const customerId = this.getNodeParameter('customer_id', i) as number;
					// Hole den optionalen Parameter type für den Query-String
					const type = this.getNodeParameter('type', i) as string | undefined;
					// Hole optional weitere Felder aus additionalFields
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					// Erstelle das Datenobjekt für den Request-Body
					const data: IDataObject = {};

					if (additionalFields && Object.keys(additionalFields).length > 0) {
						Object.assign(data, additionalFields);
					}

					// Baue das qs-Objekt dynamisch auf
					const qs: IDataObject = {};

					if (type !== undefined && type !== '') {
						qs.type = type;
					}

					// Erstelle die HTTP-Request-Optionen mit customerId als Pfadparameter
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'PUT',
						url: `/customers/${customerId}`,
						qs,
						json: true,
						body: data,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
			}
			/* -------------------------------------------------------------------------- */
			/*                              Customer Group                                */
			/* -------------------------------------------------------------------------- */
			if (resource === 'customerGroup') {
				/* ╔═══════════════════════════╗ */
				/* ║  GET CUSTOMER GROUP LIST  ║ */
				/* ╚═══════════════════════════╝ */
				if (operation === 'getCustomerGroups') {
					// Optionale zusätzliche Query-Parameter
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					const qs: IDataObject = {};

					if (additionalFields && Object.keys(additionalFields).length > 0) {
						Object.assign(qs, additionalFields);
					}

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/customer-groups`,
						json: true,
						qs,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═════════════════════════╗ */
				/* ║  CREATE CUSTOMER GROUP  ║ */
				/* ╚═════════════════════════╝ */
				if (operation === 'createCustomerGroup') {
					// Hole die Pflichtparameter und optionale Felder
					const name = this.getNodeParameter('name', i) as string;
					const number = this.getNodeParameter('number', i) as number;
					const description = this.getNodeParameter('description', i) as string | undefined;

					const data: IDataObject = { name, number };

					if (description !== undefined && description !== '') {
						data.description = description;
					}

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'POST',
						body: data,
						url: `/customer-groups`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔══════════════════════╗ */
				/* ║  GET CUSTOMER GROUP  ║ */
				/* ╚══════════════════════╝ */
				if (operation === 'getCustomerGroup') {
					const groupId = this.getNodeParameter('group_id', i) as number;

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/customer-groups/${groupId}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═════════════════════════╗ */
				/* ║  UPDATE CUSTOMER GROUP  ║ */
				/* ╚═════════════════════════╝ */
				if (operation === 'updateCustomerGroup') {
					const groupId = this.getNodeParameter('group_id', i) as number;
					const name = this.getNodeParameter('name', i) as string | undefined;
					const description = this.getNodeParameter('description', i) as string | undefined;
					const number = this.getNodeParameter('number', i) as number;

					const data: IDataObject = {};

					if (name !== undefined && name !== '') {
						data.name = name;
					}
					if (description !== undefined && description !== '') {
						data.description = description;
					}
					if (number !== undefined) {
						data.number = number;
					}

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'PUT',
						body: data,
						url: `/customer-groups/${groupId}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═════════════════════════╗ */
				/* ║  DELETE CUSTOMER GROUP  ║ */
				/* ╚═════════════════════════╝ */
				if (operation === 'deleteCustomerGroup') {
					const groupId = this.getNodeParameter('group_id', i) as number;

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'DELETE',
						url: `/customer-groups/${groupId}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
			}
			/* -------------------------------------------------------------------------- */
			/*                                  Discount                                */
			/* -------------------------------------------------------------------------- */
			if (resource === 'discount') {
				/* ╔══════════════════════════════╗ */
				/* ║  GET POSITION DISCOUNT LIST  ║ */
				/* ╚══════════════════════════════╝ */
				if (operation === 'getDiscountsPosition') {
					// Optionale zusätzliche Query-Parameter
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					const qs: IDataObject = {};

					if (additionalFields && Object.keys(additionalFields).length > 0) {
						Object.assign(qs, additionalFields);
					}

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/discounts/position`,
						json: true,
						qs,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔════════════════════════════╗ */
				/* ║  CREATE POSITION DISCOUNT  ║ */
				/* ╚════════════════════════════╝ */
				if (operation === 'createDiscountPosition') {
					// Pflichtparameter und optionale Felder
					const position_id = this.getNodeParameter('position_id', i) as number;
					const customer_id = this.getNodeParameter('customer_id', i) as string;
					const discount = this.getNodeParameter('discount', i) as number | undefined;
					const discount_type = this.getNodeParameter('discount_type', i) as string | undefined;

					const data: IDataObject = { position_id, customer_id };

					if (discount !== undefined) {
						data.discount = discount;
					}
					if (discount_type !== undefined && discount_type !== '') {
						data.discount_type = discount_type;
					}

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'POST',
						body: data,
						url: `/discounts/position`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═════════════════════════╗ */
				/* ║  GET POSITION DISCOUNT  ║ */
				/* ╚═════════════════════════╝ */
				if (operation === 'getDiscountPosition') {
					const discountId = this.getNodeParameter('discount_id', i) as number;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					const qs: IDataObject = {};

					if (additionalFields && Object.keys(additionalFields).length > 0) {
						Object.assign(qs, additionalFields);
					}

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/discounts/position/${discountId}`,
						json: true,
						qs,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔════════════════════════════╗ */
				/* ║  UPDATE POSITION DISCOUNT  ║ */
				/* ╚════════════════════════════╝ */
				if (operation === 'updateDiscountPosition') {
					// Pflichtparameter und optionale Felder
					const discountId = this.getNodeParameter('discount_id', i) as number;
					const position_id = this.getNodeParameter('position_id', i) as number | undefined;
					const customer_id = this.getNodeParameter('customer_id', i) as string | undefined;
					const discount = this.getNodeParameter('discount', i) as number | undefined;
					const discount_type = this.getNodeParameter('discount_type', i) as string | undefined;

					const data: IDataObject = { position_id, customer_id };

					if (discount !== undefined) {
						data.discount = discount;
					}
					if (discount_type !== undefined && discount_type !== '') {
						data.discount_type = discount_type;
					}
					if (position_id !== undefined) {
						data.position_id = position_id;
					}
					if (customer_id !== undefined) {
						data.customer_id = customer_id;
					}

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'PUT',
						body: data,
						url: `/discounts/position/${discountId}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔════════════════════════════╗ */
				/* ║  DELETE POSITION DISCOUNT  ║ */
				/* ╚════════════════════════════╝ */
				if (operation === 'deleteDiscountPosition') {
					const discountId = this.getNodeParameter('discount_id', i) as number;

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'DELETE',
						url: `/discounts/position/${discountId}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔════════════════════════════════════╗ */
				/* ║  GET POSITION GROUP DISCOUNT LIST  ║ */
				/* ╚════════════════════════════════════╝ */
				if (operation === 'getDiscountsPositionGroup') {
					// Optionale zusätzliche Query-Parameter
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};
					if (additionalFields && Object.keys(additionalFields).length > 0) {
						Object.assign(qs, additionalFields);
					}
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/discounts/position-group`,
						json: true,
						qs,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔══════════════════════════════════╗ */
				/* ║  CREATE POSITION GROUP DISCOUNT  ║ */
				/* ╚══════════════════════════════════╝ */
				if (operation === 'createDiscountPositionGroup') {
					// Pflichtparameter und optionale Felder
					const position_id = this.getNodeParameter('position_id', i) as number;
					const customer_id = this.getNodeParameter('customer_id', i) as string;
					const discount = this.getNodeParameter('discount', i) as number | undefined;
					const discount_type = this.getNodeParameter('discount_type', i) as string | undefined;

					const data: IDataObject = { position_id, customer_id };

					if (discount !== undefined) {
						data.discount = discount;
					}
					if (discount_type !== undefined && discount_type !== '') {
						data.discount_type = discount_type;
					}

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'POST',
						body: data,
						url: `/discounts/position-group`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═══════════════════════════════╗ */
				/* ║  GET POSITION GROUP DISCOUNT  ║ */
				/* ╚═══════════════════════════════╝ */
				if (operation === 'getDiscountPositionGroup') {
					const discountId = this.getNodeParameter('discount_id', i) as number;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					const qs: IDataObject = {};

					if (additionalFields && Object.keys(additionalFields).length > 0) {
						Object.assign(qs, additionalFields);
					}

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/discounts/position-group/${discountId}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔══════════════════════════════════╗ */
				/* ║  UPDATE POSITION GROUP DISCOUNT  ║ */
				/* ╚══════════════════════════════════╝ */
				if (operation === 'updateDiscountPositionGroup') {
					// Pflichtparameter und optionale Felder
					const discountId = this.getNodeParameter('discount_id', i) as number;
					const position_id = this.getNodeParameter('position_id', i) as number | undefined;
					const customer_id = this.getNodeParameter('customer_id', i) as string | undefined;
					const discount = this.getNodeParameter('discount', i) as number | undefined;
					const discount_type = this.getNodeParameter('discount_type', i) as string | undefined;

					const data: IDataObject = { position_id, customer_id };

					if (discount !== undefined) {
						data.discount = discount;
					}
					if (discount_type !== undefined && discount_type !== '') {
						data.discount_type = discount_type;
					}
					if (position_id !== undefined) {
						data.position_id = position_id;
					}
					if (customer_id !== undefined) {
						data.customer_id = customer_id;
					}

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'PUT',
						body: data,
						url: `/discounts/position-group/${discountId}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔══════════════════════════════════╗ */
				/* ║  DELETE POSITION GROUP DISCOUNT  ║ */
				/* ╚══════════════════════════════════╝ */
				if (operation === 'deleteDiscountPositionGroup') {
					const discountId = this.getNodeParameter('discount_id', i) as number;

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'DELETE',
						url: `/discounts/position-group/${discountId}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
			}
			/* -------------------------------------------------------------------------- */
			/*                            Document Payment                              */
			/* -------------------------------------------------------------------------- */
			if (resource === 'documentPayment') {
				/* ╔═════════════════════════════╗ */
				/* ║  GET DOCUMENT PAYMENT LIST  ║ */
				/* ╚═════════════════════════════╝ */
				if (operation === 'getDocumentPayments') {
					// Hole optionale Parameter: limit, page und weitere Query-Parameter
					const limit = this.getNodeParameter('limit', i) as number | undefined;
					const page = this.getNodeParameter('page', i) as number | undefined;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					if (limit !== undefined) {
						qs.limit = limit;
					}
					if (page !== undefined) {
						qs.page = page;
					}
					if (additionalFields && Object.keys(additionalFields).length > 0) {
						Object.assign(qs, additionalFields);
					}

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/document-payments`,
						json: true,
						qs,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═══════════════════════════╗ */
				/* ║  CREATE DOCUMENT PAYMENT  ║ */
				/* ╚═══════════════════════════╝ */
				if (operation === 'createDocumentPayment') {
					// Retrieve required fields
					const amount = this.getNodeParameter('amount', i) as number;
					const documentId = this.getNodeParameter('documentId', i) as number;

					// Build the JSON body with required fields only
					const body: IDataObject = {
						amount,
						document_id: documentId,
					};

					// Retrieve optional query parameter "paid"
					const paid = this.getNodeParameter('paid', i) as boolean | undefined;
					const qs: IDataObject = {};
					if (paid !== undefined) {
						qs.paid = paid;
					}

					// Merge additional fields into qs using Object.assign if they exist
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					if (additionalFields && Object.keys(additionalFields).length > 0) {
						Object.assign(qs, additionalFields);
					}

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'POST',
						url: `/document-payments`,
						json: true,
						body,
						qs,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔════════════════════════╗ */
				/* ║  GET DOCUMENT PAYMENT  ║ */
				/* ╚════════════════════════╝ */
				if (operation === 'getDocumentPayment') {
					// Hole den Pflichtparameter document_payment_id
					const id = this.getNodeParameter('document_payment_id', i) as number;

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/document-payments/${id}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}

				/* ╔═══════════════════════════╗ */
				/* ║  DELETE DOCUMENT PAYMENT  ║ */
				/* ╚═══════════════════════════╝ */
				if (operation === 'deleteDocumentPayment') {
					// Hole den Pflichtparameter document_payment_id
					const id = this.getNodeParameter('document_payment_id', i) as number;

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'DELETE',
						url: `/document-payments/${id}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
			}
			/* -------------------------------------------------------------------------- */
			/*                              SEPA Payment                                */
			/* -------------------------------------------------------------------------- */
			if (resource === 'sepaPayment') {
				const toDateString = (value?: string) => (value ? value.split('T')[0] : undefined);
				const mapSepaAdditionalFields = (fields: IDataObject) => {
					const payload: IDataObject = {};
					const mapping: Record<string, string> = {
						creditorBic: 'creditor_bic',
						creditorIban: 'creditor_iban',
						creditorName: 'creditor_name',
						debitorBic: 'debitor_bic',
						debitorAddressLine1: 'debitor_address_line_1',
						debitorAddressLine2: 'debitor_address_line2',
						debitorCountry: 'debitor_country',
						remittanceInformation: 'remittance_information',
						type: 'type',
					};

					for (const [key, value] of Object.entries(fields)) {
						if (value === '' || value === undefined || value === null) {
							continue;
						}

						if (key === 'exportAt') {
							payload.export_at = value;
							continue;
						}

						if (key === 'requestedAt') {
							const dateValue = toDateString(value as string);
							if (dateValue) {
								payload.requested_at = dateValue;
							}
							continue;
						}

						const mappedKey = mapping[key];
						if (mappedKey) {
							payload[mappedKey] = value;
						}
					}

					return payload;
				};

				/* ╔══════════════════════════╗ */
				/* ║  GET SEPA PAYMENTS LIST  ║ */
				/* ╚══════════════════════════╝ */
				if (operation === 'getSepaPayments') {
					const limit = this.getNodeParameter('limit', i) as number | undefined;
					const page = this.getNodeParameter('page', i) as number | undefined;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					if (limit !== undefined) {
						qs.limit = limit;
					}
					if (page !== undefined) {
						qs.page = page;
					}
					if (additionalFields && Object.keys(additionalFields).length > 0) {
						Object.assign(qs, additionalFields);
					}

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/sepa-payments`,
						json: true,
						qs,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔════════════════════════╗ */
				/* ║  CREATE SEPA PAYMENT   ║ */
				/* ╚════════════════════════╝ */
				if (operation === 'createSepaPayment') {
					const documentId = this.getNodeParameter('documentId', i) as number;
					const debitorName = this.getNodeParameter('debitorName', i) as string;
					const debitorIban = this.getNodeParameter('debitorIban', i) as string;
					const mandateId = this.getNodeParameter('mandateId', i) as string;
					const mandateDateOfSignature = this.getNodeParameter(
						'mandateDateOfSignature',
						i,
					) as string;
					const localInstrument = this.getNodeParameter('localInstrument', i) as string;
					const sequenceType = this.getNodeParameter('sequenceType', i) as string;
					const amount = this.getNodeParameter('amount', i) as number;
					const reference = this.getNodeParameter('reference', i) as string;
					const requestedAt = this.getNodeParameter('requestedAt', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
					const mandateDate = toDateString(mandateDateOfSignature) ?? mandateDateOfSignature;
					const requestedDate = toDateString(requestedAt) ?? requestedAt;

					const body: IDataObject = {
						document_id: documentId,
						debitor_name: debitorName,
						debitor_iban: debitorIban,
						mandate_id: mandateId,
						mandate_date_of_signature: mandateDate,
						local_instrument: localInstrument,
						sequence_type: sequenceType,
						amount,
						reference,
						requested_at: requestedDate,
					};

					Object.assign(body, mapSepaAdditionalFields(additionalFields));

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'POST',
						url: `/sepa-payments`,
						json: true,
						body,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔═══════════════════════╗ */
				/* ║  GET SEPA PAYMENT     ║ */
				/* ╚═══════════════════════╝ */
				if (operation === 'getSepaPayment') {
					const id = this.getNodeParameter('sepaPaymentId', i) as number;

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						url: `/sepa-payments/${id}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔════════════════════════╗ */
				/* ║  UPDATE SEPA PAYMENT   ║ */
				/* ╚════════════════════════╝ */
				if (operation === 'updateSepaPayment') {
					const id = this.getNodeParameter('sepaPaymentId', i) as number;
					const documentId = this.getNodeParameter('documentId', i) as number;
					const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

					const body: IDataObject = {
						document_id: documentId,
					};

					const addFieldIfProvided = (
						fieldName: string,
						targetName: string,
						transform?: (
							value: unknown,
						) => IDataObject | IDataObject[] | GenericValue | GenericValue[],
					) => {
						if (!Object.prototype.hasOwnProperty.call(updateFields, fieldName)) {
							return;
						}
						const value = updateFields[fieldName];
						if (value === undefined || value === null || value === '' || value === '__KEEP__') {
							return;
						}
						body[targetName] = transform ? transform(value) : value;
					};

					addFieldIfProvided('debitorName', 'debitor_name');
					addFieldIfProvided('debitorIban', 'debitor_iban');
					addFieldIfProvided('mandateId', 'mandate_id');
					addFieldIfProvided(
						'mandateDateOfSignature',
						'mandate_date_of_signature',
						(value: unknown) => {
							const dateValue = toDateString(value as string);
							return dateValue ?? (value as string);
						},
					);
					addFieldIfProvided('localInstrument', 'local_instrument');
					addFieldIfProvided('sequenceType', 'sequence_type');
					addFieldIfProvided('amount', 'amount');
					addFieldIfProvided('reference', 'reference');
					addFieldIfProvided('requestedAt', 'requested_at', (value: unknown) => {
						const dateValue = toDateString(value as string);
						return dateValue ?? (value as string);
					});

					Object.assign(body, mapSepaAdditionalFields(additionalFields));

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'PUT',
						url: `/sepa-payments/${id}`,
						json: true,
						body,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
				/* ╔════════════════════════╗ */
				/* ║  DELETE SEPA PAYMENT   ║ */
				/* ╚════════════════════════╝ */
				if (operation === 'deleteSepaPayment') {
					const id = this.getNodeParameter('sepaPaymentId', i) as number;

					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
						},
						method: 'DELETE',
						url: `/sepa-payments/${id}`,
						json: true,
					};

					responseData = await easyBillApiRequest.call(this, options);
					returnData.push(responseData);
				}
			}
		}
		// Rückgabe des Ergebnisses im n8n-Format
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return [this.helpers.returnJsonArray(returnData as any[])];
	}
}
