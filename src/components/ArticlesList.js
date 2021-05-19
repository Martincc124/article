import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const ArticlesList = () => {
  const [articleInfo, setArticleInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/articles`);
      const body = await result.json();
      setArticleInfo(body);
    };
    fetchData();
  }, []);
  console.log(articleInfo);
  return (
    <>
      {articleInfo.map((article, key) => (
        <Link
          className="article-list-item"
          key={key}
          to={`/article/${article.name}`}
        >
          <h3>{article.title}</h3>
          <p>
            {article.content.substring(0, 135).replace(/(<([^>]+)>)/gi, "")}...
          </p>
        </Link>
      ))}
    </>
  );
};

export default ArticlesList;
