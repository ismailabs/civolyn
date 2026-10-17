export const articles = [
  {
    slug: 'mapping-a-repeatable-business-process',
    title: 'Mapping a repeatable business process',
    description:
      'A practical four-stage example for small teams, with owners, exit conditions and exception paths.',
    category: 'Operations',
    minutes: 6,
    art: ['01', '→', '02', '→', '03'],
  },
  {
    slug: 'website-redesign-checklist-for-malaysian-smes',
    title: 'A website redesign checklist for Malaysian SMEs',
    description:
      'Clarify the business goal, check mobile usability, preserve useful URLs and test the actual release.',
    category: 'Website experience',
    minutes: 7,
    art: ['Aa', '↗', '✓'],
  },
  {
    slug: 'choosing-useful-dashboard-metrics',
    title: 'Choosing dashboard metrics you can act on',
    description:
      'Define the decision, reconcile the figures and separate a useful observation from an unsupported conclusion.',
    category: 'Insights',
    minutes: 6,
    art: ['▂', '▅', '▃', '▇'],
  },
] as const;
