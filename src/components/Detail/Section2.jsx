import React, { useState } from "react";
import styled from "styled-components";

const Section2 = () => {
  const [post, setPost] = useState([]);

    return (
        <StSection2 albumCover={post.imageUrl}>
          <p className="created_at">{post.createdAt}</p>
          <div className="album_cover">
            <p className="album_cover_title">
              <span>{post.songTitle}</span> - <span>{post.singer}</span>
            </p>
            <p>{post.content}</p>
          </div>
        </StSection2>
    );
};

export default Section2;

const StSection2 = styled.div`
  flex: 1 1 auto;
  height: calc(100vh - 250px);
  margin-top: 40px;

  background-color: #eee;
  position: relative;
  
  .album_cover {
    text-align: center;
    font-weight: 900;
    font-size: 20px;
    
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: #444;

  }
  .album_cover_title {
    font-size: 1.2em;
    padding-bottom: 16px;
    border-bottom: 2px dotted #aaa;
    color: #222;
  }
`