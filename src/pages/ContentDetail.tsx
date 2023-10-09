import useContent from '../hook/useContent'
import classes from './ContentDetail.module.css'

const ContentDetail = () => {
  const { content, isLoading, error } = useContent()

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <p>{error}</p>

  return (
    <div className={classes.container}>
      {content && (
        <>
          <h1>{content.videoTitle}</h1>
          <p>{content.creatorName}</p>
          <p>{content.comment}</p>
          <p>{content.postedBy.username}</p>
          <p>{content.rating}</p>
        </>
      )}
    </div>
  )
}

export default ContentDetail
