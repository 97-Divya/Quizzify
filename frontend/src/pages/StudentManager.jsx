import React, { useEffect, useState } from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions
} from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:8080/api/students";

const StudentManager = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ id: null, name: "", email: "", course: "" });

  const fetchStudents = async () => {
    const res = await axios.get(API_URL);
    setStudents(res.data);
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleSave = async () => {
    if (form.id) {
      await axios.put(`${API_URL}/${form.id}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setOpen(false);
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchStudents();
  };

  return (
    <div>
      <Button variant="contained" onClick={() => { setForm({ id: null, name: "", email: "", course: "" }); setOpen(true); }}>
        Add Student
      </Button>

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell>{s.course}</TableCell>
              <TableCell>
                <Button onClick={() => { setForm(s); setOpen(true); }}>Edit</Button>
                <Button color="error" onClick={() => handleDelete(s.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{form.id ? "Edit Student" : "Add Student"}</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Email" fullWidth margin="dense" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField label="Course" fullWidth margin="dense" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudentManager;
