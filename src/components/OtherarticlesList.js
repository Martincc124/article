import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const OtherarticlesList = ({ articleName }) => {
  const [articleInfo, setArticleInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/articles`);
      const body = await result.json();
      setArticleInfo(body);
    };
    fetchData();
  }, []);

  return (
    <>
      {articleInfo
        .filter((article) => article.name !== articleName)
        .slice(0, 3)
        .map((articles, key) => (
          <Link
            className="article-list-item"
            key={key}
            to={`/article/${articles.name}`}
          >
            <h3>{articles.title}</h3>
            <p>
              {articles.content.substring(0, 135).replace(/(<([^>]+)>)/gi, "")}
              ...
            </p>
          </Link>
        ))}
    </>
  );
};

export default OtherarticlesList;
