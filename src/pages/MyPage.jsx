import axios from "axios";
import { useEffect, useState } from "react";import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Article from "../components/Main/Article";
import Pagination from "../components/Main/Pagination";
import PageSet from "../components/Main/PageSet";
import RESPONSE from '../RESPONSE'

function MyPage(){
  const navigate = useNavigate();
  //유저정보
  let userData = RESPONSE.USER_PROFILE;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      // const data = await axios.get('/posts')
      const data = RESPONSE.POSTS;
      setPosts(data);
      setLoading(false);
    };
    fetchData();
  })

  const indexLast = page * limit; // 1 * 10 / 2 * 10
  const indexFirst = indexLast - limit; // 10 - 10 / 20 - 10
  const current = (posts) => {
    let current = 0;
    current = posts.slice(indexFirst, indexLast);
    return current;
  }  

  
  return(
    <MyPagePost profilePicture={userData.profilePicture}>

      <div className="profile_box">
        <div className="profile_picture">
          img: {userData.profilePicture}
        </div>
        <div>
          <h3 className="section_title">
            <strong>
              {userData.nickname}
            </strong>
            님
          </h3>
          <div className="button_box"
          onClick={()=>{
            navigate("/profile");
          }}>
            정보 수정하기
          </div>
        </div>
      </div>
      
      <PageSet
        limit = {limit} 
        setLimit = {setLimit} 
      />

      <h4>내가 작성한 글</h4>
      <div className="posts_box">
        {!loading && current(posts).map((list, i) => {
          return <Article list={list} key={i} />
        }) }
      </div>

      <Pagination 
        totalPost = {posts.length}
        limit = {limit}
        page = {page}
        setPage = {setPage}
      />

    </MyPagePost>
  )
}

export default MyPage;

const MyPagePost = styled.div`
  .posts_box {
    min-height: calc(100vh - 330px);
  }

  .button_box {
    padding: 5px 10px;

    display: inline-block;
    text-align: center;
    font-size: 12px;
    
    border: 1px solid #222;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #eee;
    }
  }

  .profile_box {
    margin: 10px 0;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .profile_picture {
    width: 120px;
    height: 120px;
    border-radius: 50%;

    background-color: #eee;
    background-image: url(${(props)=> props.profilePicture});
  }
  
  .section_title {
    color: #555;
    font-weight: 500;
  }

  strong {
    color: #222;
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