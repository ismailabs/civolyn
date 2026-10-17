/// <reference path="../worker-configuration.d.ts" />
export default {
  async fetch(request, env) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD', 'X-Robots-Tag': 'noindex, follow' },
      });
    }
    const asset = await env.ASSETS.fetch(request);
    const response = new Response(asset.body, asset);
    if (response.headers.get('Content-Type')?.includes('text/html')) {
      // Keep provider-wide automatic analytics injection out of this site's HTML.
      // Cloudflare honours no-transform; named analytics remains unconfigured.
      response.headers.set(
        'Cache-Control',
        (response.headers.get('Cache-Control') ||
          'public, max-age=0, must-revalidate') + ', no-transform',
      );
    }
    if (response.status === 404)
      response.headers.set('X-Robots-Tag', 'noindex, follow');
    return response;
  },
} satisfies ExportedHandler<Env>;
