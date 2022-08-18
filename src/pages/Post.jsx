import React, { useRef } from "react";
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
  });
  const { content, imageUrl, songTitle, singer } = inputs;

  const fileInput = useRef();
  const [imageChanged, setImageChanged] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [currImageURL, setCurrImageURL] = useState();

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
      console.log(res.data)
      navigate('/')
    })
    } catch(err) {
      console.log(err);
      navigate('/error')
    }
  };

  const imageUploadButtonClickHandler = async (ev) => {
    ev.preventDefault();

    const formData = new FormData();
    formData.append('userfile', fileInput.current.files[0])

    await axios.post(`http://gwonyeong.shop/post/image`, formData, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(res => {
      const data = res.data;
      console.log(data);
      
      if(data.success){
        alert('이미지가 등록되었습니다.')
        setImageUploaded(true)
        
        setInputs({
          ...inputs,
          imageUrl: data.imageUrl,
        });
        
      } else {
        alert('이미지가 등록에 실패하였습니다.')
      }
    }).catch(err => {
        console.log(err)
        navigate('/error')
      }
    )

  }

  return (
    <Contents>

      <h3>글 작성</h3>

      <form
        encType="multipart/form-data"
      >
        <input
          type="file"
          placeholder="게시물 이미지"
          name="userfile"
          ref={fileInput}
          className={imageUploaded ? 'unable' : ""}
          onChange={(e) =>{
            setImageChanged(true)
          }}
        />
        <button
          type="button"
          onClick={(ev) => imageUploadButtonClickHandler(ev)}
          className={!imageChanged || imageUploaded ? "unable" : ""}
        >
          게시글 이미지 등록
        </button>
      </form>

      <form
        onSubmit={(event) => { onClickPostButtonHandler(event) }}
      >
        <input onChange={onChange} 
          minLength={1} 
          value={songTitle} 
          name='songTitle' 
          placeholder="노래명"
        />
        <input onChange={onChange} 
          minLength={1} 
          value={singer} 
          name='singer' 
          placeholder="가수명"
        />
        <input onChange={onChange} 
          minLength={5} 
          value={content} 
          name='content' 
          placeholder="감상평"
        />

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

    .unable {
      opacity: .5;
      pointer-events: none;
    }
  }
`