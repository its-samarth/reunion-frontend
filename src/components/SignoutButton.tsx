import React from "react";
import { useNavigate } from "react-router-dom";

const SignOutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <button onClick={handleSignOut} style={styles.button}>
        Sign Out
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "flex-end", // Align button to the right
    padding: "10px", // Add padding for spacing
  },
  button: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default SignOutButton;
