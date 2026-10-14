import { ArrowLeft } from "lucide-react";
import { type FormEvent, useState } from "react";
import { ScrollArea } from "@/islands/ui/scroll-area.tsx";

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
		"w-full bg-deep-cocoa text-blush-cream font-patisserie-sans text-[15px] outline-none placeholder:text-rose-mist/60";

	return (
		<ScrollArea className="min-h-0 flex-1" showOverflowIndicator>
			<div className="flex flex-col gap-4 p-4">
				{/* Back control */}
				<button
					type="button"
					onClick={onBack}
					className="inline-flex w-fit items-center gap-1.5 rounded-pill px-2 py-1 font-patisserie-sans text-[15px] font-semibold text-blush-cream transition-colors hover:bg-cocoa-hairline/40"
				>
					<ArrowLeft className="h-4 w-4" />
					Volver al carrito
				</button>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					{/* Nombre */}
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="cart-nombre"
							className="font-patisserie-sans text-label font-semibold uppercase tracking-[0.08em] text-rose-mist"
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
							<span className="text-[13px] font-semibold text-rose-petal">
								Por favor ingresá tu nombre
							</span>
						)}
					</div>

					{/* ¿Para cuándo? */}
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="cart-cuando"
							className="font-patisserie-sans text-label font-semibold uppercase tracking-[0.08em] text-rose-mist"
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
							<span className="text-[13px] font-semibold text-rose-petal">
								Contanos para cuándo lo necesitás
							</span>
						)}
					</div>

					{/* Detalles extra */}
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="cart-notas"
							className="font-patisserie-sans text-label font-semibold uppercase tracking-[0.08em] text-rose-mist"
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
						className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-rose-petal px-6 py-3.5 text-[17px] font-semibold text-cocoa-noir shadow-bloom transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-glow hover:shadow-lift disabled:pointer-events-none disabled:opacity-50"
					>
						Enviar pedido por WhatsApp
					</button>
				</form>
			</div>
		</ScrollArea>
	);
}
