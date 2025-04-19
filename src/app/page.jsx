"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  Paper,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment
} from "@mui/material";
// import PasswordDecoder from "./components/common/passdecoder";
import { EyeSlash, Eye, XCircle  } from "@phosphor-icons/react";
const KEYCODE = "{AR&YZ&MZ}";

// const queryClient = useQueryClient();

// ✅ Clear user session data
//   const handleLogout = () => {
//   localStorage.removeItem("token"); // ✅ Remove auth token
//   queryClient.removeQueries(["user"]); // ✅ Clears user session data
// };

async function loginUser({ username, password }) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "login failed");
  }

  return response.json(); // Returns user data
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = ()=> {
    setShowPassword((prev) => !prev);
  }


  const handleEncryptedPassword = (text, key) => {
    let s1 = "";
    text = `$${text}#`; // ✅ Correct prefix/suffix formatting

    for (let i = 0; i < text.length; i++) {
      s1 += String.fromCharCode(text.charCodeAt(i) + 2); // ✅ Apply character shifting
    }

    key = `*${key}*`; // ✅ Ensure consistent key formatting
    let j = 0;
    let result = "";

    for (let i = 0; i < s1.length; i++) {
      let s2 = String.fromCharCode(
        s1.charCodeAt(i) ^ key.charCodeAt(j % key.length) ^ 63
      );
      result += s2;
      j = ((j + 1) % key.length) + 1; // ✅ Correct key cycling logic
    }

    return result; // ✅ Return encrypted password
  };
  const handleSubmit = () => {
    const encryptedPassword = handleEncryptedPassword(text, KEYCODE);
    setPassword(encryptedPassword);
    mutation.mutate({ username, password: encryptedPassword });
  };
  const router = useRouter();
  const queryClient = useQueryClient();

  // TanStack Mutation to handle login
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Token received:", data.token); // ✅ Debug the token
      localStorage.setItem("token", data.token); // Cache token
      const { PassWord, ...filteredUser } = data.user; // Use object destructuring to exclude PassWord
      localStorage.setItem("user", JSON.stringify(filteredUser)); // Cache filtered user data      // queryClient.setQueryData(["user"], data.user); // Store in query client
      router.push("/dashboard"); // Redirect after login
    },
    onError: (error) => {
      alert(error.message); // Handle login errors
    }
  });

  console.log("Mutation object:", mutation);

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "start",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        pr: -1,
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column", // Enables flexbox layout
          justifyContent: "center", // Centers children horizontally
          alignItems: "center", // Centers children vertically
          height: "100vh",
          width: "25%",
          ml: -2,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <img
            src="/parsroyal.png"
            alt="Pars Royal"
            style={{ width: "150px", marginBottom: "40px" }}
          />
        </Box>
        <Box
          alignItems="center"
          component="form"
          onSubmit={(e) => {
            e.preventDefault(); // Prevents page reload
            handleSubmit(); // Calls your handleSubmit function
          }}
          sx={{
            width: "252px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            variant="h7"
            textAlign="right"
            gutterBottom
            sx={{ alignSelf: "start", mb: -2, pt: 2 }}
          >
            نام کاربری
          </Typography>
          <TextField
            label="نام کاربری"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            dir="rtl"
            slotProps={{
              input: {
                endAdornment: username && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setUsername("")} // Clears the text field
                    >
                      <XCircle  sx={{ color: "gray" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Typography
            variant="h7"
            textAlign="right"
            sx={{ alignSelf: "start", mb: -2, pt: 2 }}
          >
            رمزعبور
          </Typography>
          <TextField
            label="پسوورد"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <Eye /> : <EyeSlash />}
                  </IconButton>
                ),
              },
            }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="مرا به خاطر بسپار"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "right",
              width: "100%",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={mutation.isLoading}
            startIcon={mutation.isPending && <CircularProgress size={20} />}
            sx={{
              width: "252px",
              height: "40px",
            }}
          >
            {mutation.isPending ? "در حال ورود به سیستم ..." : "ورود"}
          </Button>
          <Typography
            textAlign="center"
            color="red"
            sx={{ alignSelf: "start", mb: -2, pt: 2 }}
          >
            فراموشی رمزعبور
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
