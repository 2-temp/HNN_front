const data={
    LOGIN: {
        success: true,
        token: "testCookieString",
        // success: false,
        // msg: "회원 정보가 일치하지 않습니다."
    },
    LOGOUT: {
        success: true
    },
    POSTS: [
        {
            title: "게시글 제목1",
            content: "게시글 내용1",
            nickname: "닉네임1",
            profilePicture: "프로필사진URL",
            MBTI: "MBTI",
            createdAt: "2022-08-10, 21:00",
            like: 1111,
            countComments: 1111
        },
        {
            title: "게시글 제목2",
            content: "게시글 내용2",
            nickname: "닉네임2",
            profilePicture: "프로필사진URL",
            MBTI: "MBTI",
            createdAt: "2022-08-11, 21:00",
            like: 2222,
            countComments: 2222
        },
        {
            title: "게시글 제목3",
            content: "게시글 내용3",
            nickname: "닉네임3",
            profilePicture: "프로필사진URL",
            MBTI: "MBTI",
            createdAt: "2022-08-12, 21:00",
            like: 3333,
            countComments: 3333
        }
    ],
    DETAIL: {
        title: "게시글 제목3",
        content: "게시글 내용3",
        nickname: "닉네임3",
        profilePicture: "프로필사진URL",
        MBTI: "MBTI",
        createdAt: "2022-08-12, 21:00",
        like: 3333,
        countComments: 3333
    }
}

export default data