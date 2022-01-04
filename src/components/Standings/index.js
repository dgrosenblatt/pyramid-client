import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Heading, Table, Td, Thead, Tbody, Tr, Th } from '@chakra-ui/react'
import { dollars } from '../../utils'

const Standings = () => {
  const [standings, setStandings] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3000/standings')
      .then(({ data }) => {
        setStandings(data)
      })
  }, [])

  return (
    <Box borderWidth='1px' borderRadius='lg' marginTop="2" padding="2">
      <Heading size="md">Season 1 Standings</Heading>
      <Heading size="sm">Division S</Heading>
      <Table colorScheme='gray' size="sm">
        <Thead>
        <Tr>
          <Th>Rank</Th>
          <Th>$</Th>
          <Th>Name</Th>
        </Tr>
        </Thead>
        <Tbody>
          {standings.map((user, index) => (
            <Tr key={user.id}>
              <Td>{index+1}</Td>
              <Td>{dollars(user.balance)}</Td>
              <Td>{user.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default Standings
