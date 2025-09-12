import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const getStudents = () => axios.get(`${API_BASE_URL}/admin/students`);
export const getInstructors = () => axios.get(`${API_BASE_URL}/admin/instructors`);
export const createUser = (user) => axios.post(`${API_BASE_URL}/admin/users`, user);
export const updateUser = (id, user) => axios.put(`${API_BASE_URL}/admin/users/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/admin/users/${id}`);
