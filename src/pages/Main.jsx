import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Article from "../components/Main/Article";
import Pagination from "../components/Main/Pagination";
import RESPONSE from '../RESPONSE'

function Main() {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  // let data = RESPONSE.POSTS;
  // setPosts(data)

  // "https://jsonplaceholder.typicode.com/posts"
  
  
  useEffect(() => {
    let data = RESPONSE.POSTS;
    // let data = axios.get('/posts')
    setPosts(data);
  })

  return (
    <MainPost>
      <h3>전체 글 목록</h3>
      <div className="posts_box">
        { posts.map((list, i) => {
          return <Article list={list} key={i} />
        }) }
      </div>

      <Pagination />

    </MainPost>
  )

}
export default Main;


const MainPost = styled.div`
  .posts_box {
    min-height: calc(100vh - 130px);
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
      border-bottom: 2px solid #222;
    }
  }
`