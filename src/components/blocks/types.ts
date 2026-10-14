import type { ImageValue } from "emdash";
import type { PortableTextProps } from "emdash/ui";

/**
 * Local stand-ins for the EmDash-generated block types (`emdash-env.d.ts`),
 * which does not exist yet. Field slugs match docs/plans/emdash-migration.md
 * §4.5. Replace these with the generated `PageContentBlock` union once
 * `emdash types` has run.
 */

type BlockBase = {
	_type: string;
	_version: number;
	_key: string;
};

export type HeroBlock = BlockBase & {
	_type: "hero";
	anchor?: string | null;
	eyebrow?: string | null;
	heading?: string | null;
	heading_script?: string | null;
	subtitle?: string | null;
	image?: ImageValue | null;
	cta_label?: string | null;
	cta_message?: string | null;
	secondary_label?: string | null;
	secondary_href?: string | null;
};

export type MenuGridBlock = BlockBase & {
	_type: "menu_grid";
	anchor?: string | null;
	heading?: string | null;
	heading_accent?: string | null;
	subtitle?: string | null;
	show_unavailable?: boolean | null;
};

export type ReviewsBlock = BlockBase & {
	_type: "reviews";
	anchor?: string | null;
	heading?: string | null;
	heading_accent?: string | null;
	subtitle?: string | null;
	max_items?: number | null;
	/** Select: Lenta (90s) · Normal (60s) · Rápida (35s). */
	speed?: string | null;
};

export type HowToOrderStep = {
	title?: string | null;
	description?: string | null;
	note?: string | null;
	icon?: string | null;
};

export type HowToOrderNote = {
	label?: string | null;
	text?: string | null;
	icon?: string | null;
};

export type HowToOrderBlock = BlockBase & {
	_type: "how_to_order";
	anchor?: string | null;
	badge?: string | null;
	heading?: string | null;
	heading_accent?: string | null;
	subtitle?: string | null;
	steps?: HowToOrderStep[] | null;
	notes?: HowToOrderNote[] | null;
	cta_script?: string | null;
	cta_label?: string | null;
	cta_message?: string | null;
};

export type AboutBlock = BlockBase & {
	_type: "about";
	anchor?: string | null;
	heading?: string | null;
	heading_accent?: string | null;
	body?: PortableTextProps["value"] | null;
	signoff_script?: string | null;
	image?: ImageValue | null;
};

export type CtaBannerBlock = BlockBase & {
	_type: "cta_banner";
	anchor?: string | null;
	heading?: string | null;
	text?: string | null;
	cta_label?: string | null;
	cta_message?: string | null;
};

export type TextBlockBlock = BlockBase & {
	_type: "text_block";
	anchor?: string | null;
	heading?: string | null;
	body?: PortableTextProps["value"] | null;
};

export type ErrorMessageBlock = BlockBase & {
	_type: "error_message";
	anchor?: string | null;
	code?: string | null;
	heading?: string | null;
	heading_script?: string | null;
	body?: string | null;
	home_label?: string | null;
	cta_label?: string | null;
	cta_message?: string | null;
};

export type MaroseBlock =
	| HeroBlock
	| MenuGridBlock
	| ReviewsBlock
	| HowToOrderBlock
	| AboutBlock
	| CtaBannerBlock
	| TextBlockBlock
	| ErrorMessageBlock;
