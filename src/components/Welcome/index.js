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

const Welcome = ({ isSignedIn, userIsLoading, onSignUpOpen }) => {
  const [isLargerThanMd] = useMediaQuery(MEDIUM_SCREEN);
  const buttonWidth = isLargerThanMd ? undefined : "100%";

  return (
    <PlainBox>
      {isSignedIn || userIsLoading ? (
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
              Start with $10,000 of fake money to buy and sell stocks. Borrow on
              margin, if you dare
            </ListItem>
            <ListItem>
              Prices automatically change to reflect a team's win/loss record,
              with a minimum of $100 (A .500 record means the stock is worth
              $500)
            </ListItem>
            <ListItem>
              Wins pay shareholders $100 + Margin of Victory per share
            </ListItem>
            <ListItem>Trading locks for games in progress</ListItem>
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
