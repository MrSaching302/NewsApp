import React from 'react'

const NewsItem = (props) => {
        let { title, description, imageUrl, newsUrl, author, date, source} = props;
        return (
            <div className='my-3'>
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'80%', zIndex:'1'}}>
                        {source}
                    </span>
                    <img className="card-img-top" src={!imageUrl ? "https://images.barrons.com/im-841131/social" : imageUrl} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-body-secondary">By {author ? author : 'Unkonwn'} On {new Date(date).toGMTString()}</small></p>
                        <a rel='noreferrer' href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
