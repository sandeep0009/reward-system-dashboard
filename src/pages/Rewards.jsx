import { useEffect, useState } from "react";
import { getRewards } from "../features/rewards/rewardApi";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [filteredRewards, setFilteredRewards] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchRewards = async () => {
      const data = await getRewards();
      setRewards(data);
      setFilteredRewards(data);
    };

    const fetchUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setUserPoints(user?.points || 0);
    };

    fetchRewards();
    fetchUser();
  }, []);

  useEffect(() => {
    let sorted = [...rewards];
    if (filter === "low") {
      sorted.sort((a, b) => a.points - b.points);
    } else if (filter === "high") {
      sorted.sort((a, b) => b.points - a.points);
    }
    setFilteredRewards(sorted);
  }, [filter, rewards]);

  const handleRedeem = (reward) => {
    if (userPoints >= reward.points) {
      alert(`You redeemed ${reward.title}!`);
    } else {
      alert(" Insufficient points to redeem this reward.");
    }
  };

  return (
    <Container className="py-12">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h2 className="text-4xl font-bold text-purple-600">🎁 Rewards Marketplace</h2>

        <FormControl variant="standard" className="w-48">
          <InputLabel id="filter-label">Sort by</InputLabel>
          <Select
            labelId="filter-label"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="low">Points: Low to High</MenuItem>
            <MenuItem value="high">Points: High to Low</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRewards.map((reward) => (
          <Card
            key={reward.id}
            className="shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105 duration-300 w-full flex flex-col"
            style={{ height: "100%" }}
          >
            <CardMedia
              component="img"
              image={reward.image}
              alt={reward.title}
              className="h-48 w-full object-cover"
            />
            <CardContent className="flex-1 flex flex-col justify-between">
              <div>
                <Typography variant="h6" className="font-semibold mb-1">
                  {reward.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-2">
                  {reward.description}
                </Typography>
                <Typography className="text-blue-600 font-medium mb-4">
                  🔸 {reward.points} Points
                </Typography>
              </div>

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleRedeem(reward)}
                className="mt-auto"
                fullWidth
              >
                Redeem Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Rewards;
