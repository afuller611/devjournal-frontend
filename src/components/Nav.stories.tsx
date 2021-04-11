import { Story, Meta } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { NavProps, Nav } from './Nav'
import StyledNavLink from './NavLink'

export default {
  title: 'Basic/Navigation',
  component: Nav,
} as Meta

const Template: Story<NavProps> = (args) => {
  return (
    <Router>
      <Nav {...args}>
        <StyledNavLink to="#">{'Home'}</StyledNavLink>
        <StyledNavLink to="#">{'About'}</StyledNavLink>
        <StyledNavLink to="#">{'Entries'}</StyledNavLink>
      </Nav>
    </Router>
  )
}

export const Navigation = Template.bind({})
