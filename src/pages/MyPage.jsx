import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from '../cookie';
import styled from "styled-components";

import Article from "../components/Main/Article";
import Pagination from "../components/Main/Pagination";
import PageSet from "../components/Main/PageSet";

function MyPage(){
  const navigate = useNavigate();
  //유저정보
  let userData = useSelector(state => state.user.info);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    setLoading(true)
    const token = getCookie('token');
    
    const fetchAxiosData = async () => {
      try {
        const axiosData = await axios.get(`http://gwonyeong.shop/sign/user/${userData.userId}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        
        const result = axiosData.data.data;
        setPosts(result)
        setLoading(false);
        
      } catch (err) {

        console.log(err);
        navigate('/error')
        
      }
    };
    fetchAxiosData();
  }, [])

  
  const indexLast = page * limit; // 1 * 10 / 2 * 10
  const indexFirst = indexLast - limit; // 10 - 10 / 20 - 10
  const current = (posts) => {
    let current = 0;
    current = posts.slice(indexFirst, indexLast);
    return current;
  }  

  return(
    <>
      <MyPagePost profilePicture={userData.profilePicture}>

        <div className="profile_box">
          <div className="profile_picture"></div>
          <div>
            <h3 className="section_title">
              {userData.MBTI}
              <strong> {userData.nickname}</strong>
            </h3>
            <div className="button_box"
            onClick={()=>{
              navigate(`/mypage/profile/0`);
            }}>
              정보 수정하기
            </div>
          </div>
        </div>
        
        <PageSet
          limit = {limit} 
          setLimit = {setLimit} 
          limitOpt = {5}
        />

        <h4>내가 작성한 글</h4>
        <div className="scrollY">
          <div className="posts_box">
            {!loading && current(posts).map((list, i) => {
              return <Article list={list} key={i} userMBTI={userData.MBTI} />
            }) }
          </div>

          <Pagination 
            totalPost = {posts.length}
            limit = {limit}
            page = {page}
            setPage = {setPage}
          />
        </div>

      </MyPagePost>
    </>
  )
}

export default MyPage;

const MyPagePost = styled.div`
  .posts_box {
    min-height: calc(100vh - 500px);
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
    padding: 40px 0 10px;
    background-color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    /* position: sticky;
    top: 60px; */
  }

  .profile_picture {
    width: 160px;
    height: 160px;
    border-radius: 50%;

    background: #eee url(${(props)=> props.profilePicture}) no-repeat center / contain;
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