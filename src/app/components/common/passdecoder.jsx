"use client";

import { useState } from "react";

const KEYCODE = "{AR&YZ&MZ}"; // Replace with the correct key

function encryptPassword(text, key) {
  let s1 = "";
  let keyIndex = 0;

  // Step 1: Add "$" at the beginning and "#" at the end
  text = "$" + text + "#";

  // Step 2: Apply double succ() transformation
  for (let i = 0; i < text.length; i++) {
    s1 += String.fromCharCode(text.charCodeAt(i) + 2); // ✅ Simulates Pascal's `succ(succ(x))`
  }

  let encryptedPassword = "";
  
  // Step 3: Apply XOR encryption using the key cyclically
  for (let i = 0; i < s1.length; i++) {
    let charCode = s1.charCodeAt(i) ^ key.charCodeAt(keyIndex) ^ 63;
    encryptedPassword += String.fromCharCode(charCode);
    keyIndex = (keyIndex + 1) % key.length;
  }

  return encryptedPassword;
}

export default function PasswordDecoder() {
  const [plainText, setPlainText] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");

  const handleEncrypt = () => {
    const encrypted = encryptPassword(plainText, KEYCODE);
    setEncryptedPassword(encrypted);
    console.log("Encrypted Password:", encrypted); // ✅ Logs encrypted password to console
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Password Encryptor</h2>
      <input
        type="text"
        placeholder="Enter Password"
        value={plainText}
        onChange={(e) => setPlainText(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleEncrypt} style={{ padding: "10px", cursor: "pointer" }}>
        Encrypt Password
      </button>
      {encryptedPassword && <p><strong>Encrypted Password:</strong> {encryptedPassword}</p>}
    </div>
  );
}
