/**
 * Marose email provider.
 *
 * Wraps the official Cloudflare Email Sending provider so every outgoing
 * message, including EmDash system emails (magic links, invites, recovery)
 * that skip `email:beforeSend`, is delivered in Spanish with the Marose
 * layout (see marose-email-template.ts).
 *
 * The domain comes from the `EMDASH_SITE_URL` runtime variable: the sender is
 * `<fromLocalPart>@<domain>` and the logo/footer link point at the site URL.
 */
import { createCloudflareEmailDeliver } from "@emdash-cms/cloudflare/plugins/cloudflare-email";
import { definePlugin } from "emdash";
import { getSiteDomain, getSiteUrl } from "../lib/site-url";
import { renderMaroseEmail } from "./marose-email-template";

export type MaroseEmailConfig = {
	/** Name of the `send_email` binding. Defaults to "EMAIL". */
	binding?: string;
	/** Local part of the sender address. Defaults to "no-reply". */
	fromLocalPart?: string;
	/** Display name of the sender. Defaults to "Marose". */
	fromName?: string;
};

export function createPlugin(config: MaroseEmailConfig = {}) {
	return definePlugin({
		id: "marose-email",
		version: "1.1.0",
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
					// PNG, not WebP: Gmail's image proxy flattens WebP transparency to black.
					const branded = renderMaroseEmail(event.message, {
						logoUrl: `${siteUrl}/brand/email-logo.png`,
						siteUrl,
					});
					await deliver(
						{ ...event, message: { ...event.message, ...branded } },
						ctx,
					);
				},
			},
		},
	});
}
