import { Story, Meta } from '@storybook/react'

import { ModalProps, Modal } from './Modal'
import { Typography } from './Typography'

export default {
  title: 'Basic/Modal',
  component: Modal,
} as Meta

const Template: Story<ModalProps> = (args) => {
  return (
    <>
      <Typography>{'Backgroud Components'}</Typography>
      <Modal {...args} />
    </>
  )
}

export const ModalOpen = Template.bind({})
ModalOpen.args = {
  children: 'Test Modal',
  open: true,
  handleClose: () => console.log("Handle close")
}
