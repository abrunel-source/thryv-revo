// Vercel serverless function — handles the contact form and sends the
// submission via Resend. The API key is read from the RESEND_API_KEY
// environment variable and is NEVER committed to the repo.
//
// Env vars (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY   (required)  your Resend API key, restricted to thryv.co.za
//   CONTACT_TO       (optional)  primary recipient   — default admin@thryv.co.za
//   CONTACT_CC       (optional)  cc recipient        — default abrunel@brunelstudios.com
//   CONTACT_FROM     (optional)  verified from addr  — default "Thryv Website <noreply@thryv.co.za>"

const TO = process.env.CONTACT_TO || 'admin@thryv.co.za';
const CC = process.env.CONTACT_CC || 'abrunel@brunelstudios.com';
const FROM = process.env.CONTACT_FROM || 'Thryv Website <noreply@thryv.co.za>';

const esc = (s = '') =>
  String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
const clip = (s = '', n = 5000) => String(s).slice(0, n);

function wantsJson(req) {
  const a = req.headers['accept'] || '';
  const x = req.headers['x-requested-with'] || '';
  return a.includes('application/json') || x === 'fetch';
}

function readBody(req) {
  // Vercel parses JSON and urlencoded bodies into req.body.
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { /* fall through */ }
    return Object.fromEntries(new URLSearchParams(req.body));
  }
  return {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const data = readBody(req);
  const back = data.locale === 'af' ? '/af/kontak/' : '/contact/';

  const json = wantsJson(req);
  const ok = () =>
    json ? res.status(200).json({ ok: true }) : res.redirect(303, `${back}?sent=1`);
  const fail = (code, msg) =>
    json ? res.status(code).json({ ok: false, error: msg }) : res.redirect(303, `${back}?error=1`);

  // --- Bot protection -------------------------------------------------------
  // 1) Honeypot: a hidden field a human never sees. If filled, silently accept
  //    (return success) without sending, so bots don't learn they were caught.
  if (data.company_website) return ok();
  // 2) Timing: forms submitted in under ~2.5s are almost always bots. Only
  //    enforced when the JS-set timestamp is present (no-JS users are exempt).
  const ts = Number(data.form_ts);
  if (ts && Date.now() - ts < 2500) return ok();

  // --- Validation -----------------------------------------------------------
  const name = clip(data.name, 200).trim();
  const email = clip(data.email, 200).trim();
  const message = clip(data.message, 8000).trim();
  if (!name || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return fail(400, 'Please provide your name and a valid email address.');
  }

  const company = clip(data.company, 200).trim();
  const phone = clip(data.phone, 60).trim();
  const service = clip(data.service, 120).trim();

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return fail(500, 'The contact form is not configured yet. Please email us directly.');
  }

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Company', company],
    ['Phone', phone],
    ['Service', service],
  ].filter(([, v]) => v);

  const html = `
    <h2>New enquiry from the Thryv website</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="font-weight:bold">${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}
    </table>
    <h3>Message</h3>
    <p style="white-space:pre-wrap">${esc(message) || '(no message)'}</p>`;
  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nMessage:\n${message || '(no message)'}`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        cc: [CC],
        reply_to: email,
        subject: `Website enquiry${service ? ` — ${service}` : ''} from ${name}`,
        html,
        text,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error('Resend error', r.status, detail);
      return fail(502, 'We could not send your message right now. Please try again or email us.');
    }
    return ok();
  } catch (err) {
    console.error('Contact handler error', err);
    return fail(500, 'Something went wrong. Please try again or email us directly.');
  }
}
