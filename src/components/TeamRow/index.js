import { useState } from 'react'
import { Button, ButtonGroup, Tr, Td } from '@chakra-ui/react'
import axios from 'axios'
import { dollars } from '../../utils'

const TeamRow = ({ fetchTeams, team }) => {
  const { id, is_locked: isLocked, name, price, wins, losses, ties } = team

  const [isLockLoading, setIsLockLoading] = useState(false)
  const [isUnlockLoading, setIsUnlockLoading] = useState(false)
  const [isAddWinLoading, setIsAddWinLoading] = useState(false)
  const [isAddLossLoading, setIsAddLossLoading] = useState(false)
  const [isAddTieLoading, setIsAddTieLoading] = useState(false)

  const lockTeam = () => {
    setIsLockLoading(true)

    axios
      .patch(`http://localhost:3000/teams/${id}/lock`)
      .then(fetchTeams)
      .finally(() => {
        setIsLockLoading(false)
      })
  }

  const unlockTeam = () => {
    setIsUnlockLoading(true)

    axios
      .patch(`http://localhost:3000/teams/${id}/unlock`)
      .then(fetchTeams)
      .finally(() => {
        setIsUnlockLoading(false)
      })
  }

  const addWin = () => {
    setIsAddWinLoading(true)

    axios
      .patch(`http://localhost:3000/teams/${id}/win`)
      .then(fetchTeams)
      .finally(() => {
        setIsAddWinLoading(false)
      })
  }

  const addLoss = () => {
    setIsAddLossLoading(true)

    axios
      .patch(`http://localhost:3000/teams/${id}/lose`)
      .then(fetchTeams)
      .finally(() => {
        setIsAddLossLoading(false)
      })
  }

  const addTie = () => {
    setIsAddTieLoading(true)

    axios
      .patch(`http://localhost:3000/teams/${id}/tie`)
      .then(fetchTeams)
      .finally(() => {
        setIsAddTieLoading(false)
      })
  }

  const tradingStatus = isLocked ? 'Locked' : 'Available'

  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{tradingStatus}</Td>
      <Td>{dollars(price)}</Td>
      <Td>{wins}</Td>
      <Td>{losses}</Td>
      <Td>{ties}</Td>
      <Td>
        <ButtonGroup size='sm' isAttached variant='outline'>
          {isLocked ?
            <Button
              colorScheme="red"
              variant="solid"
              isLoading={isUnlockLoading}
              onClick={unlockTeam}
            >
              Unlock
            </Button>
              :
            <Button colorScheme="red" isLoading={isLockLoading} variant="solid" onClick={lockTeam}>Lock</Button>
          }
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
    </Tr>
  )
}

export default TeamRow
