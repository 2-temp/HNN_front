import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import RESPONSE from "../RESPONSE";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useEffect } from "react";
import { getCookie } from '../cookie';

function Profile() {
    //쿠키 가져옴
    const token = getCookie('token');
  const password = useRef("");
  const newPassword = useRef("");
  const confirmNewPassword = useRef("");
  const newNickname = useRef("");
  const newProfilePicture = useRef("");

  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);
  
  //MBTI 받아오기
  const [MBTI1, setMBTI1] = useState();
  const [MBTI2, setMBTI2] = useState();
  const [MBTI3, setMBTI3] = useState();
  const [MBTI4, setMBTI4] = useState();
  
  //닉네임 체크 
  const [nicknameChecked, setNicknameChecked] = useState(false);

  // 닉네임 확인
  const nicknameCheckButtonClickHandler = async () => {
    const nicknameCheck = {nickname: newNickname.current.value};
    console.log(nicknameCheck);
    await axios.post('http://gwonyeong.shop/sign/checkNickname', nicknameCheck).then(res => {
      console.log(res.data)
      const {success, msg} = res.data;
      if(success){
        setNicknameChecked(true);
      } else {
        alert(msg);
      }
    })
  }

  // get요청 받아서 출력


 //내 정보 불러오기
 
  // const fetchAxiosData = async () => {
  //   try {
  //     const axiosData = await axios.get(`http://gwonyeong.shop/post/${postId}`)
      
  //     // console.log(axiosData.data);

  //     const result = axiosData.data.data;
  //     setPost(result);
  //     console.log(post)

  //   } catch (err) {

  //     console.log(err);
  //     navigate('/error')
      
  //   }
  // };
  // fetchAxiosData();


  
  //수정된 정보 서버 보내기
  
  const profileEditHandler = async (ev) => {
    ev.preventDefault();
    const submitValue = {
      password: password.current.value,
      newPassword: newPassword.current.value,
      confirmNewPassword: confirmNewPassword.current.value,
      newNickname: newNickname.current.value,
      newProfilePicture: newProfilePicture.current.value,
      newMBTI: MBTI1 + MBTI2 + MBTI3 + MBTI4,
      userId :userId
    }
    console.log(submitValue)

    // if (submitValue.newPassword !== submitValue.confirmNewPassword) {
    //   alert('비밀번호가 일치하지 않습니다.');
    //   return;
    // }
    await axios.patch(`http://gwonyeong.shop/sign/user/${userId}`, submitValue ,{
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res)
      console.log(res.data)
    })


  //   const response = RESPONSE.PROFILE_CHECK
  //   console.log(response)
  //   if (response.success) {
  //     alert(response.msg)
  //     navigate('/mypage')
  //   } else {
  //     alert(response.msg)
  //   }
  }

  return (
    <Contents>
          <form onSubmit={(ev) => { profileEditHandler(ev) }}>
            <h4>제목</h4>
            {/* <input
              className='enable' /> */}
            <input
              type="password"
              placeholder="현재 비밀번호"
              ref={password}
              required
              minLength={6}
              maxLength={20}
            />
            <input
              type="password"
              placeholder="새로운 비밀번호"
              ref={newPassword}
              required
              minLength={6}
              maxLength={20}
            />
            <input
              type="password"
              placeholder="새로운 비밀번호 확인"
              ref={confirmNewPassword}
              required
              minLength={6}
              maxLength={20}
            />
            <input
              type="text"
              placeholder="새로운 닉네임"
              className={nicknameChecked?"enable":""}
              ref={newNickname}
              required
              minLength={2}
              maxLength={20}
            />
            <button 
              type="button"
              onClick={(ev) => nicknameCheckButtonClickHandler(ev)}
              className={nicknameChecked?"enable":""}
              >
                닉네임 확인
            </button>
            <input
              type="text"
              placeholder="새로운 프로필 사진"
              ref={newProfilePicture}
              required
              minLength={6}
              maxLength={20}
            />
            <div className="my_mbti_box">
              <div>
                <span>MBTI </span>
                <select name="MBTI-1" required
                  onChange={(e) => setMBTI1(e.target.value)}>
                  <option value="">선택</option>
                  <option value="I">I</option>
                  <option value="E">E</option>
                </select>
                <select name="MBTI-2" required
                  onChange={(e) => setMBTI2(e.target.value)}>
                  <option value="">선택</option>
                  <option value="S">S</option>
                  <option value="N">N</option>
                </select>
                <select name="MBTI-3" required
                  onChange={(e) => setMBTI3(e.target.value)}>
                  <option value="">선택</option>
                  <option value="T">T</option>
                  <option value="F">F</option>
                </select>
                <select name="MBTI-4" required
                  onChange={(e) => setMBTI4(e.target.value)}>
                  <option value="">선택</option>
                  <option value="J">J</option>
                  <option value="P">P</option>
                </select>
              </div>
              <div>
                <strong>{MBTI1}</strong>
                <strong>{MBTI2}</strong>
                <strong>{MBTI3}</strong>
                <strong>{MBTI4}</strong>
              </div>
              <button 
        className={nicknameChecked?"sumbit_button all_checked":"sumbit_button"}
        >수정하기
          </button>
            </div>
          </form>
    </Contents>
  )
}

const Contents = styled.div`
margin-top: 10vh;

padding: 0 20px;
box-sizing: border-box;

  form {
  max-width: 600px;
  margin: 0 auto;

  display: flex;
  flex-flow: column;
  gap: 16px;

  text-align: center;

  h3 {
    font-size: 28px;
  }
    
  input, button, select {
    font-size: 16px;
    padding: 6px 26px;
    box-sizing: border-box;
    border-radius: 20px;

    border: none;
    box-shadow: 0px 0px 5px #ddd, 3px 2px 2px #aaa;
    border: 1px solid #eee;

    transition: all .2s;
  }

  button {
    font-size: 14px;
  }

  button:hover {
    background-color: #ccc;
    cursor: pointer;
  }
  
  select {
    text-align: center;
    padding: 6px 5px;
    margin: 10px 2px 0;
  }
 
  .my_mbti_box {
    min-height: 100px;

    display: flex;
    flex-flow: column;
    gap: 10px;
    
    strong {
      font-size: 30px;
    }
  }

  .sumbit_button,
  .enable {
    pointer-events: none;
    opacity: 0.5;
  }

  .sumbit_button.all_checked {
    pointer-events: all;
    opacity: 1;
  }
  }
`

export default Profile;