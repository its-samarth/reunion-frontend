import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactSwitch from "react-switch"; // Importing react-switch
import { setTasks } from "@/services/authService";

interface AddTaskModalProps {
  refreshTasks: () => void;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  refreshTasks,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    priority: 1,
    status: "pending",
    startTime: "",
    endTime: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Validate Start Time and End Time
    const start = new Date(formData.startTime);
    const end = new Date(formData.endTime);
    const currentTime = new Date();
    // Validation to check if End Time is greater than Start Time

    if (end <= start) {
      setError("End Time must be greater than Start Time.");
      return; // Prevent form submission if validation fails
    }

    // Validation to check if End Time is not greater than the current time
    if (end > currentTime) {
      setError("End Time must not be greater than the current time.");
      return; // Prevent form submission if validation fails
    }


    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in first.");
      return;
    }

    // Prepare task data
    const taskData = {
      title: formData.title,
      priority: formData.priority,
      status: formData.status,
      startTime: formData.startTime,
      endTime: formData.endTime,
    };

    try {
      const newTask = await setTasks(token, taskData);
      setSuccess("Task created successfully!");
      setError(null); // Reset error if successful
      refreshTasks(); // Refresh the task list after a new task is added
      onClose(); // Close the modal after success
    } catch (err) {
      setError("Failed to create task.");
      setSuccess(null); // Reset success message if failed
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent
        className="p-6 w-full max-w-lg rounded-lg shadow-md"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-4">
            Create New Task
          </DialogTitle>
        </DialogHeader>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <Label className="text-gray-700">Title</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Priority */}
          <div>
            <Label className="text-gray-700">Priority</Label>
            <Input
              type="number"
              name="priority"
              value={formData.priority || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              min="1" // Minimum value allowed
              max="5" // Maximum value allowed
              step="1"
            />
          </div>

          {/* Status */}
          <div className="flex items-center space-x-4">
            <Label className="text-gray-700">Status</Label>
            <div className="flex items-center">
              <span className="mr-2">Pending</span>
              {/* React Switch */}
              <ReactSwitch
                checked={formData.status === "finished"}
                onChange={(checked) =>
                  setFormData({
                    ...formData,
                    status: checked ? "finished" : "pending",
                  })
                }
                offColor="#d1d5db"
                onColor="#4f46e5"
                offHandleColor="#fff"
                onHandleColor="#fff"
                handleDiameter={20}
                height={24}
                width={48}
                uncheckedIcon={false}
                checkedIcon={false}
              />
              <span className="ml-2">Finished</span>
            </div>
          </div>

          {/* Start Time */}
          <div>
            <Label className="text-gray-700">Start Time</Label>
            <Input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* End Time */}
          <div>
            <Label className="text-gray-700">End Time</Label>
            <Input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
