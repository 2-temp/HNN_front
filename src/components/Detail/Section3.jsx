import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { getCookie } from "../../cookie";
import Comment from "../../components/Detail/Comment";

const Section3 = (props) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const token = getCookie("token");
  const { userLoggin } = props;

  const [comments, setComments] = useState([]);
  const [currComment, setCurrComment] = useState({
    content: "",
  });

  // POST 요청
  const onClickAddCommentHandler = async (event) => {
    event.preventDefault();

    try {
      await axios
        .post(`http://gwonyeong.shop/comment/${postId}`, currComment, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
      navigate("/error");
    }
  };

    return (
        <StSection3>
        <form
          className={userLoggin ? "" : " display_unable"}
          onSubmit={(event) => {
            onClickAddCommentHandler(event);
          }}
        >
          <input
            onChange={(e) => setCurrComment({ content: e.target.value })}
            minLength={5}
            value={currComment.content}
            name="content"
            placeholder="댓글 내용"
          />
          <button>댓글 작성</button>
        </form>

        <h3 className="comments_title">댓글 목록</h3>
        <div className="comments_box">
          {comments.map((list, i) => {
            return (
              <Comment
                userLoggin={userLoggin}
                list={list}
                i={i}
                postId={postId}
                key={i}
              />
            );
          })}
        </div>
      </StSection3>
    );
};

export default Section3;

const StSection3 = styled.div`
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  font-size: .7em;

  .comments_title {
    width: 100%;
    line-height: 40px;

    margin: 0;
    padding: 0 10px;
    box-sizing: border-box;
  }
`