import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async () => {
    setDone("");
    setError("");

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      setError("Incorrect data");
      return;
    }
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      setError("bad data");
      return;
    }
    const token = await response.json();

    if (!token) {
      setError("Incorrect token");
      return;
    }
    login(email, token);
    setDone("done");
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h6">login your account</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <TextField inputRef={emailRef} label="E-mail" name="email" />
        <TextField
          inputRef={passwordRef}
          type="password"
          label="Password"
          name="password"
        />
        <Button onClick={onSubmit} variant="contained">
          login
        </Button>
        {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        {done && <Typography sx={{ color: "green" }}>Done</Typography>}
      </Box>
    </Box>
  );
};
export default RegisterPage;
