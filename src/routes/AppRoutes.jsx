import { Navigate, Route, Routes } from "react-router-dom";
import ContactsPage from "../containers/ContactsPage";
import AppointmentsPage from "../containers/AppointmentsPage";
import MainLayout from "../layout/MainLayout";

const AppRoutes = ({contacts}) => {

  return (
    <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Navigate to="/contacts" replace />} />
      <Route path="contacts" element={<ContactsPage />} />
      <Route path="appointments" element={<AppointmentsPage 
        contacts={contacts}
      />} />
    </Route>
  </Routes>
  );
};
export default AppRoutes;
