import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

import axios from "axios";
import { getCookie } from "../cookie";

import styled from "styled-components";

import Comment from "../components/Detail/Comment";

const DetailPage = (props) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const token = getCookie("token");
  const { userLoggin } = props;
  const userData = useSelector((state) => state.user.info.nickname);

  const [post, setPost] = useState([]);
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [currComment, setCurrComment] = useState({
    content: "",
  });

  const [likeNum, setLikeNum] = useState();;

  // 게시물, 댓글 목록 불러오기
  const fetchAxiosData = async () => {
    try {
      const axiosData = await axios.get(
        `http://gwonyeong.shop/post/${postId}`
      );

      const res = axiosData.data.data;
      const poster = res.poster;
      const commenter = res.commenter;
      const user = res.poster.User;

      let dateCreatedAt = new Date(poster.createdAt).toLocaleDateString();

      setUser(user);
      setPost({
      //   title: poster.title,
        content: poster.content,
        createdAt: dateCreatedAt,
        imageUrl: poster.imageUrl,
        singer: poster.singer,
        songTitle: poster.songTitle,
      });
      setComments(commenter);
      setLikeNum(res.like);
    } catch (err) {
      console.log(err);
      // navigate('/error')
    }
  };
  useEffect(() => {
    fetchAxiosData();
  }, []);

  // 좋아요 버튼 핸들러
  const likeButtonClickHandler = (event) => {
    if (!userLoggin) {
      alert("로그인 후 이용해주세요!");
      navigate("/sign/in");
      return null;
    }
    const token = getCookie("token");

    const postAxiosData = async () => {
      try {
        await axios
          .patch(
            `http://gwonyeong.shop/post/like/${postId}`,
            { postId: postId },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (res.data.msg === "좋아요!") {
              alert("좋아요를 눌렀습니다!");
              setLikeNum(likeNum + 1);
            } else {
              alert("좋아요를 취소했습니다.");
              setLikeNum(likeNum - 1);
            }
          });
      } catch (err) {
        console.log(err);
        navigate("/error");
      }
    };
    postAxiosData();
  };

  // 게시물 수정 핸들러
  const editClickHandler = () => {
    if (userData !== user.nickname) {
      alert("본인의 글이 아닙니다 !");
    } else {
      navigate(`/post/${postId}/edit`);
    }
  };

  // 게시물 삭제 핸들러
  const deleteButtonClickHandler = async (ev) => {
    ev.preventDefault();
    if (userData !== user.nickname) {
      alert("본인의 글이 아닙니다 !");
      return;
    }
    try {
      await axios
        .delete(`http://gwonyeong.shop/post/${postId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          alert("게시물이 삭제되었습니다.");
          navigate("/");
        });
    } catch (err) {
      console.log(err);
      navigate("/error");
    }
  };

  // POST 요청
  const onClickAddCommentHandler = async (event) => {
    event.preventDefault();

    try {
      await axios
        .post(`http://gwonyeong.shop/comment/${postId}`, currComment, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if(res.statusText === "OK"){
            fetchAxiosData();
          } else {
            alert('댓글 작성이 실패했습니다.')
          }
        });
    } catch (err) {
      console.log(err);
      navigate("/error");
    }
  };

  return (
    <Wrap>
      <StSection1
      // 유저 프로필 사진 불러오기
      profilePicture={
        user.profilePicture ? user.profilePicture : "img/defaultProfile.png"
      } >

<div className="head_info">
        {/* 유저 정보 불러오기 */}
        <div className="profile_box">
          <div className="profile_picture">
            <p>{user.MBTI}</p>
          </div>
          <p>{user.nickname} </p>
        </div>

        <div className="right">
          {/* 좋아요 누르기 */}
          <button
            className="button button_like"
            onClick={(event) => {
              likeButtonClickHandler(event);
            }}
          >
            <strong>{likeNum}</strong> 좋아요!
          </button>

          <div></div>

          <button
            className={userLoggin ? "button" : "button display_unable"}
            onClick={editClickHandler}
          >
            게시물 수정
          </button>

          <button
            className={userLoggin ? "button" : "button display_unable"}
            onClick={(ev) => deleteButtonClickHandler(ev)}
          >
            게시물 삭제
          </button>
        </div>
      </div>
      </StSection1>

      <div className="detail_body">
        <StSection2 picture={post.imageUrl}>
          <p className="created_at">{post.createdAt}</p>
          <div className="album_cover">
            <p className="album_cover_title">
              <span>{post.songTitle}</span> - <span>{post.singer}</span>
            </p>
            <p>{post.content}</p>
          </div>
        </StSection2>
        
        <StSection3>
        <form
          className={userLoggin ? "submit_form" : "submit_form display_unable"}
          onSubmit={(event) => {
            onClickAddCommentHandler(event);
          }}
        >
          <input
            onChange={(e) => setCurrComment({ content: e.target.value })}
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
            return (
              <Comment
                fetchAxiosData = {fetchAxiosData}
                setComments = { setComments }
                comments = { comments }
                userLoggin={userLoggin}
                list={list}
                i={i}
                postId={postId}
                key={i}
              />
            );
          })}
        </div>
      </StSection3>
      </div>
    </Wrap>
  );
  };

export default DetailPage;

const Wrap = styled.div`
  min-height: calc(100vh - 70px);

  button, input {
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

  .submit_form {
    width: 90%;
    padding-right: 1px;
    
    display: flex;
    justify-content: flex-end;
    input {
      text-align: left;
      flex: 1 1 auto;
    }
    button {
      background-color: #222;
      border: none;
      color: #fff;
      font-weight: 800;
    }
  }

  .display_unable {
    /* display: none; */
    opacity: 0.3;
    pointer-events: none;
  }

  .created_at {
    font-size: 14px;
    text-align: left;
    padding-left: 20px;
    font-weight: 700;

    color: #fff;
  }

  .detail_body {
    display: flex;
    align-items: flex-start;
  }

  input {
    &:hover {
      background-color: #fff;
      color: #222;
      border: 1px solid #222;
    }
    &:focus {
      background-color: #e1fffa;
    }
  }
`


const StSection1 = styled.div`
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

    background: #eee url(${(props) => props.profilePicture}) no-repeat center /
      contain;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 22px;
    font-weight: 800;
  }

`;

const StSection2 = styled.div`
  flex: 1 1 auto;
  height: calc(100vh - 250px);
  margin-top: 40px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

  background: #eee url(${(props)=> props.picture}) no-repeat center / cover;
  position: relative;
  
  .album_cover {
    min-width: 70%;
    text-align: center;
    font-weight: 900;
    font-size: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: #fff;
    background-color: rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.4));
  }
  .album_cover_title {
    font-size: 1.2em;
    padding-bottom: 16px;
    border-bottom: 2px dotted #aaa;
    color: #fff;
  }
  `

const StSection3 = styled.div`
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
    padding: 0 20px;
    box-sizing: border-box;
  }
`