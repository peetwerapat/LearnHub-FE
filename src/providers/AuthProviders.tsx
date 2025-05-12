import { ReactNode, createContext, useContext, useState } from 'react'
import { CredentialDTO, ICreateUserDto, LoginDTO } from '../types/dto'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface IAuthProviderProps {
  children: ReactNode
}

interface IAuthContextType {
  isLoggedIn: boolean
  email: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<IAuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth must be used within AuthProvider')

  return context
}

const token = localStorage.getItem('token')
const user = localStorage.getItem('email')

// const checkLoginStatus = async (token: string | null): Promise<boolean> => {
//   if (typeof token !== 'string') return false
//   try {
//     const currentUserResponse = await axios.get('http://localhost:8000/v1/auth/me', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })

//     if (currentUserResponse.status === 200) return true
//   } catch (error) {
//     if (error instanceof AxiosError && error.response?.status === 403) return false

//     throw error
//   }

//   return false
// }

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedin] = useState<boolean>(false)
  const [email, setEmail] = useState<string | null>(user)

  // useEffect(() => {
  //   checkLoginStatus(token).then((isLoggedInAlready) => {
  //     setIsLoggedin(isLoggedInAlready)
  //   })
  // }, [])

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const registerBody: ICreateUserDto = { email, password, firstName, lastName }

    try {
      const res = await axios.post('http://localhost:8000/v1/auth/sign-up', registerBody, {
        headers: { 'Content-Type': 'application/json' },
      })

      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const login = async (email: string, password: string) => {
    const loginBody: LoginDTO = { email, password }

    try {
      const res = await axios.post<CredentialDTO>('http://localhost:8000/v1/auth/sign-in', loginBody, {
        headers: { 'Content-Type': 'application/json' },
      })

      localStorage.setItem('token', res.data.accessToken)
      localStorage.setItem('email', email)
      setIsLoggedin(true)
      setEmail(email)
    } catch (err) {
      throw new Error('Invalid username or password')
    }
  }
  const logout = () => {
    localStorage.clear()
    setIsLoggedin(false)
    setEmail(null)

    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, email, register, login, logout }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
