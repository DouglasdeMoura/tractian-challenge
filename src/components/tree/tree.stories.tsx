import type { Meta, StoryObj } from "@storybook/react";
import { Tree } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Tree",
  component: Tree,
  tags: ["autodocs"],
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        label: "Node 1",
        children: [
          {
            label: "Node 1.1",
            children: [
              {
                label: "Node 1.1.1",
              },
              {
                label: "Node 1.1.2",
                children: [
                  {
                    label: "Node 1.1.2.1",
                  },
                ],
              },
            ],
          },
          {
            label: "Node 1.2",
            children: [],
          },
        ],
      },
      {
        label: "Node 2",
        children: [],
      },
    ],
  },
};
