import { useEffect, useState } from 'react'
import { Box, Button, Heading, Stat, StatGroup, StatLabel, StatNumber, Table, Td,
  Thead, Tbody, Tr, Th, TableCaption, Spinner } from '@chakra-ui/react'
import { dollars } from '../../utils'
import * as Api from '../../api'

const Profile = ({ onSignUpOpen, user }) => {
  const [ranking, setRanking] = useState(null)
  const [rankingIsLoading, setRankingIsLoading] = useState(false)

  useEffect(() => {
    if (!user.guest) {
      setRankingIsLoading(true)

      Api.getUserRanking()
        .then((response) => { setRanking(response.data.ranking)})
        .finally(() => { setRankingIsLoading(false)})
    }
  }, [user])

  const { balance, holdings, total_value } = user

  const holdingsValue = holdings.reduce((acc, holding) => {
    const holdingValue = holding.quantity * holding.team.price
    return acc + holdingValue
  }, 0)

  const title = 'Your Portfolio'

  return (
    <Box bgColor="white" borderWidth='1px' borderRadius='lg' marginTop="2" marginBottom="1rem" padding="2">
      <Heading size="md">{title}</Heading>
      <Heading size="sm">{user.email} {user.name && `[${user.name}]`}</Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Current Ranking</StatLabel>
          <StatNumber>{rankingIsLoading ? <Spinner /> : ranking}</StatNumber>
        </Stat>
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
