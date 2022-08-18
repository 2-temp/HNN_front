import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { getCookie } from '../../cookie';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Comment (props) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { list, userLoggin, setComments, comments, fetchAxiosData } = props;
  
  const input_content = useRef();
  const [inputContent, setInputContent] = useState(list.content);
  const [editing, setEditing] = useState(false);

  const token = getCookie('token');
  const userInfo = list.User 
  const currUserId = useSelector(state => state.user.info.userId);
  const commentUserId = list.userId

  let dateCreatedAt = new Date(list.createdAt).toLocaleDateString()
  dateCreatedAt = dateCreatedAt === "Invalid Date"?"":dateCreatedAt;

  //댓글 수정 활성화
  const editButtonClickHandler = () => {
    if(currUserId !== commentUserId) {
      alert('본인의 댓글이 아닙니다!')
    return;
    }
    setEditing(true)
    input_content.current.focus();
  }
  
  //댓글 수정 완료
  const editCompleteButtonClickHandler = async() => {
    setEditing(false)   
    const newComment = {
      content: inputContent,
      commentId: list.commentId
    };
    console.log(newComment);
    await axios.patch(`http://gwonyeong.shop/comment/${postId}/${list.commentId}`, newComment, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(res => {
      if(res.statusText === "OK"){

        alert('댓글 작성이 완료되었습니다.')
        console.log(res.data)

      } else {
        alert('댓글 작성이 실패하였습니다.')
      }
    }).catch(err => 
      {
        console.log(err)
        navigate('/error')
      }
    )
  }

  //댓글 삭제 기능
  const deleteButtonClickHandler= async (ev) => {
    ev.preventDefault();
    if(currUserId !== commentUserId) {
      alert('본인의 댓글이 아닙니다!')
      return;
    }
    try {
      await axios.delete(`http://gwonyeong.shop/comment/${postId}/${list.commentId}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then(res => {
        fetchAxiosData();
      })
    } catch (err) {
      console.log(err);
      navigate('/error')
    }
  };


  return (
    <MyArticle>
      <div className="comment_head">
        <div className="left_box">
          <div className="profilePicture">
            {userInfo.MBTI}
          </div>
          <span className="nickname">
            {userInfo.nickname}
          </span>
        </div>
        <div className="right_box">

          {!editing && <button
            type="button"
            className={userLoggin?"":" display_unable"}
            onClick={(ev)=> editButtonClickHandler(ev)}
          >
            수정
          </button>}

          {editing && <button
            type="button"
            className={userLoggin?"":" display_unable"}
            onClick={(ev)=> editCompleteButtonClickHandler(ev)}
          >
            완료
          </button>}
          
          
          <button
            type="button"
            className={userLoggin?"":" display_unable"}
            onClick={(ev)=> deleteButtonClickHandler(ev)}
          >
            삭제
          </button>

        </div>
      </div>
      <p className="content">
        <textarea 
          className={editing ? "input_content" : "input_content unable"} 
          value={inputContent}
          onChange={(e)=> setInputContent(e.target.value) }
          ref={input_content}
        />
      </p>
      <p className="commentTime">{dateCreatedAt}</p>

    </MyArticle>
  );
}

export default Comment;

const MyArticle = styled.div`
  padding: 10px 13px 0px;
  margin-bottom: 10px;
  border: 1px solid #ddd;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;

  position: relative;

  cursor: pointer;
  transition: all 0.2s;

  &:hover {
      background-color: #eee;
  }

  .comment_head {
    display: flex;
  }

  .profilePicture {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    background-color: #eee;
    background-image: url(${(props)=> props.profilePicture});
    
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left_box {
    flex: 1 1 auto;

    display: flex;
    align-items: center;
    gap: 10px;
  
    .mbti {
      font-size: 2em;
      margin-top: -3px;
    }
  
    .nickname {
      font-weight: 800;
      color: #555;
      font-size: 1.3em;
    }
  }

  .right_box {
    height: 20px;
    flex: 0 0 80px;
    text-align: right;
    
    display: flex;
    justify-content: space-between;

    position: absolute;
    top: 10px;
    right: 10px;

    button {
      margin: 0;
      width: 20px;
      text-align: center;
      padding-top: 3px;
      margin-left: 5px;
      font-size: 10px;
      background-color: #222;
      color: #fff;
      border-radius: 20px;
    }
  }

  .commentTime {
    width: 100%;
    color: #555;

    font-weight: 800;
    text-align: right;
    font-size: .7em;
  }

  .input_content {
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    resize: none;

    border: none;
    border-radius: 20px;
    background-color: #f2ffe8;
  }

  .input_content:focus {
    outline: none;
    box-shadow: 0 0 3px #6e6e6f;
  }

  .unable {
    pointer-events: none;
    background-color: #fff;
  }

  .content {
    width: 100%;
    font-size: 1em;
    margin: 0;
    margin: 0;
  }

  b {
    color: #e16720;
  }

  @media (max-width: 500px) {

    .title,
    .content {
      flex: 1 1 100%;
      text-align: center;
    }
  }
`;