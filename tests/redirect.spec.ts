import { test, expect } from '@playwright/test';
import { legacyRedirect } from '../worker/legacy-redirect';
import contracts from '../src/data/page-design-contract.json' with { type: 'json' };
test('legacy handler maps every old route, slash form and HTML bookmark directly', () => {
  for (const p of contracts) {
    const variants =
      p.old === '/'
        ? ['/', '/index.html']
        : [
            p.old,
            p.old.slice(0, -1),
            p.old + 'index.html',
            p.old.slice(0, -1) + '.html',
          ];
    for (const variant of variants) {
      const response = legacyRedirect(
        new Request(
          'https://civolyn.ismailstudio.my' +
            variant +
            '?next=https://example.invalid/&private=discard',
        ),
      );
      expect(response.status).toBe(301);
      expect(response.headers.get('Location')).toBe(
        'https://proworks.ismailstudio.my' + p.new,
      );
    }
  }
  expect(
    legacyRedirect(new Request('https://civolyn.ismailstudio.my/missing/'))
      .status,
  ).toBe(404);
  expect(
    legacyRedirect(new Request('https://proworks.ismailstudio.my/')).status,
  ).toBe(421);
  expect(
    legacyRedirect(
      new Request('https://civolyn.ismailstudio.my/', { method: 'POST' }),
    ).status,
  ).toBe(405);
});
