import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Spinner,
  Table,
  Td,
  Thead,
  Tbody,
  Tr,
  Th,
} from "@chakra-ui/react";
import { PieChart, Pie, Tooltip } from "recharts";
import { dollars } from "../../utils";
import * as Api from "../../api";

const pieChartColors = [
  "var(--chakra-colors-red-300)",
  "var(--chakra-colors-blue-300)",
  "var(--chakra-colors-green-300)",
  "var(--chakra-colors-yellow-400)",
  "var(--chakra-colors-orange-300)",
  "var(--chakra-colors-purple-300)",
  "var(--chakra-colors-pink-300)",
  "var(--chakra-colors-teal-300)",
];

const Portfolio = ({ user }) => {
  const [balanceTransactions, setBalanceTransactions] = useState([]);

  useEffect(() => {
    Api.getUserBalanceTransactions().then((response) => {
      setBalanceTransactions(response.data);
    });
  }, [user]);

  if (!user) return <Spinner />;

  const holdingData = user.holdings.map((holding, index) => {
    const { name } = holding.team;
    const value = holding.quantity * holding.team.price;
    return { name, value, fill: pieChartColors[index] };
  });

  const pieData = [
    ...holdingData,
    {
      name: "Cash",
      value: user.balance,
      fill: pieChartColors[holdingData.length],
    },
  ];

  return (
    <Box>
      <Box
        bgColor="white"
        borderWidth="1px"
        borderRadius="lg"
        marginBottom="1rem"
        padding="2"
      >
        <Heading textAlign="center">My Portfolio</Heading>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Event</Th>
              <Th>Amount</Th>
              <Th>Notes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {balanceTransactions.map((balanceTransaction) => (
              <>
                <Tr key={balanceTransaction.id}>
                  <Td>{balanceTransaction.created_at}</Td>
                  <Td>{balanceTransaction.event}</Td>
                  <Td>{balanceTransaction.amount}</Td>
                  <Td>{balanceTransaction.notes}</Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
        <PieChart width={1000} height={450}>
          <Pie
            label={(entry) => `${entry.name} · ${dollars(entry.value)}`}
            data={pieData}
            dataKey="value"
            nameKey="name"
          >
            <Tooltip />
          </Pie>
        </PieChart>
      </Box>
    </Box>
  );
};

export default Portfolio;
