import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl } = props;
  return (
    <div className="my-3">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={
            !imageUrl
              ? "https://images.hindustantimes.com/tech/img/2022/04/29/1600x900/solar-eclipse-1482921_1280_1623250963526_1651194677742.jpg"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
