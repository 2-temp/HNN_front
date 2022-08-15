import styled from "styled-components";

function Article3 (props) {
  const { list } = props;
  
  return (
    <MyArticle>
      <span className="profilePicture">{list.profilePicture }</span> {/* 스타일 컴포넌트 추가해야 함 */}
      <span className="nickname">{list.nickname}</span>
      <span className="mbti">{list.MBTI}</span>
      
      {/* 댓글 길이가 17자 이상이면 중략해서 보여주기  */}
      {/* <span className="content">
        {list.content.length>17?list.content.slice(0, 17)+"...":list.content} 
       </span> */}

      <span className="content">
        {list.content} 
      </span>

      <span className="commentTime">{list.createdAt}</span>

      <button>댓글 수정</button> {/* 댓글을 작성한 본인일 경우 */}
      <button>댓글 삭제</button> {/* 댓글을 작성한 본인일 경우 */}
    </MyArticle>
  );
}

export default Article3;

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

  .mbti {
    font-size: 2em;
    margin-top: -3px;
  }

  .nickname {
    font-weight: 800;
    color: #555;
  }

  .commentTime {
    font-weight: 800;
    color: #555;
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