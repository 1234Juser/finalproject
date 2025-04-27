import React from "react";
import {
    LoginFormContainer,
    Form,
    FormItem,
    Label,
    Input,
    ErrorMsg,
    Button
} from "../../components/style/LoginStyle";

function LoginCom({
                      memberId,
                      memberPassword,
                      onChangeId,
                      onChangePassword,
                      onSubmit,
                      errorMsg
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
        </LoginFormContainer>
    );
}

export default LoginCom;