import axios from "axios";

const API_URL = "http://localhost:5500/api/auth";

export const login = async (email: string, password: string): Promise<string> => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data.token; // Return JWT token
};

export const register = async (
  email: string,
  password: string
): Promise<string> => {
  const response = await axios.post(`${API_URL}/register`, { email, password });
  return response.data.token; // Return JWT token
};
