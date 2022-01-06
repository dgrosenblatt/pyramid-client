import { Link } from 'react-router-dom';
import { BsFillGearFill } from 'react-icons/bs'
import { FaCashRegister, FaHome } from 'react-icons/fa'
import { GiReceiveMoney } from 'react-icons/gi'
import { LinkBody, LinkBodyText, NavHeading, NavButton } from './styles'

const Nav = ({ onBuyOpen }) => (
  <nav>
    <NavHeading size="md">💸 Pyramid</NavHeading>
    <Link to="/">
      <LinkBody>
        <FaHome /><LinkBodyText>Dashboard</LinkBodyText>
      </LinkBody>
    </Link>
    <NavButton onClick={onBuyOpen}>
      <LinkBody>
        <FaCashRegister /><LinkBodyText>Buy</LinkBodyText>
      </LinkBody>
    </NavButton>
    <Link to="/sell">
      <LinkBody>
        <GiReceiveMoney /><LinkBodyText>Sell</LinkBodyText>
      </LinkBody>
    </Link>
    <Link to="/admin">
      <LinkBody>
        <BsFillGearFill /><LinkBodyText>Admin</LinkBodyText>
      </LinkBody>
    </Link>
  </nav>
)

export default Nav
