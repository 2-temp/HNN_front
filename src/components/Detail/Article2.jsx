// import styled from "styled-components";

// function Article2 (props) {
//   const { list } = props;
  
//   return (
//     <MyArticle> 
//       <span className="albumCover"> {list.imageUrl} </span> 
//       <span className="songInfo"> {list.info} </span>
//       <span className="content"> {list.content} </span>
//     </MyArticle>
//   );
// }

// export default Article2;

// const MyArticle = styled.div`
//   padding: 10px 20px;
//   margin-bottom: 10px;
//   border: 1px solid #222;

//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   flex-wrap: wrap;
//   gap: 40px;

//   cursor: pointer;
//   transition: all 0.2s;

//   &:hover {
//       background-color: #eee;
//   }

//   .songInfo {
//     font-size: 2em;
//     margin-top: -3px;
//   }

//   .content {
//     font-size: 14px;
//   }

//   span {
//     display: inline-block;
//   }

//   .border {
//     width: 1px;
//     position: relative;
//   }

//   b {
//     color: #e16720;
//   }

//   @media (max-width: 500px) {
//     gap: 20px;

//     .title,
//     .content {
//       flex: 1 1 100%;
//       text-align: center;
//     }
//   }
// `;