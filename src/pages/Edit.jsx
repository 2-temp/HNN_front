import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import RESPONSE from "../RESPONSE";
import { useNavigate } from "react-router-dom";
import data from "../RESPONSE";
import { useParams } from "react-router-dom";

function Edit() {

  const navigate = useNavigate();

  const { postId } = useParams();
  const editList = data.POSTS[postId]

  const [editInputs, seTeditInputs] = useState({
    title: editList.title,
    content: editList.content,
    imageUrl: editList.imageUrl,
    songTitle: editList.songTitle,
    singer: editList.singer,
  });




  const { title, content, imageUrl, songTitle, singer } = editInputs;
  

  const oneditHandler = async (inputs) => {

    const new_data = { data, inputs }

    console.log(new_data)

    const response = RESPONSE.EDIT
    console.log(response)
    if (response.success) {
      alert(response.msg)
      navigate('/')
    } else {
      alert(response.msg)
      navigate('/sign/in')
    }
  }

  console.log(title, content, imageUrl)

  return (
    <BigBox>
      <Box>
        <h4>제목</h4>
        {editList.title}
        <input value={title} name='title' placeholder="제목"></input>
        <input value={imageUrl} name='imageUrl' placeholder="이미지 Url"></input>
        <input value={content} name='content' placeholder="게시물 내용"></input>
        <input value={songTitle} name='songTitle' placeholder="노래 이름"></input>
        <input value={singer} name='singer' placeholder="가수"></input>
        <button onClick={() => { oneditHandler(editInputs) }}>수정하기</button>
      </Box>
    </BigBox>
  )
}

export default Edit;



const BigBox = styled.div`
 border: 1px solid red;
 max-width: 1200px;
 width: 100%;
 height: 650px;
display: flex;
justify-content: center;
margin-top: 10px;

`

const Box = styled.div`
  background-color: gray;
  width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 12px;

  input {
    height: 3%;
  }

  button{
    height: 30px;
    width: 100px;
    
  }
`