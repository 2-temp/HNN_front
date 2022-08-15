import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import styled from "styled-components";

import RESPONSE from "../RESPONSE";
import { signInUser, signOutUser } from '../redux/modules/user'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    email: "",
    pw: ""
  });
  const email = useRef("");
  const pw = useRef("");

  const submitHandler = async (ev) => {
    ev.preventDefault();

    if(email.current.value.indexOf('.') < 0){
      alert('이메일 형식을 확인하세요.')
      return null;
    }

    console.log({email: email.current.value, password: pw.current.value});

    // await axios.post(`/sign/in`, null, {
    //     headers: { 
    //         'Content-Type': 'application/json' 
    //     }
    // })
    const response = RESPONSE.LOGIN;
    const userData = RESPONSE.USER_PROFILE;

    if (response.success) {
      let token = response.token;
      let info = userData;

      alert('로그인에 성공하였습니다.')
      
      dispatch(signInUser({
        'token': token, 
        "info": info
      }));
      navigate("/")
      
    } else {
      let msg = response.msg
    
      alert(msg)
      dispatch(signOutUser())
    }
  };

  return (
    <Contents>
      <form onSubmit={(ev) => submitHandler(ev)}>
        <h3>로그인</h3>

        <input 
          type="email"
          placeholder="이메일을 입력하세요." 
          ref={email} 
          required
          maxLength={20}
        />

        <input 
          type="password" 
          placeholder="비밀번호를 입력하세요." 
          ref={pw} 
          required
        />

        <button>로그인하기</button>
      </form>
    </Contents>
  );
}

export default Login;

const Contents = styled.div`
  form {
    display: flex;
    flex-flow: column;
    gap: 10px;
    text-align: center;
  }
`;
