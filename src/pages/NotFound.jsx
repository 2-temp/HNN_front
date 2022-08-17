import { useNavigate } from "react-router-dom";

function NotFound(){
  const navigate = useNavigate();

  alert('페이지를 찾을 수 없습니다.')
  setTimeout(()=>{
    navigate('/')
  }, 1500)

  return(
      <>
        페이지를 찾을 수 없습니다.
        <br />
        잠시 후 메인 페이지로 이동합니다.
      </>
  )
}

export default NotFound;