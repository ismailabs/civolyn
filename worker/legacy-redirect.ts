import contracts from '../src/data/page-design-contract.json' with { type: 'json' };
const paths = new Map(contracts.map((p) => [p.old, p.new]));

export function legacyRedirect(request: Request): Response {
  const url = new URL(request.url);
  const headers = {
    'X-Robots-Tag': 'noindex, follow',
    'X-Content-Type-Options': 'nosniff',
    'Content-Type': 'text/plain; charset=utf-8',
  };
  if (url.hostname !== 'civolyn.ismailstudio.my')
    return new Response('Unexpected hostname', { status: 421, headers });
  if (!['GET', 'HEAD'].includes(request.method))
    return new Response('Method not allowed', {
      status: 405,
      headers: { ...headers, Allow: 'GET, HEAD' },
    });
  let path = url.pathname
    .replace(/\/index\.html$/, '/')
    .replace(/\.html$/, '/');
  if (!path.endsWith('/')) path += '/';
  const target = paths.get(path);
  if (!target)
    return new Response(
      request.method === 'HEAD'
        ? null
        : 'This old URL has no mapped successor. Explore https://proworks.ismailstudio.my/',
      { status: 404, headers },
    );
  // A fixed origin and a reviewed path map prevent open redirects. Drop arbitrary queries.
  return new Response(null, {
    status: 301,
    headers: {
      ...headers,
      Location: new URL(target, 'https://proworks.ismailstudio.my').href,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
export default { fetch: legacyRedirect };
