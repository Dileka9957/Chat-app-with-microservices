import { useState } from "react";
import axios from "axios";
import type { AuthResponse, User } from "../types/types";

const Auth = () => {
  const [user, setUser] = useState<User>({ email: "", password: "" });

  const handleRegister = async () => {
    try {
      const res = await axios.post<AuthResponse>(
        "http://localhost:3000/auth/register",
        user
      );
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post<AuthResponse>(
        "http://localhost:3000/auth/login",
        user
      );
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <input
        type="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Auth;
