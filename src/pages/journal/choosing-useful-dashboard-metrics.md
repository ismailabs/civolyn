---
layout: ../../layouts/ArticleLayout.astro
title: 'Choosing dashboard metrics you can act on'
description: 'Define the decision, reconcile the figures and separate a useful observation from an unsupported conclusion.'
category: 'Insights'
---

A dashboard should help a person answer a question and take an appropriate action. If it fills a screen with numbers but never changes a decision, the design may be producing activity rather than clarity.

Small businesses often benefit from a few carefully defined indicators before they need a complex analytics platform. Start by identifying which work you want to see more clearly: enquiries, project completion, delayed approvals, customer follow-up or stock replenishment. Each category has different data and privacy implications.

## 1. Begin with the decision

Instead of starting with "What can we chart?", ask "What choice will we make after seeing this report?" A team reviewing outstanding enquiries may want to know whether someone needs a follow-up today. A project lead may need to identify a bottleneck. A website owner may want to see which pages produce real enquiries rather than clicks with no further action.

Turn that decision into one or two metrics. An example for workflow coordination is the count of tasks completed over a week and the count awaiting human review. If both are increasing, the team may need to examine its approval process. That is a useful question, but the numbers alone do not prove the cause.

## 2. Define every metric

A metric needs a definition before it needs a colour. "Completed work" could mean finished tasks, accepted outcomes or delivered projects. Document the exact rule and the relevant time window. If a task reopened today was marked complete yesterday, decide how the report counts it.

| Example metric            | Illustrative definition                                      | Important caveat                          |
| ------------------------- | ------------------------------------------------------------ | ----------------------------------------- |
| Completed workflows       | Work items reaching a completed state within selected period | Not equivalent to customer satisfaction   |
| Awaiting review           | Items presently blocked at an approval stage                 | Not automatically a failure               |
| Completion duration       | Time from accepted start to final hand-off                   | Median vs average needs deliberate choice |
| Portfolio outbound clicks | Clicks to a real portfolio destination                       | Not confirmed enquiries or revenue        |

Keep related terms consistent across headings, chart labels, tooltips and tables. If a metric changes meaning on another page, a reader may draw the wrong conclusion even when the arithmetic is correct.

## 3. Make time comparisons fair

Week, month and quarter filters should update all related numbers together. Compare equivalent date ranges rather than a full month against a partial week without explanation. Display the selected period and make it clear whether data are snapshots or completed events. A chart may look persuasive while hiding missing days; include descriptions of gaps instead of silently filling them with zeros.

## 4. Build charts that can be checked

Charts should have readable axes, values and legends. Colour should not be the only indication of status. Provide a semantic HTML table showing the underlying figures so keyboard and assistive-technology users can inspect the same information. In a good dashboard, the headline total equals the sum of values plotted for that period, apart from documented rounding or differing definitions.

The fictional [PROWORKS Insights demonstration](/products/insights/) uses these principles. Its sample periods and figures are local fixtures; no real analytics provider or customer account supplies the charts. Treat the numbers as an interface-design example, not a case study of achieved business performance.

## 5. Separate operational reporting from website conversion

Business-process indicators and website marketing measures answer different questions. A product-demo completion means someone reached an illustrative interaction milestone. An outbound click to ISMAIL means the user opened a real portfolio destination. Only a separately confirmed conversation is an enquiry, and only a verified transaction is revenue.

Avoid adding personal details to event properties simply because analytics tools allow arbitrary values. A small set of carefully named, privacy-conscious events can be more useful than collecting every keystroke.

## 6. Make each report actionable

Place the likely next action near a metric when it makes sense, such as "Review outstanding tasks" or "Check the definition of completion". Allow the user to move from a summary to the relevant detail without overwhelming them with everything at once. If a product is only a local demonstration, make that limitation visible where actions occur.

A clear dashboard is partly data engineering and partly interface design: the calculations, controls, labels, spacing and accessibility must agree. If your real business website needs a more useful way to communicate services or measure visitor journeys, explore the genuine [ISMAIL web-development portfolio](https://ismailstudio.my/).

## Sources and further reading

The [W3C tables tutorial](https://www.w3.org/WAI/tutorials/tables/) explains how table headers preserve relationships for assistive technology. The counts and definitions used above are original illustrative examples; they do not describe a customer deployment.
