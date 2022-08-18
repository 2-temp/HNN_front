import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from '../../cookie';

import styled from "styled-components";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

function Article(props) {
  const navigate = useNavigate();
  const { list, userMBTI="", userLoggin } = props;

  const [likeNum, setLikeNum] = useState(list.like);

  let dateCreatedAt = new Date(list.createdAt).toLocaleDateString()
  dateCreatedAt = dateCreatedAt === "Invalid Date"?"":dateCreatedAt;

  const likeButtonClickHandler = (event) => {
    event.stopPropagation();

    if(!userLoggin) {
      alert('로그인 후 이용해주세요!')
      navigate('/sign/in')
      return null;
    }

    const token = getCookie('token');
    
    // patch요청
    const postAxiosData = async () => {
      await axios.patch(`http://gwonyeong.shop/post/like/${list.postId}`, {postId: list.postId}, {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then(res => {
        axios.get(`http://gwonyeong.shop/post/${list.postId}`).then(r => {
          setLikeNum(r.data.data.like)
        })
      }).catch(err => {
        console.log(err)
      })
    };
    postAxiosData();
  }
  
  return (
    <>
      <MyArticle
        profilePicture={list.profilePicture?list.profilePicture:"img/defaultProfile.png"}
      >
        <div className="content_area"
          onClick={() => {
            navigate(`/post/${list.postId}`);
          }}
        >
          <div className="flex_box">
            {!userMBTI && 
              <div className="profile_picture"></div>}
            {!userMBTI && <span className="mbti">
              {list.MBTI}
            </span>}
          </div>
          <span className="nickname">{list.nickname}</span>
          <span className="title">
            {list.info.songTitle.length>6?list.info.songTitle.slice(0, 6)+"...":list.info.songTitle}
            ◦
            {list.info.singer.length>6?list.info.singer.slice(0, 6)+"...":list.info.singer}
          </span>
          <span className="content">
            {list.content.length>15?list.content.slice(0, 15)+"...":list.content}
          </span>
          <ul className="right">
            <li>
              {dateCreatedAt}
            </li>
            <li 
              className="like_btn"
              onClick={(event)=> { likeButtonClickHandler(event)}} 
            >
              좋아요 <b>{likeNum}</b>
            </li>
          </ul>
          <div 
            className={userLoggin?"icon_box display_unable":"icon_box display_unable"}
            onClick={(event)=> { likeButtonClickHandler(event)}}  
          >
            {list.like? <FaHeart />:""}
            {!list.like? <FaRegHeart />:""}
          </div>
        </div>
      </MyArticle>
    
    </>
  );
}

export default Article;

const MyArticle = styled.div`

  position: relative;

  .content_area {
    min-height: 50px;
    padding: 14px 20px;
    box-shadow: 0 0 1px #555;
  
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  
    cursor: pointer;
    transition: all 0.2s;
  }

  &:hover {
      background-color: #eee;
  }

  &.wide {
    flex: 1 1 200px;
  }

  .profile_picture {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 5px;

    background: #ccc url(${(props)=> props.profilePicture}) no-repeat center / contain;
  }
  
  .like_btn {
    padding: 2px 6px;
    border-radius: 20px;
    margin-top: -2px;
    
    font-size: 11px;
    
    color: #2d2d2d;
    border: 1px solid #9a9daa;
    
    transition: all .2s;
    
    &:hover {
      background-color: #9a9daa;
      color: #fff;
    }
  }

  div.like_btn {
    position: absolute;
    right: 0;
    /* top: ; */
    z-index: 999999;
  }
  
  .display_unable {
    display: none;
  }
  
  .icon_box {
    width: 20px;
    color: #ff9456;
  }
  
  .right {
    flex: 1 1 auto;
    font-size: 12px;

    display: flex;
    justify-content: right;
    gap: 10px;
  }

  .flex_box {
    display: flex;
    gap: 8px;

    align-items: center;
  }

  .mbti {
    width: 80px;
    font-size: 1.7em;
    margin-top: -3px;
    color: #333;
  }

  .nickname {
    font-weight: 800;
    color: #555;
  }

  .title {
    font-weight: 600;
  }

  .content {
    font-size: 14px;
  }

  span {
    display: inline-block;
  }

  .border {
    width: 1px;
    position: relative;
  }

  b {
    color: #e16720;
  }

  @media (max-width: 950px) {
    gap: 10px;
    
    .title,
    .content {
      flex: 1 1 100%;
    }
  }

  @media (max-width: 600px) {
    gap: 16px;

    .title,
    .content {
      flex: 1 1 100%;
      text-align: center;
    }
  }
`;
