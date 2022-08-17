import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import RESPONSE from "../RESPONSE";
import { useNavigate } from "react-router-dom";
import { getCookie } from '../cookie';


function Post() {
  //쿠키 가져옴
  const token = getCookie('token');

  const navigate = useNavigate();

  //값들을 저장시켜 놓을 usestate 생성
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    imageUrl: "",
    songTitle:"",
    singer:"",
  });

  const { title, content, imageUrl, songTitle, singer } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

//onClick 함수 생성
  // const onClickEditButtonHandler = async (event) => {
  //   event.preventDefault();
  
  //   const new_data = { inputs }

  //   const response = await axios.post("/http://gwonyeong.shop/post", inputs, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //       }
  //   });

  //   console.log(response)
    

  //   //성공 여부에 따라 나올 메세지
  //   // const response = RESPONSE.POST_CHECK
  //   // console.log(response)
  //   // if(response.success) {
  //   //   alert(response.msg)
  //   //   navigate('/')
  //   // }else {
  //   //   alert(response.msg)
  //   //   navigate('/sign/in')
  //   // }
  // } 




  //post요청
    const onClickEditButtonHandler = async (event) => {
      event.preventDefault();

      //주소 바꿨을시 오류 나긴함
      try{
        await axios.post('http://gwonyeong.shop/post', inputs, {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res)
        console.log(res.data)
      })
      } catch(err) {
        console.log(err);
        navigate('/error')
      }
      
    };

  return (
    <Contents>
      <form onSubmit={(event) => { onClickEditButtonHandler(event) }}>
        <h3>글 작성</h3>

        <input onChange={onChange} minLength={1} value={singer} name='singer' placeholder="가수명"/>
        <input onChange={onChange} minLength={1} value={songTitle} name='songTitle' placeholder="곡 제목"/>
        <input onChange={onChange} minLength={1} value={title} name='title' placeholder="제목"/>
        <input onChange={onChange} minLength={1} value={imageUrl} name='imageUrl' placeholder="이미지 Url"/>
        <input onChange={onChange} minLength={5} value={content} name='content' placeholder="게시물 내용"/>
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