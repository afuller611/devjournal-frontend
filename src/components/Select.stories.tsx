import { Story, Meta } from '@storybook/react'

import { Select, SelectProps } from './Select'

export default {
  title: 'Example/Input',
  component: Select,
} as Meta

const Template: Story<SelectProps> = (args) => <Select {...args} />

export const SelectInput = Template.bind({})
SelectInput.args = {
  id: 'Select From List',
  label: 'Select From List',
  children: (
    <>
      <option value="" />
      <option value="Option 1">{'Option 1'}</option>
      <option value="Option 2">{'Option 2'}</option>
      <option value="Option 3">{'Option 3'}</option>
    </>
  ),
}
