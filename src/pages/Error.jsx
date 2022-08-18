import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Error(){
  const navigate = useNavigate();

  alert('에러가 발생했습니다.')
  setTimeout(()=>{
    navigate('/')
  }, 100)

  return(
      <Content>
        <strong>
          에러가 발생했습니다.
        </strong>
        <br />
        <br />
        잠시 후 메인 페이지로 이동합니다.
      </Content>
  )
}

export default Error;

const Content = styled.div`
  text-align: center;
  margin-top: 20vh;
`