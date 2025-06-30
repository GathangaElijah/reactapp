import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";

// Ref to focus after deleting a task
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// Filter buttons
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {
  // Tasks hook
  const[tasks, setTasks] = useState(props.tasks);
  // Filter Hook
  const [filter, setFilter] = useState("All")

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {...task, completed: !task.completed};
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // Tasklist
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo 
    id={task.id} 
    name={task.name}
    completed={task.completed} 
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
    />
  ) );

  // Filtering tasks
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
    key={name} 
    name={name} 
    isPressed={name === filter}
    setFilter={setFilter}
    />
  ))

  // Adding a task to the list from the form.
  function addTask(name) {
    const newTask = { id: `todo-${nanoid}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  // Deleting a task
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== 
    task.id);
    setTasks(remainingTasks);
  }

  // Editing a task
  function editTask(id, newName) {
    const editedTasklist = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        return {...task, name: newName};
      }
      // Return original task if its not the edited task
      return task;
    });
    setTasks(editedTasklist)
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun}
  remaining`;
  
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);
   // Focus on the heading
  useEffect(() => {
  if (tasks.length < prevTaskLength) {
    listHeadingRef.current.focus();
  }
}, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      {/* Form Component */}
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}> 
        {headingText} 
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
