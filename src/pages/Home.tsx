import Content from '../components/Content'
import useContent from '../hook/useContent'
import classes from './Home.module.css'

const Home = () => {
  const { content, isLoading } = useContent()

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div className={classes.container}>
      <div className="feed-container">
        {content &&
          content.map((content) => {
            return <Content key={content.id} content={content} />
          })}
      </div>
    </div>
  )
}

export default Home
