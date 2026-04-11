import { useState, useEffect } from "react";
import API from "../services/api";

function TaskForm({ fetchTasks, editingTask, setEditingTask }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    if (editingTask) {
      setForm(editingTask);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingTask) {
      await API.put(`/tasks/${editingTask._id}`, form);
      setEditingTask(null);
    } else {
      await API.post("/tasks", form);
    }

    setForm({
      title: "",
      description: "",
      status: "Pending",
      dueDate: "",
    });

    setPage(1);
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingTask ? "Edit Task" : "Add Task"}</h3>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <input
        type="date"
        value={form.dueDate?.substring(0, 10) || ""}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      />

      <button type="submit">
        {editingTask ? "Update" : "Create"}
      </button>
    </form>
  );
}

export default TaskForm;