# Analytics decision and honest measurement

Status: **not configured / no events emitted**. No authorised Plausible or GA4 property, provider dashboard, or Search Console session is exposed in the current tool connections. Cloudflare account access also requires authentication. There is no invented provider ID, nonfunctional network emitter or custom first-party collection endpoint.

The current site loads no analytics script, sets no analytics cookie, and makes no requests with demo input. Browser tests inspect the network while entering a sentinel search value. Normal hosting request processing/logs may include request metadata; this is disclosed in Guides. No blanket PDPA compliance claim is made.

## Intended taxonomy

| Event                          | Actual trigger once a provider is configured                                  | Allowed properties                                  |
| ------------------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------- |
| portfolio_cta_click            | A real ISMAIL destination click                                               | static source page, component ID, destination group |
| whatsapp_outbound_click        | Opening the verified WhatsApp link                                            | static source page, destination group               |
| product_demo_start             | First meaningful local interaction                                            | product ID, static page                             |
| product_demo_complete          | Approved workflow completion, opened relevant source, or all periods explored | product ID, defined milestone                       |
| product_comparison_interaction | Change of the guided choice                                                   | enumerated selection code                           |
| article_to_portfolio_click     | Article outbound link to ISMAIL                                               | static article slug, component ID                   |
| contact_path_selected          | Choice of fictional demo or real creator destination                          | demo/ismail enum                                    |

Data attributes are integration locations, **not collection proof**. Never include search strings, document content, message drafts, names, email, phone, arbitrary query strings or full user-entered URLs.

## Activation gate

Prefer an already authorised Plausible subscription supporting custom goals. Cloudflare Web Analytics may provide aggregate visits/performance, but must not be called named CTA measurement. GA4 is a conditional no-additional-subscription alternative requiring a real property, documented data handling/retention, a consent strategy and exact CSP host allowlists.

Before activation: inspect the actual account, configure only the authorised property, document consent/withdrawal behaviour, default previews off, allow only the exact seven event names and fixed safe properties, and verify one real CTA plus one demo milestone in the provider debug/realtime dashboard. Check keyboard/click deduplication and network payloads. Until that evidence exists, event collection remains incomplete. An outbound click is not a confirmed enquiry, WhatsApp opening is not a sent message, and a demo completion is not a business result.
