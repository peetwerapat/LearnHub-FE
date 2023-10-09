import classes from './Navbar.module.css'

const Navbar = () => {
  return (
    <div className={classes.top}>
      <div className={classes.menu}>
        <img src="/src/assets/logo.svg" alt="logo" />
        <h1 className={classes.logoname}>LearnHub</h1>
      </div>
      <div className={classes.menu}>
        <p>Register</p>
        <p>Login</p>
      </div>
    </div>
  )
}

export default Navbar
