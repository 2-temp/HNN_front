import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { setCookie, getCookie } from '../cookie'
import RESPONSE from "../RESPONSE";

function Login(props) {
  const navigate = useNavigate();
  
  const { setIsLog } = props;
  const email = useRef("");

  const submitHandler = async (ev) => {
    ev.preventDefault();

    if(email.current.value.indexOf('.') < 0){
      alert('이메일 형식을 확인하세요.')
      return null;
    }
    // console.log();

    // await axios.post(`/sign/in`, null, {
    //     headers: { 
    //         'Content-Type': 'application/json' 
    //     }
    // })
    const response = RESPONSE.LOGIN;

    if (response.success) {
      let token = response.token

      setCookie('token', token);
      console.log(getCookie('token'))
      alert('로그인에 성공하였습니다.')
      setIsLog(true)

      navigate("/")
      
    } else {
      let msg = response.msg
      
      setCookie('token', null);
      alert(response.msg)
      setIsLog(false)
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
          type="text" 
          placeholder="비밀번호를 입력하세요." 
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
