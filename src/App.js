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
import MobileMenuDrawer from "./components/MobileMenuDrawer";
import Nav from "./components/Nav";
import SellForm from "./components/SellForm";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Portfolio from "./pages/Portfolio";
import "./App.css";

function App() {
  const [isLargerThanMd] = useMediaQuery("(min-width: 60em)");

  const [teams, setTeams] = useState([]);
  const fetchTeams = () => {
    Api.getTeams().then(({ data }) => {
      setTeams(data);
    });
  };
  useEffect(fetchTeams, []);

  const [user, setUser] = useState(null);
  const fetchUser = () => {
    Api.getUser()
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => {
        return;
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
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();
  const {
    isOpen: isLogInOpen,
    onOpen: onLogInOpen,
    onClose: onLogInClose,
  } = useDisclosure();

  if (!teams) {
    return <></>;
  }

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
                />
              </MobileMenuDrawer>
            )}
            <Box
              w={["auto", "auto", "auto", "calc(100% - 200px)"]}
              padding="1rem"
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
                    />
                  }
                />
                {user?.admin && (
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
                      setPrefillBuyTeamId={setPrefillBuyTeamId}
                      setPrefillSellHoldingId={setPrefillSellHoldingId}
                      onBuyOpen={onBuyOpen}
                      onSellOpen={onSellOpen}
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
