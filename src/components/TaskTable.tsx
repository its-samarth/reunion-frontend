import React, { useEffect, useState } from 'react';
import { getTasks } from '@/services/authService';

const TasksList = () => {
  const [tasks, setTasks] = useState<any>(null); // Allow tasks to be null initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found, please login first');

        const fetchedTasks = await getTasks(token);
        console.log('Fetched Tasks:', fetchedTasks); // Log the fetched object

        if (fetchedTasks) {
          setTasks(fetchedTasks); // Directly set the fetched object
        } else {
          throw new Error('No tasks found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Render the table directly from the object
  return (
    <div>
      <h1>User Tasks</h1>
      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Total Time (hrs)</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {/* Parse the tasks object */}
          {tasks && tasks.tasks ? (
            tasks.tasks.map((task: any) => (
              <tr key={task._id}>
                <td>{task._id}</td>
                <td>{task.title}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>{task.startTime}</td>
                <td>{task.endTime}</td>
                <td>{task.totalTime}</td>
                <td>{task.createdAt}</td>
                <td>{task.updatedAt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TasksList;
