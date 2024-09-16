"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    setUser(userData);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("adminAccessToken");
    try {
      console.log("User ID: ", user.id);
      await axios.post(`http://localhost:3001/auth/${user.id}/admin-logout`);

      toast.success("Logout successful!");
      setTimeout(() => {
        router.push("/auth/signup");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    }
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
