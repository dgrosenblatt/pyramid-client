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
    <Box bgColor="white" borderWidth='1px' borderRadius='lg' marginBottom="1rem" padding="2">
      <Heading size="md">Season 1 Standings</Heading>
      <Heading size="sm">Division S</Heading>
      <Table size="sm">
        <Thead>
        <Tr>
          <Th></Th>
          <Th>Total</Th>
          <Th>Name</Th>
        </Tr>
        </Thead>
        <Tbody>
          {standings.map((user, index) => (
            <Tr key={user.id}>
              <Td>{index+1}</Td>
              <Td>{dollars(user.total_value)}</Td>
              <Td>{user.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default Standings
