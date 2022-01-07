import { useMemo, useState } from 'react'
import { Box, Text, Heading, Slider, SliderMark, Select, SliderTrack,
  SliderFilledTrack, SliderThumb, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { FormButton } from './styles'
import { dollars } from '../../utils'

const SellForm = ({ onSellClose, holdings, fetchUser }) => {
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

  const toast = useToast()

  if (!holdings.length) {
    return <Heading>No Holdings To Sell</Heading>
  }

  const onClickSell = () => {
    if (selectedHolding.team.is_locked) return

    axios
      .delete(`http://localhost:3000/holdings/${selectedHolding.id}?quantity=${quantity}`)
      .then(({ data }) => {
        console.log({ data })

        fetchUser()
        toast({
          title: `Success`,
          description: `Sold ${quantity} ${data.team.name} @ ${dollars(data.team.price)}, Total: ${dollars(quantity * data.team.price)}`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        onSellClose()
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

    buttonColor = selectedHolding.team.is_locked ? 'gray' : 'red'
  } else {
    buttonText = 'Sell'
    buttonColor = 'gray'
    maxShares = 1
  }

  return (
    <Box borderWidth='1px' borderRadius='lg' marginTop="2" padding="2">
      <form onSubmit={(e) => {e.preventDefault()}}>
        <Box>
          <Select value={holdingOption} onChange={onTeamOptionChange}>
            {holdings.map(holding => (
              <option key={holding.id} value={holding.id}>{holding.team.name}</option>
            ))}
          </Select>
          <Text position="relative" top="16px" textAlign="center">Current price: {dollars(selectedHolding.team.price)}</Text>
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
          <FormButton colorScheme={buttonColor} onClick={onClickSell}>
            {buttonText}
          </FormButton>
        </Box>
      </form>
    </Box>
  )
}

export default SellForm
