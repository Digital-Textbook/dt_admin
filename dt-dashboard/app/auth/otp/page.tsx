"use client";

import React, { Suspense, useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handleVerifyOtp = async () => {
    if (!id) {
      toast.error("Missing ID parameter.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3001/admin/${id}/reset-password/${otp}`
      );
      toast.success("OTP verified successfully!");
      setTimeout(() => {
        router.push(`/auth/reset-password?id=${id}`);
      }, 3000);
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer autoClose={3000} />
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Verify OTP
        </Typography>
        <TextField
          label="OTP"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerifyOtp}
          fullWidth
        >
          Verify OTP
        </Button>
      </Box>
    </Container>
  );
};

export default function authOtp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtp />
    </Suspense>
  );
}
