import { NavLink, Outlet } from "react-router-dom"
import styles from './MainLayout.module.css'


const MainLayout = () => {
  return (
    <>
    <nav className={styles.nav}>
         <h1>Contact Manager</h1>
        <ul>
            <li><NavLink to='/contacts'
            className={({isActive}) => (isActive ? styles.active : '')}
     >Contacts</NavLink></li>
            <li><NavLink to='/appointments'
            className={({isActive}) => (isActive ? styles.active : '')}
         >Appointments</NavLink></li>
        </ul>
    </nav>
    <Outlet />
    </>
  )
}
export default MainLayout