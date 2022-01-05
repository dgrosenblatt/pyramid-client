import { Link } from 'react-router-dom';
import { BsFillGearFill } from 'react-icons/bs'
import { FaCashRegister, FaHome } from 'react-icons/fa'
import { GiReceiveMoney } from 'react-icons/gi'
import { LinkBody, LinkBodyText, NavHeading } from './styles'

const Nav = () => {


  return (
    <nav>
      <NavHeading size="md">💸 Pyramid</NavHeading>
      <Link to="/">
        <LinkBody>
          <FaHome /><LinkBodyText>Dashboard</LinkBodyText>
        </LinkBody>
      </Link>
      <Link to="/buy">
        <LinkBody>
          <FaCashRegister /><LinkBodyText>Buy</LinkBodyText>
        </LinkBody>
      </Link>
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
}

export default Nav
