const nodemailer = require('nodemailer')

const RECIPIENTS = 'adham.zahran@blaubatch.com, zeadham@gmail.com'

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  let d
  try {
    d = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  // Require Gmail credentials set as Netlify environment variables:
  //   GMAIL_USER          → the Gmail address used to send (e.g. zeadham@gmail.com)
  //   GMAIL_APP_PASSWORD  → 16-char Gmail App Password (not your normal password)
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars')
    return { statusCode: 500, body: 'Email configuration missing' }
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  const subject = `Quote Request: ${d.product || 'Masterbatch'} — ${d.company || d.name || 'New Lead'}`

  try {
    await transporter.sendMail({
      from: `"Blau Batch Website" <${process.env.GMAIL_USER}>`,
      to: RECIPIENTS,
      replyTo: d.email || '',
      subject,
      html: buildHtml(d),
    })
    return { statusCode: 200, body: JSON.stringify({ ok: true }) }
  } catch (err) {
    console.error('Email send error:', err.message)
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}

function row(label, value, bold = false) {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:9px 14px;color:#666;font-size:13px;width:38%;vertical-align:top;">${label}</td>
      <td style="padding:9px 14px;color:#111;font-size:13px;${bold ? 'font-weight:700;' : ''}">${String(value).replace(/\n/g, '<br>')}</td>
    </tr>`
}

function sectionHeader(title) {
  return `
    <tr>
      <td colspan="2" style="padding:12px 14px 10px;font-family:Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#2E7FD0;border-top:6px solid #f4f6fa;border-bottom:1px solid #e8ecf0;">
        ${title}
      </td>
    </tr>`
}

function buildHtml(d) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6fa;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fa;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#141b3e;padding:28px 32px;border-radius:10px 10px 0 0;">
            <div style="font-size:10px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#4AAAE0;margin-bottom:10px;">BLAU BATCH · WEBSITE FORM</div>
            <div style="font-size:22px;font-weight:900;color:#fff;margin-bottom:4px;">New Quote Request</div>
            <div style="font-size:14px;color:rgba(255,255,255,0.55);">${d.product || 'Masterbatch'} · ${d.company || d.name || 'New Lead'}</div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#fff;border-radius:0 0 10px 10px;padding:8px 0 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">

              ${sectionHeader('Product Request')}
              ${row('Product', d.product, true)}
              ${row('Grade / Spec', d.grade)}
              ${row('Application', d.application)}

              ${sectionHeader('Order Details')}
              ${row('Quantity', d.qty)}
              ${row('Frequency', d.frequency)}
              ${row('Delivery Region', d.region)}
              ${row('Additional Details', d.details)}

              ${sectionHeader('Contact Information')}
              ${row('Name', d.name, true)}
              ${row('Company', d.company)}
              ${row('Email', d.email ? `<a href="mailto:${d.email}" style="color:#2E7FD0;">${d.email}</a>` : '')}
              ${row('Phone / WhatsApp', d.phone ? `<a href="tel:${d.phone}" style="color:#2E7FD0;">${d.phone}</a>` : '')}
              ${row('Preferred Contact', d.contactMethod)}

            </table>

            <!-- Reply CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
              <tr>
                <td style="padding:0 20px;">
                  <div style="background:#f0f7ff;border-left:3px solid #2E7FD0;border-radius:0 6px 6px 0;padding:14px 16px;">
                    <p style="margin:0;font-size:12px;color:#555;">
                      Hit <strong>Reply</strong> to respond directly to
                      <strong>${d.name || 'the customer'}</strong>
                      at <a href="mailto:${d.email}" style="color:#2E7FD0;">${d.email || '—'}</a>
                    </p>
                  </div>
                </td>
              </tr>
            </table>

            ${d.phone ? `
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
              <tr>
                <td style="padding:0 20px;">
                  <a href="https://wa.me/${d.phone.replace(/[^0-9]/g, '')}" style="display:inline-flex;align-items:center;background:#25D366;color:#fff;text-decoration:none;padding:10px 18px;border-radius:7px;font-size:13px;font-weight:700;">
                    WhatsApp ${d.name || 'Customer'} →
                  </a>
                </td>
              </tr>
            </table>` : ''}

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#aaa;">
              Submitted via <a href="https://blaubatch.com" style="color:#aaa;">blaubatch.com</a> quote form
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
