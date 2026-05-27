![Repo Image](icons/easybill.png)

# n8n-nodes-easybill

This is an n8n community node. It lets you use the Easybill API in your n8n workflows.

Easybill is a service for managing invoices and billing. This node is a work in progress – it's not completely finished yet.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

1. Go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-easybill` in **Enter npm package name**.
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes: select
   **I understand the risks of installing unverified code from a public source**.
5. Select **Install**.

## Operations

It supports these operations:

- Create, delete, get, list and update customer groups
- Create, delete, get, list and update customers
- Create, delete, get, list and update position dicounts
- Create, delete, get, list and update position group dicounts
- Create, delete, get, list and update document payments
- Create, delete, get, list and update documents
- Cancel, complete, convert, create, delete, download, get, list, send and update documents
- Create, delete, get, list and update SEPA payments

## Credentials

You can get your Easybill API key under **Settings > API Key** once you have logged in.

## Compatibility

Tested against n8n version 1.0+.

## Usage

This section is pretty bare-bones for now.

- Add the node in your workflow.
- Configure your Easybill credentials.
- Use it to create or update invoices.

For now, consider this a quick and dirty solution until I polish everything up.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Easybill API Documentation](https://www.easybill.de/) (link may be updated later)
