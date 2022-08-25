import styled from "styled-components";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";

export const LinkBody = styled(Flex)`
  align-items: center;
  color: white;
  font-weight: 500;
  padding: 6px 0;
`;

export const LinkBodyText = styled(Text)`
  padding-left: 8px;
`;

export const NavHeading = styled(Heading)`
  margin-bottom: 2rem;
`;

export const NavButton = styled(Button)`
  background-color: transparent;
  border-radius: 1px;
  color: white;
  display: flex;
  font-weight: normal;
  justify-content: flex-start;
  padding-left: 0;
  width: 100%;

  :hover {
    background: transparent;
  }
`;

export const NavBox = styled.nav`
  background-color: var(--chakra-colors-gray-600);
`;
