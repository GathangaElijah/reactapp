import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { useState } from "react";
import { nanoid } from "nanoid";
// Filter buttons
const FILTER_TYPE = ["All", "Active", "Completed"]


function App(props) {
  // Tasks hook
  const[tasks, setTasks] = useState(props.tasks);

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
  const taskList = tasks?.map((task) => (
    <Todo 
    id={task.id} 
    name={task.name}
    completed={task.completed} 
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    />
  ) );

  // Adding a task to the list from the form.
  function addTask(name) {
    const newTask = { id: `todo-${nanoid}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun}
  remaining`;
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      {/* Form Component */}
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {FILTER_TYPE.map((name) => (
          <FilterButton key={name} filterType={name} />
        ))};
      </div>
      <h2 id="list-heading"> {headingText} </h2>
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
