import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import axios from "axios";

import styled from "styled-components";
import { signInUser, signOutUser } from '../redux/modules/user'

import RESPONSE from "../RESPONSE";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const submitHandler = async (ev) => {
    ev.preventDefault();
    try {
      if(user.email.indexOf('.') < 0){
        alert('이메일 형식을 확인하세요.')
      return null;
    }

    await axios.post('http://gwonyeong.shop/sign/in', user).then(response => {
      let data = response.data;

      if(data.success){
        let token = data.token;
        let info = {
          userId: data.userId,
          nickname: data.nickname,
          MBTI: data.MBTI,
          profilePicture: data.profilePicture?data.profilePicture:"img/defaultProfile.png",
        }

        alert('로그인에 성공하였습니다.')
        
        dispatch(signInUser({
          'token': token, 
          "info": info
        }));
        navigate("/")
        
      } else {
        let msg = response.msg
      
        if(msg === undefined){
          alert('로그인에 실패하였습니다.')
        }
        alert(msg)
        // dispatch(signOutUser())
      }
    });
    } catch (err) {
      console.log(err);
      navigate('/error')
    }
   
  

  // 예시 코드
  // const fetchAxiosData = async () => {
  //   await axios.post('http://gwonyeong.shop/sign/in', {
  //     email: 'minsun@gmail.com', 
  //     password: 'Asd2222!'
  //   }).then(response => {
  //     if(response.data.success){
  //       console.log('로그인 성공')
  //       console.log(response);
  //       console.log(response.cookie);
  //     } else {
  //       console.log(response.data.msg)
  //     }
  //   })
  // };
  // fetchAxiosData();
  }

  return (
    <Contents>
      <form onSubmit={(ev) => submitHandler(ev)}>
        <h3>로그인</h3>

        <input 
          type="email"
          placeholder="이메일을 입력하세요." 
          required
          maxLength={20}
          onChange={(ev)=> {
            setUser({...user, email: ev.target.value})
          }}
        />

        <input 
          type="password" 
          placeholder="비밀번호를 입력하세요."
          required
          onChange={(ev)=> {
            setUser({...user, password: ev.target.value})
          }}
        />

        <button>로그인하기</button>
      </form>
    </Contents>
  );
}

export default Login;

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
    
    button:hover {
      background-color: #ccc;
      cursor: pointer;
    }
  }
`;
