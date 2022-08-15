// 갈아엎고 새로 만든 상세 페이지

import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
import styled from "styled-components";

// import axios from "axios";
import RESPONSE from "../RESPONSE";
// import Article1 from "../components/Detail/Article1";
// import Article2 from "../components/Detail/Article2";
import Article3 from "../components/Detail/Article3";

const DetailPage = () => {

    //   앨범 커버 사진, 곡 제목 및 가수명, 감상평
  const [posts, setPosts] = useState([]);
  const [song, setSong] = useState([]);
  useEffect(() => {
    let data = RESPONSE.DETAIL.poster;
    setPosts(data);

    let song = RESPONSE.DETAIL.poster.info;
    setSong(song);
  });

  //   Article3의 댓글 목록
  const [comments, setComments] = useState([]);
  useEffect(() => {
    let data = RESPONSE.DETAIL.commenter;
    setComments(data);
  });

  return (
    <Wrap>
      <div className="section1">
        <div className="profile">
          <p>게시물 작성자의 프로필 사진: {posts.profilePicture}</p>
          <p>게시물 작성자의 MBTI: {posts.MBTI}</p>
          <p>게시물 작성자의 닉네임: {posts.nickname} </p>
        </div>

        <div>
          <p>게시물이 작성된 시간: {posts.createdAt} </p>
          <button>좋아요</button>
          <p>좋아요 수: {posts.likeNum} </p>
          {/* <p>댓글 수: countComments</p> */}
          <button>게시물 수정</button>
          <button>게시물 삭제</button>
        </div>
      </div>

      <div className="section2">
        {" "}
        {/* 앨범 커버 사진, 곡 제목 및 가수명, 감상평 */}
        <div className="albumCover">앨범 커버 사진: {posts.imageUrl}</div>
        <p>
          곡 제목 및 가수명: <span>{song.songTitle}</span>, <span>{song.singer}</span>
        </p>
        <p>감상평: {posts.content}</p>
      </div>

      <div className="section3">
        {" "}
        {/* 댓글 작성자의 프로필 사진, MBTI, 닉네임, 댓글 내용, 댓글 작성 시각 */}
        <h3>댓글 목록</h3>
        <div className="comments_box">
          {comments.map((list, i) => {
            return <Article3 list={list} key={i} />;
          })}
        </div>
      </div>
    </Wrap>
  );
};

export default DetailPage;

const Wrap = styled.div`
  .section1 {
    width: auto;
    height: auto;
    border: 1px solid black;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .section2 {
    width: auto;
    height: auto;
    border: 1px solid black;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 10px;
  }

  .song_box {
    min-height: calc(100vh - 200px);
  }

  .section3 {
    width: auto;
    height: auto;
    border: 1px solid black;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .comments_box {
    min-height: calc(100vh - 200px);

    .content {
      flex: 1 1 100%;
      order: 99;
    }
  }
`;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, {Fragment, useState, useEffect} from "react";
// import {useNavigate, useParams} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import styled from "styled-components";
// import placeholder from "../../src_assets/placeholder.png";
// import {FaRegCommentAlt} from "react-icons/fa";

// // 데이터 관련
// import {getPost} from "../../redux/modules/detail";
// import RESPONSE from '../RESPONSE'
// import axios from "axios";

// const DetailInfo = () => {
//      useEffect(() => {
//     let data = RESPONSE.POSTS;
//     setPosts(data);
//   })

//   const navigate = useNavigate()
//   const {id} = useParams()
//   const dispatch = useDispatch()
//   const [commentLength, setCommentLength] = useState(0)
//   const [nickName, setNickName] = useState("")
//   const postData = useSelector((state => state.detail))
//   const comment = useSelector((state) => state.comment)
//   useEffect(() => {
//     dispatch(getPost(id))
//   }, [])

//   useEffect(() => {
//     comment.length && setCommentLength(comment.length)
//   }, [comment.length])


//   const getNickName = () => {

//     let user = localStorage.getItem("user")
//     if(user===undefined || user===null) {
//       alert("로그인이 필요합니다")
//       navigate("/login")
//     }else {
//       user = user.replace(/\"/gi, "")
//     }
//     axios.get(`https://try-eat.herokuapp.com/users?email=${user}`)
//       .then((res)=> {
//         return setNickName(res.data[0].nick)
//       })
//   }

//   return (
//     <>
//       {postData.map((data) =>
//         <StImageBox key={data.id} src={data.imgFile}/>
//       )}
//       <StImageInfo>
//         <StInfoLeft>
//           {postData.map((data) => (
//             <Fragment key={data.id}>
//               <p>{data.food}</p>
//               <p>{data.restaurant}</p>
//               <p>{data.location}</p>
//             </Fragment>
//           ))}
//         </StInfoLeft>
//         <StInfoRight>
//           <p>{postData[0]?.name}</p>
//           <p className={"commentLength"}><FaRegCommentAlt/>{commentLength}</p>
//           {
//             postData[0]?.name === nickName
//             ? <button onClick={()=> {navigate(`/edit/${id}`)}}>수정하기</button>
//               : null
//           }
//         </StInfoRight>
//       </StImageInfo>
//       {postData.map((data) => (
//         <StImageDesc key={data.id}>
//           {data.review}
//         </StImageDesc>
//       ))}
//     </>
//   )
// }

// // 스타일 컴포넌트
// const StImageBox = styled.img`
//   background-image: url(${placeholder});
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center;
//   width: 100%;
//   height: 300px;
//   object-fit: fill;
// `

// const StImageInfo = styled.div`
//   display: flex;
//   justify-content: space-between;
//   border-bottom: 1px solid #eee;
//   padding-bottom: 10px;
//   margin-top: 30px;
// `

// const StInfoLeft = styled.div`

//   & p {
//     padding: 3px 0;
//     font-size: 18px;
//     font-weight: bold;
//   }
//   & button {
    
//   }
// `
// const StInfoRight = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;

//   & p {
//     padding: 3px 0;
//     display: flex;
//     align-items: center;
//     justify-content: flex-end;

//     & svg {
//       margin-right: 5px;
//     }
//   }

//   & .commentLength {
//     text-align: right;
//   }
// `
// const StImageDesc = styled.div`
//   margin-top: 30px;
//   flex: 1;
//   overflow: auto;
// `

// export default DetailInfo