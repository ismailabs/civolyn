// Verification only: the Windows resolver may cache NXDOMAIN after a new hostname.
// Resolve only these two authorised hosts through public DNS, preserving HTTPS SNI
// and normal certificate validation. This does not change system DNS or site code.
import dns from 'node:dns';
import { syncBuiltinESMExports } from 'node:module';
export const publicDnsAnswers = [];
export const publicDnsArgs = [];
if (process.env.VERIFY_PUBLIC_DNS === 'true') {
  for (const host of ['proworks.ismailstudio.my', 'civolyn.ismailstudio.my']) {
    const answer = await fetch(
      'https://cloudflare-dns.com/dns-query?name=' + host + '&type=A',
      { headers: { Accept: 'application/dns-json' } },
    ).then((r) => r.json());
    const records = (answer.Answer || []).filter((a) => a.type === 1);
    if (records.length) {
      publicDnsAnswers.push({
        host,
        addresses: records.map((a) => a.data),
        observedAt: new Date().toISOString(),
      });
    }
  }
  if (!publicDnsAnswers.some((a) => a.host === 'proworks.ismailstudio.my'))
    throw new Error(
      'The intended production hostname does not resolve in public DNS.',
    );
  const original = dns.lookup;
  dns.lookup = function (host, options, callback) {
    const record = publicDnsAnswers.find((a) => a.host === host);
    if (!record) return original.call(dns, host, options, callback);
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    queueMicrotask(() => {
      if (options?.all)
        callback(
          null,
          record.addresses.map((address) => ({ address, family: 4 })),
        );
      else callback(null, record.addresses[0], 4);
    });
  };
  const originalAsync = dns.promises.lookup;
  dns.promises.lookup = async function (host, options) {
    const record = publicDnsAnswers.find((a) => a.host === host);
    if (!record) return originalAsync.call(dns.promises, host, options);
    const addresses = record.addresses.map((address) => ({
      address,
      family: 4,
    }));
    return options?.all ? addresses : addresses[0];
  };
  syncBuiltinESMExports();
  publicDnsArgs.push(
    '--host-resolver-rules=' +
      publicDnsAnswers
        .map((a) => 'MAP ' + a.host + ' ' + a.addresses[0])
        .join(', '),
  );
}
