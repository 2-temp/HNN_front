import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import RESPONSE from "../RESPONSE";

function SignUp(){
  const navigate = useNavigate();
  
  const [instWrong, setInstWrong] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [pwChecked, setPwChecked] = useState(false);
  const [eventOff, setEventOff] = useState(false);

  const [MBTI1, setMBTI1] = useState();
  const [MBTI2, setMBTI2] = useState();
  const [MBTI3, setMBTI3] = useState();
  const [MBTI4, setMBTI4] = useState();

  const emailCheckButtonClickHandler = async (ev) => {
    ev.preventDefault();

    // const response = await axios.get('https://try-eat.herokuapp.com/posts');
    const response = RESPONSE.EMAIL_CHECK;
    console.log(response);
    
    if(response.success){
      setEmailChecked(true);
    }
  };
  
  const passwordCheckButtonClickHandler = async (ev) => {
    ev.preventDefault();

    // const response = await axios.get('https://try-eat.herokuapp.com/posts');
    const response = RESPONSE.PASSWORD_CHECK;
    console.log(response);

    if(response.success){
      setPwChecked(true);
    }
  };
  
  const signUpSubmitHandler = async (ev) => {
    ev.preventDefault();

    // const response = await axios.get('https://try-eat.herokuapp.com/posts');
    const response = RESPONSE.SIGNUP;
    console.log(response);
  };

  return(
    <Contents>
      <br />
      <form>
        <h3 className="section_title">회원가입</h3>
        <div className="instruction_box">
          <span className={instWrong?"wrong":""}>
            ✔ 안내문 여기
          </span>
          <span className={instWrong?"wrong":""}>
            ❌ 안내문 여기
          </span>
        </div>

        <input type="email" placeholder="이메일" />
        <button type="button"
        onClick={(ev) => emailCheckButtonClickHandler(ev)}
        >
          이메일 확인
        </button>
        <input type="password" placeholder="비밀번호" />
        <input type="conformPassword" placeholder="비밀번호 확인" />
        <button type="button"
        onClick={(ev) => passwordCheckButtonClickHandler(ev)}
        >
          비밀번호 확인
        </button>
        <input type="text" placeholder="닉네임" />

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
        type="button"
        className={eventOff?"sumbit_button all_checked":"sumbit_button"}
        onClick={(ev) => signUpSubmitHandler(ev)}
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

  .sumbit_button {
    pointer-events: none;
    opacity: 0.5;
  }
  
  .sumbit_button.all_checked {
    pointer-events: all;
    opacity: 1;
  }

`;
