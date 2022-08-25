import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Heading,
  Tr,
  Td,
  useMediaQuery,
} from "@chakra-ui/react";
import * as Api from "../../api";
import { dollars, gameTime, percent } from "../../utils";
import Maybe from "../_shared/Maybe";
import { BuyButton, RowButton, Gain, Loss } from "./styles";

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
    locked_at: lockedAt,
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
  const buyButtonText = isLocked ? tradingStatus : `Buy for ${dollars(price)}`;
  const buttonColorScheme = isLocked ? "yellow" : "green";

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
          <Td>
            {nextGame}
            <br />
            {gameTime(lockedAt)}
          </Td>
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
          <Td fontSize="l">
            <Heading size="sm" textAlign="center">
              {name}
            </Heading>
            Record: {wins}-{losses}
            {Boolean(ties) && `-${ties}`}
            <br />
            Current Price: {dollars(price)}
            <Maybe value={nextGame}>
              <br />
              Next: {nextGame}, {gameTime(lockedAt)}
            </Maybe>
            <br />
            Potential Weekly Gain: <Gain>{percent(potentialWeeklyGain)}</Gain>
            <br />
            Potential Weekly Loss: <Loss>{percent(potentialWeeklyLoss)}</Loss>
            <BuyButton
              disabled={isLocked}
              colorScheme={buttonColorScheme}
              onClick={onClickBuy}
            >
              {buyButtonText}
            </BuyButton>
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
        </Tr>
      )}
    </>
  );
};

export default TeamRow;
