import {
  Button,
  UnorderedList,
  ListItem,
  Box,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import { MEDIUM_SCREEN } from "../../utils/constants";
import PlainBox from "../_design_system/PlainBox";
import { ButtonContainer } from "./styles";

const Welcome = ({ isSignedIn, onSignUpOpen }) => {
  const [isLargerThanMd] = useMediaQuery(MEDIUM_SCREEN);
  const buttonWidth = isLargerThanMd ? undefined : "100%";

  return (
    <PlainBox
      bgColor="white"
      borderWidth="1px"
      borderRadius="lg"
      marginTop="2"
      marginBottom="1rem"
      padding="2"
    >
      {isSignedIn ? (
        <Heading size={3}>Welcome back!</Heading>
      ) : (
        <>
          <Heading size={3}>
            Welcome to Sportfolio! Sportfolio is a fantasy sports game and stock
            market simulation.
          </Heading>
          <Box>How it works:</Box>
          <UnorderedList spacing={2} marginBottom="1em">
            <ListItem>
              Start with $10,000 of fake money to buy and sell stocks
            </ListItem>
            <ListItem>
              Stock prices automatically change to reflect a team's win/loss
              record (.500 record means the stock is worth $500)
            </ListItem>
            <ListItem>
              Shareholders receive a $100 per share dividend for wins
            </ListItem>
            <ListItem>Trading locks for teams with a game in progress</ListItem>
            <ListItem>
              The money is just made up and the points don't matter.
            </ListItem>
          </UnorderedList>
          <ButtonContainer>
            <Button
              width={buttonWidth}
              size="lg"
              colorScheme="green"
              onClick={onSignUpOpen}
            >
              Sign up to start trading!
            </Button>
          </ButtonContainer>
        </>
      )}
    </PlainBox>
  );
};

export default Welcome;
