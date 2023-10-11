import { FormEvent, useState } from 'react'
import classes from './Create.module.css'
import { useNavigate } from 'react-router-dom'
import useContents from '../hook/useContents'

const Create = () => {
  const { isSubmitting, createContent } = useContents()
  const navigate = useNavigate()
  const [newVideoUrl, setNewVideoUrl] = useState<string>('')
  const [newComment, setNewComment] = useState<string>('')
  const [newRating, setNewRating] = useState<number>(0)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await createContent(newVideoUrl, newComment, newRating)

      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form className={classes.contentForm} onSubmit={handleSubmit}>
      <label>Video URL</label>
      <input type="text" onChange={(e) => setNewVideoUrl(e.target.value)} required />
      <label>Comment</label>
      <input type="text" onChange={(e) => setNewComment(e.target.value)} required />
      <label>Rating</label>
      <input type="number" onChange={(e) => setNewRating(Number(e.target.value))} required />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'submitting...' : 'submit'}
      </button>
    </form>
  )
}

export default Create
