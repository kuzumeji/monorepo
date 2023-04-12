import * as SentryNode from '@sentry/node';
import '@sentry/tracing';
import type { HandleServerError } from '@sveltejs/kit';

SentryNode.init({
	dsn: 'https://61b82cdb8db24ca5baf44979cdccf49b@o4504983043964928.ingest.sentry.io/4504983068278784',
	tracesSampleRate: 1.0,
	// Add the Http integration for tracing
	integrations: [new SentryNode.Integrations.Http()]
});

SentryNode.setTag('svelteKit', 'server');

// use handleError to report errors during server-side data loading
export const handleError = (({ error, event }) => {
	SentryNode.captureException(error, { contexts: { sveltekit: { event } } });

	return {
		message: 'Whoops!'
	};
}) satisfies HandleServerError;
