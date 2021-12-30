import { useState, useEffect } from 'react'
import { Box, Heading, Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react'
import axios from 'axios'
import TeamRow from '../TeamRow'

const TeamsList = () => {
  const [teams, setTeams] = useState([])

  const fetchTeams = () => {
    axios
      .get('http://localhost:3000/teams')
      .then(({ data }) => {
        setTeams(data)
      })
  }

  useEffect(fetchTeams, [])

  return (
    <Box borderWidth='1px' borderRadius='lg'>
      <Heading>Teams</Heading>
      <Table variant='striped' colorScheme='teal'>
        <Thead>
        <Tr>
          <Th>Team</Th>
          <Th>Trading Status</Th>
          <Th>Wins</Th>
          <Th>Losses</Th>
          <Th>Ties</Th>
          <Th>Actions</Th>
        </Tr>
        </Thead>
        <Tbody>
          {teams.map(team => <TeamRow key={team.id} team={team} fetchTeams={fetchTeams} />)}
        </Tbody>
      </Table>
    </Box>
  )
}

export default TeamsList;
