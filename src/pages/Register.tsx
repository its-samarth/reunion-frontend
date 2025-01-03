import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import backgroundImage from "../assets/bg2.jpeg"
import { register } from "@/services/authService";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: authenticate } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const token = await register(email, password);
        authenticate(token);
        localStorage.setItem("token", token);
          alert("Login successful!");
          navigate("/dashboard");   
      } catch (error) {
        console.error(error);
          alert("Login failed , Already Registered User ."+error);
      }
    };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      
      fontFamily: "Arial, sans-serif",
      color: "#fff",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
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
      color: "#e0e0ff",
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
    },
    footer: {
      marginTop: "15px",
      fontSize: "14px",
      color: "#ddd",
    },
    link: {
      color: "#a25cd1",
      textDecoration: "none",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <h2 style={styles.header}>Create an Account</h2>
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
          placeholder="Password (length > 6 character)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Register
        </button>
        <div style={styles.footer}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
