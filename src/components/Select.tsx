import React from 'react'
import styled from 'styled-components'
import StyledLabel from './StyledLabel'

export interface SelectProps {
  focusColor?: string
  borderColor?: string
  id: string
  label: string
  labelColor?: string
  children: any
  fullWidth: boolean
  value?: string
  onChange?: () => void
  disabled?: boolean
  required?: boolean
}

const StyledSelect = styled.select<SelectProps>`
  display: block;
  padding: 18px 14px;
  border: none;
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 10px;
  &:focus {
    outline: 0;
    border: 1px solid ${(props) => props.focusColor};
    border-radius: 10px;
  }
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  font-size: 1rem;
`

export const Select: React.FC<SelectProps> = ({
  focusColor = '#17f8ff',
  borderColor = '#645f5f',
  labelColor = '#645f5f',
  children,
  ...props
}) => {
  return (
    <>
      <StyledLabel labelColor={labelColor} htmlFor={props.id}>
        {`${props.label}${props.required ? "*" : ""}`}
      </StyledLabel>
      <StyledSelect
        focusColor={focusColor}
        borderColor={borderColor}
        {...props}
      >
        {children}
      </StyledSelect>
    </>
  )
}
