import type { Meta, StoryObj } from "@storybook/react";
import { ChevronIcon } from "./chevron";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Icons/ChevronIcon",
  component: ChevronIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChevronIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    pointing: "top",
  },
};

export const Bottom: Story = {
  args: {
    pointing: "bottom",
  },
};

export const Right: Story = {
  args: {
    pointing: "right",
  },
};

export const Left: Story = {
  args: {
    pointing: "left",
  },
};
