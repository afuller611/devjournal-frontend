import StyledNavLink from '../../components/NavLink'
import logo from '../../components/assets/DevJournalLogo.png';

const NavContent = () => (
  <div style={{ display: "flex" }}>
    <img src={logo} alt="Dev Journal" style={{ height: 60, marginRight: 10, marginTop: 5 }} />
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
