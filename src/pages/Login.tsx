import { FormEvent, useState } from 'react'
import { useAuth } from '../providers/AuthProviders'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await login(username, password)

      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <form className="flex flex-col w-auto h-auto bg-white p-4" onSubmit={handleSubmit}>
      <label className="flex justify-center font-bold">Username</label>
      <input
        className="border-2 border-orange-400 mt-1 rounded-md"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />

      <label className="flex justify-center pt-4 font-bold">Password</label>
      <input
        className="border-2 border-orange-400 mt-1 rounded-md"
        type="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="pt-4 font-extrabold">Login</button>
    </form>
  )
}

export default Login
