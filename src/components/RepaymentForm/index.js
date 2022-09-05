import { useState } from "react";
import {
  Box,
  Text,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useToast,
  Button,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import * as Api from "../../api";
import FormButton from "../_design_system/FormButton";
import InlineLabel from "../_design_system/InlineLabel"
import { dollars } from "../../utils";

const RepaymentForm = ({
  user,
  fetchUser,
  onRepayClose,
}) => {
  const { margin, balance } = user
  const max = Math.min(margin, balance)

  const [amount, setAmount] = useState(100);
  const toast = useToast();

  const onClickRepay = () => {
    Api.payUserMarginLoan(amount)
      .then(() => {
        fetchUser();
        toast({
          title: `Success`,
          description: `Paid off ${dollars(amount)} of margin`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onRepayClose();
      })
      .catch(({ response }) => {
        const { error } = response.data;
        toast({
          title: "Repayment failed",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const increaseAmountStep = () => {
    setAmount((amount) => Math.min(amount + 1, balance))
  }

  const decreaseAmountStep = () => {
    setAmount((amount) => Math.max(amount - 1, 0))
  }

  const buttonText = margin === 0 ? 'No margin balance' : `Pay ${dollars(amount)}`
  const isButtonDisabled = margin === 0 || balance === 0;

  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" marginTop="2" padding="2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Box>
            <Text position="relative" top="12px">
              <InlineLabel>Margin balance:</InlineLabel> {dollars(margin)}
              <br />
              <InlineLabel>Available cash:</InlineLabel> {dollars(balance)}
            </Text>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              marginTop="8"
              marginBottom="8"
              padding="8"
            >
              <Slider
                value={amount}
                defaultValue={0}
                onChange={(val) => setAmount(val)}
                min={0}
                max={max}
                step={100}
              >
                <SliderMark
                  value={amount}
                  textAlign="center"
                  bg="blue.500"
                  color="white"
                  mt="-10"
                  ml="-5"
                  w="20"
                >
                  {dollars(amount)}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Box marginTop="1em" display="flex" justifyContent="space-between">
                <Button>
                  <FaArrowLeft onClick={decreaseAmountStep}/>
                </Button>
                <Button>
                  <FaArrowRight onClick={increaseAmountStep}/>
                </Button>
              </Box>
            </Box>
            <FormButton disabled={isButtonDisabled} colorScheme="green" onClick={onClickRepay}>
              {buttonText}
            </FormButton>
          </Box>
        </form>
      </Box>
      {amount > 0 && margin > 0 && (
        <Box backgroundColor="yellow.100" borderRadius="lg" marginTop="2" padding="2">
            <Text>
              This will reduce your margin balance to {dollars(margin - amount)}.
            </Text>
        </Box>
      )}
    </>
  );
};

export default RepaymentForm;
