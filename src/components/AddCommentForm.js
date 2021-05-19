import React, { useState } from "react";

const AddCommentForm = ({ articleName, setArticleInfo, userName }) => {
  const [commentText, setCommentText] = useState("");

  const addComment = async () => {
    const result = await fetch(`/articles/${articleName}/add-comment`, {
      method: "post",
      body: JSON.stringify({ commentUserName: userName, text: commentText }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await result.json();
    setArticleInfo(body);
    setCommentText("");
  };

  return (
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      <label>
        Name:
        <input type="text" readOnly={true} value={userName} />
      </label>
      <label>
        Comment:
        <textarea
          rows="4"
          cols="50"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
      </label>
      <button onClick={() => addComment()}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
