import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: "large",
  children: 'Large Button',
};

export const Medium = Template.bind({});
Medium.args = {
  size: "medium",
  children: 'Medium Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: 'Small Button',
};
