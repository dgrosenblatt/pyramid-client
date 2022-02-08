import { Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import { BsFillGearFill } from 'react-icons/bs'
import { FaCashRegister, FaHome } from 'react-icons/fa'
import { GiReceiveMoney } from 'react-icons/gi'
import { AiOutlinePlusSquare, AiOutlineLogin } from 'react-icons/ai'
import { VscSignOut } from 'react-icons/vsc'
import { LinkBody, LinkBodyText, NavHeading, NavButton } from './styles'

const Nav = ({ user, setUser, onSignUpOpen, onBuyOpen, onSellOpen, onLogInOpen }) => {
  const toast = useToast()

  const onSignOut = () => {
    setUser(null)
    localStorage.removeItem('token')
    toast({
      title: 'You have successfully signed out.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <nav>
      <NavHeading size="md" marginTop={["2", "2", "2", "0"]}>💸 Pyramid</NavHeading>
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
          <NavButton onClick={onSignOut}>
            <LinkBody>
              <VscSignOut /><LinkBodyText>Sign Out</LinkBodyText>
            </LinkBody>
          </NavButton>
          {user?.admin && (
            <Link to="/admin">
              <LinkBody>
                <BsFillGearFill /><LinkBodyText>Admin</LinkBodyText>
              </LinkBody>
            </Link>
          )}
        </>
      ) : (
        <>
          <NavButton onClick={onLogInOpen}>
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
}

export default Nav
