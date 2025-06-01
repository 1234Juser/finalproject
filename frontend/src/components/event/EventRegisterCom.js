import React, { useState, useEffect } from "react"; // useEffect 추가
import {
    FormWrapper, Title, StyledForm, Label, StyledInput, StyledTextarea,
    FileInputWrapper, FileLabel, PreviewImg, DateRow, SubmitButton, Select,
    CancelButton

} from "../../style/event/EventRegisterStyle";
import {useNavigate} from "react-router-dom";

function EventRegisterCom({ form, onChange, onSubmit }) {
    const [imgPreview, setImgPreview] = useState(null);
    const navigate = useNavigate();

    // 수정 모드이고, form.eventImg가 문자열(기존 이미지 URL)이며, imgPreview가 없을 때 초기 미리보기 설정
    useEffect(() => {
        if (typeof form.eventImg === 'string' && !imgPreview) {
            setImgPreview(form.eventImg);
        }
        // form.eventImg가 null이거나 File 객체일 때 (새 파일 선택 시)는 imgPreview를 null로 유지하거나 handleFileChange에서 관리
        // 이 조건은 imgPreview 상태를 직접 변경하지 않으므로, 의존성 배열에 imgPreview를 추가해도 무한 루프를 유발하지 않습니다.
        // 다만, ESLint 규칙을 준수하기 위해 imgPreview를 포함합니다.
    }, [form.eventImg, imgPreview]); //



    const handleFileChange = (e) => {
        onChange(e); // form 상태 업데이트는 부모 컨테이너에서 처리
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setImgPreview(ev.target.result); // 새 파일 선택 시 Data URL로 미리보기 업데이트
            reader.readAsDataURL(file);
        } else {
            // 파일 선택 취소 시, 기존 이미지가 있다면 기존 이미지 URL로, 없다면 null로 설정
            if (typeof form.eventImg === 'string') {
                setImgPreview(form.eventImg);
            } else {
                setImgPreview(null);
            }
        }
    };
    const handleCancel = () => {
        navigate('/event');
    };

    // 수정 시 form.eventImg는 S3 URL(문자열)이거나, 새 파일(File 객체)이거나, null일 수 있습니다.
    // imgPreview는 Data URL(새 파일 선택 시)이거나 S3 URL(기존 이미지 표시 시)일 수 있습니다.

    let displaySrc = null;
    if (imgPreview) { // 사용자가 새 파일을 선택했거나, 기존 이미지가 로드된 상태
        displaySrc = imgPreview;
    } else if (typeof form.eventImg === 'string') { // 새 파일 선택 안했고, 기존 이미지가 있는 경우
        displaySrc = form.eventImg;
    }


    return (
        <FormWrapper>
            <Title>{form.eventCode ? "이벤트 수정" : "이벤트 등록"}</Title> {/* 수정/등록 타이틀 변경 */}
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
                        onChange={handleFileChange} // onChange prop 대신 handleFileChange 직접 사용
                    />
                    {/* displaySrc를 사용하여 이미지 미리보기 */}
                    {displaySrc && (
                        <PreviewImg
                            alt="미리보기"
                            src={displaySrc}
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
                        {form.eventCode ? "수정하기" : "등록하기"} {/* 버튼 텍스트 변경 */}
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