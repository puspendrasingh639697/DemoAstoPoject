import React from 'react'
import Bloginfo from '../components/SingleBlog/Bloginfo'
import Review from '../components/SingleBlog/Review'
import LatestBlog from '../components/SingleBlog/LatestBlog'
import Herosection from '../components/SingleBlog/Herosection'

const SingleBlogPage = () => {
  return (
    <>
   <Herosection/>
    <Bloginfo/>
    <Review/>
    <LatestBlog/>
    
    </>
  )
}

export default SingleBlogPage