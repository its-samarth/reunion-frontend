import React, { useState } from "react";

import TaskList from "./TaskList";
import Summary from "./Summary";
import SignOutButton from "./SignoutButton";

const TopBar: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("dashboard");

  const handleComponentChange = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <div style={styles.topbar}>
        <button
          style={activeComponent === "dashboard" ? styles.activeButton : styles.button}
          onClick={() => handleComponentChange("dashboard")}
        >
          Dashboard
        </button>
        <button
          style={activeComponent === "tasklist" ? styles.activeButton : styles.button}
          onClick={() => handleComponentChange("tasklist")}
        >
          Task List
        </button>
        <div style={styles.signOutContainer}>
          <SignOutButton />
        </div>
       
      </div>
      {activeComponent === "dashboard" && <Summary />}
      {activeComponent === "tasklist" && <TaskList />}
    </div>
  );
};

const styles = {
  topbar: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#333",
    padding: "10px",
  },
  button: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    padding: "10px 20px",
  
    cursor: "pointer",
    margin: "0 10px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
  activeButton: {
    backgroundColor: "#6200ea",
    color: "white",
    padding: "10px 20px",
    border: "2px solid #6200ea",
    cursor: "pointer",
    margin: "0 10px",
    borderRadius: "5px",
  },
  signOutContainer: {
    marginLeft: "auto", 
  },
};

export default TopBar;
