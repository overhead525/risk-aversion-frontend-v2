import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Layout, LayoutProps } from "../components/layout";

export default {
  title: "Example/Button",
  component: Layout,
} as Meta;

const Template: Story<LayoutProps> = (args) => <Layout {...args} />;

export const PrimaryLayout = Template.bind({});
PrimaryLayout.args = {};
