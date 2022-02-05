import { Box, Button, Heading, Stat, StatGroup, StatLabel, StatNumber, Table, Td,
  Thead, Tbody, Tr, Th, TableCaption } from '@chakra-ui/react'
import { dollars } from '../../utils'

const Profile = ({ onSignUpOpen, user }) => {
  if (!user) {
    user = { balance: 1000000, holdings: [], total_value: 1000000, guest: true }
  }

  const { balance, holdings, total_value } = user

  const holdingsValue = holdings.reduce((acc, holding) => {
    const holdingValue = holding.quantity * holding.team.price
    return acc + holdingValue
  }, 0)

  const title = user.guest ? 'Your Portfolio' : `Holdings | ${user.email}`

  return (
    <Box bgColor="white" borderWidth='1px' borderRadius='lg' marginTop="2" marginBottom="1rem" padding="2">
      <Heading size="md">{title}</Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Total Portfolio Value</StatLabel>
          <StatNumber>{dollars(total_value)}</StatNumber>
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
      <Table variant='striped' colorScheme='green'>
        <Thead>
        <Tr>
          <Th></Th>
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
        {user.guest && <TableCaption paddingTop="4"><Button colorScheme="green" onClick={onSignUpOpen}>Create an account to start trading!</Button></TableCaption>}
        <TableCaption>{holdings.length ? 'Current Positions' : "You don't own any stocks. Holdings will appear here."}</TableCaption>
      </Table>
    </Box>
  )
}

export default Profile
