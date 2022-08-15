import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

function Article(props) {
  const navigate = useNavigate();
  const { list, i } = props;

  return (
    <MyArticle
      onClick={() => {
        navigate(`/post/${list.postId}`);
      }}
    >
      <span className="mbti">{list.MBTI}</span>
      <span className="nickname">{list.nickname}</span>
      <span className="title">
        {list.info.songTitle}
        -
        {list.info.singer}
      </span>
      <span className="content">
        {list.content.length>17?list.content.slice(0, 17)+"...":list.content}
      </span>
      <ul className="right">
        <li>
          좋아요 <b>{list.likeNum}</b>
        </li>
      </ul>
      <div className="icon_box">
        {/* <FaHeart /> */}
        <FaRegHeart />
      </div>
    </MyArticle>
  );
}

export default Article;

const MyArticle = styled.div`
  padding: 10px 20px;
  margin-bottom: 10px;
  border: 1px solid #aaa;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  cursor: pointer;
  transition: all 0.2s;

  &:hover {
      background-color: #eee;
  }

  .icon_box {
    color: #e16720;
  }

  .right {
    flex: 1 1 auto;
    font-size: 12px;
    text-align: right;
  }

  .mbti {
    width: 80px;
    font-size: 2em;
    margin-top: -3px;
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
