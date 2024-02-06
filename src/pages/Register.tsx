import { FormEvent, useState } from 'react'
import { useAuth } from '../providers/AuthProviders'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await register(name, username, password)

      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />

      <label>Username:</label>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />

      <label>Password:</label>
      <input type="Password" onChange={(e) => setPassword(e.target.value)} />

      <input type="submit" value="Register" />
    </form>
  )
}

export default Register
