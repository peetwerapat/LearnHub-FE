import { FormEvent, useState } from 'react'
import updateContent from '../hook/useContent'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './Edit.module.css'

const EditContent = () => {
  const { id } = useParams()
  const { isLoading, isSubmitting, editContent } = updateContent(id || '1')
  const [editComment, setEditComment] = useState<string>('')
  const [editRating, setEditRating] = useState<number>(0)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await editContent(editComment, editRating)

      navigate('/')
      console.log(handleSubmit)
    } catch (err) {
      console.error(err)
    }
  }

  if (isLoading) return <h1>Loading....</h1>

  return (
    <div className={classes.container}>
      <form className={classes.contentForm} onSubmit={handleSubmit}>
        <h2>Edit Content</h2>
        <label>Comment (280 characters maximum)</label>
        <input type="text" value={editComment} onChange={(e) => setEditComment(e.target.value)} required />
        <label>Rating</label>
        <input type="number" value={editRating} onChange={(e) => setEditRating(Number(e.target.value))} required />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default EditContent
