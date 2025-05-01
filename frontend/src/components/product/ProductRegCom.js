import { containerStyle, sidebarStyle, mainStyle } from "../../style/member/MyPageStyle";
import {Input, InputWrapper, StyledLabel, StyledInput, StyledTextArea, StyledSelect, StyledFileInput} from "../../style/product/StyleProductReg";
import AdminSideBarPage from "../../pages/common/AdminSideBarPage";

// function ProductRegCom({onSubmit, today, startDate, handleStartDateChange}) {
function ProductRegCom({
                           regions,
                           countries,
                           cities,
                           themes,
                           formData,
                           today,
                           onChange,
                           onSubmit,
                           onRegionTypeChange,
                           onCountryIdChange,
                           onKoCityIdChange,
                           onIntlCityIdChange,
                           handleCityIdChange,
                           handleThemesChange,
                       }) {

    return (
        <div style={containerStyle}>
            <aside style={sidebarStyle}>
                {/* <AdminSideBarPage /> */}
            </aside>
            <main style={mainStyle}>
                <h1>상품 등록 </h1>
                <hr/>
                <form onSubmit={onSubmit} id="productForm">
                    <InputWrapper>
                        <StyledLabel htmlFor="productTitle">투어 상품 명</StyledLabel>
                        <StyledInput id="productTitle" name="productTitle" placeholder="상품명을 입력하세요"
                                     value={formData.productTitle || ""}
                                     onChange={(e) => onChange("productTitle", e.target.value)}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productContent">설명</StyledLabel>
                        <StyledTextArea id="productContent" name="productContent" placeholder="상품 설명을 입력하세요"
                                        value={formData.productContent || ""}
                                        onChange={(e) => onChange("productContent", e.target.value)}
                        ></StyledTextArea>
                    </InputWrapper>


                    <InputWrapper>
                        <StyledLabel>여행 유형</StyledLabel>
                        <StyledSelect
                            id="regionSelectBox"
                            name="regionSelectBox" 
                            value={formData.regionType || ""}
                            onChange={(e) => {
                                onRegionTypeChange(e.target.value);
                                // console.log("여행유형 select box 선택 시 value 확인" , e.target.value); // -> DOMESTIC, INTERNATIONAL
                            }}
                        >
                                <option value="">-- 선택하세요 --</option>
                                <option value="DOMESTIC">국내여행</option>
                                <option value="INTERNATIONAL">해외여행</option>
                        </StyledSelect>
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="regionId">권역 선택</StyledLabel>
                        <StyledSelect
                            id="regionId"
                            name="regionId"
                            value={formData.regionCode || ""}
                            onChange={(e) => {
                                if (formData.regionType === "DOMESTIC") {
                                    onKoCityIdChange(e.target.value);   // 국내여행 권역별 도시 호출
                                } else {
                                    onCountryIdChange(e.target.value);  // 이게 getCountryList 내부 호출
                                }
                                // onCountryIdChange(e.target.value);
                                console.log("권역 선택 select box 클릭 시 value 확인(regionCode 값 찍힘)", e.target.value);
                            }}
                        >
                            <option value="">-- 선택하세요 --</option>
                            {regions.map((region) => (
                                <option key={region.regionCode} value={region.regionCode}>
                                    {region.regionName}
                                </option>
                            ))}
                        </StyledSelect>
                    </InputWrapper>

                    {formData.regionType === "INTERNATIONAL" && countries.length > 0 && (
                        <InputWrapper>
                            <StyledLabel htmlFor="countryId">국가 선택</StyledLabel>
                            <StyledSelect
                                id="countryId"
                                name="countryId"
                                value={formData.countryId || ""}
                                onChange={(e) => {
                                    onIntlCityIdChange(e.target.value)
                                    console.log('해외여행의 국가 선택 시 select box선택 (countryId 값 찍힘) ' , e.target.value);
                                }}
                            >
                                <option value="">-- 선택하세요 --</option>
                                {countries.map((country) => (
                                    <option key={country.countryId} value={country.countryId}>
                                        {country.countryName}
                                    </option>
                                ))}
                            </StyledSelect>
                        </InputWrapper>
                    )}

                    {cities.length > 0 && (
                        <InputWrapper>
                            <StyledLabel htmlFor="cityId">★★도시 선택★★</StyledLabel>
                            <StyledSelect
                                id="cityId"
                                name="cityId"
                                value={formData.cityNameKR}     //value={formData.cityId || ""}
                                onChange={(e) => {
                                    handleCityIdChange(e.target.value);
                                    // const selectedCityId = e.target.value;
                                    console.log("formData.regionType---->", formData.regionType);
                                    console.log("도시 선택 select box 클릭 시 value 확인(cityId 값 찍힘)", e.target.value);
                                }}
                            >
                                <option value="">-- 선택하세요 --</option>
                                {cities.map((city) => (
                                    <option key={city.cityId} value={city.cityId}>
                                        {city.cityNameKR}
                                    </option>
                                ))}
                            </StyledSelect>
                        </InputWrapper>
                    )}

                    <hr/>
                    <InputWrapper>
                        <StyledLabel htmlFor="themeCode">투어 테마 선택</StyledLabel>
                        <StyledSelect
                            id="themeCode"
                            name="themeCode"
                            value={formData.themeCode || ""}
                            onChange={(e) => {
                                handleThemesChange(e.target.value)
                                console.log("등록컴포넌트에서 투어 찍힌 값 확인,,,,,", e.target.value);
                            }}
                        >
                            <option value="">-- 선택하세요 --</option>
                            {themes.map((theme) => (
                                <option key={theme.themeCode} value={theme.themeCode}>
                                    {theme.themeName}
                                </option>
                            ))}
                        </StyledSelect>
                    </InputWrapper>


                    <InputWrapper>
                        <StyledLabel htmlFor="productAdult">성인 요금</StyledLabel>
                        <StyledInput id="productAdult" name="productAdult" placeholder="성인 요금을 입력하세요"
                                     value={formData.productAdult || ""}
                                     onChange={(e) => onChange("productAdult", e.target.value)}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productChild">아동 요금</StyledLabel>
                        <StyledInput id="productChild" name="productChild" placeholder="아동 요금을 입력하세요"
                                     value={formData.productChild || ""}
                                     onChange={(e) => onChange("productChild", e.target.value)}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productStartDate">판매 시작일 설정</StyledLabel>
                        <span>★ 판매 시작일은 시스템상의 날짜부터 등록이 가능합니다.</span>
                        <StyledInput id="productStartDate" type="date" name="productStartDate"
                                     min={today}
                                     value={formData.productStartDate}
                                     onChange={(e) => onChange("productStartDate", e.target.value)}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productEndDate">여행 종료일</StyledLabel>
                        <StyledInput id="productEndDate" type="date" name="productEndDate"
                                     value={formData.productEndDate}
                                     min={formData.productStartDate || today}
                                     onChange={(e) => onChange("productEndDate", e.target.value)}

                        />
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productMinParticipants">최소 참가자</StyledLabel>
                        <StyledInput id="productMinParticipants" name="productMinParticipants" placeholder="최소 참가자 수를 입력하세요"
                                     value={formData.productMinParticipants || ""}
                                     onChange={(e) => onChange("productMinParticipants", e.target.value)}/>
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productMaxParticipants">최대 참가자</StyledLabel>
                        <StyledInput id="productMaxParticipants" name="productMaxParticipants" placeholder="최대 참가자 수를 입력하세요"
                                     value={formData.productMaxParticipants || ""}
                                     onChange={(e) => onChange("productMaxParticipants", e.target.value)}/>
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productStatus">상품 상태</StyledLabel>
                        <StyledSelect 
                                    id="productStatus" name="productStatus"
                                    value={formData.productStatus || ""}
                                    onChange={(e) => {
                                        onChange("productStatus", e.target.value)
                                        console.log("상품 상태 확인 : ", e.target.value);
                                    }}>
                            <option value="">-- 선택하세요 --</option>
                            <option value="ON_SALE">판매 중</option>
                            <option value="SOLD_OUT">매진</option>
                            <option value="CLOSED">마감</option>
                        </StyledSelect>
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productType">상품 유형</StyledLabel>
                        <StyledSelect id="productType" name="productType"
                                      value={formData.productType || ""}
                                      onChange={(e) => {
                                          onChange("productType", e.target.value)
                                          console.log("상품 유형 확인 : ", e.target.value);
                                      }}>
                            <option value="">-- 선택하세요 --</option>
                            <option value="TOUR">투어</option>
                            <option value="GOLF">골프</option>
                            <option value="CRUISE">크루즈</option>
                            <option value="KIDS">키즈</option>
                            <option value="HONEYMOON">허니문</option>
                            <option value="SILVER">실버</option>
                        </StyledSelect>
                    </InputWrapper>

                    <InputWrapper>
                        <StyledLabel htmlFor="productThumbnail">썸네일 업로드</StyledLabel>
                        <StyledFileInput id="productThumbnail" type="file" name="productThumbnail" 
                                        onChange={(e) => {
                                                const fileName = e.target.files[0];
                                                onChange("productThumbnail", fileName);
                                                console.log("업로드한 파일 확인 : ", fileName);
                                            }}
                        />
                    </InputWrapper>
                    <button type="submit">상품 등록</button>
                </form>




            </main>
            <hr/>
        </div>
    )
}

export default ProductRegCom;