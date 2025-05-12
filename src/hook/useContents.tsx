import { useEffect, useState } from 'react'
import { ContentDTO, CreateContentDTO, IResponseData } from '../types/dto'
import axios from 'axios'

const useContents = () => {
  const [contents, setContents] = useState<ContentDTO[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get<IResponseData<ContentDTO[]>>('http://localhost:8000/v1/content')

        setContents(res.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  
  const createContent = async (newUrl: string, newComment: string, newRating: number) => {
    const token = localStorage.getItem('token')
    const newContentBody: CreateContentDTO = {
      videoUrl: newUrl,
      comment: newComment,
      rating: newRating,
    }

    setIsSubmitting(true)

    try {
      const res = await axios.post<CreateContentDTO>('http://localhost:8000/v1/content', newContentBody, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })

      console.log(res.data)
    } catch (err) {
      throw new Error('Cannot create content')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { contents, isLoading, isSubmitting, createContent }
}

export default useContents
