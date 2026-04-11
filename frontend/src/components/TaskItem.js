import API from "../services/api";

function TaskItem({ task, fetchTasks, setEditingTask }) {
  const handleDelete = async () => {
    await API.delete(`/tasks/${task._id}`);
    fetchTasks();
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>

      <button onClick={() => setEditingTask(task)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskItem;