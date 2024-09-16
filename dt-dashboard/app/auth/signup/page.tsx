"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import axios from "axios";
import { toast } from "react-toastify";
import NextLink from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/admin/login",
        { email, password }
      );

      if (response.status === 201 && response.data.adminAccessToken) {
        toast.success("Login successful!");
        localStorage.setItem(
          "adminAccessToken",
          response.data.adminAccessToken
        );
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data.existingAdmin)
        );

        const storedUserData = localStorage.getItem("userData");
        const userData = storedUserData ? JSON.parse(storedUserData) : null;
        console.log("User data: ", userData);

        router.push("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response) {
          switch (response?.status) {
            case 409:
              toast.error(
                "User already logged in on another device. Please try again!"
              );
              break;
            case 401:
              toast.error("Invalid credentials!");
              break;
            case 400:
              toast.error("Bad request. Please check your input.");
              break;
            default:
              toast.error("An error occurred. Please try again later.");
              break;
          }
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
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
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Log In
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <NextLink href="/auth/forgot-password" passHref>
            <p>Forgot Password?</p>
          </NextLink>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
