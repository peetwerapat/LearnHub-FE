import { useAuth } from '../providers/AuthProviders'
import classes from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth()

  return (
    <div className={classes.top}>
      <div className={classes.menu}>
        <img src="/src/assets/logo.svg" alt="logo" />
        <NavLink className={({ isActive }) => (isActive ? classes.active : classes.inactive)} to="/">
          LearnHub
        </NavLink>
      </div>
      <div className={classes.menu}>
        {isLoggedIn ? (
          <>
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
