import React from 'react'
import styled, { css } from 'styled-components'

export interface TypographyProps {
  color?: string
  variant?: 'body' | 'subheader' | 'header'
  bold?: boolean
  children: string
  fontFamily?: string
}

const StyledDiv = styled.div<TypographyProps>`
  color: ${(props) => props.color};
  ${({ variant }) =>
    variant === 'body' &&
    css`
      font-size: 1rem;
    `};
  ${({ variant }) =>
    variant === 'subheader' &&
    css`
      font-size: 1.5rem;
    `};
  ${({ variant }) =>
    variant === 'header' &&
    css`
      font-size: 2rem;
    `};
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `};
  ${({ fontFamily }) =>
    fontFamily &&
    css`
      font-family: ${fontFamily};
    `}
`

export const Typography: React.FC<TypographyProps> = ({
  color = '#000',
  children,
  ...props
}) => {
  return (
    <StyledDiv color={color} {...props}>
      {children}
    </StyledDiv>
  )
}
