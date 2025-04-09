import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const RedeemHistory = () => {
  const redeemHistory = useSelector((state) => state.rewards.redeemHistory);
  const rewards = useSelector((state) => state.rewards.rewards);
  console.log(redeemHistory)
  console.log(rewards)
  const chartData = redeemHistory.map((entry) => {
    const reward = rewards.find((r) => r.id === entry.rewardsid);
    return {
      name: reward?.title || entry.rewardsid,
      points: entry.pointredeem,
    };
  });

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Redeem History Overview
      </Typography>

      {chartData.length === 0 ? (
        <Box mt={4}>
          <Typography variant="h6" color="text.secondary">
            No redeem history to show.
          </Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value: "Reward", position: "insideBottom", offset: -5 }} />
            <YAxis label={{ value: "Points Redeemed", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="points" fill="#4caf50" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Container>
  );
};

export default RedeemHistory;
