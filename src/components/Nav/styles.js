import styled from 'styled-components'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'

export const LinkBody = styled(Flex)`
  align-items: center;
  padding: 6px 0;
`

export const LinkBodyText = styled(Text)`
  padding-left: 8px;
`

export const NavHeading = styled(Heading)`
  margin-bottom: 2rem;
`

export const NavButton = styled(Button)`
  background-color: white;
  border-radius: 1px;
  display: flex;
  font-weight: normal;
  justify-content: flex-start;
  padding-left: 0;
  width: 100%;
`
