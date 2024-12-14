import React, { useEffect, useState } from 'react';
import TaskTable from './TaskTable';
import { getTasks } from '@/services/authService';
import { log } from 'console';
 // Assuming you have imported the getTasks function

const TasksList = () => {
  const [tasks, setTasks] = useState<any[]>([]); // Use array for tasks data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch tasks from the API using the bearer token
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        console.log(token);
        

        if (!token) {
          throw new Error('No token found, please login first');
        }

        // Get tasks using the token
        const fetchedTasks = await getTasks(token); // Pass token to getTasks
        setTasks(fetchedTasks); // Store the tasks in state
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array means this runs once when component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Tasks</h1>
      <TaskTable  /> {/* Pass tasks data to TaskTable */}
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  );
};

export default TasksList;
