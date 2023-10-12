import { useAuth } from '../providers/AuthProviders'
import classes from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth()

  return (
    <div className="bc-white w-full flex justify-between item-center box-border shadow-lg py-5 px-4">
      <div className="flex items-center gap-4">
        <img src="/src/assets/logo.svg" alt="logo" />
        <NavLink className={({ isActive }) => (isActive ? classes.active : classes.inactive)} to="/">
          LearnHub
        </NavLink>
      </div>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <NavLink className={({ isActive }) => (isActive ? classes.active : classes.inactive)} to="/create">
              Create
            </NavLink>
            <button className={classes.login} onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <Link to="/login" className={classes.login}>
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
