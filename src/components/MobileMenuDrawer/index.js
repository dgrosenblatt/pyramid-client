import { Link } from "react-router-dom";
import {
  useDisclosure,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Flex,
} from "@chakra-ui/react";

import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../_design_system/Logo";

const MobileMenuDrawer = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box backgroundColor="gray.600">
      <Flex
        fontSize="20px"
        justifyContent="space-between"
        alignItems="center"
        padding="0.5em"
      >
        <Link to="/">
          <Logo />
        </Link>
        <GiHamburgerMenu color="whitesmoke" onClick={onOpen} />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        blockScrollOnMount={false}
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor="gray.600">
          <DrawerCloseButton color="white" />
          <DrawerBody onClick={onClose}>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MobileMenuDrawer;
