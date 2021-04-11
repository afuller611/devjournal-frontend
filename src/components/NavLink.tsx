import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  padding: 10px;
  color: black;
  font-family: arial;
  &:hover {
    opacity: 0.5;
    background-color: black;
    color: white;
  }
`

export default StyledNavLink
