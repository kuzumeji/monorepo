import type { Meta, StoryObj } from '@storybook/svelte';
import Page from './+page.svelte';
import { create, edit } from './page.mock';

const meta = {
	title: 'Routes/User-Edit',
	component: Page,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/7.0/svelte/configure/story-layout
		layout: 'fullscreen'
	}
} satisfies Meta<Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {
	args: {
		data: { ...create() }
	}
};
export const Edit: Story = {
	args: {
		data: { ...edit() }
	}
};
