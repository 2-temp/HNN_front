import styled from "styled-components";

function Comment (props) {
  const { list } = props;
  
  
  const writeByThisUser = true;

  return (
    <MyArticle>
      <div className="comment_head">
        <div className="left_box">
          <div className="profilePicture">
            {list.MBTI}
          </div>
          <span className="nickname">
            {list.nickname}
          </span>
        </div>
        <div className="right_box">
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
      <p className="content">
        {list.content} 
      </p>
      <p className="commentTime">{list.createdAt}</p>

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