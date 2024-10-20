import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import ContactsPage from "./features/contacts/contactsPage/contactsPage";
import Appointments from "./features/appointments/appoinmentsPage/appointments";
import Root, { ROUTES } from "./layout/root/Root";
import "./App.css";
import { useState } from "react";

function App() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      email: "test@test.com",
      gender: "male",
      name: "John Doe",
      phone: "(123) 123-1234",
    },
    {
      id: 2,
      email: "jane.doe@example.com",
      gender: "female",
      name: "Jane Doe",
      phone: "(234) 234-2345",
    },
    {
      id: 3,
      email: "michael.smith@example.com",
      gender: "male",
      name: "Michael Smith",
      phone: "(345) 345-3456",
    },
    {
      id: 4,
      email: "sarah.jones@example.com",
      gender: "female",
      name: "Sarah Jones",
      phone: "(456) 456-4567",
    },
    {
      id: 5,
      email: "david.brown@example.com",
      gender: "male",
      name: "David Brown",
      phone: "(567) 567-5678",
    },
    {
      id: 21,
      email: "lisa.white@example.com",
      gender: "female",
      name: "Lisa White",
      phone: "(678) 678-6789",
    },
  ]);

  const addContact = (data) => {
    const nameCheck = contacts.filter(
      (contactName) =>
        contactName.name.toLocaleUpperCase() === data.name.toLocaleUpperCase()
    );
    if (!nameCheck.length) {
      const nextID = Math.max(...contacts.map((maxId) => maxId.id), 0) + 1;
      setContacts((prev) => [...prev, { id: nextID, ...data }]);
    } else {
      console.log("name already exists");
    }
  };

  const test = () => {
    console.log(contacts);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Navigate to={ROUTES.CONTACTS} replace />} />
        <Route
          path={ROUTES.CONTACTS}
          element={
            <ContactsPage
              className={(isActive) => (isActive ? "active" : "")}
              addContact={addContact}
              contacts={contacts}
              test={test}

            />
          }
        />
        <Route
          path={ROUTES.APPOINMENTS}
          element={
            <Appointments
              className={(isActive) => (isActive ? "active" : "")}
            />
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
