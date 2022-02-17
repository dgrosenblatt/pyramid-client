import styled from "styled-components";
import { Input } from "@chakra-ui/react";

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
`;

export const PlainButton = styled.button`
  background: none;
  border: none;
  font-size: var(--chakra-fontSizes-sm);
  color: blue;
  margin-top: 1rem;
`;

export const Error = styled.div`
  color: red;
  font-size: var(--chakra-fontSizes-sm);
`;
