import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { CredentialDTO, ICreateUserDto, LoginDTO } from '../types/dto'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

interface IAuthProviderProps {
  children: ReactNode
}

interface IAuthContextType {
  isLoggedIn: boolean
  username: string | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<IAuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth must be used within AuthProvider')

  return context
}

const token = localStorage.getItem('token')
const user = localStorage.getItem('username')

const checkLoginStatus = async (token: string | null): Promise<boolean> => {
  if (typeof token !== 'string') return false
  try {
    const currentUserResponse = await axios.get('http://localhost:8080/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (currentUserResponse.status === 200) return true
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 403) return false

    throw error
  }

  return false
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedin] = useState<boolean>(false)
  const [username, setUsername] = useState<string | null>(user)

  useEffect(() => {
    checkLoginStatus(token).then((isLoggedInAlready) => {
      setIsLoggedin(isLoggedInAlready)
    })
  }, [])

  const register = async (username: string, password: string, name: string) => {
    const registerBody: ICreateUserDto = { username, password, name }

    try {
      const res = await axios.post('http://localhost:8080/user', registerBody, {
        headers: { 'Content-Type': 'application/json' },
      })

      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const login = async (username: string, password: string) => {
    const loginBody: LoginDTO = { username, password }

    try {
      const res = await axios.post<CredentialDTO>('http://localhost:8080/auth/login', loginBody, {
        headers: { 'Content-Type': 'application/json' },
      })

      localStorage.setItem('token', res.data.accessToken)
      localStorage.setItem('username', username)
      setIsLoggedin(true)
      setUsername(username)
    } catch (err) {
      throw new Error('Invalid username or password')
    }
  }
  const logout = () => {
    localStorage.clear()
    setIsLoggedin(false)
    setUsername(null)

    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, register, login, logout }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
