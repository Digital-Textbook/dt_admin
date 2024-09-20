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
  Grid,
} from "@mui/material";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import axios from "axios";
import NextLink from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
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
    <>
      <ToastContainer />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          backgroundColor: "#ede7f6",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          height: "100vh",
        }}
      >
        <Grid>
          <form
            onSubmit={handleSubmit}
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: "40px",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              background: "white",
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              Digital Textbook
            </Typography>

            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
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
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
              sx={{ mt: 3 }}
            >
              Log In
            </Button>

            <Box sx={{ mt: 2, textAlign: "right" }}>
              <NextLink href="/auth/forgot-password" passHref>
                <p>Forgot Password?</p>
              </NextLink>
            </Box>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
