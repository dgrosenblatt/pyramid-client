import { Link } from 'react-router-dom';
import { BsFillGearFill } from 'react-icons/bs'
import { FaCashRegister, FaHome } from 'react-icons/fa'
import { GiReceiveMoney } from 'react-icons/gi'
import { AiOutlinePlusSquare, AiOutlineLogin } from 'react-icons/ai'
import { LinkBody, LinkBodyText, NavHeading, NavButton } from './styles'

const Nav = ({ user, onSignUpOpen, onBuyOpen, onSellOpen }) => (
  <nav>
    <NavHeading size="md">💸 Pyramid</NavHeading>
    <Link to="/">
      <LinkBody>
        <FaHome /><LinkBodyText>Dashboard</LinkBodyText>
      </LinkBody>
    </Link>
    {user ? (
      <>
        <NavButton onClick={onBuyOpen}>
          <LinkBody>
            <FaCashRegister /><LinkBodyText>Buy</LinkBodyText>
          </LinkBody>
        </NavButton>
        <NavButton onClick={onSellOpen}>
          <LinkBody>
            <GiReceiveMoney /><LinkBodyText>Sell</LinkBodyText>
          </LinkBody>
        </NavButton>
        <Link to="/admin">
          <LinkBody>
            <BsFillGearFill /><LinkBodyText>Admin</LinkBodyText>
          </LinkBody>
        </Link>
      </>
    ) : (
      <>
        <NavButton onClick={() => {}}>
          <LinkBody>
            <AiOutlineLogin /><LinkBodyText>Log In</LinkBodyText>
          </LinkBody>
        </NavButton>
        <NavButton onClick={onSignUpOpen}>
          <LinkBody>
            <AiOutlinePlusSquare /><LinkBodyText>Sign Up</LinkBodyText>
          </LinkBody>
        </NavButton>
      </>
    )}
  </nav>
)

export default Nav
