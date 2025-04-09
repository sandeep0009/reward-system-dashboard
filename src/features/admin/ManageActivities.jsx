import { useEffect, useState } from "react";
import { getAllActivites } from "../activities/activityApi";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";

const ManageActivities = () => {
  const [activities, setActivities] = useState([]);

  const fetchActivity = async () => {
    const data = await getAllActivites();
    setActivities(data);
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Manage Activities
      </Typography>

      <Grid container spacing={3}>
        {activities.map((activity) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            key={activity.id}
            sx={{ display: "flex" }}
          >
            <Card
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "300px",
                width: "100%",
                p: 2,
                borderRadius: 3,
                boxShadow: 4,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {activity.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {activity.description}
                </Typography>

                <Box mt={2}>
                  <Typography variant="body2">
                    <strong>Type:</strong> {activity.type}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Points:</strong> {activity.points}
                  </Typography>
                </Box>
              </CardContent>

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() =>
                  alert(`Viewing activity: ${activity.title}`)
                }
              >
                View Activity
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ManageActivities;
