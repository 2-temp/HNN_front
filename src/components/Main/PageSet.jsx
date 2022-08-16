import styled from "styled-components";

function PageSet(props) {
  const { limit, setLimit, setPage, limitOpt=10 } = props;
  return (
    <MySetPage>
      <ul className="set_page_limit">
        <li onClick={() => {
            setLimit(3);
            setPage(1)
          }} 
          className={limit == 3 ? "active" : ""}
        >
          3개 보기
        </li>
        <li onClick={() => {
            setLimit(limitOpt);
            setPage(1)
          }} 
          className={limit == limitOpt ? "active" : ""}
        >
          {limitOpt}개 보기
        </li>
      </ul>
    </MySetPage>
  );
}

export default PageSet;

const MySetPage = styled.div`
  
  .set_page_limit {
    font-size: 13px;
    display: flex;
    gap: 10px;

    margin: 10px 0;
    font-weight: 700;
    
    li {
      padding-bottom: 3px;
      
      transition: all .2s;
      cursor: pointer;
    }
    
    li.active {
      color: orange;
      border-bottom: 1px solid orange;
    }
  }
`