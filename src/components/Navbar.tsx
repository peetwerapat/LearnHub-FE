import classes from './Navbar.module.css'

const Navbar = () => {
  return (
    <div className={classes.top}>
      <div className={classes.menu}>
        <img src="/src/assets/logo.svg" alt="logo" />
      </div>
      <div className={classes.menu}>
        <p>Login</p>
        <p>Register</p>
      </div>
    </div>
  )
}

export default Navbar
