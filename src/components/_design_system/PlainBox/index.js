import { Box } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { MEDIUM_SCREEN } from "../../../utils/constants";

const baseBoxProps = {
  bgColor: "white",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
  boxSizing: "border-box",
  marginBottom: "1rem",
  marginTop: "2",
  padding: "10px 16px",
};

const PlainBox = ({ children }) => {
  const [isLargerThanMd] = useMediaQuery(MEDIUM_SCREEN);
  const boxProps = isLargerThanMd
    ? { borderRadius: 3, ...baseBoxProps }
    : baseBoxProps;

  return <Box {...boxProps}>{children}</Box>;
};

export default PlainBox;
