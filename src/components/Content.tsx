import { Link } from 'react-router-dom'
import { ContentDTO } from '../types/dto'

interface IContentProps {
  contents: ContentDTO
}

const Content = ({ contents }: IContentProps) => {
  return (
    <div className="flex item-center rounded-lg bg-gray-300 ">
      <Link to={`/content/${contents.id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <>
          <img src={contents.thumbnailUrl}></img>
          <div className="flex flex-col p-3">
            <h2>{contents.videoTitle}</h2>
            <h5>{contents.comment}</h5>
          </div>
          <div className="flex px-3 justify-between">
            <p>{contents.postedBy.username}</p>
          </div>
        </>
      </Link>
    </div>
  )
}

export default Content
