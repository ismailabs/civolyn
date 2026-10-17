---
layout: ../../layouts/ArticleLayout.astro
title: 'A website redesign checklist for Malaysian SMEs'
description: 'Clarify the business goal, check mobile usability, preserve useful URLs and test the actual release.'
category: 'Website experience'
---

Redesigning a website can mean changing almost everything—or improving only the parts preventing visitors from taking a useful action. Before choosing a new colour palette or asking for animation, decide what the site must help customers do.

For a café, that might mean finding a menu quickly. For a service business, it might mean understanding services and sending an enquiry. For a professional portfolio, it might mean seeing credible examples and choosing whether to contact the creator. A redesign is successful when the experience better supports its intended visitors, not simply when the homepage looks more expensive.

## Start with a short business brief

Write down the primary audience, the main visitor question, the action you want them to take and the evidence that would help them feel comfortable. Identify which pages currently receive visits and where people struggle, if any trustworthy analytics or feedback exists. If you have no data, be explicit: your starting point is a hypothesis, not a proven diagnosis.

Try answering these questions in one paragraph: Who visits? What are they trying to decide? What information do they need? What would make contacting the business easy? A developer can turn those answers into page structure and design priorities.

## Check mobile before desktop polish

A narrow phone viewport exposes issues that large desktop mockups can hide. Navigation may cover the content. Headlines may wrap into many lines. Product tables may run off-screen. A call-to-action button can fall below a long decorative hero. Open the current site on an actual phone if possible, and test a representative small viewport in a browser.

Look at readable text size, finger-friendly touch targets, clear visible focus for keyboard users and layout behaviour when text is enlarged. A good mobile design is not just the desktop page reduced in scale. Content order matters: the primary question and answer should appear before supplementary decoration.

## Confirm search-engine access and page meaning

The site needs sensible titles, descriptions, meaningful heading hierarchy, useful text in rendered HTML and correct links. A technical SEO audit also checks canonical URLs, redirects, `robots.txt`, page-level `noindex`, real HTTP status codes and a consistent XML sitemap. Search engines cannot reliably evaluate content that is blocked or missing, and a polished appearance cannot compensate for broken discovery signals.

Google's current guidance explains the role of canonical signals and recommends helpful people-first information. A sitemap can assist discovery, but none of these changes guarantees a search ranking. Use Search Console to see what search engines report **if the business actually has access and data**. Official reading: [Google helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) and [Canonicalisation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## Make contact paths unmistakable

Each important page should help visitors understand the next step. Use specific labels such as "See service details", "View the menu" or "Discuss a website project". Avoid a generic "Submit" when users cannot tell what happens next. Confirm real email, WhatsApp, booking or enquiry destinations actually work. A simulated form must say that it is simulated; pretending a message was sent damages trust.

For the person running the business, decide what counts as a **contact**, not merely a click. Opening WhatsApp is a possible first step, but it does not confirm that a message was sent. Similarly, a website enquiry has not become revenue until commercial work is actually agreed and paid.

## Preserve what already works

A redesign can accidentally remove a high-value page, delete an old URL, or break a form. Inventory existing pages and important functionality before replacing them. Use 301 redirects when a page moves to a relevant new location, and test old bookmarked links after launch. Keep products, prices, service descriptions or other protected content accurate unless explicitly authorised to change them.

If your site has a booking demo, filterable menu or product illustration, confirm keyboard use, empty states, no-JavaScript fallbacks and realistic validation rather than judging only by screenshots.

## Test the actual release

Run a production build, scan internal links, navigate every important route, test on multiple viewport widths, verify accessible controls, inspect console errors, and review core pages against the approved design. Recheck SEO directives and HTTPS at the real production hostname, not just the staging preview.

Record **what was measured**. Lighthouse provides useful lab observations; field Core Web Vitals require actual visitor data. A good lab score is not evidence of a higher sales conversion rate. After publication, monitor meaningful behaviour and continue improving specific friction points.

## A practical priority list

Start with broken routes, missing business information, confusing mobile navigation and failed contact actions. Next resolve architecture, useful content, readability, accessibility and speed. Finally refine motion, imagery and small visual details. This order keeps the website commercially functional while improving its perceived quality.

PROWORKS is itself a fictional [interface-design concept](/experience/) that demonstrates how a premium web experience can be structured. If you are assessing a professional website for your real Malaysian business, [ISMAIL](https://ismailstudio.my/) is the separate genuine web-development portfolio and enquiry destination.
