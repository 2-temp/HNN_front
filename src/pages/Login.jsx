import RESPONSE from "../RESPONSE";
import styled from "styled-components";
import { setCookie, getCookie } from '../cookie'
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const { setIsLog } = props;

  const submitHandler = async (ev) => {
    ev.preventDefault();
    // const response = await axios.get('https://try-eat.herokuapp.com/posts');
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
      alert(msg)
      setIsLog(false)
  
    }

  };

  return (
    <Contents>
      <br />
      <form onSubmit={(ev) => submitHandler(ev)}>
        Login
        <input type="text" placeholder="아이디" />
        <input type="text" placeholder="비밀번호" />
        <button>로그인</button>
      </form>
    </Contents>
  );
}

export default Login;

const Contents = styled.div`
  form {
    display: flex;
    flex-flow: column;
    gap: 20px;
    text-align: center;
  }
`;
