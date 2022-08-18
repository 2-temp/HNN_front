import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

import styled from "styled-components";
import { signOutUser } from '../redux/modules/user'

import { MdHomeFilled, MdLogin, MdLogout, MdCreate } from "react-icons/md";

function Header(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userLoggin} = props;

    return (
        <Contents>
            <header>
                <div className="contents_area">
                    <Link to="/">
                        <span className="show_at_md">
                            흐느넴
                        </span>
                        <span className="hide_at_md">
                            흔들리는 음악 속에서 너의 MBTI가 느껴진 거야
                        </span>
                    </Link>
                    <div className="right">
                        <Link to="/">
                            <span className="show_at_md">
                                <MdHomeFilled />
                            </span>
                            <span className="hide_at_md">
                                홈
                            </span>
                        </Link>
                        
                        {userLoggin && (
                        <>
                            <Link to="/mypage">
                                내 게시물
                                <div className="show_at_md"></div>
                                <div className="hide_at_md"></div>
                            </Link>
                            <Link to="/post">
                                <div className="show_at_md">
                                    <MdCreate />
                                </div>
                                <div className="hide_at_md">
                                    글 작성
                                </div>
                            </Link>
                            <div className="btn" onClick={()=>{
                                dispatch(signOutUser())
                                navigate('/')
                            }}>
                                <span className="show_at_md">
                                    <MdLogout />
                                </span>
                                <span className="hide_at_md">
                                    로그아웃
                                </span>
                            </div>
                        </>
                        ) }
                        {!userLoggin && (
                        <>
                            <Link to={"/sign/in"}>
                                <span className="show_at_md">
                                    <MdLogin />
                                </span>
                                <span className="hide_at_md">
                                    로그인
                                </span>
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

box-shadow: 2px 0 10px 0 #ddd;
background-color: #fff;

position: sticky;
top: 0;
z-index: 999;


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
    display: none;
}
@media screen and (max-width: 760px) {
    body {
        background-color: red;
    }
    .show_at_md {
        display: block !important;
    }
    .hide_at_md {
        display: none !important;
    }
    .right {
        gap: 20px;
    }
}

`