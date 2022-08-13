import axios from "axios";
import { useEffect, useState } from "react";import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Article from "../components/Main/Article";
import Pagination from "../components/Main/Pagination";
import RESPONSE from '../RESPONSE'

function MyPage(){
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  let data = RESPONSE.POSTS;
  let userData = RESPONSE.USER_PROFILE;
  
  useEffect(() => {
    // let data = axios.get('/posts')
    let data = RESPONSE.POSTS;
    setPosts(data)
  })

  return(
    <MyPagePost>
      <div className="profile_box">
        <div className="profile_picture">
          img: {userData.profilePicture}
        </div>
        <div>
          <h3>
            {userData.nickname}님의 마이페이지
          </h3>
          <div className="button_box"
          onClick={()=>{
            navigate("/profile");
          }}>
            유저 정보 수정하기
          </div>
        </div>
      </div>
      <div className="posts_box">
        { posts.map((list, i) => {
          return <Article list={list} key={i} />
        }) }
      </div>

      <Pagination />

    </MyPagePost>
  )
}

export default MyPage;

const MyPagePost = styled.div`
  .posts_box {
    min-height: calc(100vh - 300px);
  }

  .button_box {
    padding: 5px 10px;
    margin-bottom: 10px;

    display: inline-block;
    text-align: center;
    font-size: 12px;
    border: 1px solid #222;
  }

  .profile_box {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .profile_picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;

    background-color: #eee;
  }

  .pagination {
    text-align: center;

    button {
      all: unset;
      padding: 5px 5px;
      margin: 0 10px;
      cursor: pointer;
    }

    button.active {
      border-bottom: 2px solid #222;
    }
  }
`