import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  const mockTodos = [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Write tests', completed: true },
    { id: 3, text: 'Build app', completed: false }
  ];

  const mockToggleTodo = jest.fn();
  const mockDeleteTodo = jest.fn();

  beforeEach(() => {
    // Clear mock function calls before each test
    jest.clearAllMocks();
  });

  test('renders all todo items', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockToggleTodo}
        onDeleteTodo={mockDeleteTodo}
      />
    );

    // Verify all todos are rendered
    mockTodos.forEach(todo => {
      expect(screen.getByText(todo.text)).toBeInTheDocument();
    });
  });

  test('applies completed class to completed todos', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockToggleTodo}
        onDeleteTodo={mockDeleteTodo}
      />
    );

    // Find the completed todo's parent li element
    const completedTodo = screen.getByText('Write tests').closest('li');
    expect(completedTodo).toHaveClass('completed');
  });

  test('calls onToggleTodo when a todo is clicked', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockToggleTodo}
        onDeleteTodo={mockDeleteTodo}
      />
    );

    // Click on a todo item
    fireEvent.click(screen.getByText('Learn React'));
    expect(mockToggleTodo).toHaveBeenCalledWith(1);
  });

  test('calls onDeleteTodo when delete button is clicked', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockToggleTodo}
        onDeleteTodo={mockDeleteTodo}
      />
    );

    // Find all delete buttons and click the first one
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteTodo).toHaveBeenCalledWith(1);
  });
});
