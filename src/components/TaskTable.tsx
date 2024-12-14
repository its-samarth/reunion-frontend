import React, { useEffect, useState } from 'react';
import { getTasks } from '@/services/authService';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table';

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

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">User Tasks Table</h1>
      <Table className="table-auto border-collapse w-full">
        <TableHeader className="bg-gray-800 text-white">
          <TableRow>
            <TableHead className="px-4 py-2 border">Sr No</TableHead>
            <TableHead className="px-4 py-2 border">Title</TableHead>
            <TableHead className="px-4 py-2 border">Priority</TableHead>
            <TableHead className="px-4 py-2 border">Status</TableHead>
            <TableHead className="px-4 py-2 border">Start Time</TableHead>
            <TableHead className="px-4 py-2 border">End Time</TableHead>
            <TableHead className="px-4 py-2 border">Total Time (hrs)</TableHead>
            <TableHead className="px-4 py-2 border">Created At</TableHead>
            <TableHead className="px-4 py-2 border">Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks && tasks.tasks ? (
            tasks.tasks.map((task: any, index: number) => (
              <TableRow
                key={task._id}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <TableCell className="px-4 py-2 border">{index + 1}</TableCell>
                <TableCell className="px-4 py-2 border">{task.title}</TableCell>
                <TableCell className="px-4 py-2 border">{task.priority}</TableCell>
                <TableCell className="px-4 py-2 border">{task.status}</TableCell>
                <TableCell className="px-4 py-2 border">
                  {new Date(task.startTime).toLocaleString()}
                </TableCell>
                <TableCell className="px-4 py-2 border">
                  {new Date(task.endTime).toLocaleString()}
                </TableCell>
                <TableCell className="px-4 py-2 border">{task.totalTime}</TableCell>
                <TableCell className="px-4 py-2 border">
                  {new Date(task.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="px-4 py-2 border">
                  {new Date(task.updatedAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center px-4 py-2 border">
                No tasks available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksList;
