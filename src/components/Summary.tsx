import { getDashboardData, getTasks } from "@/services/authService";
import React, { useState, useEffect, useLayoutEffect } from "react";
import SummaryTable from "./SummaryTable"; // Assuming this is another table component

const Summary: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null); // For storing processed dashboard data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Function to fetch tasks from the backend
  const refreshTasks = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found, please log in first.");
      return;
    }

    try {
      const fetchedTasks = await getTasks(token);
      console.log("Fetched Tasks:", fetchedTasks);
      // Ensure fetchedTasks is an array, even if it's not
      const tasksArray = Array.isArray(fetchedTasks)
        ? fetchedTasks
        : [fetchedTasks];
      setTasks(tasksArray); // Set tasks in state
    } catch (err) {
      setError("Error fetching tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on initial load
  useLayoutEffect(() => {
    refreshTasks();
  }, []);

  // Fetch dashboard data when tasks are available
  useLayoutEffect(() => {
    if (tasks.length > 0) {
      const fetchDashboardData = async () => {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const data = await getDashboardData(token, tasks); // Pass tasks to the service
            console.log("Fetched Dashboard Data:", data);
            setDashboardData(data?.data); // Set the returned dashboard data (from the 'data' property of the response)
          } else {
            setError("No token found, please log in first.");
          }
        } catch (err) {
          setError("Error fetching dashboard data.");
        }
      };

      fetchDashboardData();
    }
  }, [tasks]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.header}>Summary</h2>
        <div style={styles.row}>
          <div style={styles.metric}>
            <span style={styles.metricValue}>
              {dashboardData?.totalTasks || "N/A"}
            </span>
            <span>Total tasks</span>
          </div>
          <div style={styles.metric}>
            <span style={styles.metricValue}>
              {dashboardData?.completedPercentage !== undefined
                ? dashboardData?.completedPercentage
                : "N/A"}
            </span>
            <span>Tasks completed (%)</span>
          </div>
          <div style={styles.metric}>
            <span style={styles.metricValue}>
              {dashboardData?.pendingPercentage || "N/A"}
            </span>
            <span>Tasks pending (%)</span>
          </div>
          <div style={styles.metric}>
            <span style={styles.metricValue}>
              {dashboardData?.averageCompletionTime !== undefined
                ? dashboardData?.averageCompletionTime
                : "N/A"}
            </span>
            <span>Average time per completed task</span>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.header}>Pending task summary</h2>
        <div style={styles.row}>
          <div style={styles.metric}>
            <span style={styles.metricValue}>
              {/* Assuming pendingTaskSummary will be available here */}
              {dashboardData?.pendingTaskSummary?.pendingTasks || "N/A"}
            </span>
            <span>Pending tasks</span>
          </div>
          <div style={styles.metric}>
            <span style={styles.metricValue}>
              {dashboardData?.pendingTaskSummary?.totalTimeLapsed || "N/A"}
            </span>
            <span>Total time lapsed</span>
          </div>
          <div style={styles.metric}>
            <span style={styles.metricValue}>
              {dashboardData?.pendingTaskSummary?.totalTimeToFinish || "N/A"}
            </span>
            <span>Total time to finish</span>
            <div></div>
            <span style={styles.note}>estimated based on endtime</span>
          </div>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <SummaryTable />
      </div>
    </div>
  );
};

// Updated styles with proper type declarations
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  section: {
    marginBottom: "20px",
  },
  header: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
  metric: {
    flex: "1",
    textAlign: "center",
    margin: "10px",
  },
  metricValue: {
    display: "block",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#6200ea",
    marginBottom: "5px",
  },
  note: {
    fontSize: "12px",
    color: "#888",
  },
  tableContainer: {
    overflowX: "auto",
  },
};

export default Summary;
