/**
 * `require()` for CommonJS dependencies bundled into the Worker.
 *
 * Rolldown keeps `require("path")` and similar calls from CJS packages
 * (sanitize-html → postcss, EmDash auth records, the WordPress parser) as
 * runtime calls, and Workers has no global `require`. Rolldown's helper checks
 * `typeof require` when the call happens, so src/worker.ts installs this
 * function as `globalThis.require` and it resolves the Node built-ins those
 * packages need from `nodejs_compat`.
 * https://rolldown.rs/in-depth/bundling-cjs#require-external-modules
 */
import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import * as stream from "node:stream";
import * as url from "node:url";
import * as util from "node:util";

const modules: Record<string, unknown> = {
	crypto,
	fs,
	path,
	stream,
	url,
	util,
};

function interop(mod: unknown): unknown {
	const withDefault = mod as { default?: unknown };
	return withDefault.default ?? mod;
}

export default function workersRequire(id: string): unknown {
	const name = id.startsWith("node:") ? id.slice(5) : id;
	const mod = modules[name];
	if (!mod) {
		throw new Error(
			`require(${JSON.stringify(id)}) is not available in the Worker. Add it to src/shims/workers-require.ts.`,
		);
	}
	return interop(mod);
}
