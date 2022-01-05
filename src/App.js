import { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ChakraProvider, Box, Flex } from '@chakra-ui/react'

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

  if (!teams || !user) {
    return <></>
  }

  return (
    <ChakraProvider>
      <Router>
        <main>
          <Flex h="100%">
            <Box w='200px' h="100%" padding="24px">
              <Nav />
            </Box>
            <Box padding="1rem" bgColor="gray.50">
              <Routes>
                <Route path="/admin" element={<AdminPanel teams={teams} fetchTeams={fetchTeams} />} />
                <Route path="/buy" element={<BuyForm user={user} teams={teams} fetchUser={fetchUser} />} />
                <Route path="/sell" element={<SellForm user={user} holdings={user.holdings} fetchUser={fetchUser} />} />
                <Route path="/" element={<Dashboard user={user} fetchTeams={fetchTeams} teams={teams}/>} />
              </Routes>
            </Box>
          </Flex>
        </main>
      </Router>
    </ChakraProvider>
  );
}

export default App;
