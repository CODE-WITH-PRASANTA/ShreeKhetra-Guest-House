import React from 'react'
import NewsSidebar from '../../Components/NewsSidebar/NewsSidebar'
import NewsDetails from '../../Components/NewsDetails/NewsDetails'
import NewsDetailsComment from '../../Components/NewsDetailsComment/NewsDetailsComment'

const News = () => {
  return (
    <div>
        <NewsSidebar/>
        <NewsDetails/>
        <NewsDetailsComment/>
    </div>
  )
}

export default News