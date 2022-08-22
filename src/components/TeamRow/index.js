import { useState } from "react";
import { Button, ButtonGroup, Tr, Td, useMediaQuery } from "@chakra-ui/react";
import * as Api from "../../api";
import { dollars, percent } from "../../utils";
import Maybe from '../_shared/Maybe'
import { PlainButton, RowButton, Gain, Loss } from "./styles";

const TeamRow = ({
  fetchTeams,
  team,
  isAdmin,
  onBuyOpen,
  setPrefillBuyTeamId,
}) => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");
  const {
    id,
    is_locked: isLocked,
    name,
    price,
    wins,
    losses,
    ties,
    potential_weekly_gain: potentialWeeklyGain,
    potential_weekly_loss: potentialWeeklyLoss,
    next_game: nextGame,
  } = team;

  const [isLockLoading, setIsLockLoading] = useState(false);
  const [isUnlockLoading, setIsUnlockLoading] = useState(false);
  const [isAddWinLoading, setIsAddWinLoading] = useState(false);
  const [isAddLossLoading, setIsAddLossLoading] = useState(false);
  const [isAddTieLoading, setIsAddTieLoading] = useState(false);

  const lockTeam = () => {
    setIsLockLoading(true);

    Api.lockTeam(id)
      .then(fetchTeams)
      .finally(() => {
        setIsLockLoading(false);
      });
  };

  const unlockTeam = () => {
    setIsUnlockLoading(true);

    Api.unlockTeam(id)
      .then(fetchTeams)
      .finally(() => {
        setIsUnlockLoading(false);
      });
  };

  const addWin = () => {
    setIsAddWinLoading(true);

    Api.addWin(id)
      .then(fetchTeams)
      .finally(() => {
        setIsAddWinLoading(false);
      });
  };

  const addLoss = () => {
    setIsAddLossLoading(true);

    Api.addLoss(id)
      .then(fetchTeams)
      .finally(() => {
        setIsAddLossLoading(false);
      });
  };

  const addTie = () => {
    setIsAddTieLoading(true);

    Api.addTie(id)
      .then(fetchTeams)
      .finally(() => {
        setIsAddTieLoading(false);
      });
  };

  const onClickBuy = () => {
    setPrefillBuyTeamId(id);
    onBuyOpen();
  };

  const tradingStatus = isLocked ? "Locked" : "Available";

  return (
    <>
      {isLargerThanMd ? (
        <Tr>
          <Td>{name}</Td>
          <Td>
            {tradingStatus}
            {!isLocked && (
              <RowButton onClick={onClickBuy} colorScheme="green" size="xs">
                Buy
              </RowButton>
            )}
          </Td>
          <Td>{dollars(price)}</Td>
          <Td>{nextGame}</Td>
          <Td>
            <Gain>{percent(potentialWeeklyGain)}</Gain> |{" "}
            <Loss>{percent(potentialWeeklyLoss)}</Loss>
          </Td>
          <Td>{wins}</Td>
          <Td>{losses}</Td>
          <Td>{ties}</Td>
          {isAdmin && (
            <Td>
              <ButtonGroup size="sm" isAttached variant="outline">
                {isLocked ? (
                  <Button
                    colorScheme="red"
                    variant="solid"
                    isLoading={isUnlockLoading}
                    onClick={unlockTeam}
                  >
                    Unlock
                  </Button>
                ) : (
                  <Button
                    colorScheme="red"
                    isLoading={isLockLoading}
                    variant="solid"
                    onClick={lockTeam}
                  >
                    Lock
                  </Button>
                )}
                <Button
                  colorScheme="blue"
                  variant="solid"
                  isLoading={isAddWinLoading}
                  onClick={addWin}
                >
                  +Win
                </Button>
                <Button
                  colorScheme="blue"
                  variant="solid"
                  isLoading={isAddLossLoading}
                  onClick={addLoss}
                >
                  +Loss
                </Button>
                <Button
                  colorScheme="blue"
                  variant="solid"
                  isLoading={isAddTieLoading}
                  onClick={addTie}
                >
                  +Tie
                </Button>
              </ButtonGroup>
            </Td>
          )}
        </Tr>
      ) : (
        <Tr>
          <Td fontSize="xl">
            {name} · {wins}-{losses}
            {Boolean(ties) && `-${ties}`}
            <br />
            {tradingStatus}
            {!isLocked && (
              <>
                {" "}
                · <PlainButton onClick={onClickBuy}>Buy</PlainButton>
              </>
            )}

            <Maybe value={nextGame}><br />Next Game: {nextGame}</Maybe>
            <br />
            Potential Weekly Gain: <Gain>{percent(potentialWeeklyGain)}</Gain>
            <br />
            Potential Weekly Loss: <Loss>{percent(potentialWeeklyLoss)}</Loss>
            {isAdmin && (
              <>
                <br />
                <ButtonGroup
                  size="sm"
                  isAttached
                  variant="outline"
                  flexDirection="column"
                >
                  {isLocked ? (
                    <Button
                      size="lg"
                      colorScheme="red"
                      variant="solid"
                      isLoading={isUnlockLoading}
                      onClick={unlockTeam}
                      marginTop="1em"
                    >
                      Unlock
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      marginTop="1em"
                      colorScheme="red"
                      isLoading={isLockLoading}
                      variant="solid"
                      onClick={lockTeam}
                    >
                      Lock
                    </Button>
                  )}
                  <Button
                    size="lg"
                    colorScheme="blue"
                    variant="solid"
                    isLoading={isAddWinLoading}
                    onClick={addWin}
                    marginTop="1em"
                  >
                    +Win
                  </Button>
                  <Button
                    size="lg"
                    colorScheme="blue"
                    variant="solid"
                    isLoading={isAddLossLoading}
                    onClick={addLoss}
                    marginTop="1em"
                  >
                    +Loss
                  </Button>
                  <Button
                    size="lg"
                    colorScheme="blue"
                    variant="solid"
                    isLoading={isAddTieLoading}
                    onClick={addTie}
                    marginTop="1em"
                  >
                    +Tie
                  </Button>
                </ButtonGroup>
              </>
            )}
          </Td>
          <Td fontSize="xl">{dollars(price)}</Td>
        </Tr>
      )}
    </>
  );
};

export default TeamRow;
