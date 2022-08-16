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

  // 변경된 게시물 내용, 이미지, 가수, 노래명을 저장할 곳 선언
  const [editInputs, seTeditInputs] = useState({
    content: editList.content,
    imageUrl: editList.imageUrl,
    singer: editList.info.singer,
    songTitle: editList.info.songTitle,
  });

  const { content, imageUrl, songTitle, singer } = editInputs;

  // edit 핸들러 설정
  const oneEditHandler = async (event) => {
    event.preventDefault();

    // 채워지지 않은 칸이 있을 경우
    if (content === '' || imageUrl === '' || songTitle === '' || singer === '') {
      alert('빈칸이 있습니다 !')
      return;
    }

    // let count = 0;

    // 수정될 때마다 count++
    for (const x in editInputs) {
      if (editInputs[x] !== editList[x]) {
        console.log(editInputs[x], editList[x]);
        count++;
        // alert("변경사항 있음");
      }
    }

    if(count === 0) {
      // alert("변경된 사항이 없습니다.");
    }

    const new_data = { data, editInputs }
    console.log(new_data)

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
            imageUrl: ev.target.value,
          });
        }}
          value={imageUrl}
          name='imageUrl'
          placeholder="이미지 Url"
        />

        <input onChange={(ev) => {
          seTeditInputs({
            ...editInputs,
            content: ev.target.value,
          });
        }}
          value={content}
          name='content'
          placeholder="게시물 내용"
        />

        <input onChange={(ev) => {
          seTeditInputs({
            ...editInputs,
            songTitle: ev.target.value,
          });
        }} value={songTitle} name='songTitle' placeholder="노래 이름" />

        <input onChange={(ev) => {
          seTeditInputs({
            ...editInputs,
            singer: ev.target.value,
          });
        }} value={singer} name='singer' placeholder="가수" />
        
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