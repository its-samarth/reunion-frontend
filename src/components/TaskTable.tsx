import React, { useEffect, useState } from 'react';
import { getTasks } from '@/services/authService';
// Import the SetTask component
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table';
import SetTask from './SetTasks';

const TasksLists = () => {
  const [tasks, setTasks] = useState<any>(null); // Allow tasks to be null initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to refresh the task list
  const refreshTasks = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found, please log in first.');
      return;
    }

    try {
      const fetchedTasks = await getTasks(token);
      if (fetchedTasks) {
        setTasks(fetchedTasks);
      } else {
        throw new Error('No tasks found');
      }
    } catch (err) {
      setError('Error fetching tasks.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on initial load
  useEffect(() => {
    refreshTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Tasks</h1>
      <SetTask refreshTasks={refreshTasks} /> {/* Pass refreshTasks as prop */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sr No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Total Time (hrs)</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks && tasks.tasks ? (
            tasks.tasks.map((task: any, index: number) => (
              <TableRow key={task._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{new Date(task.startTime).toLocaleString()}</TableCell>
                <TableCell>{new Date(task.endTime).toLocaleString()}</TableCell>
                <TableCell>{task.totalTime}</TableCell>
                <TableCell>{new Date(task.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(task.updatedAt).toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                No tasks available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksLists;
