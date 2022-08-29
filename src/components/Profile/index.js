import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Table,
  Td,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  Spinner,
  useMediaQuery,
} from "@chakra-ui/react";
import { MEDIUM_SCREEN } from "../../utils/constants";
import { dollars, percent } from "../../utils";
import * as Api from "../../api";
import Maybe from "../_shared/Maybe";
import { Gain, Loss, PlainButton } from "./styles";

const Profile = ({ user, setPrefillSellHoldingId, onSellOpen }) => {
  const [isLargerThanMd] = useMediaQuery(MEDIUM_SCREEN);

  const [ranking, setRanking] = useState(null);
  const [rankingIsLoading, setRankingIsLoading] = useState(false);

  useEffect(() => {
    setRankingIsLoading(true);

    Api.getUserRanking()
      .then((response) => {
        setRanking(response.data.ranking);
      })
      .finally(() => {
        setRankingIsLoading(false);
      });
  }, [user]);

  const { balance, holdings, total_value } = user;

  const holdingsValue = holdings.reduce((acc, holding) => {
    const holdingValue = holding.quantity * holding.team.price;
    return acc + holdingValue;
  }, 0);

  const onClickSell = (holdingId) => {
    setPrefillSellHoldingId(holdingId);
    onSellOpen();
  };

  const title = "Summary";

  return (
    <Box
      bgColor="white"
      borderWidth="1px"
      borderRadius="lg"
      marginTop="2"
      marginBottom="1rem"
      padding="2"
    >
      <Heading size="md">{title}</Heading>
      <Heading size="sm">
        {user.email} <Maybe value={user.name}>[{user.name}]</Maybe>
      </Heading>
      <StatGroup
        flexDirection={["column", "column", "column", "row"]}
        flexWrap="wrap"
        height={["130px", "130px", "130px", "auto"]}
      >
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
      {isLargerThanMd ? (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Quantity</Th>
              <Th>Price</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {holdings.map((holding) => (
              <>
                <Tr key={holding.id}>
                  <Td>{holding.team.abbreviation}</Td>
                  <Td>{holding.quantity}</Td>
                  <Td>
                    <Price holding={holding} />
                  </Td>
                  <Td display="flex" justifyContent="space-between">
                    {dollars(holding.quantity * holding.team.price)}
                    <Button
                      onClick={() => onClickSell(holding.id)}
                      colorScheme="red"
                      size="xs"
                    >
                      Sell
                    </Button>
                  </Td>
                </Tr>
              </>
            ))}
          </Tbody>
          <TableCaption>
            {holdings.length
              ? "Current Positions"
              : "You don't own any stocks. Holdings will appear here."}
          </TableCaption>
        </Table>
      ) : (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {holdings.map((holding) => (
              <>
                <Tr key={holding.id}>
                  <Td display="flex" justifyContent="space-between">
                    {holding.quantity} {holding.team.abbreviation} @{" "}
                    {dollars(holding.team.price)}
                    <PlainButton onClick={() => onClickSell(holding.id)}>
                      Sell
                    </PlainButton>
                  </Td>
                  <Td>{dollars(holding.quantity * holding.team.price)}</Td>
                </Tr>
              </>
            ))}
          </Tbody>
          <TableCaption>
            {holdings.length
              ? "Current Positions"
              : "You don't own any stocks. Holdings will appear here."}
          </TableCaption>
        </Table>
      )}
    </Box>
  );
};

const Price = ({ holding }) => {
  // going to replace with holding_game_result
  const dollarAmount = dollars(holding.team.price);

  const recentGameResult = holding.team.recent_game_results[0];

  if (!recentGameResult) return dollarAmount;

  const { price_change_amount, price_change_percent } = recentGameResult;

  if (price_change_amount === 0) {
    return dollarAmount;
  } else if (price_change_amount > 0) {
    return (
      <>
        {dollarAmount}
        <Gain>
          {" "}
          (+{dollars(price_change_amount)}, {percent(price_change_percent)})
        </Gain>
      </>
    );
  } else {
    return (
      <>
        {dollarAmount}
        <Loss>
          {" "}
          ({dollars(price_change_amount)}, {percent(price_change_percent)})
        </Loss>
      </>
    );
  }
};

export default Profile;
