import { NavLink, Outlet } from "react-router-dom"
import './root.css'


export const ROUTES ={
    CONTACTS: "/contacts",
    APPOINMENTS: "/appointments"
}
function Root() {

  return (
    <>
    <nav>
         <h1>Contact Manager</h1>
        <ul>
            <li><NavLink to={ROUTES.CONTACTS}>Contacts</NavLink></li>
            <li><NavLink to={ROUTES.APPOINMENTS} >Appointments</NavLink></li>
        </ul>
    </nav>
    <Outlet />
    </>
  )
}
export default Root