import { useEffect, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios'

import TeamsTable from './components/TeamsTable';
import Profile from './components/Profile'
import BuyForm from './components/BuyForm'
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
      <main>
        <Profile user={user}/>
        <BuyForm user={user} teams={teams} fetchUser={fetchUser} />
        <TeamsTable teams={teams} fetchTeams={fetchTeams} />
      </main>
    </ChakraProvider>
  );
}

export default App;
