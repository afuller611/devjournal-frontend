import { Story, Meta } from '@storybook/react'

import { EditorProps, CustomEditor } from './Editor'

export default {
  title: 'Monaco/Editor',
  component: CustomEditor,
} as Meta

const Template: Story<EditorProps> = (args) => <CustomEditor {...args} />

export const Editor = Template.bind({})
