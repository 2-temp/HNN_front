import React from "react";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import styled from "styled-components";
import Header from "../components/Header"
import Main from "../pages/Main";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Post from "../pages/Post";
import Detail from "../pages/Detail";
import NotFound from "../pages/NotFound";
import MyPage from "../pages/Mypage";

const Router = () => {
  const [isLog, setIsLog] = useState(false)

  // 로그인 토큰 확인
  // useEffect(()=> {
  //   if(localStorage.getItem("token")===null) {
  //     setIsLog(true)
  //   }else {
  //     setIsLog(false)
  //   }
  // })

  // const onLogoutHandler = () => {
  //   localStorage.clear()
  //   navigate("/login")
  // }

  // LoginSection

  return (
    <>
      <Header isLog={isLog} />
      <Layout>
        <Routes>

          <Route path="/" element={<Main/>}/>
          <Route path="/post" element={<Post />}/>
          <Route path="/post/:postId" element={<Detail />}/>
          <Route path="/sign/in" element={<Login />}/>
          <Route path="/sign/up" element={<SignUp />}/>
          <Route path="/mypage" element={<MyPage />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="*" element={<NotFound />}/>

        </Routes>
      </Layout>
    </>
  );
};

export default Router;

const Layout = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  box-sizing: border-box;
`