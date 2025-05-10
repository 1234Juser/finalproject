import React from "react";
import {
    LoginFormContainer,
    Form,
    FormItem,
    Label,
    Input,
    ErrorMsg,
    Button,
    ActionRow,
    TextButton
} from "../../style/member/LoginStyle";
import styled from "styled-components";
import kakaoLoginImg from "../../components/member/img/kakao_login.png";
import googleLoginImg from "./img/google_login.png";

const KakaoBtnWrap = styled.div`
    width: 100%;
    max-width: 340px;
    position: relative;
    display: flex; justify-content: center;
    margin: 16px auto 0 auto;
    &:before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 12px;
        background: #fae10044;
        z-index: 0;
        filter: blur(6px);
        opacity: 0.7;
        transition: opacity 0.2s;
    }
    &:hover:before {
        opacity: 1;
        filter: blur(10px);
    }
`;

const KakaoBtn = styled.img`
    cursor: pointer;
    width: 100%;
    max-width: 340px;
    height: 48px;
    object-fit: cover;
    border-radius: 12px;
    border: 2px solid #fae100;
    background: #fffbe7;
    box-shadow: 0 2px 14px 0 #fae10050;
    transition: box-shadow 0.16s, filter 0.18s;
    position: relative;
    z-index: 1;
    &:hover {
        box-shadow: 0 6px 24px 0 #fae10070;
        filter: brightness(0.96);
    }
`;

const GoogleBtnWrap = styled.div`
    width: 100%;
    max-width: 340px;
    position: relative;
    display: flex; justify-content: center;
    margin: 12px auto 0 auto;
    &:before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 12px;
        background: #ffffff44;
        z-index: 0;
        filter: blur(6px);
        opacity: 0.7;
        transition: opacity 0.2s;
    }
    &:hover:before {
        opacity: 1;
        filter: blur(10px);
    }
`;

const GoogleBtn = styled.img`
    cursor: pointer;
    width: 100%;
    max-width: 340px;
    height: 48px;
    object-fit: cover;
    border-radius: 12px;
    border: 2px solid #4285f4;
    background: #fff;
    box-shadow: 0 2px 14px 0 #4285f430;
    transition: box-shadow 0.16s, filter 0.18s;
    position: relative;
    z-index: 1;
    &:hover {
        box-shadow: 0 6px 24px 0 #4285f470;
        filter: brightness(0.96);
    }
`;


function LoginCom({
                      memberId,
                      memberPassword,
                      onChangeId,
                      onChangePassword,
                      onSubmit,
                      errorMsg,
                      onClickFindId,
                      onClickFindPw,
                      onClickRegister,
                      onClickKakao,
                      onClickGoogle
                  }) {
    return (
        <LoginFormContainer>
            <h2 style={{ textAlign: "center" }}>로그인</h2>
            <Form onSubmit={onSubmit}>
                <FormItem>
                    <Label>아이디</Label>
                    <Input
                        type="text"
                        value={memberId}
                        onChange={onChangeId}
                        required
                        autoComplete="username"
                    />
                </FormItem>
                <FormItem>
                    <Label>비밀번호</Label>
                    <Input
                        type="password"
                        value={memberPassword}
                        onChange={onChangePassword}
                        required
                        autoComplete="current-password"
                    />
                </FormItem>
                {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
                <Button type="submit">로그인</Button>
                <KakaoBtnWrap>
                    <KakaoBtn src={kakaoLoginImg} alt="카카오로 로그인" onClick={onClickKakao} />
                </KakaoBtnWrap>
                <GoogleBtnWrap>
                    <GoogleBtn src={googleLoginImg} alt="구글로 로그인" onClick={onClickGoogle} />
                </GoogleBtnWrap>

            </Form>
            <ActionRow>
                <TextButton type="button" onClick={onClickFindId}>아이디 찾기</TextButton>
                <TextButton type="button" onClick={onClickFindPw}>비밀번호 찾기</TextButton>
                <TextButton type="button" onClick={onClickRegister}>회원가입</TextButton>
            </ActionRow>

        </LoginFormContainer>
    );
}

export default LoginCom;