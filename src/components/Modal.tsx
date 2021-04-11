import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { Grid } from '@material-ui/core'

export interface ModalProps {
  open: boolean
  children: any
  handleClose: () => void
}

const ModalContainer = styled.div<ModalProps>`
  ${({ open }) =>
    !open &&
    css`
      display: none;
    `};
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  padding-top: 100px;
`

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border-radius: 4px;
`

export const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  const modalContentRef = useRef(null)
  const handleModalContainerClick = (e: React.MouseEvent) => {
    if (modalContentRef.current && modalContentRef.current !== e.target) {
      props.handleClose()
    }
  }

  return (
    <ModalContainer onClick={handleModalContainerClick} {...props}>
      <Grid justify="center" container>
        <Grid item xs={11} sm={8}>
          <ModalContent ref={modalContentRef}>{children}</ModalContent>
        </Grid>
      </Grid>
    </ModalContainer>
  )
}
