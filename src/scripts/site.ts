const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('#primary-nav');
function closeMenu(restore = false) {
  menuButton?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('is-open');
  document
    .querySelectorAll<HTMLDetailsElement>('.nav-group')
    .forEach((d) => (d.open = false));
  if (restore) menuButton?.focus();
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav?.classList.toggle('is-open', open);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const dropdown =
      document.querySelector<HTMLDetailsElement>('.nav-group[open]');
    if (dropdown) {
      dropdown.open = false;
      dropdown.querySelector('summary')?.focus();
    } else if (menuButton?.getAttribute('aria-expanded') === 'true')
      closeMenu(true);
  }
});
document.addEventListener('click', (e) => {
  if (!(e.target instanceof Node)) return;
  if (!document.querySelector('.site-header')?.contains(e.target)) closeMenu();
  const dropdown =
    document.querySelector<HTMLDetailsElement>('.nav-group[open]');
  if (dropdown && !dropdown.contains(e.target)) dropdown.open = false;
});
nav?.addEventListener('focusout', () => {
  requestAnimationFrame(() => {
    if (!nav.contains(document.activeElement)) closeMenu();
  });
});
const desktopQuery = matchMedia('(min-width: 1000px)');
desktopQuery.addEventListener('change', () => closeMenu());

function openLinkedDisclosure() {
  let id: string;
  try {
    id = decodeURIComponent(location.hash.slice(1));
  } catch {
    return;
  }
  const target = document.getElementById(id);
  if (target instanceof HTMLDetailsElement) target.open = true;
}
openLinkedDisclosure();
window.addEventListener('hashchange', openLinkedDisclosure);

document.querySelectorAll<HTMLElement>('[data-flow]').forEach((root) => {
  let state = 0;
  const next = root.querySelector<HTMLButtonElement>('[data-flow-next]')!;
  const status = root.querySelector<HTMLElement>('[data-flow-status]')!;
  const labels = [
    'Start example',
    'Prepare sample summary',
    'Approve example',
    'Complete example',
    'Run again',
  ];
  const messages = [
    'Ready when you are. This example runs only in your browser.',
    'Step 1 complete. An illustrative brief is ready; prepare its sample summary next.',
    'Step 2 complete. Paused for human review. Read the proposed handover and approve when ready.',
    'Step 3 complete. You approved this illustrative handover. Complete the last step to finish.',
    'Example complete. Four steps recorded locally; no messages, projects or accounts were created.',
  ];
  function render() {
    root.querySelectorAll<HTMLElement>('[data-step]').forEach((step, index) => {
      step.classList.toggle('complete', index < state);
      step.classList.toggle('current', index === state);
      step.querySelector('.step-status')!.textContent =
        index < state
          ? 'Complete'
          : index === state
            ? state === 2
              ? 'Your review'
              : 'Ready'
            : 'Waiting';
    });
    next.textContent = labels[state] + ' →';
    status.textContent = messages[state];
  }
  next.addEventListener('click', () => {
    state = (state + 1) % 5;
    render();
  });
  root.querySelector('[data-flow-reset]')?.addEventListener('click', () => {
    state = 0;
    render();
  });
});

document.querySelectorAll<HTMLElement>('[data-knowledge]').forEach((root) => {
  const search = root.querySelector<HTMLInputElement>(
    '[data-knowledge-search]',
  )!;
  const radios = root.querySelectorAll<HTMLInputElement>('input[type=radio]');
  const docs = root.querySelectorAll<HTMLDetailsElement>('[data-document]');
  const update = () => {
    const query = search.value.trim().toLowerCase();
    const category =
      root.querySelector<HTMLInputElement>('input[type=radio]:checked')
        ?.value || 'All';
    let count = 0;
    docs.forEach((doc) => {
      const visible =
        (category === 'All' || doc.dataset.type === category) &&
        (doc.dataset.search || '').includes(query);
      doc.hidden = !visible;
      if (!visible) doc.open = false;
      if (visible) count++;
    });
    root.querySelector('[data-knowledge-count]')!.textContent =
      `${count} example document${count === 1 ? '' : 's'}`;
    (root.querySelector('[data-knowledge-empty]') as HTMLElement).hidden =
      count !== 0;
  };
  search.addEventListener('input', update);
  radios.forEach((r) => r.addEventListener('change', update));
  root
    .querySelector('[data-knowledge-reset]')
    ?.addEventListener('click', () => {
      search.value = '';
      radios[0].checked = true;
      update();
      search.focus();
    });
});

const signalData: Record<
  string,
  {
    labels: string[];
    values: number[];
    review: number;
    time: string;
    change: string;
    summary: string;
    insight: string;
    caption: string;
  }
> = {
  week: {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    values: [14, 22, 18, 26, 30, 9, 7],
    review: 12,
    time: '2.4 days',
    change: '18 more than the previous week',
    summary: 'Example daily workflow completions for one week.',
    insight:
      'Friday has the highest example volume. A higher count alone does not explain quality or team workload.',
    caption: 'this week',
  },
  month: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    values: [108, 119, 126, 137],
    review: 18,
    time: '2.7 days',
    change: '42 more than the previous month',
    summary: 'Example weekly workflow completions for one month.',
    insight:
      'The example volume rises across four weeks. Compare the workload and review queue before changing team capacity.',
    caption: 'this month',
  },
  quarter: {
    labels: ['Month 1', 'Month 2', 'Month 3'],
    values: [448, 472, 490],
    review: 24,
    time: '2.6 days',
    change: '64 more than the previous quarter',
    summary: 'Example monthly workflow completions for one quarter.',
    insight:
      'The final month has the highest example volume. These prepared values illustrate a trend; they are not business results.',
    caption: 'this quarter',
  },
};
document.querySelectorAll<HTMLElement>('[data-signal]').forEach((root) => {
  root
    .querySelector<HTMLSelectElement>('[data-signal-period]')
    ?.addEventListener('change', (e) => {
      const d = signalData[(e.target as HTMLSelectElement).value];
      root.querySelector('[data-signal-total]')!.textContent = d.values
        .reduce((a, b) => a + b, 0)
        .toLocaleString('en');
      root.querySelector('[data-signal-review]')!.textContent = String(
        d.review,
      );
      root.querySelector('[data-signal-time]')!.textContent = d.time;
      root.querySelector('[data-signal-change]')!.textContent = d.change;
      root.querySelector('[data-signal-summary]')!.textContent = d.summary;
      root.querySelector('[data-signal-insight]')!.textContent = d.insight;
      root.querySelector('[data-signal-caption]')!.textContent = d.caption;
      const bars = root.querySelector('[data-signal-bars]')!;
      const table = root.querySelector('[data-signal-table]')!;
      bars.replaceChildren();
      table.replaceChildren();
      d.labels.forEach((label, i) => {
        const bar = document.createElement('div');
        const value = document.createElement('b');
        value.textContent = String(d.values[i]);
        const shape = document.createElement('span');
        shape.style.height = `${(d.values[i] / Math.max(...d.values)) * 150}px`;
        const text = document.createElement('small');
        text.textContent =
          label.length > 6 && !label.includes(' ') ? label.slice(0, 3) : label;
        bar.append(value, shape, text);
        bars.append(bar);
        const row = document.createElement('tr');
        const th = document.createElement('th');
        th.scope = 'row';
        th.textContent = label;
        const td = document.createElement('td');
        td.textContent = String(d.values[i]);
        row.append(th, td);
        table.append(row);
      });
      root
        .querySelector('[data-signal-chart]')!
        .setAttribute(
          'aria-label',
          `Illustrative completions ${d.caption}: ${d.labels.map((l, i) => `${l} ${d.values[i]}`).join(', ')}. Full data in the table below.`,
        );
    });
});

document.querySelectorAll<HTMLElement>('[data-compare]').forEach((root) => {
  const descriptions: Record<
    string,
    { title: string; body: string; href: string; name: string }
  > = {
    process: {
      title: 'Start with Flow.',
      body: 'When the same request keeps crossing the same desks, make its steps explicit. Flow explores triggers, visible handovers and a human review before the work moves on.',
      href: '/products/flow/',
      name: 'Try the Flow preview',
    },
    context: {
      title: 'Start with Knowledge.',
      body: 'When the answer exists but nobody knows where, make the source easier to find. Knowledge explores local discovery, clear snippets and references you can inspect.',
      href: '/products/knowledge/',
      name: 'Search the example library',
    },
    insight: {
      title: 'Start with Signal.',
      body: 'When a report has numbers but no useful perspective, explore the pattern. Signal brings example periods, clear labels and an underlying data table into one view.',
      href: '/products/signal/',
      name: 'Explore the Signal dashboard',
    },
  };
  root.querySelectorAll<HTMLInputElement>('input').forEach((input) =>
    input.addEventListener('change', () => {
      const d = descriptions[input.value];
      root.querySelector('[data-compare-title]')!.textContent = d.title;
      root.querySelector('[data-compare-body]')!.textContent = d.body;
      const link = root.querySelector<HTMLAnchorElement>(
        '[data-compare-link]',
      )!;
      link.href = d.href;
      link.textContent = d.name + ' ↗';
    }),
  );
});

document
  .querySelectorAll<HTMLElement>('[data-preview-picker]')
  .forEach((root) => {
    const select = root.querySelector<HTMLSelectElement>('select')!;
    const link = root.querySelector<HTMLAnchorElement>('[data-preview-link]')!;
    select.addEventListener('change', () => {
      link.href = `/products/${select.value}/#preview`;
      link.textContent = `Open ${select.options[select.selectedIndex].text} preview ↗`;
    });
  });
const motion = matchMedia('(prefers-reduced-motion: reduce)');
if (!motion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  document.querySelectorAll('.reveal').forEach((el) => {
    el.classList.add('will-reveal');
    observer.observe(el);
  });
  motion.addEventListener('change', () => {
    if (motion.matches) {
      document
        .querySelectorAll('.will-reveal')
        .forEach((el) => el.classList.add('is-visible'));
      observer.disconnect();
    }
  });
}
