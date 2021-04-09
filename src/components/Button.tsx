import React from 'react'
import styled from 'styled-components'

export interface ButtonProps {
  backgroundColor?: string
  textColor?: string
  size?: 'small' | 'medium' | 'large'
  children: string
  onClick?: () => void
}

const StyledButton = styled.button<ButtonProps>`
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    border: none;
    padding: ${(props) =>
      props.size === 'medium'
        ? '16px 28px;'
        : props.size === 'large'
        ? '20px 30px;'
        : '14px 18px;'}
    font-size: ${(props) =>
      props.size === 'medium'
        ? '18px;'
        : props.size === 'large'
        ? '24px;'
        : '14px;'}
    border-radius: 4px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.5s ease 0s;
    &:hover {
      background-color: ${(props) => props.textColor};
      color: ${(props) => props.backgroundColor};
      box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.4);

    }
`
export const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  backgroundColor = '#17f8ff',
  textColor = '#fff',
  children,
  ...props
}) => {
  return (
    <StyledButton
      backgroundColor={backgroundColor}
      textColor={textColor}
      size={size}
      {...props}
    >
      {children}
    </StyledButton>
  )
}
