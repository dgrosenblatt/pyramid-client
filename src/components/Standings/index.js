import { useEffect, useState } from "react";
import { Heading, Table, Td, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import * as Api from "../../api";
import { dollars, publicName } from "../../utils";
import Loadable from "../_shared/Loadable";
import PlainBox from "../_design_system/PlainBox";

const getRowFontWeight = (place) => {
  if (place > 5) return "regular";
  if (place > 1) return "semibold";
  return "bold";
};

const getRowBackgroundColor = ({ user, currentUser }) => {
  return currentUser?.id === user.id ? "blue.100" : "none";
};

const Standings = ({ currentUser }) => {
  const [standings, setStandings] = useState([]);
  const [areStandingsLoading, setAreStandingsLoading] = useState(false);
  useEffect(() => {
    setAreStandingsLoading(true);
    Api.getStandings()
      .then(({ data }) => {
        setStandings(data);
      })
      .finally(() => {
        setAreStandingsLoading(false);
      });
  }, []);

  return (
    <PlainBox>
      <Heading size="md">2022 Standings</Heading>
      <Heading size="sm">Global</Heading>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Total</Th>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Loadable spinnerSize="lg" isLoading={areStandingsLoading}>
          <Tbody>
            {standings.map((user, index) => (
              <Tr
                key={user.id}
                fontWeight={getRowFontWeight(index + 1)}
                backgroundColor={getRowBackgroundColor({ user, currentUser })}
              >
                <Td>{index + 1}</Td>
                <Td>{dollars(user.total_value)}</Td>
                <Td>{publicName(user)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Loadable>
      </Table>
    </PlainBox>
  );
};

export default Standings;
