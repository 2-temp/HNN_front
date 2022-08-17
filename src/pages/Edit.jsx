import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import RESPONSE from "../RESPONSE";
import { useNavigate } from "react-router-dom";
import data from "../RESPONSE";
import { useParams } from "react-router-dom";
import { getCookie } from '../cookie';

function Edit() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [prevPost, setPrevPost] = useState();
  const [currPost, setCurrPost] = useState({
    songTitle: prevPost.songTitle,
    singer: prevPost.singer,
    imageUrl: prevPost.imageUrl,
    content: prevPost.content
  });

  const token = getCookie("token");

  const fetchAxiosData = async () => {
    try {
      const axiosData = await axios.get(`http://gwonyeong.shop/post/${postId}`)
      
      // console.log(axiosData.data);

      const result = axiosData.data.data;
      setPrevPost(result)

    } catch (err) {

      console.log(err);
      navigate('/error')
      
    }
  };
  fetchAxiosData();

  console.log(prevPost);

  const onChangeHandler = (e) => {
    setCurrPost({
      ...currPost,
      [e.target.name]: e.target.value,
    });
  };

  const onEditHandler = async (event) => {
    event.preventDefault();

    console.log(currPost, prevPost);

    // 채워지지 않은 칸이 있을 경우
    // if (
    //   content === "" ||
    //   imageUrl === "" ||
    //   songTitle === "" ||
    //   singer === ""
    // ) {
    //   alert("빈칸이 있습니다 !");
    //   return;
    // }

    try {
      await axios
        .patch(`http://gwonyeong.shop/post/${postId}`, currPost, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          const { success, msg } = res.data.data;

          if (success) {

            alert(msg);
            navigate(`/post/${postId}`);

          } else {

            alert(msg);

          }
        });
    } catch (err) {

      console.log(err);
      navigate("/error");
      
    }

    return (
      <Contents>
        <form
          onSubmit={(event) => {
            onEditHandler(event);
          }}
        >
          <h3>글 수정</h3>

          <input
            onChange={onChangeHandler}
            value={prevPost.imageUrl}
            name="imageUrl"
            placeholder="이미지 Url"
          />

          <input
            onChange={onChangeHandler}
            value={prevPost.content}
            name="content"
            placeholder="게시물 내용"
          />

          <input
            onChange={onChangeHandler}
            value={prevPost.songTitle}
            name="songTitle"
            placeholder="노래 이름"
          />

          <input
            onChange={onChangeHandler}
            value={prevPost.singer}
            name="singer"
            placeholder="가수"
          />

          <button>수정하기</button>
        </form>
      </Contents>
    );
  };
}

export default Edit;

const Contents = styled.div`
margin-top: 10vh;

padding: 0 20px;
box-sizing: border-box;

form {
    max-width: 600px;
    margin: 0 auto;

    display: flex;
    flex-flow: column;
    gap: 16px;

    text-align: center;

    h3 {
      font-size: 28px;
    }

    input, button {
      font-size: 18px;
      padding: 6px 26px;
      box-sizing: border-box;
      border-radius: 20px;

      border: none;
      box-shadow: 2px 2px 5px #ddd;

      transition: all .2s;
    }
    
    button:hover {
      background-color: #ccc;
      cursor: pointer;
    }
  }
`