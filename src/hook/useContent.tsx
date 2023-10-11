import { useEffect, useState } from 'react'
import { ContentDTO } from '../types/dto'
import axios from 'axios'

const useContent = (id: string) => {
  const [content, setContent] = useState<ContentDTO | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get<ContentDTO>('https://api.learnhub.thanayut.in.th/content')

        setContent(res.data)
      } catch {
        setError('Data notfound')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  const deleteContent = async () => {
    const token = localStorage.getItem('token')

    setIsSubmitting(true)
    try {
      const res = await axios.delete(`https://api.learnhub.thanayut.in.th/content/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(res.data)
    } catch (err) {
      throw new Error('Cannot delete content')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { content, isLoading, error, isSubmitting, deleteContent }
}

export default useContent
