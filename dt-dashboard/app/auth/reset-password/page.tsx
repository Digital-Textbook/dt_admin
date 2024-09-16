"use client";

import React, { useState, Suspense } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!id) {
      toast.error("Missing ID parameter.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3001/admin/${id}/reset-password-byEmail/${password}`
      );
      toast.success("Password updated successfully!");
      setTimeout(() => {
        router.push("/auth/signup");
      }, 3000);
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
      console.log("Forgot password email error: ", error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer autoClose={3000} />
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reset Password
        </Typography>
        <TextField
          label="New Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <IconEyeOff /> : <IconEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                  {showConfirmPassword ? <IconEyeOff /> : <IconEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleResetPassword}
          fullWidth
        >
          Reset Password
        </Button>
      </Box>
    </Container>
  );
};

export default function ResetPasswordByEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
