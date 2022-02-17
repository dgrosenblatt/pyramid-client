import { useState } from "react";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { TiArrowUnsorted } from "react-icons/ti";
import TeamRow from "../TeamRow";

const TeamsTable = ({ teams, fetchTeams }) => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");

  const [statusSort, setStatusSort] = useState(false);
  const toggleStatus = () => {
    setStatusSort((status) => !status);

    teams = teams.sort((a, b) => {
      return statusSort
        ? ~~b.is_locked - ~~a.is_locked
        : ~~a.is_locked - ~~b.is_locked;
    });
  };

  const [priceSort, setPriceSort] = useState(false);
  const togglePrice = () => {
    setPriceSort((price) => !price);

    teams = teams.sort((a, b) => {
      return priceSort ? a.price - b.price : b.price - a.price;
    });
  };

  return (
    <Box bgColor="white" borderWidth="1px" borderRadius="lg" padding="2">
      <Table variant="striped" colorScheme="green">
        <Thead>
          {isLargerThanMd ? (
            <Tr>
              <Th></Th>
              <Th cursor="pointer" onClick={toggleStatus}>
                <Flex alignItems="center">
                  Trading Status
                  <TiArrowUnsorted />
                </Flex>
              </Th>
              <Th cursor="pointer" onClick={togglePrice}>
                <Flex alignItems="center">
                  Price
                  <TiArrowUnsorted />
                </Flex>
              </Th>
              <Th>W</Th>
              <Th>L</Th>
              <Th>T</Th>
            </Tr>
          ) : (
            <Tr>
              <Th></Th>
              <Th>Price</Th>
            </Tr>
          )}
        </Thead>
        <Tbody>
          {teams.map((team) => (
            <TeamRow
              key={team.id}
              team={team}
              fetchTeams={fetchTeams}
              isAdmin={false}
            />
          ))}
        </Tbody>
        <TableCaption>
          <Text>Prices are based on W%, minimum $100</Text>
          <Text>W pays $100 dividend per share</Text>
        </TableCaption>
      </Table>
    </Box>
  );
};

export default TeamsTable;
