import React, { useEffect, useState } from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions
} from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:8080/api/instructors";

const InstructorManager = () => {
  const [instructors, setInstructors] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ id: null, name: "", email: "", specialization: "" });

  const fetchInstructors = async () => {
    const res = await axios.get(API_URL);
    setInstructors(res.data);
  };

  useEffect(() => { fetchInstructors(); }, []);

  const handleSave = async () => {
    if (form.id) {
      await axios.put(`${API_URL}/${form.id}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setOpen(false);
    fetchInstructors();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchInstructors();
  };

  return (
    <div>
      <Button variant="contained" onClick={() => { setForm({ id: null, name: "", email: "", specialization: "" }); setOpen(true); }}>
        Add Instructor
      </Button>

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Specialization</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instructors.map((i) => (
            <TableRow key={i.id}>
              <TableCell>{i.name}</TableCell>
              <TableCell>{i.email}</TableCell>
              <TableCell>{i.specialization}</TableCell>
              <TableCell>
                <Button onClick={() => { setForm(i); setOpen(true); }}>Edit</Button>
                <Button color="error" onClick={() => handleDelete(i.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{form.id ? "Edit Instructor" : "Add Instructor"}</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Email" fullWidth margin="dense" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField label="Specialization" fullWidth margin="dense" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InstructorManager;
