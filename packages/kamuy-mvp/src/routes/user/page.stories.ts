import type { Meta, StoryObj } from "@storybook/svelte";
import Page from "./+page.svelte";

const meta = {
  title: "Routes/User",
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/svelte/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      users: [
        { id: 1, email: "foo@gmail.com", name: "foo" },
        { id: 2, email: "bar@gmail.com", name: "bar" },
        { id: 3, email: "baz@gmail.com", name: "baz" },
      ],
    },
  },
};
