import { useEffect, useState } from 'react'
import { ContentDTO, UpdateContentDTO } from '../types/dto'
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

  const editContent = async (editComment: string, editRating: number) => {
    const token = localStorage.getItem('token')
    const newContentBody: UpdateContentDTO = {
      comment: editComment,
      rating: editRating,
    }

    setIsSubmitting(true)
    try {
      const res = await axios.patch<UpdateContentDTO>(
        `https://api.learnhub.thanayut.in.th/content/${id}`,
        newContentBody,
        {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        },
      )

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

  return { content, isLoading, error, isSubmitting, editContent, deleteContent }
}

export default useContent
