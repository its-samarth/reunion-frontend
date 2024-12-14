import React, { useState } from "react";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: authenticate } = useAuth();
  const navigate = useNavigate();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     // Send login request to the backend
  //     const response = await fetch(`http://localhost:5500/api/auth/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     // Handle response
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Login failed");
  //     }

  //     const { token } = await response.json();

  //     // Save token to localStorage and authenticate user
  //     localStorage.setItem("token", token);
  //     alert("Login successful!");
  //     navigate("/dashboard"); // Redirect to the dashboard
  //   } catch (error: any) {
  //     console.error(error);
  //     alert(error.message || "An error occurred during login.");
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      authenticate(token);
      localStorage.setItem("token", token); 
      setTimeout(() => {
        alert("Login successful!");
      }, 1000);
       // Navigate to the dashboard after successful login
       navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        alert("Login failed. Please check your credentials.");
      }, 1000);
      
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f0f0",
      fontFamily: "Arial, sans-serif",
    },
    form: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    header: {
      textAlign: "center",
      fontSize: "24px",
      color: "#333",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "12px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      outline: "none",
      marginBottom: "15px",
      boxSizing: "border-box" as "border-box",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#007BFF" as string,  // Explicit string type
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3" as string,  // Explicit string type
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.header}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button
          type="submit"
          style={styles.button}
        
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
