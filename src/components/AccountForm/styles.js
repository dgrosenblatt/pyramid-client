import styled from 'styled-components'
import { Input } from '@chakra-ui/react'

export const SubmitButton = styled(Input)`
  color: white;
  cursor: pointer;
  background-color: rgb(56, 161, 105);
  width: 100%;
  height: var(--chakra-sizes-10);
  min-width: var(--chakra-sizes-10);
  font-size: var(--chakra-fontSizes-md);
  font-weight: var(--chakra-fontWeights-semibold);

  :hover {
    background: var(--chakra-colors-green-600);
  }
`
