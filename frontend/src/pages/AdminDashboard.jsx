import React, { useEffect, useState } from "react";
import { getStudents, getInstructors, createUser, updateUser, deleteUser } from "../api";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [form, setForm] = useState({ username: "", password: "", role: "student" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const s = await getStudents();
    const i = await getInstructors();
    setStudents(s.data);
    setInstructors(i.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(form);
    setForm({ username: "", password: "", role: "student" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchData();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <h2>Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.username} 
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Instructors</h2>
      <ul>
        {instructors.map((i) => (
          <li key={i.id}>
            {i.username} 
            <button onClick={() => handleDelete(i.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
