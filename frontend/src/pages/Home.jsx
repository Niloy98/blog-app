import { Hero, PopularAuthors, RecentBlog } from "@/components"

const Home = () => {
  return (
    <div className='pt-20'>
      <Hero/>
      <RecentBlog/>
      <PopularAuthors/>
    </div>
  )
}

export default Home