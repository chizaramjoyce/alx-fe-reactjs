import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Integration Tests', () => {
  test('renders initial todos', () => {
    render(<App />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Practice React Hooks')).toBeInTheDocument();
  });

  test('can add a new todo', () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('Add a new todo');
    const form = screen.getByRole('form');

    // Add new todo
    fireEvent.change(input, { target: { value: 'Test new todo' } });
    fireEvent.submit(form);

    // Verify new todo is in the list
    expect(screen.getByText('Test new todo')).toBeInTheDocument();
    expect(input.value).toBe(''); // Input should be cleared
  });

  test('can toggle todo completion status', () => {
    render(<App />);
    
    // Find a todo item and its parent li
    const todoText = screen.getByText('Learn React');
    const todoItem = todoText.closest('li');
    
    // Initial state - not completed
    expect(todoItem).not.toHaveClass('completed');
    
    // Click to toggle
    fireEvent.click(todoText);
    
    // Should now be completed
    expect(todoItem).toHaveClass('completed');
    
    // Click again to toggle back
    fireEvent.click(todoText);
    
    // Should be uncompleted again
    expect(todoItem).not.toHaveClass('completed');
  });

  test('can delete a todo', () => {
    render(<App />);
    
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
