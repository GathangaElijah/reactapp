import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

// Filter buttons
const FILTER_TYPE = ["All", "Active", "Completed"]
  
function App(props) {
  // Tasklist
  const taskList = props.tasks?.map((task) => (
    <Todo 
    id={task.id} 
    name={task.name}
    completed={task.completed} 
    key={task.id}
    />
  ) );
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form />
      <div className="filters btn-group stack-exception">
        {FILTER_TYPE.map((name) => (
          <FilterButton key={name} filterType={name} />
        ))};
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
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
