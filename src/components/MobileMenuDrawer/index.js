import { useDisclosure, Box, Drawer, DrawerOverlay, DrawerContent,
  DrawerCloseButton, DrawerBody, Flex } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'

const MobileMenuDrawer = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box backgroundColor='green.100'>
      <Flex fontSize="24px" justifyContent="space-between" alignItems="center" padding="0.5em">
        <Box>💸</Box>
        <GiHamburgerMenu onClick={onOpen}/>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        blockScrollOnMount={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody onClick={onClose}>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default MobileMenuDrawer
