import StyledNavLink from './components/NavLink'

const NavContent = () => (
  <div>
    <StyledNavLink activeStyle={{ backgroundColor: 'black' }} to="/home">
      {'Home'}
    </StyledNavLink>
    <StyledNavLink activeStyle={{ backgroundColor: 'black' }} to="/about">
      {'About'}
    </StyledNavLink>
    <StyledNavLink activeStyle={{ backgroundColor: 'black' }} to="/entries">
      {'Entries'}
    </StyledNavLink>
  </div>
)

export default NavContent
