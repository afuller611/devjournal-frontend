import { Story, Meta } from '@storybook/react'

import { EditorProps, CustomEditor } from './Editor'

export default {
  title: 'Monaco/Editor',
  component: CustomEditor,
} as Meta

const Template: Story<EditorProps> = (args) => <CustomEditor {...args} />

export const Editor = Template.bind({})
Editor.args = {
  value: `### Header\n[Link](linksite.example.com)\n**Bold Text**\n__Also Bold Text__\n*Italics Text*\n_Also Italics Text_\n`,
  id: "test",
  label: "Markdown"
}
