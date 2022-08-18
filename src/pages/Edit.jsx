import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { getCookie } from '../cookie';

function Edit(){

  const navigate = useNavigate();
  const { postId } = useParams();
  const [loaded, setLoaded] = useState(false);

  const [prevPost, setPrevPost] = useState({});
  const [currPost, setCurrPost] = useState({
    songTitle: '',
    singer: '',
    imageUrl: '',
    content: ''
  });

  const token = getCookie("token");

  const fetchAxiosData = async () => {
    try {
      console.log(postId);
      const axiosData = await axios.get(`http://gwonyeong.shop/post/${postId}`)
      
      const result = axiosData.data.data.poster;
      setPrevPost(result)

      setCurrPost({
        songTitle: prevPost.songTitle,
        singer: prevPost.singer,
        imageUrl: prevPost.imageUrl,
        content: prevPost.content
      })
    } catch (err) {
      console.log(err);
      navigate('/error')
    } finally {
      setLoaded(true)
    }
  };
  
  useEffect(()=>{
    setLoaded(false)
    fetchAxiosData();
  }, [])

  const onChangeHandler = (e) => {
    setCurrPost({
      ...currPost,
      [e.target.name]: e.target.value,
    });
  };

  const compareChanges = () => {


  }

  const onEditHandler = (event) => {
    event.preventDefault();
    console.log(currPost, prevPost);

    let isChanged=false;
    for (const x in currPost){
      if(currPost[x]!==prevPost[x]) isChanged=true;
    }

    if(isChanged){
      try {
        axios.patch(`http://gwonyeong.shop/post/${postId}`, ({...currPost, postId:Number(postId)}), {
          headers: { authorization: `Bearer ${token}` },
        }).then((res) => {
          console.log(res);
          const { msg } = res.data;
          const { statusText } = (res.statusText === "OK")
          console.log(statusText)
      
          if (statusText) {
      
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
    } else {
      alert('변경된 내용이 없습니다!');
    }

  }

  return (
    <>
      {loaded && (
        <Contents>
          <form
            onSubmit={(event) => {
              onEditHandler(event);
            }}
          >
            <h3>글 수정</h3>

            <button
              type="button"
              onClick={() => {
                fetchAxiosData();
              }}
            >
              이전 글 불러오기
            </button>

            <input
              onChange={onChangeHandler}
              value={currPost.imageUrl}
              name="imageUrl"
              placeholder="이미지 URL"
            />

            <input
              onChange={onChangeHandler}
              value={currPost.songTitle}
              name="songTitle"
              placeholder="노래명"
            />

            <input
              onChange={onChangeHandler}
              value={currPost.singer}
              name="singer"
              placeholder="가수명"
            />

            <input
              onChange={onChangeHandler}
              value={currPost.content}
              name="content"
              placeholder="감상평"
            />

            <button>수정하기</button>
          </form>
        </Contents>
      )}
    </>
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