export const portfolio = 'https://www.ismailstudio.my/';
// Verified in the public portfolio HTML on 16 October 2026. No message is sent by this site.
export const whatsapp = 'https://wa.me/601163265610';
export const pages = [
  {
    path: '/',
    label: 'Home',
    title: 'Make room for better work',
    description:
      'Explore CIVOLYN, a fictional AI workspace bringing workflow automation, shared knowledge and operational insights together. An ISMAIL portfolio concept.',
  },
  {
    path: '/platform/',
    label: 'Platform',
    title: 'One workspace. A clearer way forward',
    description:
      'Discover how Flow, Knowledge and Signal connect in the CIVOLYN fictional workspace, from a first request to an informed next step.',
  },
  {
    path: '/products/flow/',
    label: 'Flow',
    title: 'Let the busywork move itself',
    description:
      'Try a local workflow preview with visible steps, human review and a clear activity history. CIVOLYN Flow is a fictional product concept.',
  },
  {
    path: '/products/knowledge/',
    label: 'Knowledge',
    title: 'Find clarity in everything your team knows',
    description:
      'Search illustrative documents and explore source-aware answers in CIVOLYN Knowledge, a fictional connected knowledge product.',
  },
  {
    path: '/products/signal/',
    label: 'Signal',
    title: 'Turn information into direction',
    description:
      'Explore an interactive dashboard with example operational data, period filters and accessible reporting. CIVOLYN Signal is a fictional concept.',
  },
  {
    path: '/technology/',
    label: 'Technology',
    title: 'Intelligence with a visible process',
    description:
      'Explore the conceptual architecture behind CIVOLYN: scoped information, clear orchestration, human oversight and traceable results.',
  },
  {
    path: '/design/',
    label: 'Design & Experience',
    title: 'Good software makes space',
    description:
      'Explore the human-centred design principles behind CIVOLYN, from readable interfaces to purposeful motion and informed control.',
  },
  {
    path: '/compare/',
    label: 'Compare products',
    title: 'Start with the work in front of you',
    description:
      'Compare the distinct roles of CIVOLYN Flow, Knowledge and Signal. Find a conceptual starting point for your team’s everyday work.',
  },
  {
    path: '/company/',
    label: 'Our story',
    title: 'A little less friction. A lot more possibility',
    description:
      'The fictional story and product philosophy of CIVOLYN, an original enterprise software website concept created for the ISMAIL portfolio.',
  },
  {
    path: '/journal/',
    label: 'Journal',
    title: 'Notes on a more thoughtful way to work',
    description:
      'Original essays on responsible automation, designing for human judgment and making operational information useful, from the CIVOLYN concept journal.',
  },
  {
    path: '/support/',
    label: 'Support & FAQs',
    title: 'A little clarity goes a long way',
    description:
      'Find answers about CIVOLYN’s fictional products, local interactive demonstrations, privacy boundaries and real ISMAIL website enquiries.',
  },
  {
    path: '/contact/',
    label: 'Explore a demo',
    title: 'See what better work could look like',
    description:
      'Choose a local CIVOLYN product preview or discuss a real website project with ISMAIL. No signup, data collection or fictional enquiry submission.',
  },
] as const;
export const products = [
  {
    id: 'flow',
    name: 'Flow',
    symbol: '↗',
    category: 'WORK, IN MOTION',
    tagline: 'Let the busywork move itself.',
    description:
      'Give recurring work a clear path. Connect the steps, keep people in control, and see what happens next.',
    link: '/products/flow/',
    color: 'cobalt',
  },
  {
    id: 'knowledge',
    name: 'Knowledge',
    symbol: '⌕',
    category: 'CONTEXT, CONNECTED',
    tagline: 'Your team knows more than it thinks.',
    description:
      'Bring scattered information into focus. Find a useful starting point, with the source close at hand.',
    link: '/products/knowledge/',
    color: 'sage',
  },
  {
    id: 'signal',
    name: 'Signal',
    symbol: '↗',
    category: 'INFORMATION, WITH DIRECTION',
    tagline: 'See the story behind the numbers.',
    description:
      'Read the rhythm of your operations. Explore a trend, understand the context, and choose your next move.',
    link: '/products/signal/',
    color: 'mist',
  },
] as const;
export const documents = [
  {
    title: 'A considered start: client onboarding',
    type: 'Guides',
    source: 'Operations handbook · § 2.1',
    text: 'Start with a short brief. Confirm the project owner, agree on the first milestone, and ask for human approval before sharing a proposed schedule.',
  },
  {
    title: 'Project intake: what makes a useful brief?',
    type: 'Projects',
    source: 'Project playbook · § 1.3',
    text: 'A useful brief explains the problem, the audience and the constraints. Separate essential outcomes from preferences. Record unanswered questions before assigning work.',
  },
  {
    title: 'Making weekly reviews useful',
    type: 'Guides',
    source: 'Team practices · § 4.2',
    text: 'Use the weekly review to discuss blockers and decisions. Read the activity summary beforehand. Finish by recording an owner and a next step for each open issue.',
  },
  {
    title: 'Human review and approval policy',
    type: 'Policies',
    source: 'Example governance notes · § 3.1',
    text: 'Anything shared outside the team needs an explicit reviewer. A suggested draft is not an approved decision. Keep the reason for a change alongside its history.',
  },
  {
    title: 'Quarterly planning: a working document',
    type: 'Projects',
    source: 'Planning collection · § 2.4',
    text: 'Choose fewer priorities and define how each will be assessed. Record assumptions, dependency owners and review dates. Revisit the plan when evidence changes.',
  },
  {
    title: 'Writing with care',
    type: 'Guides',
    source: 'Editorial principles · § 1.1',
    text: 'Write for someone who has five minutes between meetings. Lead with the point. Explain unfamiliar terms and link to the original reference when details matter.',
  },
];
export const faqs = [
  [
    'Is CIVOLYN a real software company?',
    'No. CIVOLYN is a fictional enterprise AI concept and an ISMAIL portfolio project. The website demonstrates original design and frontend engineering. There is no operating CIVOLYN business, paid subscription or production software service.',
  ],
  [
    'What do the three products do?',
    'Flow explores workflow automation with human approval. Knowledge explores finding and understanding shared information. Signal explores operational reporting. They are distinct concepts designed to work together, and each has a local interactive preview.',
  ],
  [
    'Do the previews use real AI?',
    'No. Every interaction runs in your browser using fixed illustrative data and deterministic logic. Search matches local example documents; workflow steps update local state; dashboard filters select prepared example datasets. No AI provider is contacted.',
  ],
  [
    'Where does my information go?',
    'The previews do not ask for personal details or send your search terms or selections to a server. There are no analytics, tracking cookies or accounts in this project. Refreshing a page resets the preview. Your hosting provider may process standard access logs when the site is eventually deployed.',
  ],
  [
    'Can I connect my business tools?',
    'No. References to sources, intake queues and reporting are illustrative. No integrations, file uploads or private business connections are implemented. Please use the supplied examples rather than entering private information.',
  ],
  [
    'Can I book a CIVOLYN demo or buy a subscription?',
    'There is no real CIVOLYN booking or purchasing service. Explore the product previews directly, without a signup. If the website itself interests you, ISMAIL is the separate, genuine destination for web development enquiries.',
  ],
  [
    'Can I use the demonstrations with a keyboard?',
    'Yes. Links, buttons, search, filters and disclosure controls use native keyboard behaviour. Flow provides text status updates, and Signal includes a data table. Motion follows your device’s reduced-motion preference.',
  ],
  [
    'How can I enquire about a website for my business?',
    'Visit the real ISMAIL portfolio or use the verified WhatsApp link on the contact page. Those destinations are separate from this fictional product experience. No message is sent automatically.',
  ],
] as const;
