'use client';


import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    alert("Login submitted!");
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-700 text-yellow-300 font-bold rounded-lg hover:bg-yellow-300 hover:text-purple-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}