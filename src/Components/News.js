import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capital = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    document.title = `${capital(props.category)} - NewsApp`;

    const updateNews = async() => {
        props.setProgress(20)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(40)
        let parseData = await data.json();
        props.setProgress(60)

        setArticles(parseData.articles)
        setTotalResults(parseData.totalResults)
        setLoading(false)

        props.setProgress(100)
    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const previousPage = async () => {
    //     setPage( page - 1 );
    //     updateNews();
    // }

    // const nextPage = async () => {
    //     if (!( page + 1 > Math.ceil(totalResults / props.pageSize))) {
    //         setPage(page + 1)
    //         updateNews();
    //     }
    // }

    const fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        // setLoading(true)
        setPage(page + 1)
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(articles.concat(parseData.articles))
        setTotalResults(parseData.totalResults)
        // setLoading(false)
    }
    return (
        <>
            {/* <div className='container my-3'> */}
            <h1 className='text-center' style={{margin : '90px 20px 40px 20px'}}><i><u>News - Top HeadLines For Today on {capital(props.category)}</u></i></h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length <= totalResults}
                loader={<Spinner />}
            >
                <div className='container'>
                    <div className='row'>
                        {/* add -----!loading &&-----for pre and next button  */}
                        {articles.map((element, index) => {
                            if (!element) {
                                // If element is undefined or falsy, skip rendering
                                return null;
                            }
                            return (
                                <div className='col-md-4' key={index}>
                                    <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} className="card-img-top" newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type='button' className="btn btn-dark" onClick={this.previousPage}>&larr;Previous</button>

                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type='button' className="btn btn-dark" onClick={this.nextPage}>Next&rarr;</button>
                    </div> */}
            {/* </div> */}
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News