import type { HandleClientError } from '@sveltejs/kit'
import * as SentrySvelte from '@sentry/svelte';
import { BrowserTracing } from '@sentry/browser';

SentrySvelte.init({
	dsn: 'https://61b82cdb8db24ca5baf44979cdccf49b@o4504983043964928.ingest.sentry.io/4504983068278784',
	integrations: [new BrowserTracing()],
	tracesSampleRate: 1.0
});

SentrySvelte.setTag('svelteKit', 'browser');

// This will catch errors in load functions from +page.ts files
export const handleError = (({ error, event }) => {
	SentrySvelte.captureException(error, { contexts: { sveltekit: { event } } });

	return {
		message: 'Whoops!'
	};
}) satisfies HandleClientError;
