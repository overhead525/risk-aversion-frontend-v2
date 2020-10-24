import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Button, ButtonProps } from "carbon-components-react";
import { Add32 } from "@carbon/icons-react";

export default {
  title: "RA/Button",
  component: Button,
  argTypes: {},
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const NewSimulationButton = Template.bind({});
NewSimulationButton.args = {
  renderIcon: Add32,
};
