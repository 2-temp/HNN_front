import styled from "styled-components";

function PageSet(props) {
  const { limit, setLimit } = props;
  return (
    <MySetPage>
      <ul className="set_page_limit">
        <li onClick={() => setLimit(3)} className={limit == 3 ? "active" : ""}>
          3개 보기
        </li>
        <li onClick={() => setLimit(10)} className={limit == 10 ? "active" : ""}>
          10개 보기
        </li>
      </ul>
    </MySetPage>
  );
}

export default PageSet;

const MySetPage = styled.div`
  
  .set_page_limit {
    font-size: 10px;
    display: flex;
    gap: 10px;
    margin: 10px 0;
    
    li {
      cursor: pointer;
    }
    li.active {
      color: orange;
    }
  }
`