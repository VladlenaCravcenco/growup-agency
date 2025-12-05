import type { RequestHandler } from '@builder.io/qwik-city';

export const onPost: RequestHandler = async ({ request, json }) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    json(500, { ok: false, error: 'TELEGRAM env variables not set' });
    return;
  }

  const body = await request.json();

  const name = String(body.name ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const email = String(body.email ?? '').trim();
  const page = String(body.page ?? '').trim();

  // имя + хотя бы один канал связи
  if (!name || (!phone && !email)) {
    json(400, { ok: false, error: 'Missing name or contact' });
    return;
  }

  const contacts: string[] = [];
  if (phone) contacts.push(`📞 Телефон: <b>${phone}</b>`);
  if (email) contacts.push(`✉️ Email: <b>${email}</b>`);

  const text =
    `🆕 <b>Новая заявка: бесплатная консультация</b>\n` +
    `👤 Имя: <b>${name}</b>\n` +
    (contacts.length ? contacts.join('\n') + '\n' : '') +
    (page ? `📄 Страница: <code>${page}</code>\n` : '') +
    `🕒 Время: ${new Date().toLocaleString('ru-RU')}`;

  const tgRes = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    },
  );

  if (!tgRes.ok) {
    const errText = await tgRes.text().catch(() => '');
    console.error('TG error:', errText);
    json(500, { ok: false, error: 'Telegram error' });
    return;
  }

  json(200, { ok: true });
};