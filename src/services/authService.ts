import axios from "axios";

const API_URL = "http://localhost:5500/api";

export const login = async (email: string, password: string): Promise<string> => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data.token; // Return JWT token
};

export const register = async (
  email: string,
  password: string
): Promise<string> => {
  const response = await axios.post(`${API_URL}auth/register`, { email, password });
  return response.data.token; // Return JWT token
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