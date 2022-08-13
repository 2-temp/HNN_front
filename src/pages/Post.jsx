import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import RESPONSE from "../RESPONSE";
import data from "../RESPONSE";
import { useNavigate } from "react-router-dom";


function Post() {

  const navigate = useNavigate();

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


  const onSubmitHandler = async (inputs) => {

    const new_data = { data, inputs }

    console.log(new_data)

    // const response = await axios.post("/post", asd, {
    //   headers: {
    //     'Content-Type': 'application/json'
    //     }
    // });

    const response = RESPONSE.EDIT
    console.log(response)
    if(response.success) {
      alert(response.msg)
      navigate('/')
    }else {
      alert(response.msg)
      navigate('/sign/in')
    }
  } 

  console.log(title, content, imageUrl)

  return (
    <BigBox>
      <Box>
        <h4>제목</h4>
        <input onChange={onChange} value={title} name='title' placeholder="제목"></input>
        <input onChange={onChange} value={imageUrl} name='imageUrl' placeholder="이미지 Url"></input>
        <input onChange={onChange} value={content} name='content' placeholder="게시물 내용"></input>
        <input onChange={onChange} value={songTitle} name='songTitle' placeholder="노래 이름"></input>
        <input onChange={onChange} value={singer} name='singer' placeholder="가수"></input>
        <button onClick={() => { onSubmitHandler(inputs) }}>작성하기</button>
      </Box>
    </BigBox>
  )
}

export default Post;



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