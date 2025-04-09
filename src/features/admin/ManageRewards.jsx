import {
  Container,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  Box,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { createRewards, fetchRewards, updateRewards, removeRewards } from "../rewards/rewardApi";
import { addRewards, getRewards } from "../rewards/rewardSlice";

const ManageRewards = () => {
  const rewards = useSelector((state) => state.rewards.rewards);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    points: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setForm({ title: "", description: "", points: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateRewards(editingId, form);
    } else {
      await createRewards(form);
    }
    const refreshed = await fetchRewards();
    dispatch(addRewards(refreshed));
    handleClose();
  };

  const handleEdit = (reward) => {
    setEditingId(reward.id);
    setForm({
      title: reward.title,
      description: reward.description,
      points: reward.points,
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await removeRewards(id);
    const refreshed = await fetchRewards();
    dispatch(addRewards(refreshed));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRewards();
      dispatch(getRewards(data));
    };
    fetchData();
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Manage Rewards
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create Reward
        </Button>
      </Box>

      <Grid container spacing={3}>
        {rewards?.map((reward) => (
          <Grid item xs={12} sm={6} md={4} key={reward.id}>
            <Card
              sx={{
                height: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 2,
                borderRadius: 3,
                boxShadow: 4,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight="bold" sx={{ color: "primary.main" }}>
                    {reward.title}
                  </Typography>
                  <Box>
                    <IconButton onClick={() => handleEdit(reward)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(reward.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                  {reward.description}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Points: {reward.points}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? "Edit Reward" : "Create New Reward"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={form.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={form.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Points"
            name="points"
            type="number"
            fullWidth
            margin="normal"
            value={form.points}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleCreateOrUpdate} variant="contained">
            {editingId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageRewards;
