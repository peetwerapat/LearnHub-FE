import { Link } from 'react-router-dom'
import { ContentDTO } from '../types/dto'
import classes from './Content.module.css'

interface IContentProps {
  contents: ContentDTO
}

const Content = ({ contents }: IContentProps) => {
  return (
    <div className={classes.content}>
      <Link to={`/content/${contents.id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <>
          <img src={contents.thumbnailUrl}></img>
          <div>
            <h2>{contents.videoTitle}</h2>
            <h5>{contents.comment}</h5>
          </div>
          <div>
            <p>{contents.postedBy.username}</p>
          </div>
          <div>
            <p>{contents.rating}</p>
          </div>
        </>
      </Link>
    </div>
  )
}

export default Content
