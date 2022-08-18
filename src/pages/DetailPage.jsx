import React from "react";
import styled from "styled-components";

import Section1 from "../components/Detail/Section1";
import Section2 from "../components/Detail/Section2";
import Section3 from "../components/Detail/Section3";

const DetailPage = () => {
  return (
    <Wrap>
      <Section1/> {/* 게시물 목록 불러오기, 좋아요, 게시물 수정/삭제  */}

      <div className="detail_body">
        <Section2/> {/* 앨범 커버 사진, 곡 제목, 가수명, 노래 감상평 */}
        <Section3/> {/* 댓글 목록 불러오기, 댓글 작성 */}
      </div>
    </Wrap>
  );
};

export default DetailPage;

const Wrap = styled.div`
  min-height: calc(100vh - 70px);

  button {
    all: unset;
    padding: 5px 10px;
    margin-left: 5px;
    margin-bottom: 8px;
    margin-top: 2px;
    
    border: 1px solid #aaa;
    border-radius: 20px;

    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #222;
      color: #fff;
    border: 1px solid #222;
    }
  }

  .display_unable {
    /* display: none; */
    opacity: 0.3;
    pointer-events: none;
  }

  .created_at {
    font-size: 12px;
    text-align: right;
    padding-right: 10px;
  }

  .detail_body {
    display: flex;
    align-items: flex-start;
  }
`