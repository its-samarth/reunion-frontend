import React from "react";

const Summary: React.FC = () => {
  const summaryData = {
    totalTasks: 25,
    tasksCompleted: "40%",
    tasksPending: "60%",
    avgTimePerTask: "3.5 hrs",
  };

  const pendingTaskSummary = {
    pendingTasks: 15,
    totalTimeLapsed: "56 hrs",
    totalTimeToFinish: "24 hrs",
  };

  const taskPriorityData = [
    { priority: 1, pendingTasks: 3, timeLapsed: 12, timeToFinish: 8 },
    { priority: 2, pendingTasks: 5, timeLapsed: 6, timeToFinish: 3 },
    { priority: 3, pendingTasks: 1, timeLapsed: 8, timeToFinish: 7 },
    { priority: 4, pendingTasks: 0, timeLapsed: 0, timeToFinish: 0 },
    { priority: 5, pendingTasks: 6, timeLapsed: 30, timeToFinish: 6 },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.header}>Summary</h2>
        <div style={styles.row}>
          <div style={styles.metric}>
            <span style={styles.metricValue}>{summaryData.totalTasks}</span>
            <span>Total tasks</span>
          </div>
          <div style={styles.metric}>
            <span style={styles.metricValue}>{summaryData.tasksCompleted}</span>
            <span>Tasks completed</span>
          </div>
          <div style={styles.metric}>
            <span style={styles.metricValue}>{summaryData.tasksPending}</span>
            <span>Tasks pending</span>
          </div>
          <div style={styles.metric}>
            <span style={styles.metricValue}>{summaryData.avgTimePerTask}</span>
            <span>Average time per completed task</span>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.header}>Pending task summary</h2>
        <div style={styles.row}>
          <div style={styles.metric}>
            <span style={styles.metricValue}>
              {pendingTaskSummary.pendingTasks}
            </span>
            <span>Pending tasks</span>
          </div>
          <div style={styles.metric}>
            <span style={styles.metricValue}>
              {pendingTaskSummary.totalTimeLapsed}
            </span>
            <span>Total time lapsed</span>
          </div>
          <div style={styles.metric}>
            <span style={styles.metricValue}>
              {pendingTaskSummary.totalTimeToFinish}
            </span>
            <span>Total time to finish</span>
            <div></div>
            <span style={styles.note}>estimated based on endtime</span>
          </div>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Task priority</th>
              <th style={styles.th}>Pending tasks</th>
              <th style={styles.th}>Time lapsed (hrs)</th>
              <th style={styles.th}>Time to finish (hrs)</th>
            </tr>
          </thead>

          <tbody>
            {taskPriorityData.map((row, index) => (
              <tr
                key={row.priority}
                style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td>{row.priority}</td>
                <td>{row.pendingTasks}</td>
                <td>{row.timeLapsed}</td>
                <td>{row.timeToFinish}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
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
  } as React.CSSProperties,
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
  } as React.CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  } as React.CSSProperties,
  th: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#ffffff",
  },
};

export default Summary;
