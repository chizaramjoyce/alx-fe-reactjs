import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTodoForm from '../components/AddTodoForm';

describe('AddTodoForm Component', () => {
  const mockAddTodo = jest.fn();

  beforeEach(() => {
    // Clear mock function calls before each test
    jest.clearAllMocks();
  });

  test('renders input and submit button', () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    expect(screen.getByPlaceholderText('Add a new todo')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  test('handles input change', () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const input = screen.getByPlaceholderText('Add a new todo');
    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    
    expect(input.value).toBe('New Todo Item');
  });

  test('calls onAddTodo when form is submitted', () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const input = screen.getByPlaceholderText('Add a new todo');
    const form = screen.getByRole('form');

    // Type in the input
    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    
    // Submit the form
    fireEvent.submit(form);

    expect(mockAddTodo).toHaveBeenCalledWith('New Todo Item');
    expect(input.value).toBe(''); // Input should be cleared after submission
  });

  test('does not call onAddTodo when input is empty', () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const form = screen.getByRole('form');
    
    // Submit the form with empty input
    fireEvent.submit(form);

    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  test('does not call onAddTodo when input contains only whitespace', () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const input = screen.getByPlaceholderText('Add a new todo');
    const form = screen.getByRole('form');

    // Type only spaces in the input
    fireEvent.change(input, { target: { value: '   ' } });
    
    // Submit the form
    fireEvent.submit(form);

    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});
