import React from 'react'
import styled from 'styled-components'

export interface NavProps {
  color: string
  height?: string
}

const StyledNav = styled.div<NavProps>`
  background-color: ${(props) => props.color};
  height: ${(props) => props.height};
  display: flex;
  align-items: stretch;
  align-content: center;
`

export const Nav: React.FC<NavProps> = ({
  children,
  color = '#17f8ff',
  height = '10vh',
  ...props
}) => {
  return <StyledNav height={height} color={color} {...props}>{children}</StyledNav>
}
