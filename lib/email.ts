import nodemailer from "nodemailer";

type OrderEmailItem = {
  productTitle: string;
  quantity: number;
  unitPrice: number;
};

type OrderEmailPayload = {
  customerName: string;
  email: string;
  merchantOid: string;
  totalAmount: number;
  items: OrderEmailItem[];
};

function getRequiredEmailEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} tanimlanmamis.`);
  }

  return value;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2
  }).format(value);
}

function buildOrderConfirmationHtml(payload: OrderEmailPayload) {
  const estimatedDelivery = "7-14 is gunu";
  const rows = payload.items
    .map(
      (item) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#0f172a;">${item.productTitle}</td>
          <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#475569;text-align:center;">${item.quantity}</td>
          <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#0f172a;text-align:right;">${formatCurrency(item.unitPrice * item.quantity)}</td>
        </tr>
      `
    )
    .join("");

  return `
    <div style="background:#f8fafc;padding:32px 16px;font-family:Arial,sans-serif;color:#0f172a;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid #e2e8f0;">
        <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:#0f3d6f;">BS Furniture Siparis Onayi</p>
        <h1 style="margin:0 0 16px;font-size:32px;line-height:1.2;">Siparisiniz alindi</h1>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#475569;">
          Merhaba ${payload.customerName}, odemeniz basariyla tamamlandi. Siparisiniz hazirlaniyor.
        </p>

        <div style="background:#f8fafc;border-radius:18px;padding:20px;margin-bottom:24px;">
          <p style="margin:0 0 8px;font-size:14px;color:#475569;">Siparis Numaraniz</p>
          <p style="margin:0;font-size:20px;font-weight:700;color:#0f172a;">${payload.merchantOid}</p>
          <p style="margin:16px 0 0;font-size:14px;color:#475569;">Tahmini Teslimat: ${estimatedDelivery}</p>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <thead>
            <tr>
              <th style="padding-bottom:12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#64748b;">Urun</th>
              <th style="padding-bottom:12px;text-align:center;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#64748b;">Adet</th>
              <th style="padding-bottom:12px;text-align:right;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#64748b;">Tutar</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>

        <div style="display:flex;justify-content:space-between;align-items:center;padding-top:20px;border-top:1px solid #e5e7eb;">
          <span style="font-size:16px;font-weight:600;color:#0f172a;">Toplam</span>
          <span style="font-size:18px;font-weight:700;color:#0f3d6f;">${formatCurrency(payload.totalAmount)}</span>
        </div>
      </div>
    </div>
  `;
}

export async function sendOrderConfirmationEmail(payload: OrderEmailPayload) {
  const transporter = nodemailer.createTransport({
    host: getRequiredEmailEnv("SMTP_HOST"),
    port: Number(process.env.SMTP_PORT ?? "587"),
    secure: process.env.SMTP_SECURE === "1",
    auth: {
      user: getRequiredEmailEnv("SMTP_USER"),
      pass: getRequiredEmailEnv("SMTP_PASS")
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM ?? getRequiredEmailEnv("SMTP_USER"),
    to: payload.email,
    subject: `Siparis Onayi - ${payload.merchantOid}`,
    html: buildOrderConfirmationHtml(payload)
  });
}
