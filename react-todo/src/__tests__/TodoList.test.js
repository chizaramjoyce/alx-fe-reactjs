import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  beforeEach(() => {
    // Clear any previous renders
    jest.clearAllMocks();
  });

  test('renders initial todo items', () => {
    render(<TodoList />);

    // Verify initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Practice React Hooks')).toBeInTheDocument();
  });

  test('can toggle todo completion status', () => {
    render(<TodoList />);

    // Find a todo item and its parent li
    const todoText = screen.getByText('Learn React');
    const todoItem = todoText.closest('li');
    
    // Initial state - not completed
    expect(todoItem).not.toHaveClass('completed');
    
    // Click to toggle
    fireEvent.click(todoText);
    
    // Should now be completed
    expect(todoItem).toHaveClass('completed');
  });

  test('can delete a todo', () => {
    render(<TodoList />);

    // Verify todo exists initially
    const todoText = 'Learn React';
    expect(screen.getByText(todoText)).toBeInTheDocument();
    
    // Find and click delete button for this todo
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    // Verify todo is removed
    expect(screen.queryByText(todoText)).not.toBeInTheDocument();
  });
});
