import { useEffect, useState } from 'react'
import { ContentDTO, UpdateContentDTO } from '../types/dto'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useContent = (id: string) => {
  const [content, setContent] = useState<ContentDTO | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get<ContentDTO>(`http://localhost:8080/content/${id}`)

        setContent(res.data)
      } catch {
        setError('Data not found')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  const editContent = async (editComment: string, editRating: number) => {
    const token = localStorage.getItem('token')
    const newContentBody: UpdateContentDTO = {
      comment: editComment,
      rating: editRating,
    }

    setIsSubmitting(true)
    try {
      const res = await axios.patch<UpdateContentDTO>(`http://localhost:8080/content/${id}`, newContentBody, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })

      console.log(res.data)
    } catch (err) {
      throw new Error('Cannot edit content')
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteContent = async () => {
    const token = localStorage.getItem('token')

    setIsSubmitting(true)
    try {
      const res = await axios.delete(`http://localhost:8080/content/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      navigate('/')
      console.log(res.data)
    } catch (err) {
      throw new Error('Cannot delete content')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { content, isLoading, error, isSubmitting, editContent, deleteContent }
}

export default useContent
