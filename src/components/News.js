import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  


  const updateNews= async() => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url);
    //let data = false
    let parseData = await data.json();
    //console.log(parseData.articles);
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);

  }
  useEffect(() => {
    updateNews();
    document.title = `${capitalizeFirstLetter(props.category)} - News Monkey`;
  }, [])
  

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    console.log('fetching more data')
    setPage(page+1)
    updateNews();
  };


    return (
      <>
          <h1 className='text-center mt-5 pt-4'>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
           {loading && <Spinner /> }
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">


            <div className="row">

            {articles.map((element) => { 
                return <div className="col-md-4" key={element.url}>
                  <NewsItem
                  title={element.title ? element.title.slice(0,45) : ""}
                  description={element.description ? element.description.slice(0,85) : ""} imageUrl={element.urlToImage || "https://static.toiimg.com/photo/89459127.cms"}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                  />
                </div>
              })}
            </div>
          </div>

          </InfiniteScroll>

      </>
    )

}
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News