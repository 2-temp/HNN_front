import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { getCookie } from '../cookie';
import styled from "styled-components";

import Comment from "../components/Detail/Comment";

const DetailPage = () => {
  const navigate = useNavigate();
  const {postId} = useParams();
  const token = getCookie('token');
  
  const [post, setPost] = useState([]);
  const [user, setUser] = useState({});

  const [comments, setComments] = useState([]);
  const [likeNum, setLikeNum] = useState();
  
  const [currComment, setCurrComment] = useState({
    content: "",
  });
  
  // 게시물, 댓글 목록 불러오기
  useEffect(() => {
    const fetchAxiosData = async () => {
      try {
        const axiosData = await axios.get(`http://gwonyeong.shop/post/${postId}`)
        
        const res = axiosData.data.data;
        const poster = res.poster;
        const commenter = res.commenter;
        const user = res.poster.User;
        
        let dateCreatedAt = new Date(poster.createdAt).toLocaleDateString();
      
        setUser(user)
        setPost({
          content: poster.content,
          createdAt: dateCreatedAt,
          imageUrl: poster.imageUrl,
          singer: poster.singer,
          songTitle: poster.songTitle
        })
        setComments(commenter)
        setLikeNum(res.like)
        
      } catch (err) {
        console.log(err);
        // navigate('/error')
      }
    };  
    fetchAxiosData();

  }, [])
  
  
  // POST 요청
  const onClickAddCommentHandler = async (event) => {
    event.preventDefault();
    
    try{ 	
      await axios.post(`http://gwonyeong.shop/comment/${postId}`, currComment, { 
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

  // 게시물, 댓글 목록 불러오기
  useEffect(() => {
    const fetchAxiosData = async () => {
      try {
        const axiosData = await axios.get(`http://gwonyeong.shop/post/${postId}`)

        if(0){
          
        }
        const poster = axiosData.data.data.poster
        setUser(poster.User)
        setPost(poster)
        setComments(axiosData.data.data.commenter)
        console.log(axiosData.data.data)
        setLikeNum(axiosData.data.data.like)
      } catch (err) {
        console.log(err);
        // navigate('/error')
      }

    };
    fetchAxiosData();

  }, [])

  //게시물 삭제
  const deleteButtonClickHandler = async (ev) => {
    ev.preventDefault();
    try {
      await axios.delete(`http://gwonyeong.shop/post/${postId}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
    }).then(res => {
      alert('게시물이 삭제되었습니다.')
      navigate('/')
    })
  } catch (err) {
    console.log(err);
    navigate('/error')
  }
};

// 좋아요 버튼 핸들러
const likeButtonClickHandler = (event) => {
  const token = getCookie('token')  ;
  
  const postAxiosData = async () => {
    try {
      await axios.patch(`http://gwonyeong.shop/post/like/${postId}`, {postId: postId}, {
        headers: {
          authorization: `Bearer ${token}`
          }
        }).then(res => {
          console.log(res)
          console.log(res.data)
          if(res.data.msg === "좋아요!"){
            alert('좋아요를 눌렀습니다!')
            setLikeNum(likeNum+1)
          } else {
          alert('좋아요를 취소했습니다.')
          setLikeNum(likeNum-1)
        }
      })
      }
      catch (err) {
        console.log(err);
        navigate('/error')
      }
    };
    postAxiosData();
  }
  
  return (
    <Wrap>
      <Section1 profilePicture = {user.profilePicture?user.profilePicture:"img/defaultProfile.png"}>
        <div className="head_info">
          <div className="profile_box">
            <div className="profile_picture">
              <p>{user.MBTI}</p>
            </div>
            <p>{user.nickname} </p>
          </div>
          <div className="right">
            <button
              className="button button_like"
              onClick={(event) => {
                likeButtonClickHandler(event);
              }}
            >
              <strong>
                {likeNum} 
              </strong> 좋아요!
            </button>
            <div></div>
            <button
              className="button"
              onClick={() => navigate(`/post/${postId}/edit`)}
            >
              게시물 수정
            </button>
            <button
              className="button"
              onClick={(ev) => deleteButtonClickHandler(ev)}
            >
              게시물 삭제
            </button>
          </div>
        </div>
      </Section1>

      <div className="detail_body">
        <Section2 albumCover={post.imageUrl}>
          <p className="created_at">{post.createdAt}</p>
          <div className="album_cover">
            <p className="album_cover_title">
              <span>{post.songTitle}</span> - <span>{post.singer}</span>
            </p>
            <p>{post.content}</p>
          </div>
        </Section2>

        <Section3>
          <form
            onSubmit={(event) => {
              onClickAddCommentHandler(event);
            }}
          >
            <input
              onChange={(e)=> setCurrComment({content: e.target.value})}
              minLength={5}
              value={currComment.content}
              name="content"
              placeholder="댓글 내용"
            />
            <button>댓글 작성</button>
          </form>

          <h3 className="comments_title">댓글 목록</h3>
          <div className="comments_box">
            {comments.map((list, i) => {
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

    background: #eee url(${(props)=> props.profilePicture}) no-repeat center / contain;
    
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