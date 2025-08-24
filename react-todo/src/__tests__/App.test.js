import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Integration Tests', () => {
  test('renders TodoList and AddTodoForm', () => {
    render(<App />);
    
    // Check that the main components are rendered
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a new todo')).toBeInTheDocument();
  });

  test('displays initial todos from TodoList', () => {
    render(<App />);
    
    // Verify that initial todos from TodoList are displayed
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Practice React Hooks')).toBeInTheDocument();
  });

  test('can add new todo through form', () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('Add a new todo');
    const form = screen.getByRole('form');

    // Add new todo
    fireEvent.change(input, { target: { value: 'Test new todo' } });
    fireEvent.submit(form);

    // Input should be cleared
    expect(input.value).toBe('');
  });
});
