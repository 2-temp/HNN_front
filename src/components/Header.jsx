import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import axios from "axios";

import styled from "styled-components";
import { signOutUser } from '../redux/modules/user'

import { MdHomeFilled } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { MdLogout } from "react-icons/md";

function Header(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userLoggin} = props;

    return (
        <Contents>
            <header>
                <div className="contents_area">
                    <Link to="/">
                        흔들리는 음악 속에서 너의 MBTI가 느껴진거야
                    </Link>
                    <div className="right">
                        <Link to="/">
                            <span className="show_at_md">
                                <MdHomeFilled />
                            </span>
                            홈
                        </Link>
                        
                        {userLoggin && (
                        <>
                            <Link to="/mypage">내 게시물</Link>
                            <Link to="/post">글 작성</Link>
                            <div className="btn" onClick={()=>{
                                dispatch(signOutUser())
                                navigate('/')
                            }}>
                                <span className="show_at_md">
                                    <MdLogout />
                                </span>
                                로그아웃
                            </div>
                        </>
                        ) }
                        {!userLoggin && (
                        <>
                            <Link to={"/sign/in"}>
                                <span className="show_at_md">
                                    <MdLogin />
                                </span>
                                로그인
                            </Link>
                            <Link to={"/sign/up"}>
                                회원가입
                            </Link>
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
position: sticky;
top: 0;

box-shadow: 2px 0 10px 0 #ddd;

.contents_area {
    width: 100%;
    max-width: 1024px;
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

.show_at_md {
    display: none !important;
}

@media (max-width: 760px) {
    .show_at_md {
        display: block !important;
    }
    .show_at_md {
        display: none !important;
    }
}

`