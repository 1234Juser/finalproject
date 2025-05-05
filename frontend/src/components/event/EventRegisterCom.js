import React, { useState } from "react";
import {
    FormWrapper, Title, StyledForm, Label, StyledInput, StyledTextarea,
    FileInputWrapper, FileLabel, PreviewImg, DateRow, SubmitButton, Select,
    CancelButton

} from "../../style/event/EventRegisterStyle";
import {useNavigate} from "react-router-dom";

function EventRegisterCom({ form, onChange, onSubmit }) {
    const [imgPreview, setImgPreview] = useState(null);
    const navigate = useNavigate();


    const handleFileChange = (e) => {
        onChange(e);
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => setImgPreview(ev.target.result);
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setImgPreview(null);
        }
    };
    const handleCancel = () => {
        navigate('/event');
    };

    return (
        <FormWrapper>
            <Title>이벤트 등록</Title>
            <StyledForm onSubmit={onSubmit} autoComplete="off">
                <Label htmlFor="eventTitle">이벤트 제목</Label>
                <StyledInput
                    id="eventTitle"
                    name="eventTitle"
                    value={form.eventTitle}
                    maxLength={100}
                    placeholder="이벤트 제목을 입력하세요"
                    required
                    onChange={onChange}
                />

                <Label htmlFor="eventContent">설명</Label>
                <StyledTextarea
                    id="eventContent"
                    name="eventContent"
                    value={form.eventContent}
                    maxLength={800}
                    placeholder="이벤트에 대해 자세히 설명해 주세요"
                    required
                    onChange={onChange}
                />

                <FileInputWrapper>
                    <FileLabel htmlFor="eventImg">이미지</FileLabel>
                    <StyledInput
                        style={{flex:1}}
                        id="eventImg"
                        name="eventImg"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {(imgPreview || form.eventImg) && (
                        <PreviewImg
                            alt="미리보기"
                            src={imgPreview
                                || (typeof form.eventImg === "string"
                                    ? `/events/${form.eventImg}`
                                    : null)
                            }
                        />
                    )}
                </FileInputWrapper>

                <DateRow>
                    <div style={{flex:1}}>
                        <Label htmlFor="eventStartdate">시작일</Label>
                        <StyledInput
                            id="eventStartdate"
                            name="eventStartdate"
                            type="date"
                            value={form.eventStartdate}
                            required
                            onChange={onChange}
                        />
                    </div>
                    <div style={{flex:1}}>
                        <Label htmlFor="eventEnddate">종료일</Label>
                        <StyledInput
                            id="eventEnddate"
                            name="eventEnddate"
                            type="date"
                            value={form.eventEnddate}
                            required
                            onChange={onChange}
                        />
                    </div>
                </DateRow>

                <Label htmlFor="eventStatus">진행 상태</Label>
                <Select
                    id="eventStatus"
                    name="eventStatus"
                    value={form.eventStatus}
                    required
                    onChange={onChange}
                >
                    <option value="">선택</option>
                    <option value="진행중">진행중</option>
                    <option value="예정">예정</option>
                    <option value="종료">종료</option>
                </Select>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <SubmitButton type="submit" style={{ marginTop: 0, width: "50%" }}>
                        등록하기
                    </SubmitButton>
                    <CancelButton type="button" style={{ width: "50%" }} onClick={handleCancel}>
                        취소하기
                    </CancelButton>
                </div>

            </StyledForm>
        </FormWrapper>
    );
}
export default EventRegisterCom;