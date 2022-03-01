import { Box, Heading, Spinner } from "@chakra-ui/react";
import { PieChart, Pie, Tooltip } from "recharts";
import { dollars } from '../../utils'

const pieChartColors = [
  "var(--chakra-colors-red-300)",
  "var(--chakra-colors-blue-300)",
  "var(--chakra-colors-green-300)",
  "var(--chakra-colors-yellow-400)",
  "var(--chakra-colors-orange-300)",
  "var(--chakra-colors-purple-300)",
  "var(--chakra-colors-pink-300)",
  "var(--chakra-colors-teal-300)",
]

const Portfolio = ({ user }) => {
  if (!user) return <Spinner />;

  const holdingData = user.holdings.map((holding, index) => {
    const { name } = holding.team;
    const value = holding.quantity * holding.team.price;
    return { name, value, fill: pieChartColors[index] };
  });

  const pieData = [...holdingData, { name: "Cash", value: user.balance, fill: pieChartColors[holdingData.length] }];

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
        <PieChart width={1000} height={450}>
          <Pie
            label={(entry) => `${entry.name} · ${dollars(entry.value)}` }
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
