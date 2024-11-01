import { Navigate, Route, Routes } from "react-router-dom";
import ContactsPage from "../containers/ContactsPage";
import AppointmentsPage from "../containers/AppointmentsPage";
import MainLayout from "../layout/MainLayout";

const AppRoutes = ({ contacts, startDate, setStartDate, availableTimes, setAvailableTimes  }) => {

  return (
    <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Navigate to="/contacts" replace />} />
      <Route path="contacts" element={<ContactsPage 
      contacts={contacts}
      
      
      />} />
      <Route path="appointments" element={<AppointmentsPage 
        contacts={contacts}
        startDate={startDate}
        setStartDate={setStartDate}
        availableTimes={availableTimes}
        setAvailableTimes={setAvailableTimes}
      />} />
    </Route>
  </Routes>
  );
};
export default AppRoutes;
