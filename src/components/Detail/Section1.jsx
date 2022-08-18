import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux/es/exports";
import styled from "styled-components";
import { getCookie } from "../../cookie";

const Section1 = (props) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const token = getCookie("token");
  const { userLoggin } = props;
  const userData = useSelector((state) => state.user.info.nickname);

  const [post, setPost] = useState([]);
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [likeNum, setLikeNum] = useState();

  // 게시물, 댓글 목록 불러오기
  useEffect(() => {
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
            console.log(res);
            console.log(res.data);
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

  return (
    <StSection1
      // 유저 프로필 사진 불러오기
      profilePicture={
        user.profilePicture ? user.profilePicture : "img/defaultProfile.png"
      } 
    >
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
  );
};

export default Section1;

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
  }
`;