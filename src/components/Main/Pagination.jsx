import styled from "styled-components";

function Pagination(props) {
  const {totalPost, setPage, page, limit} = props
  const pageNum = [];
  const lastPage = Math.ceil(totalPost / limit);

  for(let i = 1; i<=lastPage; i++){
    pageNum.push(i);
  }

  return (
  <MyPagination>
    <div className="pagination">
        <button
          className={page === 1?'unactive':""}
          onClick={()=>{setPage((page)=>page-1)}}
        >
          ⇦
        </button>
        {pageNum.map((num, i)=>(
          <button
            key={i}
            className={num===page?"active":""}
            onClick={() => {
              setPage(num)
            }}
          >
            {num}
          </button>
        ))}
        <button
          className={page === lastPage?'unactive':""}
          onClick={()=>{setPage((page)=>page+1)}}
        >
          ⇨
        </button>
    </div>
  </MyPagination>
  )
}

export default Pagination;

const MyPagination = styled.div`
  
  .pagination {
    text-align: center;

    button {
      all: unset;
      padding: 5px 5px;
      margin: 0 10px;
      cursor: pointer;
    }

    button.active {
      color: orange;
      border-bottom: 2px solid orange !important;
    }

    button.unactive {
      opacity: .3;
      pointer-events: none;
    }
  }
`