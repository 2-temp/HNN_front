import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";

import RESPONSE from "../RESPONSE";

function SignUp(){
  const navigate = useNavigate();
  
  const email = useRef("");
  const nickname = useRef("");
  const password = useRef("");
  const confirmPw = useRef("");

  const [instWrong, setInstWrong] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);

  const [MBTI1, setMBTI1] = useState();
  const [MBTI2, setMBTI2] = useState();
  const [MBTI3, setMBTI3] = useState();
  const [MBTI4, setMBTI4] = useState();

  // 이메일 확인
  const emailCheckButtonClickHandler = async () => {
      const emailCheck = {email: email.current.value};
      await axios.post('http://gwonyeong.shop/sign/checkEmail', emailCheck).then(res => {
        console.log(res)
        console.log(res.data)

        const {success, msg} = res.data;
        if(success){
          setEmailChecked(true);
        } else {
          alert(msg);
        }
        console.log(emailCheck);

      })
    // const response = RESPONSE.EMAIL_CHECK;
    // console.log({email: email.current.value});
    
    // if(email.current.value.indexOf('.') > -1){

    //   if(response.success){
    //     alert(response.msg);
    //     setEmailChecked(true);
    //   } else {
    //     alert(response.msg);
    //   }

    // } else {
    //   alert('이메일 형식을 확인해주세요.')
    // }
  };
  
  // 닉네임 확인
  const nicknameCheckButtonClickHandler = async () => {
    const nicknameCheck = {nickname: nickname.current.value};
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
  
  // 회원가입
  const signUpSubmitHandler = async (ev) => {
    ev.preventDefault();

    const submitValue = {
      email : email.current.value,
      nickname: nickname.current.value,
      password: password.current.value,
      confirmPw: confirmPw.current.value,
      MBTI: MBTI1+MBTI2+MBTI3+MBTI4,
    }
    console.log(submitValue);

    if(submitValue.password != submitValue.confirmPw){
      alert('비밀번호가 일치하지 않습니다.');
      return null;
    }

    await axios.post('http://gwonyeong.shop/sign/up', submitValue).then(res => {
      const {success, msg} = res.data;

      if(success){
        alert("회원 가입이 완료되었습니다.")
        navigate("/sign/in")
      } else {
        alert(msg);
      }

    })
  };

  return(
    <Contents>
      <br />
      <form 
        onSubmit={(ev) => signUpSubmitHandler(ev)}
      >
        <h3 className="section_title">회원가입</h3>
        <div className="instruction_box">
          <span className={instWrong?"wrong":""}>
            {instWrong?"❌":"✔"} 비밀번호는 특수문자 포함 6자 이상, 20자 미만 
          </span>
          <span className={instWrong?"wrong":""}>
            {instWrong?"❌":"✔"} 닉네임은 특수문자 없이 2자 이상, 20자 미만 
          </span>
          {/* <span className={"wrong"}>
            {instWrong?"❌":"✔"} 닉네임은 특수문자 없이 
          </span> */}
        </div>

        <div className="input_box">
          <input 
            type="email" 
            placeholder="이메일" 
            ref={email} 
            className={emailChecked?"enable":""}
            required
            maxLength={30}
            />

          <button 
          type="button"
          onClick={(ev) => emailCheckButtonClickHandler(ev)}
          className={emailChecked?"enable":""}
          >
            이메일 확인
          </button>
        </div>

        <input 
          type="password" 
          placeholder="비밀번호" 
          ref={password} 
          required
          minLength={6}
          maxLength={20}
          />

        <input 
          type="password" 
          placeholder="비밀번호 확인" 
          ref={confirmPw} 
          required
          minLength={6}
          maxLength={20}
          />
        
        <div className="input_box">
          <input 
            type="text" 
            placeholder="닉네임" 
            ref={nickname} 
            required
            minLength={2}
            maxLength={20}
            className={nicknameChecked?"enable":""}
          />
          <button 
            type="button"
            onClick={(ev) => nicknameCheckButtonClickHandler(ev)}
            className={nicknameChecked?"enable":""}
            >
              닉네임 확인
          </button>

        </div>

        <div className="my_mbti_box">
          <div>
            <span>MBTI </span>
            <select name="MBTI-1" required
            onChange={(e)=> setMBTI1(e.target.value)}>
              <option value="">선택</option>
              <option value="I">I</option>
              <option value="E">E</option>
            </select>
            <select name="MBTI-2" required
            onChange={(e)=> setMBTI2(e.target.value)}>
              <option value="">선택</option>
              <option value="S">S</option>
              <option value="N">N</option>
            </select>
            <select name="MBTI-3" required
            onChange={(e)=> setMBTI3(e.target.value)}>
              <option value="">선택</option>
              <option value="T">T</option>
              <option value="F">F</option>
            </select>
            <select name="MBTI-4" required
            onChange={(e)=> setMBTI4(e.target.value)}>
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
        </div>
        <button 
        className={(nicknameChecked && emailChecked)?"sumbit_button all_checked":"sumbit_button"}
        >
          회원가입하기
        </button>
      </form>
    </Contents>
  )
}

export default SignUp;

const Contents = styled.div`
  margin-top: 10vh;

  padding: 0 20px;
  box-sizing: border-box;

  form {
    max-width: 600px;
    margin: 0 auto;

    display: flex;
    flex-flow: column;
    gap: 10px;

    text-align: center;
  }

  .section_title {
    margin-bottom: 0;
  }

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

  .instruction_box {
    display: flex;
    flex-flow: column;
    gap: 5px;
    font-size: 10px;
    color: green;

    .wrong {
      color: red;
    }
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

  .input_box {
    display: flex;
    gap: 10px;
    max-height: 35px;

    input {
      flex:  1 1 auto;
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

`;
