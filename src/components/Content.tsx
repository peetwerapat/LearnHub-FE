import { Link } from 'react-router-dom'
import { ContentDTO } from '../types/dto'
import classes from './Content.module.css'

interface IContentProps {
  content: ContentDTO
}

const Content = ({ content }: IContentProps) => {
  return (
    <>
      <div className={classes.content}>
        <Link to={`/content/${content.id}`} />
        <h1>{content.videoTitle}</h1>
        <p>{content.creatorName}</p>
        <p>{content.comment}</p>
        <p>{content.postedBy.username}</p>
        <p>{content.rating}</p>
      </div>
    </>
  )
}

export default Content
