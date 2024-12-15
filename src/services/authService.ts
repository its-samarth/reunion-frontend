import axios from "axios";

const API_URL = "https://reunion-backend-ibh5.onrender.com/api";

export const login = async (email: string, password: string): Promise<string> => {
  try {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data.token; // Return JWT token
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const register = async (email: string, password: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { email, password });
    console.log("Registration successful:", response.data);
    return response.data.token; // Return JWT token
    
  } catch (error) {
    console.error('Error  in registration', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};


export const getTasks = async (token: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Attach the token to the Authorization header
        'Content-Type': 'application/json', // Optional: Specify the content type
      }
    });
    return response.data; // Return the task data
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const setTasks = async (token: string, taskData: any): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
        'Content-Type': 'application/json', // Specify content type for JSON
      },
    });

    return response.data; // Return the newly created/updated task data
  } catch (error) {
    console.error('Error setting tasks:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const updateTask = async (token: string, taskId: string, taskData: any): Promise<any> => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
        'Content-Type': 'application/json', // Specify content type for JSON
      },
    });

    return response.data; // Return the updated task data
  } catch (error) {
    console.error('Error updating task:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};


export const deleteTask = async (token: string, taskId: string): Promise<any> => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
        'Content-Type': 'application/json', // Specify content type for JSON
      },
    });

    return response.data; // Return the response data (success message, etc.)
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};


export const getDashboardData = async (token: string, taskData: any): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_URL}/dashboard`,  // API endpoint for dashboard
      { tasks: taskData },  // Pass the task data in the body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authentication
          "Content-Type": "application/json", // Specify content type for JSON
        },
      }
    );

    return response.data; // Return the response data, which will include dashboard statistics
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};