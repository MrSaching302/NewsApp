import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            article: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capital(this.props.category)}-NewsApp`;
        {console.log("i am Constructor")}
    }

    capital = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    async updateNews() {
        {console.log("i am update news")}
        this.props.setProgress(20)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(40)
        let parseData = await data.json();
        this.props.setProgress(60)
        this.setState({
            article: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }

    async componentDidMount() {
        {console.log("i am Component did mount")}
        this.updateNews();
    }

    previousPage = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    nextPage = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            this.setState({ page: this.state.page + 1 });
            this.updateNews();
        }
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            article: this.state.article.concat(parseData.articles),
            totalResults: parseData.totalResults,
            // loading: false
        })
    }

    render() {
        return (
            <>
                {/* <div className='container my-3'> */}
                <h1 className='text-center mb-5'><i><u>News - Top HeadLines For Today on {this.capital(this.props.category)}</u></i></h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length <= this.state.totalResults}
                    loader={<Spinner/>}
                >{console.log(this.state.article.length, this.state.totalResults)}
                    <div className='container'>
                        <div className='row'>
                            {/* add -----!this.state.loading &&-----for pre and next button  */}
                            {this.state.article.map((element, index) => {
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

                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className="btn btn-dark" onClick={this.nextPage}>Next&rarr;</button>
                    </div> */}
                {/* </div> */}
            </>
        )
    }
}
export default News