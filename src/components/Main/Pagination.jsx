function Detail(props) {
  const {totalPost, setPage, page, limit} = props
  const pageNum = [];
  const lastPage = Math.ceil(totalPost / limit);

  for(let i = 1; i<=lastPage; i++){
    pageNum.push(i);
  }

  return (
  <>
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
  </>
  )
}

export default Detail;
