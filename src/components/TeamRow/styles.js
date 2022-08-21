import styled from "styled-components";
import { Button } from "@chakra-ui/react";

export const RowButton = styled(Button)`
  margin-left: 1em;
`;

export const PlainButton = styled.button`
  color: blue;
  text-decoration: underline;
`;

export const Gain = styled.span`
  color: var(--chakra-colors-green-600);
  font-weight: 500;
`;

export const Loss = styled.span`
  color: var(--chakra-colors-red-600);
  font-weight: 500;
`;
