/**
 * Marose email layout (pure, no runtime dependencies so it can be previewed).
 *
 * EmDash system emails arrive with English copy and a light-theme HTML body.
 * Known kinds (sign-in link, invite, signup verification, test email) are
 * recognised by their link and rewritten in Spanish. Unknown messages fall
 * back to their plain text. The incoming HTML is never embedded, because its
 * light-theme colours are unreadable on the dark Marose card.
 */

export type EmailInput = {
	subject: string;
	text: string;
	html?: string;
};

export type EmailOutput = {
	subject: string;
	text: string;
	html: string;
};

type Composed = {
	subject: string;
	heading: string;
	intro: string;
	button?: { label: string; url: string };
	notes: string[];
};

const COLORS = {
	page: "#251a13",
	card: "#3d2b20",
	text: "#f7e9e0",
	muted: "#cfa9a2",
	accent: "#e3a4a8",
	onAccent: "#251a13",
};

const URL_PATTERN = /https?:\/\/[^\s<>"]+/;
const EXPIRY_PATTERN = /expires in (\d+) (minute|hour|day)s?/i;
const UNITS: Record<string, [string, string]> = {
	minute: ["minuto", "minutos"],
	hour: ["hora", "horas"],
	day: ["día", "días"],
};

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function expiryNote(text: string, fallback: string): string {
	const match = text.match(EXPIRY_PATTERN);
	if (!match) return fallback;
	const amount = Number(match[1]);
	const [one, many] = UNITS[match[2].toLowerCase()];
	return `El enlace vence en ${amount} ${amount === 1 ? one : many}.`;
}

/** Recognises EmDash system emails and returns Spanish Marose copy. */
export function composeMaroseEmail(input: EmailInput): Composed {
	const url = input.text.match(URL_PATTERN)?.[0];

	if (url?.includes("/auth/magic-link/verify")) {
		return {
			subject: "Tu enlace para entrar a Marose",
			heading: "Entra al panel de Marose",
			intro: "Toca el botón para iniciar sesión y editar el sitio.",
			button: { label: "Iniciar sesión", url },
			notes: [
				expiryNote(input.text, "El enlace vence en 15 minutos."),
				"Si no lo pediste, puedes ignorar este correo.",
			],
		};
	}

	if (url?.includes("/invite/accept")) {
		return {
			subject: "Te invitaron a editar el sitio de Marose",
			heading: "¡Te damos la bienvenida!",
			intro:
				"Te invitaron a ayudar a mantener al día el sitio de Marose. Toca el botón para crear tu acceso.",
			button: { label: "Aceptar invitación", url },
			notes: [expiryNote(input.text, "La invitación vence en 7 días.")],
		};
	}

	if (url && /verify/i.test(url)) {
		return {
			subject: "Confirma tu correo para Marose",
			heading: "Confirma tu correo",
			intro: "Toca el botón para confirmar tu correo y crear tu cuenta.",
			button: { label: "Confirmar correo", url },
			notes: [
				expiryNote(input.text, "El enlace vence en 15 minutos."),
				"Si no lo pediste, puedes ignorar este correo.",
			],
		};
	}

	if (/^test email/i.test(input.subject)) {
		return {
			subject: "Correo de prueba de Marose",
			heading: "¡Funciona!",
			intro:
				"Este es un correo de prueba del panel de Marose. Si lo estás leyendo, el envío de correos está bien configurado.",
			notes: [],
		};
	}

	const paragraphs = input.text
		.split(/\n{2,}/)
		.map((p) => p.trim())
		.filter(Boolean);
	const standaloneUrl = paragraphs.find(
		(p) => URL_PATTERN.test(p) && !/\s/.test(p),
	);
	return {
		subject: input.subject,
		heading: input.subject,
		intro: paragraphs.filter((p) => p !== standaloneUrl).join("\n\n"),
		button: standaloneUrl
			? { label: "Abrir enlace", url: standaloneUrl }
			: undefined,
		notes: [],
	};
}

function paragraph(text: string, color: string, size = 16): string {
	const body = escapeHtml(text).replaceAll("\n", "<br>");
	return `<p style="margin:0 0 16px;font-size:${size}px;line-height:1.6;color:${color}">${body}</p>`;
}

export function renderMaroseEmail(
	input: EmailInput,
	site: { logoUrl: string; siteUrl: string },
): EmailOutput {
	const email = composeMaroseEmail(input);
	const button = email.button
		? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0"><tr><td style="border-radius:999px;background:${COLORS.accent}"><a href="${escapeHtml(email.button.url)}" style="display:inline-block;padding:14px 32px;border-radius:999px;font-weight:600;font-size:16px;color:${COLORS.onAccent};text-decoration:none">${escapeHtml(email.button.label)}</a></td></tr></table>
<p style="margin:0 0 20px;font-size:12px;line-height:1.5;color:${COLORS.muted}">¿El botón no funciona? Copia este enlace en tu navegador:<br><a href="${escapeHtml(email.button.url)}" style="color:${COLORS.accent};word-break:break-all">${escapeHtml(email.button.url)}</a></p>`
		: "";
	const notes = email.notes.map((n) => paragraph(n, COLORS.muted, 13)).join("");
	const domain = site.siteUrl.replace(/^https?:\/\//, "");

	const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark"><title>${escapeHtml(email.subject)}</title></head>
<body style="margin:0;padding:0;background:${COLORS.page};font-family:'Jost','Segoe UI',Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.page}"><tr><td align="center" style="padding:40px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px">
<tr><td align="center" style="padding-bottom:24px"><img src="${escapeHtml(site.logoUrl)}" width="120" height="120" alt="Marose" style="display:block;border:0;width:120px;height:120px"></td></tr>
<tr><td style="background:${COLORS.card};border-radius:24px;padding:36px 32px">
<h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-weight:500;font-size:26px;line-height:1.25;color:${COLORS.text}">${escapeHtml(email.heading)}</h1>
${email.intro ? paragraph(email.intro, COLORS.text) : ""}
${button}
${notes}
</td></tr>
<tr><td align="center" style="padding-top:24px;font-size:13px;line-height:1.6;color:${COLORS.muted}">
<span style="font-family:Georgia,serif;font-style:italic;color:${COLORS.accent}">Hecho con amor · Cartagena</span><br>
<a href="${escapeHtml(site.siteUrl)}" style="color:${COLORS.muted}">${escapeHtml(domain)}</a>
</td></tr>
</table></td></tr></table></body></html>`;

	const text = [
		email.heading,
		email.intro,
		email.button ? `${email.button.label}: ${email.button.url}` : "",
		...email.notes,
		`Marose · ${domain}`,
	]
		.filter(Boolean)
		.join("\n\n");

	return { subject: email.subject, text, html };
}
