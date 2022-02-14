
const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className='my-3'>
          <div className="card" >
            <img src={imageUrl}  className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">{source}</span>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {author || "unknown"} on {new Date(date).toGMTString()} </small></p>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
      </div>
    )
}

export default NewsItem