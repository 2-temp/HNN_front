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


  console.log(editList)

  //타이틀, 내용, 이미지, 가수, 노래 명 변경  저장 할 곳 선언
  const [editInputs, seTeditInputs] = useState({
    id: postId,
    title: editList.title,
    content: editList.content,
    imageUrl: editList.imageUrl,
    singer: editList.info.singer,
    songTitle: editList.info.songTitle,
  }); 

  const { title, content, imageUrl, songTitle, singer } = editInputs;



  //edit 핸들러 설정
  const oneEditHandler = async (event) => {
    event.preventDefault();

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
    <Contents>
      <form onSubmit={(event) => { oneEditHandler(event) }}>
        <h3>글 수정</h3>
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
          }} 
          value={imageUrl} 
          name='imageUrl' 
          placeholder="이미지 Url"
        ></input>
        <input onChange={(ev) => {
            seTeditInputs({
              ...editInputs,
              content: ev.target.value,
            });
          }} 
          value={content} 
          name='content' 
          placeholder="게시물 내용"
        ></input>
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
        <button>수정하기</button>
      </form>
    </Contents>
  )
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