import React from "react";
import MainBanner from "../style/components/StyleMain";
import { BannerContainer, SlideWrapper, SlideImage, images } from "../style/components/StyleMain";


export default function MainCom() {


    return (
        <div>
            <h1>메인 페이지</h1>
            <BannerContainer>
                <SlideWrapper>
                    {images.map((src, index) => (
                        <SlideImage
                            key={index}
                            src={`http://localhost:8080${src}`}
                            alt={`banner-${index}`}
                        />
                    ))}
                </SlideWrapper>
            </BannerContainer>

            {/*<MainBanner src="http://localhost:8080/img/banner/130743172_04.jpg" alt="bannerImg"/>*/}
            <br/>
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
