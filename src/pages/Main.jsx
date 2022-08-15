import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Article from "../components/Main/Article";
import Pagination from "../components/Main/Pagination";
import RESPONSE from '../RESPONSE'
import Detail from "./Detail";

function Main() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      // const data = await axios.get('/posts')
      const data = RESPONSE.POSTS;
      setPosts(data);
      setLoading(false);
    };
    fetchData();
  })

  const indexLast = page * limit; // 1 * 10 / 2 * 10
  const indexFirst = indexLast - limit; // 10 - 10 / 20 - 10
  const current = (posts) => {
    let current = 0;
    current = posts.slice(indexFirst, indexLast);
    return current;
  }  

  return (
    <MainPost>
      <h4>전체 글 목록</h4>

      <ul className="set_page_limit">
        <li 
          onClick={()=>setLimit(3)}
          className={limit==3?"active":""}
        >
            3개 보기
        </li>
        <li 
          onClick={()=>setLimit(10)}
          className={limit==10?"active":""}
        >
            10개 보기
        </li>
      </ul>
      
      <div className="posts_box">
        {!loading && current(posts).map((list, i) => {
          return <Article list={list} key={i} /> 
        })}
      </div>

      <Pagination 
        totalPost = {posts.length}
        limit = {limit}
        page = {page}
        setPage = {setPage}
      />

    </MainPost>
  )

}
export default Main;


const MainPost = styled.div`
  .posts_box {
    min-height: calc(100vh - 200px);
  }

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
      border-bottom: 2px solid orange;
    }

    button.unactive {
      opacity: .3;
      pointer-events: none;
    }
  }
`