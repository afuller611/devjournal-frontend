import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { Grid } from '@material-ui/core'

export interface ModalProps {
  open: boolean
  children: any
  handleClose: () => void
  backgroundColor?: string
}

interface ModalDivProps {
  backgroundColor?: string
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

const ModalContent = styled.div<ModalDivProps>`
  background-color: ${(props) => props.backgroundColor || '#fefefe'};
  margin: auto;
  padding: 20px;
  border-radius: 4px;
`

export const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  const modalContentRef = useRef(null)
  // Commenting out the modal off click because doesn't work as intended
  // const handleModalContainerClick = (e: React.MouseEvent) => {
  //   console.log(e.target)
  //   if (modalContentRef.current && modalContentRef.current !== e.target) {
  //     props.handleClose()
  //   }
  // }

  return (
    <ModalContainer
      //  onClick={handleModalContainerClick}
      {...props}
    >
      <Grid justify="center" container>
        <Grid item xs={11} sm={8}>
          <ModalContent
            backgroundColor={props.backgroundColor}
            ref={modalContentRef}
          >
            {children}
          </ModalContent>
        </Grid>
      </Grid>
    </ModalContainer>
  )
}
