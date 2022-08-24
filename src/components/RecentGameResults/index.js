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
} from "@chakra-ui/react";
import * as Api from "../../api";
import { dollars, percent, constants } from "../../utils";

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

  return (
    <Box
      bgColor="white"
      borderWidth="1px"
      borderRadius="lg"
      marginBottom="1rem"
      padding="2"
    >
      <Heading size="md">
        Recent Results {isLoading && <Spinner size="sm" />}
      </Heading>
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
              <Th>$</Th>
              <Th>%</Th>
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
                <Td color={getOutcomeColor(gameResult.price_change_amount)}>
                  {dollars(gameResult.price_change_amount)}
                </Td>
                <Td color={getOutcomeColor(gameResult.price_change_amount)}>
                  {percent(gameResult.price_change_percent)}
                </Td>
                <Td color="green.600">
                  {gameResult.result === "WIN" && "$100"}
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
