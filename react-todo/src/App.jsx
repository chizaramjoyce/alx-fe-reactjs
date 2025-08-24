import './App.css'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'

function App() {
  const handleAddTodo = (text) => {
    // This function will be passed to AddTodoForm
    const todoRef = TodoList.current;
    if (todoRef && todoRef.addTodo) {
      todoRef.addTodo(text);
    }
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoList />
    </div>
  )
}

export default App
