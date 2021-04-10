import { Story, Meta } from '@storybook/react'
import { Input, InputProps } from './Input'

export default {
  title: 'Example/Input',
  component: Input,
} as Meta

const Template: Story<InputProps> = (args) => <Input {...args} />

export const TextInput = Template.bind({})
TextInput.args = {
  id: 'Text Input',
  label: 'Text Input'
}
