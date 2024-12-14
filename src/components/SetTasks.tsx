import React, { useState } from 'react';
import { setTasks } from '@/services/authService';

const SetTask = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(1);
  const [status, setStatus] = useState('pending');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found, please log in first.');
      return;
    }

    // Prepare task data
    const taskData = {
      title,
      priority,
      status,
      startTime,
      endTime,
    };

    try {
      const newTask = await setTasks(token, taskData);
      setSuccess('Task created successfully!');
      setError(null); // Reset error if successful
    } catch (err) {
      setError('Failed to create task.');
      setSuccess(null); // Reset success message if failed
    }
  };

  return (
    <div>
      <h1>Create New Task</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
          >
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="startTime">Start Time</label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="endTime">End Time</label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default SetTask;
