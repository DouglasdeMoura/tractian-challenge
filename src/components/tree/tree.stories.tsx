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
        id: "1",
        type: "location",
        label: "Node 1",
        children: [
          {
            id: "1.1",
            type: "asset",
            label: "Node 1.1",
            children: [
              {
                id: "1.1.1",
                type: "component",
                label: "Node 1.1.1",
                children: [],
              },
              {
                id: "1.1.2",
                type: "component",
                label: "Node 1.1.2",
                children: [
                  {
                    label: "Node 1.1.2.1",
                    children: [],
                    id: "1.1.2.1",
                    type: "component",
                  },
                ],
              },
            ],
          },
          {
            id: "1.2",
            type: "component",
            label: "Node 1.2",
            children: [],
          },
        ],
      },
      {
        id: "2",
        type: "location",
        label: "Node 2",
        children: [],
      },
    ],
  },
};
