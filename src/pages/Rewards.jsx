import { useEffect, useState } from "react";
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
import { fetchRewards } from "../features/rewards/rewardApi";
import { useDispatch, useSelector } from "react-redux";
import { redeemAward } from "../features/rewards/rewardSlice";
import { updateUser } from "../features/users/userApi";

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [filteredRewards, setFilteredRewards] = useState([]);

  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();
  const user=useSelector((state)=>state.user.userInfo);
  const userPoints=user?.points;

  
  useEffect(() => {
    const fetchReward = async () => {
      const data = await fetchRewards();
      setRewards(data);
      setFilteredRewards(data);
    };

    fetchReward();
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

  const handleRedeem = async (reward) => {
    if (!user || userPoints < reward.points) {
      alert("Insufficient points to redeem this reward.");
      return;
    }
  
    const newPoints = userPoints - reward.points;  
    const updatedUser = { ...user, points: newPoints };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  
    try {
      await updateUser(user.id, updatedUser);  
    } catch (error) {
      console.error("Failed to update user points:", error);
    }
  
    dispatch(
      redeemAward({
        rewardId: reward.id,
        userId: user.id,
        pointsRedeemed: reward.points,
        timestamp: new Date().toISOString(),
      })
    );
  
    alert(`You redeemed "${reward.title}" for ${reward.points} points!`);
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
