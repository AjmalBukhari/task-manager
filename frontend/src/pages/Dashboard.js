import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const { logout } = useContext(AuthContext);

  const fetchTasks = async () => {
    const { data } = await API.get(
      `/tasks?keyword=${keyword}&status=${status}&page=${page}&limit=5`
    );

    setTasks(data.tasks);
    setPages(data.pages);
  };

  useEffect(() => {
    fetchTasks();
  }, [keyword, status, page]);

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search tasks..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(1); // reset page
          }}
        />

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button onClick={logout}>Logout</button>

      <TaskForm
        fetchTasks={fetchTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />

      <TaskList
        tasks={tasks}
        fetchTasks={fetchTasks}
        setEditingTask={setEditingTask}
      />

      <div style={{ marginTop: "20px" }}>
        {[...Array(pages).keys()].map((x) => (
          <button
            key={x + 1}
            onClick={() => setPage(x + 1)}
            style={{
              margin: "5px",
              fontWeight: page === x + 1 ? "bold" : "normal",
            }}
          >
            {x + 1}
          </button>
        ))}
      </div>
    </div>

    
  );
}

export default Dashboard;