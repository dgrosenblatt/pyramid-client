import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Api from "./api";
import {
  ChakraProvider,
  Box,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

import AccountForm from "./components/AccountForm";
import PasswordForm from "./components/PasswordForm";
import SessionForm from "./components/SessionForm";
import BuyForm from "./components/BuyForm";
import BorrowForm from "./components/BorrowForm";
import RepaymentForm from "./components/RepaymentForm";
import MobileMenuDrawer from "./components/MobileMenuDrawer";
import Nav from "./components/Nav";
import SellForm from "./components/SellForm";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Portfolio from "./pages/Portfolio";
import "./App.css";

function App() {
  const [isLargerThanMd] = useMediaQuery("(min-width: 60em)");
  const [activePage, setActivePage] = useState(null);

  const [teams, setTeams] = useState([]);
  const [teamsAreLoading, setTeamsAreLoading] = useState([]);
  const fetchTeams = () => {
    setTeamsAreLoading(true);
    Api.getTeams()
      .then(({ data }) => {
        setTeams(data);
      })
      .finally(() => {
        setTeamsAreLoading(false);
      });
  };
  useEffect(fetchTeams, []);

  const [user, setUser] = useState(null);
  const [userIsLoading, setUserIsLoading] = useState(false);
  const fetchUser = () => {
    setUserIsLoading(true);
    Api.getUser()
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => {
        return;
      })
      .finally(() => {
        setUserIsLoading(false);
      });
  };
  useEffect(fetchUser, []);

  const [prefillBuyTeamId, setPrefillBuyTeamId] = useState(null);
  const [prefillSellHoldingId, setPrefillSellHoldingId] = useState(null);

  const {
    isOpen: isBuyOpen,
    onOpen: onBuyOpen,
    onClose: onBuyClose,
  } = useDisclosure();
  const {
    isOpen: isSellOpen,
    onOpen: onSellOpen,
    onClose: onSellClose,
  } = useDisclosure();
  const {
    isOpen: isBorrowOpen,
    onOpen: onBorrowOpen,
    onClose: onBorrowClose,
  } = useDisclosure();
  const {
    isOpen: isRepayOpen,
    onOpen: onRepayOpen,
    onClose: onRepayClose,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();
  const {
    isOpen: isLogInOpen,
    onOpen: onLogInOpen,
    onClose: onLogInClose,
  } = useDisclosure();

  return (
    <ChakraProvider>
      <Router>
        <main>
          <Flex
            minHeight="100vh"
            direction={["column", "column", "column", "row"]}
          >
            {isLargerThanMd ? (
              <Box w="200px" padding="24px" backgroundColor="gray.600">
                <Nav
                  user={user}
                  setUser={setUser}
                  onSignUpOpen={onSignUpOpen}
                  onBuyOpen={onBuyOpen}
                  onSellOpen={onSellOpen}
                  onLogInOpen={onLogInOpen}
                  onBorrowOpen={onBorrowOpen}
                  onRepayOpen={onRepayOpen}
                  activePage={activePage}
                />
              </Box>
            ) : (
              <MobileMenuDrawer>
                <Nav
                  user={user}
                  setUser={setUser}
                  onSignUpOpen={onSignUpOpen}
                  onBuyOpen={onBuyOpen}
                  onSellOpen={onSellOpen}
                  onLogInOpen={onLogInOpen}
                  onBorrowOpen={onBorrowOpen}
                  onRepayOpen={onRepayOpen}
                  activePage={activePage}
                />
              </MobileMenuDrawer>
            )}
            <Box
              w={["auto", "auto", "auto", "calc(100% - 200px)"]}
              padding={["0", "0", "1rem", "1rem"]}
              bgColor="gray.50"
            >
              <Routes>
                <Route
                  path="/password/edit"
                  element={<PasswordForm setUser={setUser} />}
                />
                <Route
                  path="/portfolio"
                  element={
                    <Portfolio
                      user={user}
                      setPrefillSellHoldingId={setPrefillSellHoldingId}
                      onSellOpen={onSellOpen}
                      setActivePage={setActivePage}
                    />
                  }
                />
                {user?.admin && Boolean(teams.length) && (
                  <Route
                    path="/admin"
                    element={
                      <AdminPanel teams={teams} fetchTeams={fetchTeams} />
                    }
                  />
                )}
                <Route
                  path="/"
                  element={
                    <Dashboard
                      onSignUpOpen={onSignUpOpen}
                      user={user}
                      fetchTeams={fetchTeams}
                      teams={teams}
                      teamsAreLoading={teamsAreLoading}
                      setPrefillBuyTeamId={setPrefillBuyTeamId}
                      setPrefillSellHoldingId={setPrefillSellHoldingId}
                      onBuyOpen={onBuyOpen}
                      onSellOpen={onSellOpen}
                      setActivePage={setActivePage}
                      userIsLoading={userIsLoading}
                    />
                  }
                />
              </Routes>
            </Box>
          </Flex>
        </main>
      </Router>
      {user ? (
        <>
          <Drawer
            isOpen={isBuyOpen}
            placement="right"
            onClose={onBuyClose}
            blockScrollOnMount={false}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Buy Shares</DrawerHeader>
              <DrawerBody>
                <BuyForm
                  user={user}
                  teams={teams}
                  teamsAreLoading={teamsAreLoading}
                  fetchUser={fetchUser}
                  onBuyClose={onBuyClose}
                  prefillBuyTeamId={prefillBuyTeamId}
                  setPrefillBuyTeamId={setPrefillBuyTeamId}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <Drawer
            isOpen={isSellOpen}
            placement="right"
            onClose={onSellClose}
            blockScrollOnMount={false}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Sell Shares</DrawerHeader>
              <DrawerBody>
                <SellForm
                  holdings={user.holdings}
                  fetchUser={fetchUser}
                  onSellClose={onSellClose}
                  prefillSellHoldingId={prefillSellHoldingId}
                  setPrefillSellHoldingId={setPrefillSellHoldingId}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <Drawer
            isOpen={isBorrowOpen}
            placement="right"
            onClose={onBorrowClose}
            blockScrollOnMount={false}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Borrow on Margin</DrawerHeader>
              <DrawerBody>
                <BorrowForm
                  user={user}
                  fetchUser={fetchUser}
                  onBorrowClose={onBorrowClose}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <Drawer
            isOpen={isRepayOpen}
            placement="right"
            onClose={onRepayClose}
            blockScrollOnMount={false}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Repay Margin</DrawerHeader>
              <DrawerBody>
                <RepaymentForm
                  user={user}
                  fetchUser={fetchUser}
                  onRepayClose={onRepayClose}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <>
          <Drawer
            isOpen={isSignUpOpen}
            placement="right"
            onClose={onSignUpClose}
            blockScrollOnMount={false}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Create New Account</DrawerHeader>
              <DrawerBody>
                <AccountForm onSignUpClose={onSignUpClose} setUser={setUser} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          <Drawer
            isOpen={isLogInOpen}
            placement="right"
            onClose={onLogInClose}
            blockScrollOnMount={false}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Log In To Your Account</DrawerHeader>
              <DrawerBody>
                <SessionForm onLogInClose={onLogInClose} setUser={setUser} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </ChakraProvider>
  );
}

export default App;
