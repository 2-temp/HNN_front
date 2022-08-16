import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import RESPONSE from "../RESPONSE";
import { useNavigate } from "react-router-dom";
import data from "../RESPONSE";
import { useParams } from "react-router-dom";
import { useRef } from "react";

function Profile() {

  const password = useRef("");
  const newPassword = useRef("");
  const confirmNewPassword = useRef("");
  const newNickname = useRef("");
  const newProfilePicture = useRef("");

  const navigate = useNavigate();
  const { userId } = useParams();
  const userList = data.USER_PROFILE[userId]

  const emails = data.USER_PROFILE[userId].email

  const [MBTI1, setMBTI1] = useState();
  const [MBTI2, setMBTI2] = useState();
  const [MBTI3, setMBTI3] = useState();
  const [MBTI4, setMBTI4] = useState();
  
  const [nicknameChecked, setNicknameChecked] = useState(false);

  //이전 방식 안됌
  // const [newProfile, setNewProfile] = useState({
  //   password: '',
  //   newPassword: '',
  //   confirmNewPassword: '',
  //   newNickname: userList.nickname,
  //   newMBTI:MBTI1,MBTI2,MBTI3,MBTI4, 
  //   newProfilePicture: '',
  // });

  // const { password, newPassword, confirmNewPassword, newNickname, newProfilePicture } = newProfile;



//닉네임 확인
const nicknameCheckHandler = async () => {

  // const response = await axios.post(`/sign/checkNickname`, null, {
  //   headers: { 
  //     'Content-Type': 'application/json' 
  //   }
  // })
  const response = RESPONSE.NICKNAME_CHECK;
  
  if(response.success){
    alert(response.msg);
    setNicknameChecked(true);
  } else {
    alert(response.msg);
  }
}

  //수정된 정보 서버 보내기
  const profileEditHandler = async (ev) => {
    ev.preventDefault();
    const submitValue = {
      password: password.current.value,
      newPassword: newPassword.current.value,
      confirmNewPassword: confirmNewPassword.current.value,
      newNickname: newNickname.current.value,
      newProfilePicture: newProfilePicture.current.value,
      MBTI: MBTI1 + MBTI2 + MBTI3 + MBTI4,
    }

    if (submitValue.newPassword !== submitValue.confirmNewPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // const response =  await axios.PATCH("/PATCH", null, {
    //   headers: {
    //     'Content-Type': 'application/json'
    //     }
    // });

    console.log(submitValue);

    const response = RESPONSE.PROFILE_CHECK
    console.log(response)
    if (response.success) {
      alert(response.msg)
      navigate('/mypage')
    } else {
      alert(response.msg)
    }
  }

  return (
    <Contents>
          <form onSubmit={(ev) => { profileEditHandler(ev) }}>
            <h4>제목</h4>
            <input
              className='enable'
            value={emails} />
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
              minLength={6}
              maxLength={20}
            />
            <button 
            type="button"
            onClick={(ev) => nicknameCheckHandler(ev)}
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
    
    input, button {
      font-size: 18px;
      padding: 6px 26px;
      box-sizing: border-box;
      border-radius: 20px;

      border: none;
      box-shadow: 2px 2px 5px #ddd;

      transition: all .2s;
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