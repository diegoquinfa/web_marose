import { ArrowLeft } from "lucide-react";
import { type FormEvent, useState } from "react";
import { ScrollArea } from "#/components/ui/scroll-area.tsx";

export type DetailsFormData = {
	nombre: string;
	cuando: string;
	notas: string;
};

export function DetailsView({
	formData,
	onFieldChange,
	onBack,
	onSubmit,
}: {
	formData: DetailsFormData;
	onFieldChange: (field: keyof DetailsFormData, value: string) => void;
	onBack: () => void;
	onSubmit: () => void;
}) {
	const [touched, setTouched] = useState(false);

	const nombreEmpty = formData.nombre.trim().length === 0;
	const cuandoEmpty = formData.cuando.trim().length === 0;
	const canSubmit = !nombreEmpty && !cuandoEmpty;

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setTouched(true);
		if (canSubmit) {
			onSubmit();
		}
	}

	const inputBase =
		"w-full bg-cream-card text-cocoa-ink font-sugar-sans text-[15px] outline-none placeholder:text-cocoa-ink/35";

	return (
		<ScrollArea className="min-h-0 flex-1" showOverflowIndicator>
			<div className="flex flex-col gap-4 p-4">
				{/* Back control */}
				<button
					type="button"
					onClick={onBack}
					className="inline-flex w-fit items-center gap-1.5 rounded-pill px-2 py-1 font-sugar-sans text-[15px] font-semibold text-cocoa-ink transition-colors hover:bg-sticker-blush"
				>
					<ArrowLeft className="h-4 w-4" />
					Volver al carrito
				</button>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					{/* Nombre */}
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="cart-nombre"
							className="font-sugar-sans text-label font-semibold uppercase tracking-[0.08em] text-cocoa-ink"
						>
							Nombre *
						</label>
						<input
							id="cart-nombre"
							type="text"
							required
							value={formData.nombre}
							onChange={(e) => onFieldChange("nombre", e.target.value)}
							placeholder="Tu nombre"
							className={`${inputBase} rounded-pill border border-cocoa-hairline px-4 py-2.5`}
						/>
						{touched && nombreEmpty && (
							<span className="text-[13px] font-semibold text-bubblegum-pop">
								Por favor ingresá tu nombre
							</span>
						)}
					</div>

					{/* ¿Para cuándo? */}
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="cart-cuando"
							className="font-sugar-sans text-label font-semibold uppercase tracking-[0.08em] text-cocoa-ink"
						>
							¿Para cuándo lo necesitás? *
						</label>
						<input
							id="cart-cuando"
							type="text"
							required
							value={formData.cuando}
							onChange={(e) => onFieldChange("cuando", e.target.value)}
							placeholder="Ej: mañana a la tarde"
							className={`${inputBase} rounded-pill border border-cocoa-hairline px-4 py-2.5`}
						/>
						{touched && cuandoEmpty && (
							<span className="text-[13px] font-semibold text-bubblegum-pop">
								Contanos para cuándo lo necesitás
							</span>
						)}
					</div>

					{/* Detalles extra */}
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="cart-notas"
							className="font-sugar-sans text-label font-semibold uppercase tracking-[0.08em] text-cocoa-ink"
						>
							Detalles extra
						</label>
						<textarea
							id="cart-notas"
							value={formData.notas}
							onChange={(e) => onFieldChange("notas", e.target.value)}
							placeholder="Alergias, dedicatoria, algo especial…"
							rows={3}
							className={`${inputBase} resize-none rounded-card border border-cocoa-hairline px-4 py-2.5`}
						/>
					</div>

					{/* Submit */}
					<button
						type="submit"
						disabled={!canSubmit}
						className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-cocoa-ink px-6 py-3.5 text-[17px] font-semibold text-paper-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift disabled:pointer-events-none disabled:opacity-50"
					>
						Enviar pedido por WhatsApp
					</button>
				</form>
			</div>
		</ScrollArea>
	);
}
