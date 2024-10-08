import { useState } from "react";
import {
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
import Loadable from "../_shared/Loadable";
import PlainBox from "../_design_system/PlainBox";

const TeamsTable = ({
  teams,
  teamsAreLoading,
  fetchTeams,
  setPrefillBuyTeamId,
  onBuyOpen,
}) => {
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
    <PlainBox>
      <Table variant="striped" colorScheme="gray">
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
              <Th>Next</Th>
              <Th>Potential Return/Loss</Th>
              <Th>Record</Th>
            </Tr>
          ) : (
            <Tr>
              <Th textAlign="center">Teams</Th>
            </Tr>
          )}
        </Thead>
        <Loadable isLoading={teamsAreLoading}>
          <Tbody>
            {teams.map((team) => (
              <TeamRow
                key={team.id}
                team={team}
                fetchTeams={fetchTeams}
                isAdmin={false}
                setPrefillBuyTeamId={setPrefillBuyTeamId}
                onBuyOpen={onBuyOpen}
              />
            ))}
          </Tbody>
        </Loadable>
        <TableCaption>
          <Text>Prices are based on W%, minimum $100</Text>
          <Text>W pays $100 + Margin of Victory dividend per share</Text>
        </TableCaption>
      </Table>
    </PlainBox>
  );
};

export default TeamsTable;
