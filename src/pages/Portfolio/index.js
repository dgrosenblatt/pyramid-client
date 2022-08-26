import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Spinner,
  Table,
  Td,
  Thead,
  Tbody,
  Tr,
  Th,
  useMediaQuery,
} from "@chakra-ui/react";
import Profile from "../../components/Profile";
import { MEDIUM_SCREEN } from "../../utils/constants";
import { dollars, transactionDate } from "../../utils";
import * as Api from "../../api";
import Maybe from "../../components/_shared/Maybe";

const Portfolio = ({ onSellOpen, setPrefillSellHoldingId, user }) => {
  const [isLargerThanMd] = useMediaQuery(MEDIUM_SCREEN);

  const [balanceTransactions, setBalanceTransactions] = useState([]);

  useEffect(() => {
    Api.getUserBalanceTransactions().then((response) => {
      setBalanceTransactions(response.data);
    });
  }, [user]);

  if (!user) return <Spinner />;

  return (
    <Box>
      <Box
        bgColor="white"
        borderWidth="1px"
        borderRadius="lg"
        marginBottom="1rem"
        padding="2"
      >
        <Heading textAlign="center" marginBottom={"1em"}>
          Portfolio Overview
        </Heading>
        <Profile
          onSellOpen={onSellOpen}
          setPrefillSellHoldingId={setPrefillSellHoldingId}
          user={user}
        />
        <Box
          bgColor="white"
          borderWidth="1px"
          borderRadius="lg"
          marginTop="2"
          marginBottom="1rem"
          padding="2"
        >
          <Heading size="md" marginBottom="1em">
            Transactions
          </Heading>
          <Table variant="striped" colorScheme="gray">
            {isLargerThanMd && (
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Event</Th>
                  <Th>Amount</Th>
                  <Th>Notes</Th>
                </Tr>
              </Thead>
            )}
            <Tbody>
              {balanceTransactions.map((balanceTransaction) =>
                isLargerThanMd ? (
                  <>
                    <Tr key={balanceTransaction.id}>
                      <Td>{transactionDate(balanceTransaction.created_at)}</Td>
                      <Td>{balanceTransaction.event}</Td>
                      <Td>{dollars(balanceTransaction.amount)}</Td>
                      <Td>{balanceTransaction.notes}</Td>
                    </Tr>
                  </>
                ) : (
                  <Tr key={balanceTransaction.id}>
                    <Td>
                      Date: {transactionDate(balanceTransaction.created_at)}
                      <br />
                      Event: {balanceTransaction.event}
                      <br />
                      Amount: {dollars(balanceTransaction.amount)}
                      <br />
                      <Maybe value={balanceTransaction.notes}>
                        Notes: {balanceTransaction.notes}
                      </Maybe>
                    </Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default Portfolio;
