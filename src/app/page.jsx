"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PasswordDecoder from "./components/common/passdecoder";

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
      localStorage.setItem("token", data.token); // Store token
      queryClient.setQueryData(["user"], data.user); // Cache user data for later SP calls
      router.push("/kt"); // Redirect after login
    },
    onError: (error) => {
      alert(error.message); // Handle login errors
    },
  });

  return (
    <div dir="rtl" className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-20 ">
      <div>
        <img className="w-60 h-auto mt-40" src="/parsroyal.png" alt="" />
      </div>
      <div className="gap-10 ">
      <input
        className="w-full p-3 border border-gray-300 rounded-md mb-4
        focus:outline-none focus:ring-2 focus:ring-black-500 text-gray-900 rtl:text-right"
        type="text"
        placeholder="نام کاربری"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full p-3 border border-gray-300 rounded-md mb-4
        focus:outline-none focus:ring-2 focus:ring-black-500 text-gray-900"
        type="password"
        placeholder="پسوورد"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        onClick={handleSubmit}
        disabled={mutation.isLoading} // Disable button while loading
      >
        {mutation.isLoading ? "Logging in..." : "Login"}
      </button>
      <br />
      {/* <PasswordDecoder /> */}
      </div>
    </div>
  );
}
