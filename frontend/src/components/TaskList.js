import TaskItem from "./TaskItem";

function TaskList({ tasks, fetchTasks, setEditingTask }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            fetchTasks={fetchTasks}
            setEditingTask={setEditingTask}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;