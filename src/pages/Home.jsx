import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.user.userInfo); 
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        px: 3,
        py: 6,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        background: "linear-gradient(to right, #667eea, #764ba2)",
        color: "#fff",
      }}
    >
      {user ? (
        <>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome to Reward System, {user.name}!
          </Typography>
          <Typography variant="h6">
            Track your activities, earn points, and redeem awesome rewards!
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Gamify Your Efforts. Get Rewarded.
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Join now to earn points for your achievements and unlock exclusive rewards.
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "#fff", color: "#764ba2", fontWeight: "bold" }}
            onClick={() => navigate("/signin")}
          >
            Get Started
          </Button>
        </>
      )}
    </Box>
  );
};

export default Home;
