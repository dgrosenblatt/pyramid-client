import { Box, Heading, Stat, StatGroup, StatLabel, StatNumber, Table, Td,
  Thead, Tbody, Tr, Th, TableCaption } from '@chakra-ui/react'
import { dollars } from '../../utils'

const Profile = ({ user }) => {
  if (!user) {
    return <></>
  }

  const { name, balance, holdings } = user

  const holdingsValue = holdings.reduce((acc, holding) => {
    const holdingValue = holding.quantity * holding.team.price
    return acc + holdingValue
  }, 0)

  return (
    <Box borderWidth='1px' borderRadius='lg' marginTop="2" padding="2">
      <Heading>Profile for {name}</Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Total Portfolio Value</StatLabel>
          <StatNumber>{dollars(balance + holdingsValue)}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Available cash</StatLabel>
          <StatNumber>{dollars(balance)}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Holdings value</StatLabel>
          <StatNumber>{dollars(holdingsValue)}</StatNumber>
        </Stat>
      </StatGroup>
      <Table variant='striped' colorScheme='gray'>
        <Thead>
        <Tr>
          <Th>Team</Th>
          <Th>Quantity</Th>
          <Th>Current Price</Th>
          <Th>Total Value</Th>
        </Tr>
        </Thead>
        <Tbody>
          {holdings.map(holding => (
            <Tr key={holding.id}>
              <Td>{holding.team.name}</Td>
              <Td>{holding.quantity}</Td>
              <Td>{dollars(holding.team.price)}</Td>
              <Td>{dollars(holding.quantity * holding.team.price)}</Td>
            </Tr>
          ))}
        </Tbody>
        <TableCaption>Current Positions</TableCaption>
      </Table>
    </Box>
  )
}

export default Profile
