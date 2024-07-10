import type { Meta, StoryObj } from "@storybook/react";
import { Input } from ".";
import { SearchIcon } from "../icons/search";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Buscar ativo ou local",
    rightSection: <SearchIcon />,
  },
};
