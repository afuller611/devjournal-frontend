import { Story, Meta } from '@storybook/react'

import { Typography, TypographyProps } from './Typography'

export default {
  title: 'Example/Typography',
  component: Typography,
} as Meta

const Template: Story<TypographyProps> = (args) => <Typography {...args} />

export const Body = Template.bind({})
Body.args = {
  children: "Typography",
  variant: "body"
}

export const SubHeader = Template.bind({})
SubHeader.args = {
  children: "Typography",
  variant: "subheader"
}

export const Header = Template.bind({})
Header.args = {
  children: "Typography",
  variant: "header"
}
