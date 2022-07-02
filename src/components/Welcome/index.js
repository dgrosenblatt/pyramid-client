import { UnorderedList, ListItem, Box, Heading } from '@chakra-ui/react';
import PlainBox from '../_design_system/PlainBox'

const Welcome = () => {
  return (
    <PlainBox
      bgColor="white"
      borderWidth="1px"
      borderRadius="lg"
      marginTop="2"
      marginBottom="1rem"
      padding="2"
    >
      <Heading size={3}>Welcome to Sportfolio! Sportfolio is a fantasy sports game and stock market simulation.</Heading>
      <Box>How it works:</Box>
      <UnorderedList spacing={2}>
        <ListItem>Start with $10,000 of fake money to buy and sell stocks</ListItem>
        <ListItem>Stock prices automatically change to reflect a team's win/loss record (.500 record means the stock is worth $500)</ListItem>
        <ListItem>Shareholders receive a $100 per share dividend for wins</ListItem>
        <ListItem>Trading locks for teams with a game in progress</ListItem>
        <ListItem>The money is, and I can't emphasize this enough, just pretend</ListItem>
      </UnorderedList>
  </PlainBox>
  )
}

export default Welcome;
