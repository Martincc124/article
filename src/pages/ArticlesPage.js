import React, { useState, useEffect } from "react";
import OtherarticlesList from "../components/OtherarticlesList";
import ArticlesImage from "../components/ArticlesImage";
import NotFoundPage from "./NotFoundPage";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const ArticlesPage = ({ match }) => {
  const name = match.params.name;
  const { user, isAuthenticated } = useAuth0();
  const [articleInfo, setArticleInfo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/articles/${name}`);
      const body = await result.json();
      setArticleInfo(body);
    };
    fetchData();
  }, [name]);
  console.log(articleInfo);
  if (!articleInfo) return <NotFoundPage />;

  return (
    <>
      <ArticlesImage
        articleImage={`http://localhost:4000/` + articleInfo.articleImage}
        alt={name}
      />
      <h1>{articleInfo.title}</h1>
      <p>Written by {articleInfo.author}</p>
      <br></br>
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: articleInfo.content }}
      ></div>

      <h3>Other articles:</h3>
      <OtherarticlesList articleName={name} />
    </>
  );
};

export default ArticlesPage;
