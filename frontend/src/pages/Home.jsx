import { Hero, PopularAuthors, RecentBlog } from "@/components"

const Home = () => {
  return (
    <div className='pt-24 min-h-screen'>
      <Hero/>
      <RecentBlog/>
      <PopularAuthors/>
    </div>
  )
}

export default Home