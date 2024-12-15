import React, { useState } from "react";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/backgroundImage.webp";


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: authenticate } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      authenticate(token);
      localStorage.setItem("token", token);
      setTimeout(() => {
        alert("Login successful!");
        navigate("/dashboard");
      }, 1000);
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
      height: "100vh", // Full height of the viewport
      backgroundImage: `url(${backgroundImage})`, // Use your image
      backgroundSize: "contain", // Ensures the image stretches to fill the screen
      backgroundRepeat: "no-repeat", // Prevents repeating
     
      fontFamily: "Arial, sans-serif",
      color: "#fff",
      position: "relative", // Needed for the overlay
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Darken the background for better contrast
      zIndex: -1,
    },
    formContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      padding: "40px",
      borderRadius: "12px",
      backdropFilter: "blur(10px)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
      width: "100%",
      maxWidth: "400px",
    },
    header: {
      fontSize: "30px",
      fontWeight: "bold",
      color: " #000000",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "12px",
      fontSize: "16px",
      border: "none",
      borderRadius: "6px",
      marginBottom: "15px",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      color: "#333",
      outline: "none",
      transition: "box-shadow 0.3s ease",
    },
    inputFocus: {
      boxShadow: "0 0 8px rgba(138, 43, 226, 0.6)",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#6a0dad",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#4b0082",
    },
    footer: {
      marginTop: "15px",
      fontSize: "14px",
      color: "#000000",
    },
    link: {
      color: "#a25cd1",
      textDecoration: "none",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "color 0.3s ease",
    },
    linkHover: {
      color: "#ffffff",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <h2 style={styles.header}>Welcome Back!</h2>
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
        <button type="submit" style={styles.button}>
          Login
        </button>
        <div style={styles.footer}>
          Don’t have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
