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
import Switch from "react-switch";
import { updateTask } from "@/services/authService";

interface UpdateTaskModalProps {
  task: any;
  refreshTasks: () => void;
  onClose: () => void;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({
  task,
  refreshTasks,
  onClose,
}) => {
  const [formData, setFormData] = useState(task);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setFormData((prevData: any) => ({
      ...prevData,
      status: prevData.status === "Finished" ? "Pending" : "Finished",
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in first.");
      setLoading(false);
      return;
    }

    try {
      await updateTask(token, formData._id, formData);
      refreshTasks();
      onClose(); // Close modal after update
    } catch (err) {
      setError("Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent
        className="p-6 w-full max-w-lg rounded-lg shadow-md"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }} // Add this line for opaque white background
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-4">
            Edit Task
          </DialogTitle>
          <p className="text-sm text-gray-500 mb-4">Task ID: {formData._id}</p>
        </DialogHeader>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="space-y-4">
          {/* Title */}
          <div>
            <Label className="text-gray-700">Title</Label>
            <Input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
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
              <Switch
                checked={formData.status === "Finished"}
                onChange={handleToggle}
                offColor="#d1d5db" // Light gray when off
                onColor="#4f46e5" // Purple when on (Finished)
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
              value={formData.startTime || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* End Time */}
          <div>
            <Label className="text-gray-700">End Time</Label>
            <Input
              type="datetime-local"
              name="endTime"
              value={formData.endTime || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 mt-6">
          <Button
            variant="outline"
            onClick={() => onClose()}
            disabled={loading}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTaskModal;
