import { Box, Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react'
import TeamRow from '../TeamRow'

const AdminTeamsTable = ({ teams, fetchTeams }) => {
  return (
    <Box bgColor="white" borderWidth='1px' borderRadius='lg' padding="2">
      <Table variant='striped' colorScheme='green'>
        <Thead>
        <Tr>
          <Th></Th>
          <Th>Trading Status</Th>
          <Th>Price</Th>
          <Th>W</Th>
          <Th>L</Th>
          <Th>T</Th>
          <Th>Actions</Th>
        </Tr>
        </Thead>
        <Tbody>
          {teams.map(team => <TeamRow key={team.id} team={team} fetchTeams={fetchTeams} isAdmin={true}/>)}
        </Tbody>
      </Table>
    </Box>
  )
}

export default AdminTeamsTable;
