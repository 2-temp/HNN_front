import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";

import styled from "styled-components";
import { signOutUser } from '../redux/modules/user'

function Header(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userLoggin} = props;

    return (
        <Contents>
            <header>
                <div className="contents_area">
                    <Link to="/">
                        로고
                    </Link>
                    <div className="right">
                        <Link to="/">홈</Link>
                        {userLoggin && (
                        <>
                            <Link to="/mypage">내 게시물</Link>
                            <Link to="/post">글 작성</Link>
                            <div className="btn" onClick={()=>{
                                dispatch(signOutUser())
                            }}>
                                로그아웃
                            </div>
                        </>
                        ) }
                        {!userLoggin && (
                        <>
                            <Link to={"/sign/in"}>로그인</Link>
                            <Link to={"/sign/up"}>회원가입</Link>
                        </>
                        )}
                    </div>
                </div>
            </header>
        </Contents>
    )
}

export default Header;

const Contents = styled.div`

line-height: 60px;

.contents_area {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
}

.right {
    display: flex;
    gap: 40px;
}

.btn {
    cursor: pointer;
}

`