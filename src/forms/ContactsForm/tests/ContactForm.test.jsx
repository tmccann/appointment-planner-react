import { describe, expect, test } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../ContactForm'; // Adjust the import based on your file structure


describe('ContactForm name validation', () => {
    test('shows error message when name is empty', async () => {
      render(<ContactForm />);
  
      // Attempt to submit the form without entering a name
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
      // Expect error message to be displayed
      expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    });
  
    test('shows error message for invalid name format', async () => {
      render(<ContactForm />);
  
      // Input an invalid name
      fireEvent.input(screen.getByLabelText(/name/i), { target: { value: 'A' } });
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
      // Expect error message to be displayed
      expect(await screen.findByText(/name must include first and last name/i)).toBeInTheDocument();
    });
  });
  
  describe('ContactForm email validation', ()=>{
    test('show error when email is empty', async ()=>{
      render(<ContactForm />)
      
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
    })

    test('shows error message for invalid name format', async () => {
      render(<ContactForm />);

      fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'test.home' } });
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
    })
  })

  test('shows error message when phone number is empty', async () => {
    render(<ContactForm />);

    // Attempt to submit the form without entering a phone number
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Expect error message to be displayed
    expect(await screen.findByText(/phone number is required/i)).toBeInTheDocument();
  });

  test('shows error message for invalid phone number format', async () => {
    render(<ContactForm />);

    // Input an invalid phone number
    fireEvent.input(screen.getByLabelText(/phone number/i), { target: { value: '12345' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Expect error message to be displayed
    expect(await screen.findByText(/phone number must be in \(XXX\) XXX-XXXX format/i)).toBeInTheDocument();
  });

  test('shows error message when gender is not selected', async () => {
    render(<ContactForm />);

    // Attempt to submit the form without selecting gender
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Expect error message to be displayed
    expect(await screen.findByText(/gender is required/i)).toBeInTheDocument();
  });
