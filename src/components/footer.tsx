import { WHATSAPP_NUMBER } from "./whatsapp-button";

function TiktokGlyph({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
			className={className}
		>
			<path d="M16.6 2h-3.2v13.5c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .6.05.9.14V9.7a5.9 5.9 0 0 0-.9-.07A5.9 5.9 0 0 0 4.8 15.5 5.9 5.9 0 0 0 10.7 21.4a5.9 5.9 0 0 0 5.9-5.9V8.4a8.1 8.1 0 0 0 4.6 1.4V6.6a4.9 4.9 0 0 1-4.6-4.6Z" />
		</svg>
	);
}

function WhatsappGlyph({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
			className={className}
		>
			<path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.14h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
		</svg>
	);
}

function InstagramGlyph({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
			className={className}
		>
			<rect
				x="3"
				y="3"
				width="18"
				height="18"
				rx="5"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
			<circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
		</svg>
	);
}

export function Footer() {
	return (
		<footer id="contacto" className="mt-20 px-4">
			<div className="mx-auto max-w-280 rounded-t-card bg-sticker-blush px-6 py-14 text-center sm:px-12">
				<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream-card shadow-soft">
					<img
						src="/logos/logo192.webp"
						alt="Sello de Marose"
						className="h-full w-full rounded-full object-cover"
					/>
				</div>

				<p className="mt-5 font-handwritten-sugar text-3xl text-caramel-swirl">
					Hecho con amor · Cartagena
				</p>

				<div className="mt-6 flex flex-wrap items-center justify-center gap-3">
					<a
						href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Marose, quiero hacer un pedido")}`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-pill bg-cocoa-ink px-5 py-2.5 text-[15px] font-semibold text-paper-white shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
					>
						<WhatsappGlyph className="h-4 w-4" />
						WhatsApp
					</a>
					<a
						href="https://instagram.com/marosectg"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-pill bg-cream-card px-5 py-2.5 text-[15px] font-semibold text-cocoa-ink shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
					>
						<InstagramGlyph className="h-4 w-4" />
						Instagram
					</a>
					<a
						href="https://www.tiktok.com/@marosepostres"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-pill bg-cream-card px-5 py-2.5 text-[15px] font-semibold text-cocoa-ink shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
					>
						<TiktokGlyph className="h-4 w-4" />
						TikTok
					</a>
				</div>

				<p className="mt-8 text-[13px] text-cocoa-ink/60">
					© {new Date().getFullYear()} Marose · Repostería artesanal
				</p>
			</div>
		</footer>
	);
}
