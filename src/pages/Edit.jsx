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

  //타이틀, 내용, 이미지, 가수, 노래 명 변경  저장 할 곳 선언
  const [editInputs, seTeditInputs] = useState({
    title: editList.title,
    content: editList.content,
    imageUrl: editList.imageUrl,
    singer: editList.info.singer,
    songTitle: editList.info.songTitle,
  }); 

  console.log(editList.info)

  const { title, content, imageUrl, songTitle, singer } = editInputs;



  //edit 핸들러 설정
  const oneEditHandler = async (editInputs) => {

    if(title === '' || content === '' || imageUrl ==='' || songTitle === '' || singer === '') {
      alert('빈칸이 있습니다 !')
      return;
    }
    
    const new_data = { data, editInputs}
    console.log(new_data)

    // const response =  await axios.PATCH("/PATCH", editInputs, singers, {
    //   headers: {
    //     'Content-Type': 'application/json'
    //     }
    // });

    const response = RESPONSE.EDIT_CHECK
    console.log(response)
    if (response.success) {
      alert(response.msg)
      navigate(`/post/${postId}`)
    } else {
      alert(response.msg)
      navigate(`/post/${postId}`)
    }
  }

  return (
    <BigBox>
      <Box>
        <h4>제목</h4>
        <input onChange={(ev) => {
          seTeditInputs({
            ...editInputs,
            title: ev.target.value,
          });
        }} value={title} name='title' placeholder="제목"></input>
        <input onChange={(ev) => {
          seTeditInputs({
            ...editInputs,
            imageUrl: ev.target.value,
          });
        }} value={imageUrl} name='imageUrl' placeholder="이미지 Url"></input>
        <input onChange={(ev) => {
          seTeditInputs({
            ...editInputs,
            content: ev.target.value,
          });
        }} value={content} name='content' placeholder="게시물 내용"></input>
        <input onChange={(ev) => {
          seTeditInputs({
            ...editInputs,
            songTitle: ev.target.value,
          });
        }} value={songTitle} name='songTitle' placeholder="노래 이름"></input>
        <input onChange={(ev) => {
          seTeditInputs({
            ...editInputs,
            singer: ev.target.value,
          });
        }} value={singer} name='singer' placeholder="가수"></input>
        <button onClick={() => { oneEditHandler(editInputs) }}>수정하기</button>
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