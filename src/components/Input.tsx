import React from 'react'
import styled from 'styled-components'
import StyledLabel from './StyledLabel'

export interface InputProps {
  focusColor?: string
  borderColor?: string
  type?: 'text' | 'password'
  id: string
  label: string
  labelColor?: string
  value?: string
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void
  disabled?: boolean
  required?: boolean
  placeholder?: string
}

const StyledInput = styled.input<InputProps>`
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
  font-size: 1rem;
`

export const Input: React.FC<InputProps> = ({
  focusColor = '#17f8ff',
  borderColor = '#645f5f',
  type = 'text',
  labelColor = '#645f5f',
  children,
  ...props
}) => {
  return (
    <>
      <StyledLabel labelColor={labelColor} htmlFor={props.id}>
      {`${props.label}${props.required ? "*" : ""}`}
      </StyledLabel>
      <StyledInput
        focusColor={focusColor}
        borderColor={borderColor}
        type={type}
        {...props}
      />
    </>
  )
}
