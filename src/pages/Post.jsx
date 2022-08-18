import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from '../cookie';


function Post() {
  const navigate = useNavigate();
  const token = getCookie('token');

  const [inputs, setInputs] = useState({
    content: "",
    imageUrl: "",
    songTitle: "",
    singer: "",
    title: ''
  });

  const { content, imageUrl, songTitle, singer, title } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  //post요청
  const onClickPostButtonHandler = async (event) => {
    event.preventDefault();

    console.log(inputs);

    try{
      await axios.post('http://gwonyeong.shop/post', inputs, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res)
      // console.log(res.data)
      navigate('/')
    })
    } catch(err) {
      console.log(err);
      navigate('/error')
    }
  };

  return (
    <Contents>
      <form
        onSubmit={(event) => { onClickPostButtonHandler(event) }}
      >
        <h3>글 작성</h3>

        <input onChange={onChange} minLength={1} value={title} name='title' placeholder="제목"/>
        <input onChange={onChange} minLength={1} value={imageUrl} name='imageUrl' placeholder="이미지 URL"/>
        <input onChange={onChange} minLength={1} value={songTitle} name='songTitle' placeholder="노래명"/>
        <input onChange={onChange} minLength={1} value={singer} name='singer' placeholder="가수명"/>
        <input onChange={onChange} minLength={5} value={content} name='content' placeholder="감상평"/>

        <button>작성하기</button>
      </form>
    </Contents>
  )
}

export default Post;

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