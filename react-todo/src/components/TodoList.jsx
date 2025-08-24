import React from 'react';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <span onClick={() => onToggleTodo(todo.id)}>
            {todo.text}
          </span>
          <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
