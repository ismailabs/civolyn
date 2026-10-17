import contracts from './page-design-contract.json';
import fixtures from './demo-fixtures.json';
export const portfolio = 'https://www.ismailstudio.my/';
// Verified in the public ISMAIL portfolio on 17 October 2026. Opening it sends no message.
export const whatsapp = 'https://wa.me/601163265610';
export const pages = contracts.map((p) => ({
  ...p,
  path: p.new,
  intro: p.description,
  description: p.description + ' A fictional ISMAIL portfolio concept.',
  title: `${p.head.join(' ')} — ${p.label}`,
}));
export const products = [
  {
    id: 'workflows',
    name: 'Workflows',
    symbol: '↗',
    description:
      'Give recurring requests a visible path, a responsible owner and an explicit human approval.',
    link: '/products/workflows/',
    detail: 'For work that needs a next step.',
  },
  {
    id: 'knowledge',
    name: 'Knowledge',
    symbol: '⌕',
    description:
      'Find a useful document, read its source and understand the context before acting.',
    link: '/products/knowledge/',
    detail: 'For answers that need a source.',
  },
  {
    id: 'insights',
    name: 'Insights',
    symbol: '▥',
    description:
      'Explore clearly defined sample metrics, change the period and check the underlying figures.',
    link: '/products/insights/',
    detail: 'For numbers that need perspective.',
  },
] as const;
export const documents = fixtures.documents.map((d) => ({
  ...d,
  type: d.category,
  text: d.excerpt,
}));
export const insightData = fixtures.insights;
export const stages = [
  {
    name: 'Intake',
    owner: 'Enquiry coordinator',
    description: 'Confirm the sample request and its intended outcome.',
  },
  {
    name: 'Prepare',
    owner: 'Project lead',
    description: 'Gather the brief, scope and first milestone.',
  },
  {
    name: 'Human review',
    owner: 'Approver',
    description:
      'Read the proposed hand-off. An explicit decision is required.',
  },
  {
    name: 'Hand-off',
    owner: 'Delivery owner',
    description: 'Make the accepted decision and next step visible.',
  },
];
export const faqs = [
  {
    id: 'fictional',
    q: 'Is PROWORKS a real software company?',
    a: 'PROWORKS is a fictional portfolio concept created by ISMAIL. There are no subscriptions, customer accounts or live automation services. The website and its local interactive demonstrations are real frontend work.',
  },
  {
    id: 'local',
    q: 'What happens when I try a demo?',
    a: 'The example runs in this browser with prepared fictional data. It does not create a project, send a message, upload a document or contact an AI service. Reloading the page starts fresh.',
  },
  {
    id: 'approval',
    q: 'Why does the workflow stop for approval?',
    a: 'The human review is a deliberate decision point. Read the sample hand-off and choose Approve example before you can complete the final step. This approval affects only the local demonstration.',
  },
  {
    id: 'search',
    q: 'What can I search in Knowledge?',
    a: 'Six original sample documents across Guides, Projects and Policies. Search matches titles, categories and excerpts. Open a result to inspect the fictional source reference. There is no connected company library.',
  },
  {
    id: 'metrics',
    q: 'Where do the Insights numbers come from?',
    a: 'Prepared local fixtures supply each period. Completed workflows is the sum of the bars and table rows. Awaiting review and median days are separate illustrative snapshot values, not calculations from the completion counts.',
  },
  {
    id: 'keyboard',
    q: 'Can I use the examples with a keyboard?',
    a: 'Use Tab to move between controls, Enter or Space to activate buttons and disclosures, and arrow keys for radio groups and the period selector. Escape closes navigation disclosures and returns focus.',
  },
  {
    id: 'privacy',
    q: 'Are my demo searches collected?',
    a: 'No. Search terms stay in your browser and are never included in analytics. No analytics provider is currently configured. Normal hosting request logs may still be processed by Cloudflare. Do not enter private information in examples.',
  },
  {
    id: 'help',
    q: 'How do I discuss a real website project?',
    a: 'Visit the separate ISMAIL portfolio using the labelled external links. ISMAIL is the real creator and website enquiry destination. PROWORKS has no fictional sales desk or contact submission form.',
  },
];
