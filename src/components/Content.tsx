import { Link } from 'react-router-dom'
import { ContentDTO } from '../types/dto'
import classes from './Content.module.css'

interface IContentProps {
  content: ContentDTO
}

const Content = ({ content }: IContentProps) => {
  return (
    <div className={classes.content}>
      <Link to={`/content/${content.id}`} />
      <p>{content.id}</p>
    </div>
  )
}

export default Content
