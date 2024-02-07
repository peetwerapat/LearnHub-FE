import { Link } from 'react-router-dom'
import { ContentDTO } from '../types/dto'
import ReactStars from 'react-stars'

interface IContentProps {
  contents: ContentDTO
}

const Content = ({ contents }: IContentProps) => {
  return (
    <div className="flex item-center rounded-lg bg-gray-300 p-3 ">
      <Link to={`/content/${contents.id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <img src={contents.thumbnailUrl}></img>
        <div className="flex flex-col py-3">
          <h2>{contents.videoTitle}</h2>
          <h5>{contents.comment}</h5>
          <p>{contents.postedBy.username}</p>
          <ReactStars count={5} value={contents.rating} size={24} color2={'#ffd700'} edit={false} half={false} />
        </div>
      </Link>
    </div>
  )
}

export default Content
