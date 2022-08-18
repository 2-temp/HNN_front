import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCookie } from '../cookie';

import Article from "../components/Main/Article";
import Pagination from "../components/Main/Pagination";
import PageSet from "../components/Main/PageSet";

function Main(props) {
  const navigate = useNavigate();
  const { userLoggin } = props

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); 
  const [limit, setLimit] = useState(10);


  useEffect(() => {
    setLoading(true)

    const fetchAxiosData = async () => {
      try {
        const axiosData = await axios.get('http://gwonyeong.shop/post')
        
        console.log(axiosData.data);

        const result = axiosData.data.data;
        setPosts(result.reverse())
        setLoading(false);

      } catch (err) {

        console.log(err);
        navigate('/error')
        
      }
    };
    fetchAxiosData();

    const token = getCookie('token');
    
    // post요청
    // const postAxiosData = async () => {
    //   await axios.post('http://gwonyeong.shop/post', "요청할 값", {
    //     headers: {
    //       authorization: `Bearer ${token}`
    //     }
    //   }).then(res => {
    //     console.log(res)
    //     console.log(res.data)
    //   })
    // };
    // postAxiosData();
  }, [])

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
          return <Article 
            list={list} 
            key={i}
            userLoggin={userLoggin} 
          /> 
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