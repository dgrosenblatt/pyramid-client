import styled from "styled-components";
import { Button } from "@chakra-ui/react";

export const RowButton = styled(Button)`
  margin-left: 1em;
`;

export const BuyButton = styled(Button)`
  display: block;
  height: unset;
  margin-top: 8px;
  padding-bottom: 8px;
  padding-top: 8px;
  white-space: unset;
  width: 100%;
`;

export const Gain = styled.span`
  color: var(--chakra-colors-green-600);
  font-weight: 500;
`;

export const Loss = styled.span`
  color: var(--chakra-colors-red-600);
  font-weight: 500;
`;
