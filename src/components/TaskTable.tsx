import React, { useEffect, useState } from "react";
import { deleteTask, getTasks } from "@/services/authService";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import SetTask from "./SetTasks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { updateTask } from "@/services/authService"; // Assuming you have a service for updating tasks
import UpdateTaskModal from "./UpdateTaskModal";
import AddTaskModal from "./SetTasks";
import { log } from "console";

const TaskTable = () => {
  const [tasks, setTasks] = useState<any>(null); // Allow tasks to be null initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null); // Store the task being edited
  const [openModal, setOpenModal] = useState(false); // Manage modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeleteTasks, setSelectedDeleteTasks] = useState<string[]>([]);
  console.log(tasks);
  
  const handleClose = () => {
    setIsModalOpen(false);
  };
  // Function to refresh the task list
  const refreshTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in first.");
      return;
    }

    try {
      const fetchedTasks = await getTasks(token);
      if (fetchedTasks) {
        setTasks(fetchedTasks);
      } else {
        throw new Error("No tasks found");
      }
    } catch (err) {
      setError("Error fetching tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on initial load
  useEffect(() => {
    refreshTasks();
  }, []);

  const handleRowClick = (task: any) => {
    setSelectedTask(task);
    setOpenModal(true); // Open the modal on row click
  };

  const handleCheckboxChange = (taskId: string) => {
    setSelectedDeleteTasks((prevSelected) =>
      prevSelected.includes(taskId)
        ? prevSelected.filter((id) => id !== taskId)
        : [...prevSelected, taskId]
    );
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token || selectedDeleteTasks.length === 0) {
      setError("No tasks selected or no token found.");
      return;
    }

    try {
      // Delete tasks sequentially
      for (const taskId of selectedDeleteTasks) {
        await deleteTask(token, taskId);
      }
      setError(null); // Reset error
      refreshTasks(); // Refresh task list after deletion
    } catch (err) {
      setError("Error deleting tasks.");
    }
  };

  const handleUpdate = async (updatedTask: any) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in first.");
      return;
    }

    try {
      await updateTask(token, updatedTask._id, updatedTask); // Call the update task service
      refreshTasks(); // Refresh the task list after update
      setOpenModal(false); // Close the modal after successful update
    } catch (err) {
      setError("Error updating task.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="p-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 text-white rounded-xl hover:bg-purple-900 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 px-4 py-2 text-l font-semibold mr-4"
        >
          Add Task
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white rounded-xl hover:bg-red-900 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 px-4 py-2 text-l font-semibold"
        >
          Delete Task
        </button>
      </div>

      <div className="App">
        {isModalOpen && (
          <AddTaskModal refreshTasks={refreshTasks} onClose={handleClose} />
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input
                type="checkbox"
                checked={selectedDeleteTasks.length === tasks.tasks.length}
                onChange={(e) => {
                  e.stopPropagation(); // Prevent row click on header checkbox
                  if (selectedDeleteTasks.length === tasks.tasks.length) {
                    setSelectedDeleteTasks([]);
                  } else {
                    setSelectedDeleteTasks(
                      tasks.tasks.map((task: any) => task._id)
                    );
                  }
                }}
              />
            </TableHead>
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
              <TableRow
                key={task._id}
                onClick={(e) => {
                  // Check if the click target is the checkbox, then prevent row click
                  if (
                    e.target instanceof HTMLInputElement &&
                    e.target.type === "checkbox"
                  ) {
                    return;
                  }
                  handleRowClick(task); // Handle row click if not checkbox
                }}
                className="cursor-pointer hover:bg-gray-200"
              >
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedDeleteTasks.includes(task._id)}
                    onChange={(e) => {
                      e.stopPropagation(); // Prevent row click on checkbox click
                      handleCheckboxChange(task._id);
                    }}
                  />
                </TableCell>

                <TableCell>{index + 1}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  {new Date(task.startTime).toLocaleString()}
                </TableCell>
                <TableCell>{new Date(task.endTime).toLocaleString()}</TableCell>
                <TableCell>{Math.round(task.totalTime)}</TableCell>
                <TableCell>
                  {new Date(task.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(task.updatedAt).toLocaleString()}
                </TableCell>
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

      {/* Modal for updating task */}
      {selectedTask && openModal && (
        <UpdateTaskModal
          task={selectedTask}
          onClose={() => setOpenModal(false)} // Close modal
          refreshTasks={refreshTasks} // Refresh tasks after update
        />
      )}
    </div>
  );
};

export default TaskTable;
