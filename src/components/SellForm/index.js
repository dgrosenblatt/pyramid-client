import { useMemo, useState } from 'react'
import { Box, Button, Heading, Slider, SliderMark, Select, SliderTrack,
  SliderFilledTrack, SliderThumb, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { dollars } from '../../utils'

const SellForm = ({ user, holdings, fetchUser }) => {
  const [quantity, setQuantity] = useState(1)

  const holdingsById = useMemo(() => {
    const byId = holdings.reduce((acc, holding) => {
      acc[holding.id] = holding
      return acc
    }, {})
    return byId
  }, [holdings])

  const [holdingOption, setHoldingOption] = useState(holdings[0]?.id)
  const onTeamOptionChange = (event) => {
    setQuantity(1)
    setHoldingOption(event.currentTarget.value)
  }
  const selectedHolding = holdingsById[holdingOption]

  const resetForm = () => {
    setQuantity(1)
    setHoldingOption(holdings[0].id)
  }

  const toast = useToast()

  if (!holdings.length) {
    return <Heading>No Holdings To Sell</Heading>
  }

  const onClickSell = () => {
    if (selectedHolding.team.is_locked) return
// need holding id? or just go through team
    axios
      .delete(`http://localhost:3000/holdings/${selectedHolding.id}?quantity=${quantity}`)
      .then(({ data }) => {
        // const { team } = data
        // const { price, name } = team

        fetchUser()
        toast({
          title: `Success`,
          description: 'it went',
          // description: `Purchased ${quantity} ${name} @ ${dollars(price)}, Total: ${dollars(quantity * price)}`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        resetForm()
      })
      .catch(({ response }) => {
        const { error } = response.data
        toast({
          title: 'Sale failed',
          description: error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  let shareText, maxShares, buttonText, buttonColor

  if (selectedHolding) {
    shareText = quantity === 1 ? 'share' : 'shares'
    maxShares = selectedHolding.quantity

    buttonText = selectedHolding.is_locked
      ? `${selectedHolding.team.name} is currently locked`
      : `Sell ${quantity} ${shareText} of ${selectedHolding.team.name} for ${dollars(quantity * selectedHolding.team.price)}`

    buttonColor = selectedHolding.is_locked ? 'gray' : 'green'
  } else {
    buttonText = 'Sell'
    buttonColor = 'gray'
    maxShares = 1
  }

  return (
    <Box borderWidth='1px' borderRadius='lg' marginTop="2" padding="2">
      <Heading>Sell</Heading>
      <form onSubmit={(e) => {e.preventDefault()}}>
        <Box>
          <Select value={holdingOption} onChange={onTeamOptionChange}>
            {holdings.map(holding => (
              <option key={holding.id} value={holding.id}>{holding.team.name}</option>
            ))}
          </Select>
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
          <Button colorScheme={buttonColor} onClick={onClickSell}>
            {buttonText}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default SellForm
