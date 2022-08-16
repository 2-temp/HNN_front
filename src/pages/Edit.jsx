import React, { useEffect } from "react";
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
  //쿠키 가져옴
  const token = getCookie("token");

  useEffect(()=>{
    const fetchPost = async () => {
      await axios
      .get(`http://gwonyeong.shop/post/${1}`)
      .then((res) => {
        const currentPost = res.data.data.poster;
        console.log(currentPost);
        setEditInputs({
          songTitle: currentPost.songTitle,
          singer: currentPost.singer,
          imageUrl: currentPost.imageUrl,
          content: currentPost.content,
        })
      })
    }
    fetchPost();
  }, [])

  const editList = data.POSTS[postId];

  // console.log(editList);

  // 변경된 가수, 노래명, 이미지, 게시물 내용을 저장할 곳 선언
  const [editInputs, setEditInputs] = useState({
    songTitle: editList.info.songTitle,
    singer: editList.info.singer,
    imageUrl: editList.imageUrl,
    content: editList.content,
  });
  const {songTitle, singer, imageUrl, content} = editInputs;

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setEditInputs({
      ...editInputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  // edit 핸들러 설정
  const onEditHandler = async (event) => {
    event.preventDefault();

    // 채워지지 않은 칸이 있을 경우
    if (
      content === "" ||
      imageUrl === "" ||
      songTitle === "" ||
      singer === ""
    ) {
      alert("빈칸이 있습니다 !");
      return;
    }

    // // 게시물 수정 버그
    // let count = 0;

    // // 수정될 때마다 count++
    // for (const x in editInputs) {
    //   if (editInputs[x] !== editList[x]) {
    //     console.log(editInputs[x], editList[x]);
    //     count++;
    //     alert("변경사항 있음");
    //   }
    // }

    // if(count === 0) {
    //   alert("변경된 사항이 없습니다.");
    // }

    // const new_data = { data, editInputs };
    // console.log(new_data);

    // const response = RESPONSE.EDIT_CHECK;
    // console.log(response);
    // if (response.success) {
    //   alert(response.msg);
    //   navigate(`/post/${postId}`);
    // } else {
    //   alert(response.msg);
    //   navigate(`/post/${postId}`);
    // }

    editInputs = {
      content: editInputs.content, 
      imageUrl: editInputs.imageUrl, 
      info: {
        songTitle: editInputs.songTitle, 
        singer: editInputs.singer
      }
    };

    await axios
    .patch(`http://gwonyeong.shop/post/${1}`, editInputs, {
      headers: { authorization: `Bearer ${token}` },
    }).then((res) => {
      const {success, msg} = res.data.data;
      if (success) {
        console.log(msg);
        navigate(`/post/${postId}`);
      } else {
        alert(msg);
      }
    })
  }

  return (
    <Contents>
      <form
        onSubmit={(event) => {
          onEditHandler(event)
        }}
      >
        <h3>글 수정</h3>

        <input
          onChange={onChange}
          value={imageUrl}
          name="imageUrl"
          placeholder="이미지 Url"
        />

        <input
          onChange={onChange}
          value={content}
          name="content"
          placeholder="게시물 내용"
        />

        <input
          onChange={onChange}
          value={songTitle}
          name="songTitle"
          placeholder="노래 이름"
        />

        <input
          onChange={onChange}
          value={singer}
          name="singer"
          placeholder="가수"
        />

        <button>수정하기</button>
      </form>
    </Contents>
  );
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