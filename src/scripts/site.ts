import fixtures from '../data/demo-fixtures.json';

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
  if (e.key !== 'Escape') return;
  const dropdown =
    document.querySelector<HTMLDetailsElement>('.nav-group[open]');
  if (dropdown) {
    dropdown.open = false;
    dropdown.querySelector('summary')?.focus();
  } else if (menuButton?.getAttribute('aria-expanded') === 'true')
    closeMenu(true);
});
document.addEventListener('click', (e) => {
  if (!(e.target instanceof Node)) return;
  if (!document.querySelector('.site-header')?.contains(e.target)) closeMenu();
  const dropdown =
    document.querySelector<HTMLDetailsElement>('.nav-group[open]');
  if (dropdown && !dropdown.contains(e.target)) dropdown.open = false;
});
nav?.addEventListener('focusout', () =>
  requestAnimationFrame(() => {
    if (!nav.contains(document.activeElement)) closeMenu();
  }),
);
matchMedia('(min-width:1000px)').addEventListener('change', () => closeMenu());
function openLinkedDisclosure() {
  try {
    const target = document.getElementById(
      decodeURIComponent(location.hash.slice(1)),
    );
    if (target instanceof HTMLDetailsElement) target.open = true;
  } catch {
    /* Malformed fragment has no disclosure target. */
  }
}
openLinkedDisclosure();
window.addEventListener('hashchange', openLinkedDisclosure);

document.querySelectorAll<HTMLElement>('[data-flow]').forEach((root) => {
  let state = 0,
    approved = false;
  const next = root.querySelector<HTMLButtonElement>('[data-flow-next]')!,
    approve = root.querySelector<HTMLButtonElement>('[data-flow-approve]')!,
    confirm = root.querySelector<HTMLInputElement>('[data-flow-confirm]')!,
    status = root.querySelector<HTMLElement>('[data-flow-status]')!,
    log = root.querySelector<HTMLOListElement>('[data-flow-log]')!;
  const messages = [
    'Ready when you are. This example runs only in your browser.',
    'Step 1 complete. Prepare the sample brief and assign an owner.',
    'Step 2 complete. Paused for human review. Read the proposal and confirm you have reviewed it.',
    'Step 3 complete. You approved this illustrative hand-off. Complete the final stage.',
    'Example complete. Four steps recorded locally; no messages, projects or accounts were created.',
  ];
  const labels = [
    'Start example →',
    'Prepare sample summary →',
    'Approval required',
    'Complete example →',
    'Run again →',
  ];
  const render = () => {
    root.dataset.state = String(state);
    root.querySelectorAll<HTMLElement>('[data-step]').forEach((step, i) => {
      step.classList.toggle('complete', i < state);
      step.classList.toggle('current', i === state);
      step.querySelector('.step-status')!.textContent =
        i < state
          ? 'Complete'
          : i === state
            ? state === 2
              ? 'Your review'
              : 'Ready'
            : 'Waiting';
    });
    next.textContent = labels[state];
    next.disabled = state === 2;
    next.hidden = state === 2;
    approve.hidden = state !== 2;
    approve.disabled = !confirm.checked || state !== 2;
    confirm.disabled = state !== 2;
    status.textContent = messages[state];
  };
  const record = (message: string) => {
    const li = document.createElement('li');
    li.textContent = message;
    log.append(li);
  };
  const reset = () => {
    state = 0;
    approved = false;
    confirm.checked = false;
    log.replaceChildren();
    record('Example ready. Intake is the current stage.');
    render();
    next.focus();
  };
  next.addEventListener('click', (e) => {
    if (e.detail > 1 || state === 2) return;
    if (state === 4) {
      reset();
      return;
    }
    if (state === 3 && !approved) return;
    state++;
    record(messages[state]);
    render();
    if (state === 2) confirm.focus();
    else next.focus();
  });
  confirm.addEventListener(
    'change',
    () => (approve.disabled = !confirm.checked || state !== 2),
  );
  approve.addEventListener('click', () => {
    if (state !== 2 || !confirm.checked) return;
    approved = true;
    state = 3;
    record('Human review: you explicitly approved the sample proposal.');
    render();
    next.focus();
  });
  root.querySelector('[data-flow-reset]')?.addEventListener('click', reset);
  render();
});

document.querySelectorAll<HTMLElement>('[data-knowledge]').forEach((root) => {
  const search = root.querySelector<HTMLInputElement>(
      '[data-knowledge-search]',
    )!,
    radios = root.querySelectorAll<HTMLInputElement>('input[type=radio]'),
    docs = root.querySelectorAll<HTMLDetailsElement>('[data-document]');
  const update = () => {
    const query = search.value.trim().toLowerCase(),
      category =
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
      count + ' example document' + (count === 1 ? '' : 's') + ' · ' + category;
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

document.querySelectorAll<HTMLElement>('[data-signal]').forEach((root) => {
  const select = root.querySelector<HTMLSelectElement>('[data-signal-period]')!;
  function render() {
    const period = select.value as keyof typeof fixtures.insights,
      d = fixtures.insights[period],
      total = d.completed.reduce((a, b) => a + b, 0),
      caption = 'this ' + period;
    root.querySelector('[data-signal-total]')!.textContent =
      total.toLocaleString('en-MY');
    root.querySelector('[data-signal-review]')!.textContent = String(
      d.pending_review,
    );
    root.querySelector('[data-signal-time]')!.textContent =
      d.median_days + ' days';
    root.querySelector('[data-signal-summary]')!.textContent =
      'Illustrative ' +
      { week: 'daily', month: 'weekly', quarter: 'monthly' }[period] +
      ' completions for ' +
      caption +
      '.';
    root.querySelector('[data-signal-insight]')!.textContent =
      'This ' +
      period +
      ': ' +
      total +
      ' illustrative completions. Counts alone do not explain quality or workload.';
    root.querySelector('[data-signal-caption]')!.textContent = caption;
    root.querySelector('[data-signal-table-total]')!.textContent =
      String(total);
    const bars = root.querySelector('[data-signal-bars]')!,
      table = root.querySelector('[data-signal-table]')!;
    bars.replaceChildren();
    table.replaceChildren();
    d.labels.forEach((label, i) => {
      const bar = document.createElement('div'),
        value = document.createElement('b'),
        shape = document.createElement('span'),
        text = document.createElement('small');
      value.textContent = String(d.completed[i]);
      shape.style.setProperty(
        '--bar',
        (d.completed[i] / Math.max(...d.completed)) * 140 + 'px',
      );
      text.textContent = label;
      bar.append(value, shape, text);
      bars.append(bar);
      const row = document.createElement('tr'),
        th = document.createElement('th'),
        td = document.createElement('td');
      th.scope = 'row';
      th.textContent = label;
      td.textContent = String(d.completed[i]);
      row.append(th, td);
      table.append(row);
    });
    root
      .querySelector('[data-signal-chart]')!
      .setAttribute(
        'aria-label',
        'Illustrative ' +
          period +
          ' completions: ' +
          d.labels.map((l, i) => l + ' ' + d.completed[i]).join(', ') +
          '. Total ' +
          total +
          '. Full data in the table below.',
      );
  }
  select.addEventListener('change', render);
  root.querySelector('[data-signal-reset]')?.addEventListener('click', () => {
    select.value = 'week';
    render();
    select.focus();
  });
});
document.querySelectorAll<HTMLElement>('[data-compare]').forEach((root) => {
  const descriptions: Record<
    string,
    { name: string; body: string; href: string }
  > = {
    process: {
      name: 'Workflows',
      body: 'Make the stages and owners visible, then pause at a deliberate human approval gate before hand-off.',
      href: '/products/workflows/',
    },
    context: {
      name: 'Knowledge',
      body: 'Find relevant guidance in the six-document local library and inspect its fictional source before acting.',
      href: '/products/knowledge/',
    },
    insight: {
      name: 'Insights',
      body: 'Inspect clearly defined completion counts, select a period and check the chart against its underlying table.',
      href: '/products/insights/',
    },
  };
  const update = (key: string) => {
    const d = descriptions[key];
    root.querySelector('[data-compare-title]')!.textContent =
      'Start with ' + d.name + '.';
    root.querySelector('[data-compare-body]')!.textContent = d.body;
    const link = root.querySelector<HTMLAnchorElement>('[data-compare-link]')!;
    link.href = d.href;
    link.textContent = 'Try ' + d.name + ' →';
  };
  root
    .querySelectorAll<HTMLInputElement>('input')
    .forEach((input) =>
      input.addEventListener('change', () => update(input.value)),
    );
  root.querySelector('[data-compare-reset]')?.addEventListener('click', () => {
    const first = root.querySelector<HTMLInputElement>('input[value=process]')!;
    first.checked = true;
    update('process');
    first.focus();
  });
});
document
  .querySelectorAll<HTMLElement>('[data-preview-picker]')
  .forEach((root) => {
    const select = root.querySelector<HTMLSelectElement>('select')!,
      link = root.querySelector<HTMLAnchorElement>('[data-preview-link]')!;
    select.addEventListener('change', () => {
      link.href = '/products/' + select.value + '/#demo';
      link.textContent =
        'Open ' + select.options[select.selectedIndex].text + ' demo →';
    });
  });
// Event attributes document the intended taxonomy. No analytics provider is configured,
// no events are emitted, and demo input is never transmitted or persisted.
