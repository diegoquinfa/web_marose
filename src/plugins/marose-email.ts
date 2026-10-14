/**
 * Marose email provider.
 *
 * Wraps the official Cloudflare Email Sending provider so every outgoing
 * message, including EmDash system emails (magic links, invites, recovery)
 * that skip `email:beforeSend`, is delivered with the Marose HTML layout.
 *
 * The domain comes from the `EMDASH_SITE_URL` runtime variable: the sender is
 * `<fromLocalPart>@<domain>` and the logo/footer link point at the site URL.
 */
import { createCloudflareEmailDeliver } from "@emdash-cms/cloudflare/plugins/cloudflare-email";
import { definePlugin } from "emdash";
import { getSiteDomain, getSiteUrl } from "../lib/site-url";

export type MaroseEmailConfig = {
	/** Name of the `send_email` binding. Defaults to "EMAIL". */
	binding?: string;
	/** Local part of the sender address. Defaults to "no-reply". */
	fromLocalPart?: string;
	/** Display name of the sender. Defaults to "Marose". */
	fromName?: string;
};

type Message = {
	subject: string;
	text: string;
	html?: string;
};

const COLORS = {
	page: "#251a13",
	card: "#3d2b20",
	text: "#f7e9e0",
	muted: "#cfa9a2",
	accent: "#e3a4a8",
	onAccent: "#251a13",
	hairline: "#54352f",
};

const URL_LINE = /^https?:\/\/\S+$/;
const URL_INLINE = /(https?:\/\/[^\s<]+)/g;

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function button(href: string): string {
	return `<p style="margin:28px 0;text-align:center"><a href="${href}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:${COLORS.accent};color:${COLORS.onAccent};font-weight:600;text-decoration:none">Continuar</a></p><p style="margin:0 0 16px;font-size:12px;color:${COLORS.muted};word-break:break-all">${href}</p>`;
}

/** Plain text → HTML: paragraphs, standalone links become a pink button. */
function textToHtml(text: string): string {
	return text
		.trim()
		.split(/\n{2,}/)
		.map((paragraph) => {
			const trimmed = paragraph.trim();
			if (URL_LINE.test(trimmed)) return button(escapeHtml(trimmed));
			const body = escapeHtml(trimmed)
				.replace(
					URL_INLINE,
					`<a href="$1" style="color:${COLORS.accent}">$1</a>`,
				)
				.replaceAll("\n", "<br>");
			return `<p style="margin:0 0 16px;line-height:1.6">${body}</p>`;
		})
		.join("");
}

export function renderMaroseEmail(
	message: Message,
	config: { logoUrl: string; siteUrl: string },
): string {
	const content = message.html ?? textToHtml(message.text);
	return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapeHtml(message.subject)}</title></head>
<body style="margin:0;padding:0;background:${COLORS.page};font-family:'Jost','Segoe UI',Arial,sans-serif;color:${COLORS.text}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.page}"><tr><td align="center" style="padding:40px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px">
<tr><td align="center" style="padding-bottom:24px"><img src="${config.logoUrl}" width="120" alt="Marose" style="display:block;border:0"></td></tr>
<tr><td style="background:${COLORS.card};border-radius:24px;padding:36px 32px;font-size:16px;color:${COLORS.text}">
<h1 style="margin:0 0 20px;font-family:Georgia,serif;font-weight:500;font-size:24px;color:${COLORS.text}">${escapeHtml(message.subject)}</h1>
${content}
</td></tr>
<tr><td align="center" style="padding-top:24px;font-size:13px;color:${COLORS.muted}">
<span style="font-family:Georgia,serif;font-style:italic;color:${COLORS.accent}">Hecho con amor · Cartagena</span><br>
<a href="${config.siteUrl}" style="color:${COLORS.muted}">${config.siteUrl.replace(/^https?:\/\//, "")}</a>
</td></tr>
</table></td></tr></table></body></html>`;
}

export function createPlugin(config: MaroseEmailConfig = {}) {
	return definePlugin({
		id: "marose-email",
		version: "1.0.0",
		capabilities: ["hooks.email-transport:register"],
		hooks: {
			"email:deliver": {
				exclusive: true,
				handler: async (event, ctx) => {
					const siteUrl = getSiteUrl();
					const deliver = createCloudflareEmailDeliver({
						binding: config.binding,
						from: {
							email: `${config.fromLocalPart ?? "no-reply"}@${getSiteDomain()}`,
							name: config.fromName ?? "Marose",
						},
					});
					const html = renderMaroseEmail(event.message, {
						logoUrl: `${siteUrl}/brand/admin-logo.webp`,
						siteUrl,
					});
					await deliver({ ...event, message: { ...event.message, html } }, ctx);
				},
			},
		},
	});
}
