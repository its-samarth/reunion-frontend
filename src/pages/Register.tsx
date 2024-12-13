import React, { useState } from "react";
import { register } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: authenticate } = useAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await register(email, password);
      authenticate(token);
      setTimeout(()=>{ alert("Registration successful!");},1000)
    
      // Navigate to the dashboard after successful registration
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setTimeout(()=>{alert("Registration failed. Try again.");},1000)
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
