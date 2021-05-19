import React from "react";

const ArticlesImage = ({ articleImage, alt }) => {
  return (
    <>
      <img src={articleImage} alt={alt} />
    </>
  );
};

export default ArticlesImage;
