import { describe, it, expect } from 'vitest';
import { load } from './+page.server';

describe('Test /user', () => {
	it('Load User', async () => {
		expect(async () => {
			await load();
		}).not.toThrowError();
	});
});
