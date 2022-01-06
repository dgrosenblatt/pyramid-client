import { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ChakraProvider, Box, Flex, Drawer, DrawerOverlay, DrawerContent,
  DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure } from '@chakra-ui/react'

import BuyForm from './components/BuyForm'
import Nav from './components/Nav'
import SellForm from './components/SellForm'
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import './App.css';

function App() {
  const [teams, setTeams] = useState([])
  const fetchTeams = () => {
    axios
      .get('http://localhost:3000/teams')
      .then(({ data }) => {
        setTeams(data)
      })
  }
  useEffect(fetchTeams, [])

  const [user, setUser] = useState(null)
  const fetchUser = () => {
    axios
      .get('http://localhost:3000/current_user')
      .then(({ data }) => {
        setUser(data)
      })
  }
  useEffect(fetchUser, [])

  const { isOpen: isBuyOpen, onOpen: onBuyOpen, onClose: onBuyClose } = useDisclosure()
  const { isOpen: isSellOpen, onOpen: onSellOpen, onClose: onSellClose } = useDisclosure()

  if (!teams || !user) {
    return <></>
  }

  return (
    <ChakraProvider>
      <Router>
        <main>
          <Flex h="100%">
            <Box w='200px' h="100%" padding="24px">
              <Nav onBuyOpen={onBuyOpen} onSellOpen={onSellOpen}/>
            </Box>
            <Box w="calc(100% - 200px)" h="100%" padding="1rem" bgColor="gray.50">
              <Routes>
                <Route path="/admin" element={<AdminPanel teams={teams} fetchTeams={fetchTeams} />} />
                <Route path="/" element={<Dashboard user={user} fetchTeams={fetchTeams} teams={teams}/>} />
              </Routes>
            </Box>
          </Flex>
        </main>
      </Router>
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
            <SellForm user={user} holdings={user.holdings} fetchUser={fetchUser} onSellClose={onSellClose}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  );
}

export default App;
