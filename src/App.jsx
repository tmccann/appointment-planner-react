import { BrowserRouter } from 'react-router-dom'
import AppRoutes  from './routes'
import { useState } from 'react';


function App() {

  const [contacts, setContacts] = useState( [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phoneNumber: "(555) 123-4567",
      gender: "male",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      phoneNumber: "(555) 987-6543",
      gender: "female",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      phoneNumber: "(555) 246-1357",
      gender: "female",
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "michaelbrown@example.com",
      phoneNumber: "(555) 789-0123",
      gender: "male",
    },
    {
      id: 5,
      name: "Emily Davis",
      email: "emilydavis@example.com",
      phoneNumber: "(555) 456-7890",
      gender: "female",
    },
  ]);

  return (
    <BrowserRouter>
         <AppRoutes 
         contacts={contacts}
         />    
    </BrowserRouter>
  )
}

export default App
