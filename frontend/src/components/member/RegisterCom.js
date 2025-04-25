import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 220px;
`;

// 폼 전체 박스
const FormBox = styled.form`
    min-width: 340px;
    width: 380px;        
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.04);
    padding: 32px 32px 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

// 입력줄 wrapper
const FormRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
    position: relative;
`;

const InputGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
    position: relative;
`;

const EyeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
    position: absolute;
    right: 8px;
    top: 7px;
    padding: 0 3px;
`;

const Label = styled.label`
    font-size: 1rem;
    margin-bottom: 3px;
    color: #333;
`;

const Input = styled.input`
    width: 100%;               
    padding: 10px;
    border-radius: 5px;
    border: 1.2px solid #aaa;
    font-size: 1rem;
    box-sizing: border-box;
    &:focus {
        outline: none;
        border: 1.2px solid #496AF2;
    }
`;

const InlineButton = styled.button`
    margin-left: 6px;
    background: #496af2;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 0.97rem;
    padding: 8px 14px;
    cursor: pointer;
    white-space: nowrap;
    &:disabled {
        background: #b2b8c6;
        cursor: not-allowed;
    }
`;

const Button = styled.button`
    width: 100%;               // 
    margin-top: 10px;
    background: #496af2;
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    font-size: 1.08rem;
    padding: 12px;
    cursor: pointer;
    &:disabled {
        background: #b2b8c6;
        cursor: not-allowed;
    }
`;

const Message = styled.div`
    font-size: 0.93rem;
    margin-top: 4px;
    margin-bottom: 4px;
    text-align: center;      // 
`;

//
const ErrorMsg = styled(Message)`
    color: #d81b60;
`;

//
const SuccessMsg = styled(Message)`
    color: #258a23;
`;


const TermsBox = styled.div`
    font-size: 0.95rem;
    background: #f9f9fb;
    border: 1px solid #ececec;
    border-radius: 6px;
    padding: 16px 12px;
    margin-bottom: 8px;
    color: #444;
`;

const TermsLabel = styled.label`
    margin-top: 3px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 1.01rem;
    user-select: none;
`;

const TermsError = styled.div`
  font-size: 0.93rem;
  color: #d81b60;
  margin-top: -4px;
  margin-bottom: 4px;
`;


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
                <Button type="submit" disabled={isSubmitting}>회원가입</Button>
                {submitMsg && (
                    submitMsg.includes('완료')
                        ? <SuccessMsg>{submitMsg}</SuccessMsg>
                        : <ErrorMsg style={{ textAlign: "center" }}>{submitMsg}</ErrorMsg>
                )}
            </FormBox>
        </Wrapper>
    );
}

const Title = styled.h2`
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
`;
