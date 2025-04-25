import React from "react";


export default function MainPage() {


    return (
        <div>
            <h1>메인 페이지</h1>
            <video
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: 'auto' }}
            >
                <source src="http://localhost:8080/img/logo/finalvideo.mp4" type="video/mp4" />
                브라우저가 video 태그를 지원하지 않습니다.
            </video>
        </div>
    );
}
