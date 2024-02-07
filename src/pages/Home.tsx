import Content from '../components/Content'
import useContents from '../hook/useContents'

const Home = () => {
  const { contents, isLoading } = useContents()

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div>
      <h1 className="text-orange-500 uppercase font-extrabold text-5xl ml-5">Learnhub</h1>
      <div className="sm:flex flex-col w-auto py-5 md:grid grid-cols-2 gap-3 mx-3">
        {contents &&
          contents.map((content) => {
            return <Content key={content.id} contents={content} />
          })}
      </div>
    </div>
  )
}

export default Home
