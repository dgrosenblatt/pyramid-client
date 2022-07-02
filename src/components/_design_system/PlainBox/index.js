import { Box } from '@chakra-ui/react'

const PlainBox = ({ children }) => (
  <Box
    bgColor="white"
    borderWidth="1px"
    borderRadius="lg"
    marginTop="2"
    marginBottom="1rem"
    padding="2"
  >
    {children}
  </Box>
)

export default PlainBox;
