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
} from "@mui/material";
// import PasswordDecoder from "./components/common/passdecoder";

const KEYCODE = '{AR&YZ&MZ}';


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
    body: JSON.stringify({ username, password }),
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


  const handleEncryptedPassword = (text, key) => {
    let s1 = '';
    text = `$${text}#`; // ✅ Correct prefix/suffix formatting
  
    for (let i = 0; i < text.length; i++) {
      s1 += String.fromCharCode(text.charCodeAt(i) + 2); // ✅ Apply character shifting
    }
  
    key = `*${key}*`; // ✅ Ensure consistent key formatting
    let j = 0;
    let result = '';
  
    for (let i = 0; i < s1.length; i++) {
      let s2 = String.fromCharCode((s1.charCodeAt(i) ^ key.charCodeAt(j % key.length)) ^ 63);
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
      router.push("/kt"); // Redirect after login
    },
    onError: (error) => {
      alert(error.message); // Handle login errors
    },
  });

  console.log("Mutation object:", mutation);

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "end",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 0,
        margin: 0
      }}
    >
      <Paper sx={{ height: "100vh", width: "30%", margin: 0, padding: 0 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <img
            src="/parsroyal.png"
            alt="Pars Royal"
            style={{ width: "150px", marginBottom: "40px" }}
          />
        </Box>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault(); // Prevents page reload
            handleSubmit(); // Calls your handleSubmit function
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: "100%"
          }}
        >
          <Typography variant="h5" textAlign="center" gutterBottom>
            ورود به سیستم
          </Typography>
          <TextField
            label="نام کاربری"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            dir="rtl"
          />
          <TextField
            label="پسوورد"
            type="password"
            variant="outlined"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={mutation.isLoading}
            startIcon={mutation.isPending && <CircularProgress size={20} />}
          >
            {mutation.isPending ? "در حال ورود به سیستم ..." : "ورود"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}