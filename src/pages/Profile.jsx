import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { useRef, useEffect } from "react";
import { getCookie } from '../cookie';
import { updateUserImage, updateUserInfo } from '../redux/modules/user'

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userData = useSelector(state => state.user.info);
  const userId = userData.userId;
  
  const token = getCookie('token');
  
  const fileInput = useRef();
  const [user, setUser] = useState({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
    newNickname: ''
  });
  
  const [MBTI1, setMBTI1] = useState();
  const [MBTI2, setMBTI2] = useState();
  const [MBTI3, setMBTI3] = useState();
  const [MBTI4, setMBTI4] = useState();
  
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [imageEdited, setImageEdited] = useState(false);
  const [imageInputOff, setImageInputOff] = useState(false);

  // 닉네임 확인
  const nicknameCheckButtonClickHandler = async (ev) => {
    ev.preventDefault();
    const nicknameCheck = {nickname: user.newNickname};

    await axios.post('http://gwonyeong.shop/sign/checkNickname', nicknameCheck).then(res => {

      console.log(res.data)
      const {success, msg} = res.data;

      if(success){

        setNicknameChecked(true);
        alert(msg);

      } else {

        alert(msg);

      }
    })
  }

  //프로필 이미지 수정
  const imageEditButtonClickHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userfile', fileInput.current.files[0])

    await axios.patch(`http://gwonyeong.shop/sign/user/profilePic/${userId}`, formData, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(res => {
      const data = res.data;
      const newPicture = data.profilePicture;

      if(data.success){
        alert('프로필 이미지가 수정되었습니다.')

        dispatch(updateUserImage(newPicture))
        setImageInputOff(true)
      } else {
        alert('이미지가 수정되지 않았습니다.')
      }
    }).catch(err => {
        console.log(err)
        navigate('/error')
      }
    )
  }

  //수정된 정보 서버 보내기
  const profileEditHandler = async (ev) => {
    ev.preventDefault();
    
    let submitValue;
    let newSubmitValue = {
      userId: userData.userId, 
      ...user,
    }
    let newMBTI=MBTI1+MBTI2+MBTI3+MBTI4;

    //예외처리
    if(newMBTI.length === 0 || newMBTI === ""){
      submitValue = newSubmitValue
    } else {
      submitValue = {
        ...newSubmitValue, 
        newMBTI: newMBTI
      }
    }

    if (submitValue.newPassword !== submitValue.confirmNewPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    } else if (submitValue.newMBTI.length !== 4 && submitValue.newMBTI.length > 0){
      alert('올바른 MBTI가 아닙니다.');
      return null;
    }
    
    await axios.patch(`http://gwonyeong.shop/sign/user/${userId}`, submitValue ,{
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res)
      const data = res.data;
      if(data.success){
        const newInfo = {
          nickname: res.data.nickname,
          MBTI: res.data.MBTI
        }
        dispatch(updateUserInfo(newInfo));
      }
      alert(`${res.data.nickname}님의 정보가 수정되었습니다.`)
      navigate('/mypage')

    }).catch(err => 

      console.log(err)

    )
  }

  return (
    <Contents>
      <h4>정보 수정하기</h4>
      <p>안녕하세요. {userData.nickname}님</p>
      
      <form
        encType="multipart/form-data"
      >
        <input
          type="file"
          placeholder="새로운 프로필 사진"
          name="userfile"
          minLength={6}
          maxLength={20}
          ref={fileInput}
          className={imageInputOff ? 'enable' : ""}
          onChange={(e) =>{
            setImageEdited(true)
          }}
        />
        <button
          type="button"
          onClick={(ev) => imageEditButtonClickHandler(ev)}
          className={!imageEdited || imageInputOff ? "enable" : ""}
        >
          프로필 이미지 수정
        </button>
      </form>

      <form
        onSubmit={(ev) => {
          profileEditHandler(ev);
        }}
      >
        
        <input
          type="password"
          placeholder="현재 비밀번호"
          required
          minLength={6}
          maxLength={20}
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
        />
        <input
          type="password"
          placeholder="새로운 비밀번호"
          minLength={6}
          maxLength={20}
          onChange={(e) =>
            setUser({
              ...user,
              newPassword: e.target.value,
            })
          }
        />
        <input
          type="password"
          placeholder="새로운 비밀번호 확인"
          minLength={6}
          maxLength={20}
          onChange={(e) =>
            setUser({
              ...user,
              confirmNewPassword: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="새로운 닉네임"
          className={nicknameChecked ? "enable" : ""}
          minLength={2}
          maxLength={20}
          onChange={(e) =>
            setUser({
              ...user,
              newNickname: e.target.value,
            })
          }
        />
        <button
          type="button"
          onClick={(ev) => nicknameCheckButtonClickHandler(ev)}
          className={nicknameChecked ? "enable" : ""}
        >
          닉네임 확인
        </button>
        <div className="my_mbti_box">
          <div>
            <span>MBTI </span>
            <select name="MBTI-1" onChange={(e) => setMBTI1(e.target.value)}>
              <option value="">선택</option>
              <option value="I">I</option>
              <option value="E">E</option>
            </select>
            <select name="MBTI-2" onChange={(e) => setMBTI2(e.target.value)}>
              <option value="">선택</option>
              <option value="S">S</option>
              <option value="N">N</option>
            </select>
            <select name="MBTI-3" onChange={(e) => setMBTI3(e.target.value)}>
              <option value="">선택</option>
              <option value="T">T</option>
              <option value="F">F</option>
            </select>
            <select name="MBTI-4" onChange={(e) => setMBTI4(e.target.value)}>
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
          <button className={"sumbit_button all_checked"}>수정하기</button>
        </div>
      </form>
    </Contents>
  );
}

const Contents = styled.div`
margin-top: 10vh;

padding: 0 20px;
box-sizing: border-box;

text-align: center;

  h4 {
    font-size: 22px;
  }

  form {
  max-width: 600px;
  margin: 15px auto;

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