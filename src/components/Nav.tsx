import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'

export interface NavProps {
  color?: string
  height?: string
}

const StyledNav = styled.div<NavProps>`
  background-color: ${(props) => props.color};
  overflow: hidden;
`

export const Nav: React.FC<NavProps> = ({
  children,
  color = '#17f8ff',
  ...props
}) => {
  return (
    <StyledNav color={color} {...props}>
      <Grid container justify="center">
        <Grid item xs={11} sm={8}>
          {children}
        </Grid>
      </Grid>
    </StyledNav>
  )
}
