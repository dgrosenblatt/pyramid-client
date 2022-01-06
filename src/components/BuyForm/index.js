import { useMemo, useState } from 'react'
import { Box, Text, Slider, SliderMark, Select, SliderTrack,
  SliderFilledTrack, SliderThumb, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { FormButton } from './styles'
import { dollars } from '../../utils'

const BuyForm = ({ user, teams, fetchUser, onBuyClose }) => {
  const [quantity, setQuantity] = useState(1)

  const teamsById = useMemo(() => {
    const byId = teams.reduce((acc, team) => {
      acc[team.id] = team
      return acc
    }, {})
    return byId
  }, [teams])

  const [teamOption, setTeamOption] = useState(teams[0].id)
  const onTeamOptionChange = (event) => {
    setQuantity(1)
    setTeamOption(event.currentTarget.value)
  }
  const selectedTeam = teamsById[teamOption]

  const toast = useToast()

  const onClickBuy = () => {
    if (selectedTeam.is_locked) return

    axios
      .post('http://localhost:3000/holdings', { quantity, team_id: teamOption })
      .then(({ data }) => {
        const { team } = data
        const { price, name } = team

        fetchUser()
        toast({
          title: `Success`,
          description: `Purchased ${quantity} ${name} @ ${dollars(price)}, Total: ${dollars(quantity * price)}`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        onBuyClose()
      })
      .catch(({ response }) => {
        const { error } = response.data
        toast({
          title: 'Purchase failed',
          description: error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  const shareText = quantity === 1 ? 'share' : 'shares'
  const { balance } = user
  const maxShares = Math.floor(balance / selectedTeam.price)

  const buttonText = selectedTeam.is_locked
    ? `${selectedTeam.name} is currently locked`
    : `Buy ${quantity} ${shareText} of ${selectedTeam.name} for ${dollars(quantity * selectedTeam.price)}`

  const buttonColor = selectedTeam.is_locked ? 'gray' : 'green'

  return (
    <Box borderWidth='1px' borderRadius='lg' marginTop="2" padding="2">
      <form onSubmit={(e) => {e.preventDefault()}}>
        <Box>
          <Select value={teamOption} onChange={onTeamOptionChange}>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </Select>
          <Text position="relative" top="16px" textAlign="center">Current price: {dollars(selectedTeam.price)}</Text>
          <Box borderWidth='1px' borderRadius='lg' marginTop="8" marginBottom="8" padding="8">
            <Slider value={quantity} defaultValue={1} onChange={(val) => setQuantity(val)} min={1} max={maxShares}>
              <SliderMark
                value={quantity}
                textAlign='center'
                bg='blue.500'
                color='white'
                mt='-10'
                ml='-5'
                w='12'
              >
                {quantity}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
          <FormButton colorScheme={buttonColor} onClick={onClickBuy}>
            {buttonText}
          </FormButton>
        </Box>
      </form>
    </Box>
  )
}

export default BuyForm
