import { useEffect, useState, useCallback } from "react";
import { getAllUsers } from "../users/userApi";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Container,
  Grid,
  Button,
  CardActions,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { debounce } from "lodash";
import ClearIcon from "@mui/icons-material/Clear";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
      setSearchResults(data);
      setLoading(false);
    };
    fetchAllUsers();
  }, []);

  const handleSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.trim() === "") {
        setSearchResults(users);
      } else {
        const filtered = users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filtered);
      }
    }, 300),
    [users]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleClearSearch = () => {
    setQuery("");
    setSearchResults(users);
  };

  const handleView = (user) => {
    alert(`Viewing ${user.name}'s details`);
  };

  const handleRemove = (id) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    setSearchResults(updated);
  };

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Admin Dashboard - Users
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <TextField
          label="Search users by name or email"
          variant="outlined"
          fullWidth
          value={query}
          onChange={handleChange}
          sx={{ flex: 1 }}
        />
        {query && (
          <IconButton onClick={handleClearSearch} sx={{ ml: 1 }}>
            <ClearIcon />
          </IconButton>
        )}
      </Box>

      <Grid container spacing={3}>
        {searchResults.map((user) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={user.id}
            sx={{ display: "flex" }}
          >
            <Card
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                p: 2,
                borderRadius: 3,
                boxShadow: 4,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                  {user.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ wordBreak: "break-word" }}
                >
                  {user.email}
                </Typography>

                <Box mt={2}>
                  <Typography variant="body2">
                    <strong>Points:</strong> {user.points ?? 0}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
                  </Typography>
                </Box>
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleView(user)}
                  sx={{ flex: 1, mr: 1 }}
                >
                  View
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemove(user.id)}
                  sx={{ flex: 1 }}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;