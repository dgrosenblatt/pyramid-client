import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { BsFillGearFill } from "react-icons/bs";
import { FaCashRegister, FaHome } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import {
  AiOutlinePlusSquare,
  AiOutlineLogin,
  AiOutlineBank,
} from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
import { BiLineChart, BiCreditCard } from "react-icons/bi";
import {
  LinkBody,
  LinkBodyText,
  LinkSectionHeader,
  SectionLink,
  NavHeading,
  NavButton,
  NavBox,
} from "./styles";
import Logo from "../_design_system/Logo";
import { PAGES } from "../../utils/constants";

const Nav = ({
  user,
  setUser,
  onSignUpOpen,
  onBuyOpen,
  onSellOpen,
  onLogInOpen,
  onBorrowOpen,
  onRepayOpen,
  activePage,
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

  const isDashboardPageActive = activePage === PAGES.DASHBOARD;
  const isPortfolioPageActive = activePage === PAGES.PORTFOLIO;

  return (
    <NavBox>
      <NavHeading size="md" marginTop={["2", "2", "2", "0"]}>
        <Logo />
      </NavHeading>
      <Link to="/">
        <LinkBody active={isDashboardPageActive}>
          <FaHome />
          <LinkBodyText>Dashboard</LinkBodyText>
        </LinkBody>
      </Link>
      {user ? (
        <>
          <Link to="/portfolio">
            <LinkBody active={isPortfolioPageActive}>
              <BiLineChart />
              <LinkBodyText>Portfolio</LinkBodyText>
            </LinkBody>
          </Link>
          <LinkSectionHeader>Trading</LinkSectionHeader>
          <NavButton onClick={onBuyOpen}>
            <SectionLink>
              <FaCashRegister />
              <LinkBodyText>Buy</LinkBodyText>
            </SectionLink>
          </NavButton>
          <NavButton onClick={onSellOpen}>
            <SectionLink>
              <GiReceiveMoney />
              <LinkBodyText>Sell</LinkBodyText>
            </SectionLink>
          </NavButton>
          <LinkSectionHeader>Margin</LinkSectionHeader>
          <NavButton onClick={onBorrowOpen}>
            <SectionLink>
              <BiCreditCard />
              <LinkBodyText>Borrow</LinkBodyText>
            </SectionLink>
          </NavButton>
          <NavButton onClick={onRepayOpen}>
            <SectionLink>
              <AiOutlineBank />
              <LinkBodyText>Repay</LinkBodyText>
            </SectionLink>
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
