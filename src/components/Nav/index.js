import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { BsFillGearFill } from "react-icons/bs";
import { FaCashRegister, FaHome } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { AiOutlinePlusSquare, AiOutlineLogin, AiOutlineBank } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
import { BiLineChart, BiCreditCard } from "react-icons/bi";
import {
  LinkBody,
  LinkBodyText,
  NavHeading,
  NavButton,
  NavBox,
} from "./styles";
import Logo from "../_design_system/Logo";

const Nav = ({
  user,
  setUser,
  onSignUpOpen,
  onBuyOpen,
  onSellOpen,
  onLogInOpen,
  onBorrowOpen,
  onRepayOpen,
}) => {
  const toast = useToast();

  const onSignOut = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast({
      title: "You have successfully signed out.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <NavBox>
      <NavHeading size="md" marginTop={["2", "2", "2", "0"]}>
        <Logo />
      </NavHeading>
      <Link to="/">
        <LinkBody>
          <FaHome />
          <LinkBodyText>Dashboard</LinkBodyText>
        </LinkBody>
      </Link>
      {user ? (
        <>
          <Link to="/portfolio">
            <LinkBody>
              <BiLineChart />
              <LinkBodyText>Portfolio</LinkBodyText>
            </LinkBody>
          </Link>
          <NavButton onClick={onBuyOpen}>
            <LinkBody>
              <FaCashRegister />
              <LinkBodyText>Buy</LinkBodyText>
            </LinkBody>
          </NavButton>
          <NavButton onClick={onSellOpen}>
            <LinkBody>
              <GiReceiveMoney />
              <LinkBodyText>Sell</LinkBodyText>
            </LinkBody>
          </NavButton>
          <NavButton onClick={onBorrowOpen}>
            <LinkBody>
              <BiCreditCard />
              <LinkBodyText>Margin</LinkBodyText>
            </LinkBody>
          </NavButton>
          <NavButton onClick={onRepayOpen}>
            <LinkBody>
              <AiOutlineBank />
              <LinkBodyText>Repayment</LinkBodyText>
            </LinkBody>
          </NavButton>
          <NavButton onClick={onSignOut}>
            <LinkBody>
              <VscSignOut />
              <LinkBodyText>Sign Out</LinkBodyText>
            </LinkBody>
          </NavButton>
          {user?.admin && (
            <Link to="/admin">
              <LinkBody>
                <BsFillGearFill />
                <LinkBodyText>Admin</LinkBodyText>
              </LinkBody>
            </Link>
          )}
        </>
      ) : (
        <>
          <NavButton onClick={onLogInOpen}>
            <LinkBody>
              <AiOutlineLogin />
              <LinkBodyText>Log In</LinkBodyText>
            </LinkBody>
          </NavButton>
          <NavButton onClick={onSignUpOpen}>
            <LinkBody>
              <AiOutlinePlusSquare />
              <LinkBodyText>Sign Up</LinkBodyText>
            </LinkBody>
          </NavButton>
        </>
      )}
    </NavBox>
  );
};

export default Nav;
