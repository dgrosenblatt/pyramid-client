import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  TableCaption,
  Td,
  Thead,
  Tbody,
  Tr,
  Th,
  Spinner,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";
import * as Api from "../../api";
import { dollars, percent, constants, gameTime } from "../../utils";
import Maybe from "../_shared/Maybe";

const getOutcomeColor = (gainLoss) => {
  if (gainLoss > 0) {
    return "green.600";
  } else if (gainLoss < 0) {
    return "red.600";
  }
};

const RecentGameResults = () => {
  const [isLargerThanMd] = useMediaQuery(constants.MEDIUM_SCREEN);
  const [gameResults, setGameResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    Api.getRecentGameResults()
      .then(({ data }) => {
        setGameResults(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const scoresUpdatedAt = gameResults[0]?.created_at

  return (
    <Box
      bgColor="white"
      borderWidth="1px"
      borderRadius="lg"
      marginBottom="1rem"
      padding="2"
    >
      <Heading size="md">
        Recent Outcomes {isLoading && <Spinner size="sm" />}
      </Heading>
      <Maybe value={scoresUpdatedAt}>
        <Text marginBottom="1em">Showing outcomes from the past 24h. Last Updated: {gameTime(scoresUpdatedAt)}</Text>
      </Maybe>
      <Table size="sm">
        {isLargerThanMd ? (
          <Thead>
            <Tr>
              <Th>Team</Th>
              <Th>Outcome</Th>
              <Th>Gain/Loss $</Th>
              <Th>Gain/Loss %</Th>
              <Th>Dividend</Th>
            </Tr>
          </Thead>
        ) : (
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>+/-</Th>
              <Th>Div</Th>
            </Tr>
          </Thead>
        )}
        <Tbody>
          {!isLoading &&
            Boolean(gameResults.length) &&
            gameResults.map((gameResult) => (
              <Tr key={gameResult.id}>
                <Td>{gameResult.team.abbreviation}</Td>
                <Td>{gameResult.result}</Td>
                {isLargerThanMd ? (
                  <>
                    <Td color={getOutcomeColor(gameResult.price_change_amount)}>
                      {dollars(gameResult.price_change_amount)}
                    </Td>
                    <Td color={getOutcomeColor(gameResult.price_change_amount)}>
                      {percent(gameResult.price_change_percent)}
                    </Td>
                  </>
                ) : (
                  <Td color={getOutcomeColor(gameResult.price_change_amount)}>
                    {dollars(gameResult.price_change_amount)} ({percent(gameResult.price_change_percent)})
                  </Td>
                )}
                <Td color="green.600">
                  {gameResult.result === "WIN" && (dollars(100 + gameResult.margin_of_victory))}
                </Td>
              </Tr>
            ))}
        </Tbody>
        {!isLoading && !gameResults.length && (
          <TableCaption>No results yet today.</TableCaption>
        )}
      </Table>
    </Box>
  );
};

export default RecentGameResults;
