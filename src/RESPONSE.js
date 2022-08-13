const data={
    LOGIN: {
        success: true,
        token: "testCookieString"
    },
    LOGIN_FAIL: {
        success: false,
        msg: "회원 정보가 일치하지 않습니다."
    },
    LOGOUT: {
        success: true
    },
    SIGNIN: {
        msg : "회원가입을 축하드립니다!",
        success: true
    },
    EMAIL_CHECK: {
        msg : "사용할 수 있는 닉네임입니다.",
        success: true
    },
    PASSWORD_CHECK: {
        msg : "사용할 수 있는 이메일입니다.",
        success: true
    },
    USER_PROFILE: [
        {
            userId: 0,
            email: "test@email.com",
            nickname: "닉네임0",
            MBTI: "MBTI",
            profilePicture: "프로필사진URL",
        },
        {
            userId: 1,
            email: "test@email.com",
            nickname: "닉네임1",
            MBTI: "MBTI",
            profilePicture: "프로필사진URL",
        },
        {
            userId: 2,
            email: "test@email.com",
            nickname: "닉네임2",
            MBTI: "MBTI",
            profilePicture: "프로필사진URL",
        },
    ],
    POSTS: [
        {  
            postId: 0,
            title: "게시글 제목0",
            imageUrl: "post_img.jpg",
            content: "게시글 내용0",
            createdAt: "2022-99-99, 99:99",
            like: 9999,
            countComments: 9999,
            
            email: "test@email.com",
            nickname: "닉네임0",
            MBTI: "MBTI",
            profilePicture: "프로필사진URL",
        },
        {  
            postId: 1,
            title: "게시글 제목1",
            imageUrl: "post_img.jpg",
            content: "게시글 내용1",
            createdAt: "2022-99-99, 99:99",
            like: 9999,
            countComments: 9999,
            
            email: "test@email.com",
            nickname: "닉네임1",
            MBTI: "MBTI",
            profilePicture: "프로필사진URL",
        },
        {  
            postId: 2,
            title: "게시글 제목2",
            imageUrl: "post_img.jpg",
            content: "게시글 내용2",
            createdAt: "2022-99-99, 99:99",
            like: 9999,
            countComments: 9999,
            
            email: "test@email.com",
            nickname: "닉네임2",
            MBTI: "MBTI",
            profilePicture: "프로필사진URL",
        },
        {  
            postId: 3,
            title: "게시글 제목3",
            imageUrl: "post_img.jpg",
            content: "게시글 내용3",
            createdAt: "2022-99-99, 99:99",
            like: 9999,
            countComments: 9999,
            
            email: "test@email.com",
            nickname: "닉네임3",
            MBTI: "MBTI",
            profilePicture: "프로필사진URL",
        }
    ],
    COMMENTS: [
        {
            commentId: 0,
            content: "댓글입니다0"
        },
        {
            commentId: 1,
            content: "댓글입니다0"
        },
        {
            commentId: 2,
            content: "댓글입니다0"
        },
        {
            commentId: 3,
            content: "댓글입니다0"
        },
        {
            commentId: 4,
            content: "댓글입니다0"
        }
    ],
    DETAIL: {  
        postId: 0,
        title: "게시글 제목0",
        imageUrl: "post_img.jpg",
        content: "게시글 내용0",
        createdAt: "2022-99-99, 99:99",
        like: 9999,
        countComments: 9999,
        
        email: "test@email.com",
        nickname: "닉네임0",
        MBTI: "MBTI",
        profilePicture: "프로필사진URL",
    },
}

export default data