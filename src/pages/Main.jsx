import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Article from "../components/Main/Article";
import Pagination from "../components/Main/Pagination";
import PageSet from "../components/Main/PageSet";
import RESPONSE from '../RESPONSE'

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
    let current = posts.slice(indexFirst, indexLast);
    return current;
  }  

  return (
    <MainPost>
      <h4>전체 글 목록</h4>

      <PageSet
        limit = {limit} 
        setLimit = {setLimit} 
        setPage = {setPage} 
        setLoading = {setLoading} 
      />
      
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
    min-height: calc(100vh - 250px);
    display: flex;
    flex-direction: column;
  }
`