import Content from '../components/Content'
import useContents from '../hook/useContents'
import classes from './Home.module.css'

const Home = () => {
  const { contents, isLoading } = useContents()

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div className={classes.container}>
      <h1 className="text-orange-500 uppercase font-extrabold text-3xl">Learnhub</h1>
      <div className="flex-col justify-center">
        {contents &&
          contents.data.map((content) => {
            return <Content key={content.id} contents={content} />
          })}
      </div>
    </div>
  )
}

export default Home
