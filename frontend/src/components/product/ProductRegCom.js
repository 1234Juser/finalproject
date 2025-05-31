import { containerStyle, sidebarStyle, mainStyle } from "../../style/member/MyPageStyle";
import {
    InputWrapper,
    StyledLabel,
    StyledInput,
    StyledTextArea,
    StyledSelect,
    StyledFileInput,
    StyledError,
    StyledDivider, StyledTitle
} from "../../style/product/StyleProductReg";
import AdminSideBarPage from "../../pages/common/AdminSideBarPage";
import {Link} from "react-router-dom";

function ProductRegCom({
                           regions,
                           countries,
                           cities,
                           themes,
                           formInput,
                           today,
                           handleFormChange,
                           onSubmit,
                           onRegionTypeChange,
                           onCountryIdChange,
                           onKoCityIdChange,
                           onIntlCityIdChange,
                           handleCityIdChange,
                           handleThemesChange,
                           handleFileSelect,
                           isEditPage,
                           partiError,
                           formErrors,
                       }) {

    return (
        <div style={containerStyle}>
            <aside style={sidebarStyle}>
                <AdminSideBarPage />
            </aside>
            <main style={mainStyle}>
                <StyledTitle>{isEditPage ? "상품 수정" : "상품 등록"}</StyledTitle>
                <StyledDivider />
                <form onSubmit={onSubmit} id="productForm">
                    <InputWrapper>
                        <StyledLabel htmlFor="productTitle">투어 상품 명</StyledLabel>
                        <StyledInput id="productTitle" name="productTitle" placeholder="상품명을 입력하세요" required
                                     value={formInput.productTitle || ""}
                                     onChange={(e) => handleFormChange("productTitle", e.target.value)}
                        />
                        {formErrors?.productTitle && <StyledError>{formErrors.productTitle}</StyledError>}
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productContent">설명</StyledLabel>
                        <StyledTextArea id="productContent" name="productContent" placeholder="상품 설명을 입력하세요" required
                                        value={formInput.productContent || ""}
                                        onChange={(e) => handleFormChange("productContent", e.target.value)}
                        />
                        {formErrors?.productContent && <StyledError>{formErrors.productContent}</StyledError>}
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel>여행 유형</StyledLabel>
                        <StyledSelect
                            id="regionSelectBox"
                            name="regionSelectBox" 
                            value={formInput.regionType || ""}
                            onChange={(e) => {
                                onRegionTypeChange(e.target.value);
                            }}
                            disabled={isEditPage}
                            required
                        >
                                <option value="">-- 선택하세요 --</option>
                                <option value="DOMESTIC">국내여행</option>
                                <option value="INTERNATIONAL">해외여행</option>
                        </StyledSelect>
                        {formErrors?.regionType && <StyledError>{formErrors.regionType}</StyledError>}
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="regionId">권역 선택</StyledLabel>
                        <StyledSelect
                            id="regionId"
                            name="regionId"
                            value={formInput.regionCode || ""}
                            onChange={(e) => {
                                if (formInput.regionType === "DOMESTIC") {
                                    onKoCityIdChange(e.target.value);   // 국내여행 권역별 도시 호출
                                } else {
                                    onCountryIdChange(e.target.value);  // 이게 getCountryList 내부 호출
                                }
                            }}
                            disabled={isEditPage}
                            required
                        >
                            <option value="">-- 선택하세요 --</option>
                            {regions.map((region) => (
                                <option key={region.regionCode} value={region.regionCode}>
                                    {region.regionName}
                                </option>
                            ))}
                        </StyledSelect>
                        {formErrors?.regionCode && <StyledError>{formErrors.regionCode}</StyledError>}
                    </InputWrapper>

                    {formInput.regionType === "INTERNATIONAL" && countries.length > 0 && (
                        <InputWrapper>
                            <StyledLabel htmlFor="countryId">국가 선택</StyledLabel>
                            <StyledSelect
                                id="countryId"
                                name="countryId"
                                value={formInput.countryId || ""}
                                onChange={(e) => {
                                    onIntlCityIdChange(e.target.value)
                                }}
                                required
                            >
                                <option value="">-- 선택하세요 --</option>
                                {countries.map((country) => (
                                    <option key={country.countryId} value={country.countryId}>
                                        {country.countryNameKR}
                                    </option>
                                ))}
                            </StyledSelect>
                            {formErrors?.countryId && <StyledError>{formErrors.countryId}</StyledError>}
                        </InputWrapper>
                    )}

                    {cities.length > 0 && (
                        <InputWrapper>
                            <StyledLabel htmlFor="cityId">★★도시 선택★★</StyledLabel>
                            <StyledSelect
                                id="cityId"
                                name="cityId"
                                value={formInput.cityNameKR}     //value={formInput.cityId || ""}
                                onChange={(e) => {
                                    handleCityIdChange(e.target.value);
                                }}
                                required
                            >
                                <option value="">-- 선택하세요 --</option>
                                {cities.map((city) => (
                                    <option key={city.cityId} value={city.cityId}>
                                        {city.cityNameKR}
                                    </option>
                                ))}
                            </StyledSelect>
                            {formErrors?.cityId && <StyledError>{formErrors.cityId}</StyledError>}
                        </InputWrapper>
                    )}
                    <InputWrapper>
                        <StyledLabel htmlFor="themeCode">투어 테마 선택</StyledLabel>
                        <StyledSelect
                            id="themeCode"
                            name="themeCode"
                            value={formInput.themeCode || ""}
                            onChange={(e) => {
                                handleThemesChange(e.target.value)
                            }}
                            required
                        >
                            <option value="">-- 선택하세요 --</option>
                            {themes.map((theme) => (
                                <option key={theme.themeCode} value={theme.themeCode}>
                                    {theme.themeName}
                                </option>
                            ))}
                        </StyledSelect>
                        {formErrors?.themeCode && <StyledError>{formErrors.themeCode}</StyledError>}
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productAdult">성인 요금</StyledLabel>
                        <StyledInput id="productAdult" name="productAdult" placeholder="성인 요금을 입력하세요"
                                     required
                                     type="number"
                                     min="0"
                                     value={formInput.productAdult || ""}
                                     onChange={(e) => handleFormChange("productAdult", e.target.value)}
                        />
                        {formErrors?.productAdult && <StyledError>{formErrors.productAdult}</StyledError>}
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productChild">아동 요금</StyledLabel>
                        <StyledInput id="productChild" name="productChild" placeholder="아동 요금을 입력하세요"
                                     required
                                     type="number"
                                     min="0"
                                     value={formInput.productChild || ""}
                                     onChange={(e) => handleFormChange("productChild", e.target.value)}
                        />
                        {formErrors?.productChild && <StyledError>{formErrors.productChild}</StyledError>}
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productStartDate">출발 시작일 설정</StyledLabel>
                        <span>★ 출발 시작일은 시스템상의 날짜부터 등록이 가능하며, 출발일을 수정하는 경우 현재 이전 날짜로 수정이 불가합니다 ★</span>
                        <StyledInput id="productStartDate" type="date" name="productStartDate"
                                     min={today}
                                     value={formInput.productStartDate}
                                     onChange={(e) => handleFormChange("productStartDate", e.target.value)}
                                     disabled={isEditPage}
                                     required
                        />
                        {formErrors?.productStartDate && <StyledError>{formErrors.productStartDate}</StyledError>}
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productEndDate">출발 종료일 설정</StyledLabel>
                        <StyledInput id="productEndDate" type="date" name="productEndDate"
                                     required
                                     value={formInput.productEndDate}
                                     min={formInput.productStartDate || today}
                                     onChange={(e) => handleFormChange("productEndDate", e.target.value)}
                        />
                        {formErrors?.productEndDate && <StyledError>{formErrors.productEndDate}</StyledError>}
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productMinParticipants">최소 출발 인원</StyledLabel>
                        <StyledInput id="productMinParticipants" name="productMinParticipants" placeholder="최소 출발 인원을 입력하세요"
                                     value={formInput.productMinParticipants || ""}
                                     required
                                     type="number"
                                     min="0"
                                     onChange={(e) => handleFormChange("productMinParticipants", e.target.value)}/>
                        {formErrors?.productMinParticipants && <StyledError>{formErrors.productMinParticipants}</StyledError>}
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productMaxParticipants">최대 출발 인원</StyledLabel>
                        <StyledInput id="productMaxParticipants" name="productMaxParticipants" placeholder="최대 출발 인원을 입력하세요"
                                     value={formInput.productMaxParticipants || ""}
                                     required
                                     type="number"
                                     min="0"
                                     onChange={(e) => handleFormChange("productMaxParticipants", e.target.value)}/>
                        {formErrors?.productMaxParticipants && <StyledError>{formErrors.productMaxParticipants}</StyledError>}
                    </InputWrapper>
                    <StyledError>
                        {partiError.participants && (
                            <p style={{ color: "red", marginTop: "0.5rem" }}>{partiError.participants}</p> )}
                    </StyledError>

                    <InputWrapper>
                        <StyledLabel htmlFor="productStatus">상품 상태</StyledLabel>
                        <StyledSelect 
                                    id="productStatus" name="productStatus"
                                    value={formInput.productStatus || ""}
                                    onChange={(e) => {
                                        handleFormChange("productStatus", e.target.value)
                                    }}
                                    required
                        >
                            <option value="">-- 선택하세요 --</option>
                            <option value="ON_SALE">판매 중</option>
                            <option value="SOLD_OUT">매진</option>
                            <option value="CLOSED">마감</option>
                        </StyledSelect>
                        {formErrors?.productStatus && <StyledError>{formErrors.productStatus}</StyledError>}
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productThumbnail">썸네일 업로드</StyledLabel>
                        <StyledFileInput id="productThumbnail" type="file" name="productThumbnail" 
                                        onChange={(e) => handleFileSelect(e.target.files[0])}   // FormData로 따로 보낼 파일>>객체<<는 따로 관리
                                         required={!isEditPage}
                        />
                        {formInput.productThumbnail && (
                            <div> 선택된 파일 : {formInput.productThumbnail.name || formInput.productThumbnail} </div>
                        )}
                        {formErrors?.productThumbnail && <StyledError>{formErrors.productThumbnail}</StyledError>}
                    </InputWrapper>
                    <br/>
                    {isEditPage ? (
                        <>
                        <button type="submit" onClick={onSubmit}>수정</button>
                        </>
                    ) : (
                        <>
                    <button type="submit" onClick={onSubmit}>상품 등록</button>
                        </>
                    )}
                    <Link to="/admin/productAll">
                        <button type="button" >목록으로</button>
                    </Link>
                </form>
            </main>
            <hr/>
        </div>
    )
}

export default ProductRegCom;