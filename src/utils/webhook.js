const crypto = require('crypto');

/**
 * Signs a webhook payload using HMAC-SHA256.
 * @param {string} payload - The raw JSON string to sign
 * @param {string} secret - The webhook secret from environment variables
 * @returns {string} - The signature in the format sha256=<hash>
 */
function signPayload(payload, secret) {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payload);
    return `sha256=${hmac.digest('hex')}`;
}

/**
 * Sends a signed webhook payload to the configured webhook URL.
 * @param {string} eventType - The event type (e.g. payment.succeeded)
 * @param {object} data - The resource object associated with the event
 */
async function sendWebhook(eventType, data) {
    const webhookUrl = process.env.WEBHOOK_URL;
    const webhookSecret = process.env.WEBHOOK_SECRET;

    if (!webhookUrl || !webhookSecret) {
        console.log(`Webhook not configured — skipping event: ${eventType}`);
        return;
    }

    const payload = JSON.stringify({
        event: eventType,
        created_at: new Date().toISOString(),
        data
    });

    const signature = signPayload(payload, webhookSecret);

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Payrail-Signature': signature
            },
            body: payload
        });
        console.log(`Webhook sent: ${eventType} — status ${response.status}`);
    } catch (error) {
        console.error(`Webhook delivery failed: ${eventType} — ${error.message}`);
    }
}

module.exports = { signPayload, sendWebhook };