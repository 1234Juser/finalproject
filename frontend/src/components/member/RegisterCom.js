import React from "react";
import {
    Wrapper, FormBox, FormRow, InputGroup, EyeButton, Label, Input, InlineButton, Button,
    ErrorMsg, SuccessMsg, TermsBox, TermsLabel, TermsError, Title
} from "../../style/member/RegisterStyle";





export default function RegisterCom({form,errors, showPw, onChange, onSubmit, onTogglePw, submitMsg, isSubmitting,
                                        agreeTerms, onAgreeTerms, termsError, onCheckId, onCheckEmail, idSuccessMsg, emailSuccessMsg,
                                        isIdChecked, isEmailChecked
                                    }) {

    return (
        <Wrapper>
            <FormBox onSubmit={onSubmit} autoComplete="off">
                <Title>회원가입</Title>
                <FormRow>
                    <Label htmlFor="memberName">이름</Label>
                    <Input name="memberName" value={form.memberName} onChange={onChange} maxLength={20} required />
                    {errors.memberName && <ErrorMsg>{errors.memberName}</ErrorMsg>}
                </FormRow>
                <FormRow>
                    <Label htmlFor="memberId">아이디</Label>
                    <div style={{ display: "flex", gap: 6 }}>
                        <Input name="memberId" value={form.memberId} onChange={onChange} maxLength={20} required />
                        <InlineButton type="button" onClick={onCheckId}>중복확인</InlineButton>
                    </div>
                    {/* 메시지 위치 통일: 항상 같은 자리에서 출력 */}
                    <div style={{ minHeight: "22px" }}>
                        {errors.memberId
                            ? <ErrorMsg>{errors.memberId}</ErrorMsg>
                            : (idSuccessMsg && <SuccessMsg>{idSuccessMsg}</SuccessMsg>)
                        }
                    </div>
                </FormRow>
                <FormRow>
                    <Label htmlFor="memberPassword">비밀번호</Label>
                    <InputGroup>
                        <Input name="memberPassword" type={showPw ? "text" : "password"} value={form.memberPassword} onChange={onChange}
                               autoComplete="new-password" required />
                        <EyeButton type="button" onClick={onTogglePw} tabIndex={-1} aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}>
                            {showPw ? "🙈" : "👁️"}
                        </EyeButton>
                    </InputGroup>
                    {errors.memberPassword && <ErrorMsg>{errors.memberPassword}</ErrorMsg>}
                </FormRow>
                <FormRow>
                    <Label htmlFor="memberEmail">이메일</Label>
                    <div style={{ display: "flex", gap: 6 }}>
                        <Input name="memberEmail" value={form.memberEmail} onChange={onChange} required maxLength={40} />
                        <InlineButton type="button" onClick={onCheckEmail}>중복확인</InlineButton>
                    </div>
                    {/* 메시지 위치 통일: 항상 같은 자리에서 출력 */}
                    <div style={{ minHeight: "22px" }}>
                        {errors.memberEmail
                            ? <ErrorMsg>{errors.memberEmail}</ErrorMsg>
                            : (emailSuccessMsg && <SuccessMsg>{emailSuccessMsg}</SuccessMsg>)
                        }
                    </div>
                </FormRow>
                <FormRow>
                    <Label htmlFor="memberPhone">휴대폰번호</Label>
                    <Input name="memberPhone" value={form.memberPhone} onChange={onChange} placeholder="010-1234-5678" maxLength={13} required />
                    {errors.memberPhone && <ErrorMsg>{errors.memberPhone}</ErrorMsg>}
                </FormRow>
                <TermsBox>
                    <ul>
                        <li>아래 약관을 확인하였으며, 사용자는 개인정보에 동의합니다.</li><br/>
                        <li>[필수] 개인정보 수집 및 이용 동의</li>
                        <li>[필수] 서비스 이용약관 동의</li>
                    </ul>
                </TermsBox>
                <TermsLabel>
                    <input type="checkbox" checked={agreeTerms} onChange={onAgreeTerms} required style={{ marginRight: "6px" }} />
                    위 약관에 모두 동의합니다.
                </TermsLabel>
                {termsError && <TermsError>{termsError}</TermsError>}
                {submitMsg && (
                    submitMsg.includes('완료')
                        ? <SuccessMsg>{submitMsg}</SuccessMsg>
                        : <ErrorMsg style={{ textAlign: "center" }}>{submitMsg}</ErrorMsg>
                )}
                <Button type="submit" disabled={isSubmitting}>회원가입</Button>

            </FormBox>
        </Wrapper>
    );
}


