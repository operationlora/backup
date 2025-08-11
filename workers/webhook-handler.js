// Cloudflare Workers (modules syntax) — Stripe webhook -> SendGrid email
// Env vars: STRIPE_WEBHOOK_SECRET (required for real signature verification),
//           SENDGRID_API_KEY, SELLER_EMAIL

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname !== '/webhook/stripe') {
      return new Response('Not Found', { status: 404 });
    }
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: { 'Allow': 'POST' } });
    }

    // Stripe sends a signature header. Keep the raw body for verification.
    const sig = request.headers.get('Stripe-Signature') || request.headers.get('stripe-signature');
    const raw = await request.text();

    // TODO: Verify signature using Stripe library or HMAC with env.STRIPE_WEBHOOK_SECRET.
    // In Workers without the Stripe SDK, you can validate the t= and v1= parts manually.
    if (!sig) {
      return json({ error: 'Missing Stripe-Signature header' }, 400);
    }
    if (!env.STRIPE_WEBHOOK_SECRET) {
      // Accept but warn in logs if secret not configured.
      console.warn('STRIPE_WEBHOOK_SECRET not set; skipping signature verification');
    }

    let event;
    try {
      event = JSON.parse(raw);
    } catch (e) {
      return json({ error: 'Invalid JSON', detail: String(e) }, 400);
    }

    // Extract common fields (works for checkout.session.completed and payment_intent.succeeded)
    const type = event?.type || 'unknown.event';
    const obj = event?.data?.object || {};
    const orderId = obj?.id || event?.id || 'unknown';
    const amount = obj?.amount_total ?? obj?.amount ?? obj?.amount_received ?? null;
    const currency = obj?.currency || obj?.currency_code || '';
    const buyerEmail = obj?.customer_details?.email || obj?.receipt_email || obj?.customer_email || null;
    const productName = obj?.metadata?.product_name || obj?.display_items?.[0]?.custom?.name || obj?.description || 'N/A';

    const summary = [
      `Event: ${type}`,
      `Order ID: ${orderId}`,
      `Amount: ${amount ?? 'n/a'} ${currency}`,
      `Product: ${productName}`,
      `Buyer: ${buyerEmail ?? 'n/a'}`
    ].join('\n');

    // Send notification emails via SendGrid (best-effort)
    if (env.SENDGRID_API_KEY && env.SELLER_EMAIL) {
      try {
        // Notify seller
        await sendgridSend(env, {
          to: env.SELLER_EMAIL,
          from: env.SELLER_EMAIL,
          subject: `[Order] ${type} ${orderId}`,
          text: `${summary}\n\nRaw (first 2KB):\n${raw.slice(0, 2048)}`
        });

        // Acknowledge buyer only if we have their email
        if (buyerEmail) {
          await sendgridSend(env, {
            to: buyerEmail,
            from: env.SELLER_EMAIL,
            subject: 'Your order was received',
            text: `Thanks for your order!\n\n${summary}`
          });
        }
      } catch (e) {
        console.error('SendGrid error', e);
        // Do not fail the webhook due to email issues
      }
    } else {
      console.warn('SENDGRID_API_KEY or SELLER_EMAIL missing; skipping email notify');
    }

    return json({ ok: true });
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

async function sendgridSend(env, { to, from, subject, text }) {
  const body = {
    personalizations: [{ to: [{ email: to }] }],
    from: { email: from },
    subject,
    content: [{ type: 'text/plain', value: text }]
  };
  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`SendGrid failed: ${res.status} ${msg}`);
  }
}

