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