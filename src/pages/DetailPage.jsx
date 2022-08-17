import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { getCookie } from '../cookie';

import RESPONSE from "../RESPONSE";
import Comment from "../components/Detail/Comment";

const DetailPage = () => {
  //쿠키 가져오기
  const token = getCookie('token');

  const navigate = useNavigate();

  const {postId} = useParams();

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [likeNum, setLikeNum] = useState();

  //게시물, 댓글 리스트 불러오기
  useEffect(() => {
    const fetchAxiosData = async () => {
      try{
        const axiosData = await axios.get(`http://gwonyeong.shop/post/${postId}`)
        //여기에 없는 post 입력시 오류너게 처리해야함

        const poster=axiosData.data.data.poster
        setUsers(poster.User)
        setPosts(poster)
        setComments(axiosData.data.data.commenter)
        console.log(axiosData.data.data)
        setLikeNum(axiosData.data.data.like)
      } catch (err) {
        console.log(err);
        navigate('/error')
      }

     
    };  
    fetchAxiosData();

  }, [])
  
 

  // 게시물 삭제
  // const deleteButtonClickHandler = async (ev) => {
  //   ev.preventDefault();
  //   await axios.delete(`http://gwonyeong.shop/post/${postId}`, null,{
  //     headers: {
  //       authorization: `Bearer ${token}`
  //     } )
  //   .then(res => {
  //     console.log(res)
  //     console.log(res.data)
  //   })
  // }

  //게시물 삭제
  const deleteButtonClickHandler = async (ev) => {
    ev.preventDefault();
    try {
       await axios.delete(`http://gwonyeong.shop/post/${postId}`, ev, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res)
      console.log(res.data)
    })
    } catch (err) {
      console.log(err);
      navigate('/error')
    }
   
  };

 
  const likeButtonClickHandler = (event) => {
    const token = getCookie('token')  ;
    
    // // patch요청
    const postAxiosData = async () => {
      try {
        await axios.patch(`http://gwonyeong.shop/post/like/${postId}`, {postId: postId}, {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res)
        console.log(res.data)
        setLikeNum(posts.likeNum)
      })
      }
      catch (err) {
        console.log(err);
        navigate('/error')
      }
    };
    postAxiosData();
    // console.log("/post/like/"+posts.postId);
  }

  return (
    <Wrap>
      <Section1 profilePicture={posts.profilePicture}>
        <div className="head_info"> 
          <div className="profile_box">
              <div className="profile_picture">
                <p>{users.MBTI}</p>
              </div>
              <p>{users.nickname} </p>
          </div>
          <div className="right">
            
            <button 
              className="button button_like"
              onClick={(event)=> { likeButtonClickHandler(event)}} 
            >
              {likeNum}
              좋아요!
            </button> 
            <div></div>
            <button className="button"
              onClick={()=> navigate(`/post/${posts.userId}/edit`)}
            >게시물 수정</button>
            {/* 작성해야 함 */}
            <button className="button"
              onClick={(ev)=> deleteButtonClickHandler(ev)}
            >게시물 삭제</button>
          </div>
        </div>
      </Section1>

      <div className="detail_body">

        <Section2 albumCover={posts.imageUrl}>
          <p className="created_at">{posts.createdAt}</p>
          <div className="album_cover">  
            <p className="album_cover_title">
              <span>{posts.songTitle}</span> - <span>{posts.singer}</span>
            </p>
            <p>{posts.content}</p>
          </div>
        </Section2>

        <Section3>
          <h3 className="comments_title">댓글 목록</h3>
          <div className="comments_box">
            {comments.map((list, i) => {
              console.log(comments)
              return <Comment list={list} i={i} postId={postId} key={i} />;
            })}
          </div>
        </Section3>

      </div>
    </Wrap>
  );
};

export default DetailPage;

const Wrap = styled.div`
  min-height: calc(100vh - 70px);

  button {
    all: unset;
    padding: 5px 10px;
    margin-left: 5px;
    margin-bottom: 8px;
    margin-top: 2px;
    
    border: 1px solid #aaa;
    border-radius: 20px;

    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #222;
      color: #fff;
    border: 1px solid #222;
    }
  }

  .created_at {
    font-size: 12px;
    text-align: right;
    padding-right: 10px;
  }

  .detail_body {
    display: flex;
    align-items: flex-start;
  }
`;


const Section1 = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .head_info {
    width: 100%;
    padding: 0 1em;
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .right {
      flex: 1 1 auto;
      text-align: right;
    }
  }

  .profile_box {
  
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
  }

  .profile_picture {
    width: 80px;
    height: 80px;
    border-radius: 50%;

    background-color: #eee;
    background-image: url(${(props)=> props.profilePicture});
    
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
`

const Section2 = styled.div`
  flex: 1 1 auto;
  height: calc(100vh - 250px);
  margin-top: 40px;

  background-color: #eee;
  position: relative;
  
  .album_cover {
    text-align: center;
    font-weight: 900;
    font-size: 20px;
    
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: #444;

  }
  .album_cover_title {
    font-size: 1.2em;
    padding-bottom: 16px;
    border-bottom: 2px dotted #aaa;
    color: #222;
  }
`

const Section3 = styled.div`
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  font-size: .7em;

  .comments_title {
    width: 100%;
    line-height: 40px;

    margin: 0;
    padding: 0 10px;
    box-sizing: border-box;
  }
`