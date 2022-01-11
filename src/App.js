import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as Api from './api'
import { ChakraProvider, Box, Flex, Drawer, DrawerOverlay, DrawerContent,
  DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure } from '@chakra-ui/react'

import AccountForm from './components/AccountForm'
import BuyForm from './components/BuyForm'
import Nav from './components/Nav'
import SellForm from './components/SellForm'
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import './App.css';

function App() {
  const [teams, setTeams] = useState([])
  const fetchTeams = () => {
    Api.getTeams().then(
      ({ data }) => {
        setTeams(data)
      })
  }
  useEffect(fetchTeams, [])

  const [user, setUser] = useState(null)
  const fetchUser = () => {
    Api.getUser()
      .then(({ data }) => {
        setUser(data)
      })
      .catch(() =>{
        return
      })
  }
  useEffect(fetchUser, [])

  const { isOpen: isBuyOpen, onOpen: onBuyOpen, onClose: onBuyClose } = useDisclosure()
  const { isOpen: isSellOpen, onOpen: onSellOpen, onClose: onSellClose } = useDisclosure()
  const { isOpen: isSignUpOpen, onOpen: onSignUpOpen, onClose: onSignUpClose } = useDisclosure()

  if (!teams) {
    return <></>
  }

  return (
    <ChakraProvider>
      <Router>
        <main>
          <Flex h="100%">
            <Box w='200px' h="100%" padding="24px">
              <Nav user={user} onSignUpOpen={onSignUpOpen} onBuyOpen={onBuyOpen} onSellOpen={onSellOpen}/>
            </Box>
            <Box w="calc(100% - 200px)" h="100%" padding="1rem" bgColor="gray.50">
              <Routes>
                <Route path="/admin" element={<AdminPanel teams={teams} fetchTeams={fetchTeams} />} />
                <Route path="/" element={<Dashboard onSignUpOpen={onSignUpOpen} user={user} fetchTeams={fetchTeams} teams={teams}/>} />
              </Routes>
            </Box>
          </Flex>
        </main>
      </Router>
      {user ? (
        <>
          <Drawer
            isOpen={isBuyOpen}
            placement='right'
            onClose={onBuyClose}
            blockScrollOnMount={false}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Buy Shares</DrawerHeader>
              <DrawerBody>
                <BuyForm user={user} teams={teams} fetchUser={fetchUser} onBuyClose={onBuyClose}/>
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <Drawer
            isOpen={isSellOpen}
            placement='right'
            onClose={onSellClose}
            blockScrollOnMount={false}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Sell Shares</DrawerHeader>
              <DrawerBody>
                <SellForm holdings={user.holdings} fetchUser={fetchUser} onSellClose={onSellClose}/>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <Drawer
          isOpen={isSignUpOpen}
          placement='right'
          onClose={onSignUpClose}
          blockScrollOnMount={false}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create New Account</DrawerHeader>
            <DrawerBody>
              <AccountForm onSignUpClose={onSignUpClose} setUser={setUser}/>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </ChakraProvider>
  );
}

export default App;
