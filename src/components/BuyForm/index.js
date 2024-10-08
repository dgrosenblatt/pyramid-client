import { useMemo, useState } from "react";
import {
  Box,
  Text,
  Slider,
  SliderMark,
  Select,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useToast,
} from "@chakra-ui/react";
import * as Api from "../../api";
import { FormButton } from "./styles";
import { dollars } from "../../utils";
import Loadable from "../_shared/Loadable";

const BuyForm = ({
  user,
  teams,
  fetchUser,
  onBuyClose,
  prefillBuyTeamId,
  setPrefillBuyTeamId,
  teamsAreLoading,
}) => {
  const [quantity, setQuantity] = useState(1);

  const teamsById = useMemo(() => {
    const byId = teams.reduce((acc, team) => {
      acc[team.id] = team;
      return acc;
    }, {});
    return byId;
  }, [teams]);

  const initialOption = prefillBuyTeamId ?? teams[0].id;
  const [teamOption, setTeamOption] = useState(initialOption);
  const onTeamOptionChange = (event) => {
    setQuantity(1);
    setTeamOption(event.currentTarget.value);
  };
  const selectedTeam = teamsById[teamOption];

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const onClickBuy = () => {
    if (selectedTeam.is_locked) return;

    setIsLoading(true);
    Api.createHolding({ quantity, teamId: teamOption })
      .then(({ data }) => {
        const { team } = data;
        const { price, abbreviation } = team;

        fetchUser();
        toast({
          title: `Success`,
          description: `Purchased ${quantity} ${abbreviation} @ ${dollars(
            price
          )}, Total: ${dollars(quantity * price)}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        if (prefillBuyTeamId) {
          setPrefillBuyTeamId(null);
        }

        onBuyClose();
      })
      .catch(({ response }) => {
        const { error } = response.data;
        toast({
          title: "Purchase failed",
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

  const shareText = quantity === 1 ? "share" : "shares";
  const { balance } = user;
  const maxShares = Math.floor(balance / selectedTeam.price);

  const buttonText = selectedTeam.is_locked
    ? `${selectedTeam.abbreviation} is currently locked`
    : `Buy ${quantity} ${shareText} of ${
        selectedTeam.abbreviation
      } for ${dollars(quantity * selectedTeam.price)}`;

  const buttonColor = selectedTeam.is_locked ? "gray" : "green";

  return (
    <Loadable isLoading={teamsAreLoading}>
      <Box borderWidth="1px" borderRadius="lg" marginTop="2" padding="2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Box>
            <Select value={teamOption} onChange={onTeamOptionChange}>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.abbreviation}
                </option>
              ))}
            </Select>
            <Text position="relative" top="16px" textAlign="center">
              Current price: {dollars(selectedTeam.price)}
            </Text>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              marginTop="8"
              marginBottom="8"
              padding="8"
            >
              <Slider
                value={quantity}
                defaultValue={1}
                onChange={(val) => setQuantity(val)}
                min={1}
                max={maxShares}
              >
                <SliderMark
                  value={quantity}
                  textAlign="center"
                  bg="blue.500"
                  color="white"
                  mt="-10"
                  ml="-5"
                  w="12"
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
        <Text>Your current balance is {dollars(balance)}</Text>
      </Box>
    </Loadable>
  );
};

export default BuyForm;
