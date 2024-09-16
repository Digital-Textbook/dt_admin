"use client";

import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear authentication tokens or any user data
    localStorage.removeItem("adminAccessToken");

    // Navigate to the login page
    router.push("/auth/signup");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Page
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          fullWidth
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
