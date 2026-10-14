import handler, {
	createScheduledHandler,
	PluginBridge,
} from "@emdash-cms/cloudflare/worker";
import workersRequire from "./shims/workers-require";

// CommonJS dependencies (sanitize-html → postcss) call require() at render
// time; Workers has no global require. See src/shims/workers-require.ts.
const scope = globalThis as { require?: unknown };
scope.require ??= workersRequire;

export { PluginBridge };

export default {
	...handler,
	scheduled: createScheduledHandler(),
} satisfies ExportedHandler;
