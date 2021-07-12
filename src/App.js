import { useState, useEffect } from "react";
import { BrowserRouter as Router , Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getTasks = async () => {
      const getData = await fetchTasks();
      setTasks(getData);
    };
    getTasks();
  }, []);

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const taskData = await res.json();
    return taskData;
  };
  // fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const taskData = await res.json();
    return taskData;
  };

  // Delete Tasks
  const deleteTasks = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "Delete",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const tasktoToggle = await fetchTask(id);
    const updData = { ...tasktoToggle, reminder: !tasktoToggle.reminder };
      const res = await fetch(`http://localhost:5000/tasks/${id}`,{
        method: 'PUT',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(updData)
      });

      const data = await res.json();

    setTasks(
      tasks.map((task)=>
        task.id === id ? {...task,reminder:data.reminder}:task
      )
      )
  };
  // addTask
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const newTasks = await res.json();
    setTasks([...tasks, newTasks]);
  };
  return (
    <Router>
      <div className="container">
        <Header
          showAdd={() => setShowAddTask(!showAddTask)}
          showTask={showAddTask}
        />

        <Route
          path="/"
          exact
          render={
            (props) => (
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTasks}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "no tasks to show"
                )}
              </>
            )
          }
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
