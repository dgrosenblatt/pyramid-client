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
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import * as Api from "../../api";
import FormButton from "../_design_system/FormButton";
import InlineLabel from "../_design_system/InlineLabel";
import { dollars } from "../../utils";
import Loadable from "../_shared/Loadable";

const BorrowForm = ({ user, fetchUser, onBorrowClose }) => {
  const { total_value: totalValue, margin } = user;
  const step = 100;
  const maxAmount = totalValue - margin;
  const availableAmount = Math.max(0, maxAmount);

  const [amount, setAmount] = useState(100);
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const onClickBorrow = () => {
    setIsLoading(true);
    Api.addUserMarginLoan(amount)
      .then(() => {
        fetchUser();
        toast({
          title: `Success`,
          description: `Borrowed ${dollars(amount)} on margin`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onBorrowClose();
      })
      .catch(({ response }) => {
        const { error } = response.data;
        toast({
          title: "Borrow failed",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const increaseAmountStep = () => {
    setAmount((amount) => Math.min(amount + 100, maxAmount));
  };

  const decreaseAmountStep = () => {
    setAmount((amount) => Math.max(amount - 100, 100));
  };

  const buttonText = `Borrow ${dollars(amount)}`;

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
              <InlineLabel>Available to borrow:</InlineLabel>{" "}
              {dollars(availableAmount)}
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
                defaultValue={100}
                onChange={(val) => setAmount(val)}
                min={100}
                max={maxAmount}
                step={step}
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
              <Box
                marginTop="1em"
                display="flex"
                justifyContent="space-between"
              >
                <Button>
                  <FaArrowLeft onClick={decreaseAmountStep} />
                </Button>
                <Button>
                  <FaArrowRight onClick={increaseAmountStep} />
                </Button>
              </Box>
            </Box>
            <FormButton
              disabled={availableAmount === 0}
              colorScheme="green"
              onClick={onClickBorrow}
            >
              <Loadable isLoading={isLoading}>{buttonText}</Loadable>
            </FormButton>
          </Box>
        </form>
      </Box>
      <Box
        backgroundColor="yellow.100"
        borderRadius="lg"
        marginTop="2"
        padding="2"
      >
        <Text>
          You may borrow up to the total value of your portfolio (
          {dollars(totalValue)}). A 1% daily interest charge will be applied
          immediately and each following day to margin balances.
        </Text>
      </Box>
    </>
  );
};

export default BorrowForm;
