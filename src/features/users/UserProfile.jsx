import {
    Card,
    CardContent,
    Grid,
    Typography,
    TextField,
    Button,
    Box,
  } from "@mui/material";
  import { useSelector } from "react-redux";
  import { useState } from "react";
  
  const UserProfile = () => {
    const userInfo = useSelector((state) => state.user.userInfo);
  
    const [formData, setFormData] = useState({
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      password: "",
    });
  
    const handleChange = (e) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleUpdate = () => {
      console.log("Updated Data:", formData);
    };
  
    return (
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Card sx={{ maxWidth: 900, width: "100%", display: "flex", flexDirection: { xs: "column", md: "row" } }}>
          <Box
            component="img"
            src="https://source.unsplash.com/random/400x400?profile"
            alt="Profile"
            sx={{
              width: { xs: "100%", md: 300 },
              objectFit: "cover",
              borderRight: { md: "1px solid #ddd" },
              borderBottom: { xs: "1px solid #ddd", md: "none" },
            }}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom>
              User Profile
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Points"
                  fullWidth
                  value={userInfo?.points || 0}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  };
  
  export default UserProfile;
  