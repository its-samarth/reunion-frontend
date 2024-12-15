import { getDashboardData, getTasks } from "@/services/authService";
import React, { useState, useEffect, useLayoutEffect } from "react";
import SummaryTable from "./SummaryTable"; // Assuming this is another table component
import { Skeleton } from "./ui/skeleton";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

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
          setError("Start adding tasks in Tasks List!.");
        }
      };

      fetchDashboardData();
    }
  }, [tasks]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 font-sans text-gray-900">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        <div className="flex flex-wrap justify-between gap-6">
          {/* Total Tasks Card */}
          <Card className="w-full sm:w-1/4 shadow-md">
            <CardHeader>
              {loading ? (
                <Skeleton className="h-6 w-24 rounded-full" />
              ) : (
                <>
                  <CardTitle className="text-2xl text-purple-600">
                    {dashboardData?.totalTasks ?? "N/A"}
                  </CardTitle>
                  <CardDescription>Total tasks</CardDescription>
                </>
              )}
            </CardHeader>
          </Card>

          {/* Tasks Completed Card */}
          <Card className="w-full sm:w-1/4 shadow-md">
            <CardHeader>
              {loading ? (
                <Skeleton className="h-6 w-24 rounded-full" />
              ) : (
                <>
                  <CardTitle className="text-2xl text-purple-600">
                    {dashboardData?.completedPercentage ?? "N/A"}
                  </CardTitle>
                  <CardDescription>Tasks completed (%)</CardDescription>
                </>
              )}
            </CardHeader>
          </Card>

          {/* Tasks Pending Card */}
          <Card className="w-full sm:w-1/4 shadow-md">
            <CardHeader>
              {loading ? (
                <Skeleton className="h-6 w-24 rounded-full" />
              ) : (
                <>
                  <CardTitle className="text-2xl text-purple-600">
                    {dashboardData?.pendingPercentage ?? "N/A"}
                  </CardTitle>
                  <CardDescription>Tasks pending (%)</CardDescription>
                </>
              )}
            </CardHeader>
          </Card>

          {/* Average Completion Time Card */}
          <Card className="w-full sm:w-1/4 shadow-md">
            <CardHeader>
              {loading ? (
                <Skeleton className="h-6 w-24 rounded-full" />
              ) : (
                <>
                  <CardTitle className="text-2xl text-purple-600">
                    {dashboardData?.averageCompletionTime ?? "N/A"} hrs
                  </CardTitle>
                  <CardDescription>
                    Average time per completed task
                  </CardDescription>
                </>
              )}
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Pending task summary</h2>
        <div className="flex flex-wrap justify-between gap-6">
          {/* Pending Tasks Card */}
          <Card className="w-full sm:w-1/4 shadow-md">
            <CardHeader>
              {loading ? (
                <Skeleton className="h-6 w-24 rounded-full" />
              ) : (
                <>
                  <CardTitle className="text-2xl text-purple-600">
                    {dashboardData?.pendingTasks ?? "N/A"}
                  </CardTitle>
                  <CardDescription>Pending tasks</CardDescription>
                </>
              )}
            </CardHeader>
          </Card>

          {/* Total Time Lapsed Card */}
          <Card className="w-full sm:w-1/4 shadow-md">
            <CardHeader>
              {loading ? (
                <Skeleton className="h-6 w-24 rounded-full" />
              ) : (
                <>
                  <CardTitle className="text-2xl text-purple-600">
                    {dashboardData?.timeLapsedByPriority[1]
                      ? `${Math.round(
                          dashboardData?.timeLapsedByPriority[1]
                        )} hrs`
                      : "N/A"}
                  </CardTitle>

                  <CardDescription>Total time lapsed</CardDescription>
                </>
              )}
            </CardHeader>
          </Card>

          {/* Total Time to Finish Card */}
          <Card className="w-full sm:w-1/4 shadow-md">
            <CardHeader>
              {loading ? (
                <Skeleton className="h-6 w-24 rounded-full" />
              ) : (
                <>
                  <CardTitle className="text-2xl text-purple-600">
                  {dashboardData?.totalTimeToFinishByPriority[1]
                      ? `${Math.round(
                          dashboardData?.totalTimeToFinishByPriority[1]
                        )} hrs`
                      : "0"}
                  </CardTitle>
                  <CardDescription>Total time to finish</CardDescription>
                </>
              )}
            </CardHeader>
            <div className="p-4 text-center text-sm text-gray-500">
              <span>estimated based on endtime</span>
            </div>
          </Card>
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
