import { useState } from "react";
import * as Api from "../../api";
import {
  Box,
  Button,
  Heading,
  Spinner,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  useMediaQuery,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import TeamRow from "../TeamRow";
import "react-datepicker/dist/react-datepicker.css";

const AdminTeamsTable = ({ teams, fetchTeams }) => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");

  const initialState = teams.reduce((acc, team) => {
    acc[team.id] = { id: team.id, locked_at: team.locked_at };
    return acc;
  }, {});

  const [lockTimes, setLockTimes] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeLock = (teamId) => (date) => setTeamLockTime(date, teamId);

  const setTeamLockTime = (date, teamId) => {
    setLockTimes((lockTimes) => {
      return { ...lockTimes, [teamId]: { id: teamId, locked_at: date } };
    });
  };

  const saveLock = (teamId) => () => {
    setIsLoading(true);

    const { id, locked_at } = lockTimes[teamId];

    Api.scheduleTeamLock({ teamId: id, locked_at })
      .then(fetchTeams)
      .finally(() => setIsLoading(false));
  };

  return (
    <Box bgColor="white" borderWidth="1px" borderRadius="lg" padding="2">
      <Heading>All Teams</Heading>
      <Table variant="striped" colorScheme="green">
        <Thead>
          {isLargerThanMd ? (
            <Tr>
              <Th></Th>
              <Th>Trading Status</Th>
              <Th>Price</Th>
              <Th>W</Th>
              <Th>L</Th>
              <Th>T</Th>
              <Th>Actions</Th>
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
              isAdmin={true}
            />
          ))}
        </Tbody>
      </Table>
      <Heading marginTop="2rem">
        Lock Schedule {isLoading && <Spinner />}
      </Heading>
      <Table>
        <Tbody>
          {teams.map((team) => (
            <Tr key={team.id}>
              <Td>{team.name}</Td>
              <Td>
                <DatePicker
                  placeholderText="Set a lock time"
                  dateFormat="E MM/d h:mm aa"
                  showTimeSelect
                  timeIntervals={5}
                  selected={
                    lockTimes[team.id].locked_at
                      ? new Date(lockTimes[team.id].locked_at)
                      : null
                  }
                  onChange={onChangeLock(team.id)}
                />
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={saveLock(team.id)}
                >
                  Save
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminTeamsTable;
