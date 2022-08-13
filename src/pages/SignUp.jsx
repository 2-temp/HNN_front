import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [MBTI1, setMBTI1] = useState();
  const [MBTI2, setMBTI2] = useState();
  const [MBTI3, setMBTI3] = useState();
  const [MBTI4, setMBTI4] = useState();

  // 이메일 확인
  const emailCheckButtonClickHandler = async () => {

    // const response = await axios.post(`/sign/checkEmail`, null, {
    //   headers: { 
    //     'Content-Type': 'application/json' 
    //   }
    // })
    const response = RESPONSE.EMAIL_CHECK;
    console.log({email: email.current.value});
    
    if(email.current.value.indexOf('.') > -1){

      if(response.success){
        alert(response.msg);
        setEmailChecked(true);
      } else {
        alert(response.msg);
      }

    } else {
      alert('이메일 형식을 확인해주세요.')
    }
  };
  
  // 닉네임 확인
  const nicknameCheckButtonClickHandler = async () => {
    
    // const response = await axios.post(`/sign/checkEmail`, null, {
    //   headers: { 
    //     'Content-Type': 'application/json' 
    //   }
    // })
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

    // const response = await axios.post(`/sign/up`, null, {
    //   headers: { 
    //     'Content-Type': 'application/json' 
    //   }
    // })

    const response = RESPONSE.SIGNUP;

    if(response.success){
      alert(response.msg)
      navigate("/sign/in")
    } else {
      alert(response.msg)
    }
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
            ✔ 안내문 여기 ex) 몇 자 이상 몇 자 이하 입력해주세요.
          </span>
          <span className={"wrong"}>
            ❌ 닉네임에 특수문자 사용불가 
          </span>
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
          />
          
          <button 
            type="button"
            onClick={(ev) => nicknameCheckButtonClickHandler(ev)}
            className={emailChecked?"enable":""}
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
        className={emailChecked?"sumbit_button all_checked":"sumbit_button"}
        >
          회원가입하기
        </button>
      </form>
    </Contents>
  )
}

export default SignUp;

const Contents = styled.div`
  form {
    display: flex;
    flex-flow: column;
    gap: 10px;
    text-align: center;
  }

  .section_title {
    margin-bottom: 0;
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
    display: flex;
    flex-flow: column;
    gap: 10px;
    
    strong {
      font-size: 20px;
    }
  }

  .input_box {
    display: flex;

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
