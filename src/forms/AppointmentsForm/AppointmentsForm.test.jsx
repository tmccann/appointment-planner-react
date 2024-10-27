import { describe, expect, test } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import AppointmentForm from './AppointmentForm';

const dummyContacts = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];
const dummyEmptyContacts = []

describe('appointment form validation',()=>{
    test('show error when title ampty', async () => {
        render( <AppointmentForm /> )
        fireEvent.click(screen.getByRole('button' , {name: /submit/i}))
        
        expect(await screen.findByText(/title is required/i)).toBeInTheDocument()
    })
    test('show error when char less than 4', async () => {
        render(<AppointmentForm/>)
        fireEvent.input(screen.getByLabelText(/title/i), {target:{value:'1'}})
        fireEvent.click(screen.getByRole('button', {name:/submit/i}))

        expect(await screen.findByText(/title must be atleast 4 charcters/i)).toBeInTheDocument()
    })
    
    test('show error if no contacts added', async () => {
        render(<AppointmentForm contacts={dummyEmptyContacts}/>)
        fireEvent.click(screen.getByRole('button' , {name: /submit/i}))
        expect(await screen.findByText(/Please add contacts first./i)).toBeInTheDocument()
    })

    test('show error if no cotact selected', async () => {
        render(<AppointmentForm contacts={dummyContacts}/>)
        fireEvent.click(screen.getByRole('button' , {name: /submit/i}))
        expect(await screen.findByText(/Contact selection required/i)).toBeInTheDocument()
    })


})

