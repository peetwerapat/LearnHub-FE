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
    <form className="flex flex-col w-auto h-auto bg-white p-4" onSubmit={handleSubmit}>
      <label className="flex justify-center font-bold">Name</label>
      <input
        className="border-2 border-orange-400 mt-1 rounded-md"
        type="text"
        onChange={(e) => setName(e.target.value)}
      />

      <label className="flex justify-center font-bold mt-4">Username</label>
      <input
        className="border-2 border-orange-400 mt-1 rounded-md"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />

      <label className="flex justify-center font-bold mt-4">Password</label>
      <input
        className="border-2 border-orange-400 mt-1 rounded-md"
        type="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="pt-4 font-extrabold">Register</button>
    </form>
  )
}

export default Register
