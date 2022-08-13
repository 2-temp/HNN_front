import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Article(props) {
  const navigate = useNavigate();
  const { list } = props;
  
  return (
    <MyArticle
      onClick={() => {
        navigate("/post/:postid");
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
    </MyArticle>
  );
}

export default Article;

const MyArticle = styled.div`
  padding: 10px 20px;
  margin-bottom: 10px;
  border: 1px solid #222;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;

  cursor: pointer;
  transition: all 0.2s;

  &:hover {
      background-color: #eee;
  }

  .right {
    flex: 1 1 auto;
    font-size: 12px;
    text-align: right;
  }

  .mbti {
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

  @media (max-width: 500px) {
    gap: 20px;

    .title,
    .content {
      flex: 1 1 100%;
      text-align: center;
    }
  }
`;
