import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const FROM = `"Rhythm Game" <${process.env.GMAIL_USER}>`;

function baseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0a0b14;color:#f0ece4;font-family:system-ui,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-size:24px;font-weight:700;color:#f0ece4;">Rhythm Game</span>
    </div>
    <div style="background:#111827;border:1px solid #374151;border-radius:16px;padding:32px 24px;">
      ${content}
    </div>
    <div style="text-align:center;margin-top:24px;font-size:12px;color:#9ca3af;">
      &copy; ${new Date().getFullYear()} Rhythm Game &mdash; Avni Cem Ersoy
    </div>
  </div>
</body>
</html>`;
}

const welcomeContent: Record<string, { subject: string; body: string }> = {
  tr: {
    subject: "Listeye eklendi! - Rhythm Game",
    body: `
      <h2 style="margin:0 0 16px;font-size:20px;color:#FDBA74;">Hosgeldin!</h2>
      <p style="margin:0 0 12px;line-height:1.6;color:#d1d5db;">
        Waitlist'e basariyla kaydoldun. Rhythm Game yayinlandiginda sana ilk haber verecegiz.
      </p>
      <p style="margin:0 0 12px;line-height:1.6;color:#d1d5db;">
        Kendi muziklerinle oynayabilecegi bir ritim oyunu geliyor — tamamen cevrimdisi, yapay zeka destekli.
      </p>
      <div style="margin-top:24px;text-align:center;">
        <a href="https://github.com/acemersoy/Ritim-Oyunu-" style="display:inline-block;background:linear-gradient(135deg,#8B5CF6,#FB923C);color:white;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px;">
          GitHub'da Incele
        </a>
      </div>
    `,
  },
  en: {
    subject: "You're on the list! - Rhythm Game",
    body: `
      <h2 style="margin:0 0 16px;font-size:20px;color:#FDBA74;">Welcome!</h2>
      <p style="margin:0 0 12px;line-height:1.6;color:#d1d5db;">
        You've been added to the waitlist. We'll notify you as soon as Rhythm Game launches.
      </p>
      <p style="margin:0 0 12px;line-height:1.6;color:#d1d5db;">
        A rhythm game where you play with your own music is coming — fully offline, AI-powered.
      </p>
      <div style="margin-top:24px;text-align:center;">
        <a href="https://github.com/acemersoy/Ritim-Oyunu-" style="display:inline-block;background:linear-gradient(135deg,#8B5CF6,#FB923C);color:white;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px;">
          View on GitHub
        </a>
      </div>
    `,
  },
};

const launchContent: Record<string, { subject: string; body: string }> = {
  tr: {
    subject: "Rhythm Game yayinda! Hemen dene",
    body: `
      <h2 style="margin:0 0 16px;font-size:20px;color:#FDBA74;">Buyuk gun geldi!</h2>
      <p style="margin:0 0 12px;line-height:1.6;color:#d1d5db;">
        Rhythm Game sonunda yayinda! Kendi muziklerinle oynayabilecegi ritim oyununu simdi indirebilirsin.
      </p>
      <p style="margin:0 0 12px;line-height:1.6;color:#d1d5db;">
        Herhangi bir MP3'u yapay zeka ile ritim oyununa donustur — internet gerekmez.
      </p>
      <div style="margin-top:24px;text-align:center;">
        <a href="https://github.com/acemersoy/Ritim-Oyunu-" style="display:inline-block;background:linear-gradient(135deg,#8B5CF6,#FB923C);color:white;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px;">
          Hemen Indir
        </a>
      </div>
    `,
  },
  en: {
    subject: "Rhythm Game is live! Try it now",
    body: `
      <h2 style="margin:0 0 16px;font-size:20px;color:#FDBA74;">The big day is here!</h2>
      <p style="margin:0 0 12px;line-height:1.6;color:#d1d5db;">
        Rhythm Game is finally live! Download the rhythm game that lets you play with your own music.
      </p>
      <p style="margin:0 0 12px;line-height:1.6;color:#d1d5db;">
        Turn any MP3 into a rhythm game with AI — no internet required.
      </p>
      <div style="margin-top:24px;text-align:center;">
        <a href="https://github.com/acemersoy/Ritim-Oyunu-" style="display:inline-block;background:linear-gradient(135deg,#8B5CF6,#FB923C);color:white;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px;">
          Download Now
        </a>
      </div>
    `,
  },
};

export async function sendWelcomeEmail(
  email: string,
  locale: string
): Promise<void> {
  const lang = locale === "en" ? "en" : "tr";
  const { subject, body } = welcomeContent[lang];
  await transporter.sendMail({
    from: FROM,
    to: email,
    subject,
    html: baseTemplate(body),
  });
}

export async function sendLaunchNotification(
  email: string,
  locale: string
): Promise<void> {
  const lang = locale === "en" ? "en" : "tr";
  const { subject, body } = launchContent[lang];
  await transporter.sendMail({
    from: FROM,
    to: email,
    subject,
    html: baseTemplate(body),
  });
}
