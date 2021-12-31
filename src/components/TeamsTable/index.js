import { Box, Heading, Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react'
import TeamRow from '../TeamRow'

const TeamsList = ({ teams, fetchTeams }) => {
  return (
    <Box borderWidth='1px' borderRadius='lg' padding="2">
      <Heading>Teams</Heading>
      <Table variant='striped' colorScheme='gray'>
        <Thead>
        <Tr>
          <Th>Team</Th>
          <Th>Trading Status</Th>
          <Th>Price</Th>
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
