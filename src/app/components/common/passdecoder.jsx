import React, { useState } from 'react';

const KEYCODE = '{AR&YZ&MZ}';

function CodeMe(text, key) {
  let s1 = '';
  text = '$' + text + '#';
  for (let i = 0; i < text.length; i++) {
    s1 += String.fromCharCode(text.charCodeAt(i) + 2);
  }
  key = '*' + key + '*';
  let j = 0;
  let result = '';
  for (let i = 0; i < s1.length; i++) {
    let s2 = String.fromCharCode((s1.charCodeAt(i) ^ key.charCodeAt(j % key.length)) ^ 63);
    result += s2;
    j = ((j + 1) % key.length) + 1;
  }
  return result;
}










export default function PasswordDecryptor() {
  const [encryptedPassword, setEncryptedPassword] = useState('');
  const [decryptedPassword, setDecryptedPassword] = useState('');

  const handleDecrypt = () => {
    const decrypted = CodeMe(encryptedPassword, KEYCODE);
    setDecryptedPassword(decrypted);
    console.log('Decrypted Password:', decrypted);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-gray-800 mb-4">Password Decryptor</h2>
      <input
        type="text"
        placeholder="Enter Encrypted Password"
        value={encryptedPassword}
        onChange={(e) => setEncryptedPassword(e.target.value)}
        className="text-black w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleDecrypt}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
      >
        Decrypt
      </button>
      {decryptedPassword && (
        <p className="text-gray-800 mt-4">{decryptedPassword}</p>
      )}
    </div>
  );
}
