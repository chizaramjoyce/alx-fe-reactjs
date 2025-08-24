import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  beforeEach(() => {
    // Clear any mocks if needed
    jest.clearAllMocks();
  });

  test('renders initial todo items', () => {
    render(<TodoList />);

    // Verify initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Practice React Hooks')).toBeInTheDocument();
  });

  test('applies completed class to completed todos', () => {
    render(<TodoList />);

    // Check that 'Build a Todo App' is completed (from initial state)
    const completedTodo = screen.getByText('Build a Todo App').closest('li');
    expect(completedTodo).toHaveClass('completed');
  });

  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);

    // Click on an uncompleted todo
    const todoText = screen.getByText('Learn React');
    const todoItem = todoText.closest('li');
    
    // Initial state - not completed
    expect(todoItem).not.toHaveClass('completed');
    
    // Click to toggle
    fireEvent.click(todoText);
    
    // Should now be completed
    expect(todoItem).toHaveClass('completed');
  });

  test('deletes todo when delete button is clicked', () => {
    render(<TodoList />);

    // Find the first todo and its delete button
    const todoText = 'Learn React';
    expect(screen.getByText(todoText)).toBeInTheDocument();
    
    // Find and click delete button for this todo
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    // Verify todo is removed
    expect(screen.queryByText(todoText)).not.toBeInTheDocument();
  });
});
