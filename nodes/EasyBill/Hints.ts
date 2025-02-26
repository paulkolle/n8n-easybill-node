import { NodeHint } from "n8n-workflow"

// description: INodeTypeDescription = {
// 	...
// 	hints: [
// 		{
// 			// The hint message. You can use HTML.
// 			message: "This node has many input items. Consider enabling <b>Execute Once</b> in the node\'s settings.",
// 			// Choose from: info, warning, danger. The default is 'info'.
// 			// Changes the color. info (grey), warning (yellow), danger (red)
// 			type: 'info',
// 			// Choose from: inputPane, outputPane, ndv. By default n8n displays the hint in both the input and output panels.
// 			location: 'outputPane',
// 			// Choose from: always, beforeExecution, afterExecution. The default is 'always'
// 			whenToDisplay: 'beforeExecution',
// 			// Optional. An expression. If it resolves to true, n8n displays the message. Defaults to true.
// 			displayCondition: '={{ $parameter["operation"] === "select" && $input.all().length > 1 }}'
// 		}
// 	]
// 	...
// }

export const hints:NodeHint[] =  [
    {
        // Hinweistext mit HTML-Unterstützung
        message: "Currently, only one item can be sent per request. If you need to add multiple items to an invoice, consider using the <b>HTTP Request</b> node.",
        type: "warning",
        whenToDisplay: "always",
        displayCondition: '={{ $parameter["operation"] === "createDoc" || $parameter["operation"] === "updateDocument" }}'
    }
]