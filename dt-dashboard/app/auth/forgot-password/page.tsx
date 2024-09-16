"use client";

import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/admin/forgot-password/${email}`
      );

      const { admin } = response.data;

      if (admin && admin.id) {
        toast.success("OTP sent to your email!");
        setTimeout(() => {
          router.push(`/auth/otp?id=${admin.id}`);
        }, 3000);
      } else {
        toast.error("No admin ID returned in the response.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send OTP. Please check your email.");
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer autoClose={3000} />
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Forgot Password
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendOtp}
          fullWidth
        >
          Send OTP
        </Button>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
