import React from "react";
import { Link } from "react-router-dom";
import "./feed.css";
const Feed = ({ articles }) => {
  console.log(articles);
  return (
    <div>
      {articles.map(
        (
          { taglist = [], author, createdAt, title, description, slug },
          index
        ) => (
          <div className="article-preview" key={index}>
            <div className="article-meta">
              <Link to={`/profiles/${author.username}`}>
                <img src={author.image} alt="" />
              </Link>
              <div className="info">
                <Link to={`/profiles/${author.username}`} className="author">
                  {author.username}
                </Link>
                <span className="date">{createdAt}</span>
              </div>
            </div>
            <Link to={`/articles/${slug}`} className="preview-link">
              <h1>{title}</h1>
              <p>{description}</p>
              <span>Read more...</span>
              <ul className="tag-list">
                {taglist.map(tag => (
                  <li key={tag} className="tag-default tag-pill tag-outline">
                    {tag}
                  </li>
                ))}
              </ul>
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default Feed;
