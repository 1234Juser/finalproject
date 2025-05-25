import React from 'react';
import { FormContainer, FormGroup, ErrorMessage, SubmitButton } from '../../style/customize/CustomizeStyle';

function CustomizeCom({
                          customizeConditions,
                          countries,
                          cities,
                          validationErrors,
                          handleInputChange,
                          handleThemeChange,
                          handleCountryChange,
                          handleCityChange,
                          handlePriceChange,
                          handlePersonCountChange,
                          handleProductTypeChange,
                          handleSubmit
                      }) {

    const themesList = [
        { value: '투어', label: '투어' }, // value를 themeName으로 변경
        { value: '골프', label: '골프' },
        { value: '크루즈', label: '크루즈' },
        { value: '키즈', label: '키즈' },
        { value: '허니문', label: '허니문' },
        { value: '실버', label: '실버' },
        { value: '트레킹', label: '트레킹' },
        { value: '페스티벌', label: '페스티벌' },
        { value: '쇼핑', label: '쇼핑' },
        { value: '음식', label: '음식' },
        { value: '힐링', label: '힐링' },
        { value: '모험', label: '모험' },
        { value: '역사', label: '역사' },
        { value: '예술', label: '예술' },
        { value: '공연', label: '공연' }
    ];

    const productType = [
        { value: '가이드동반', label: '가이드 동반' },
        { value: '단독여행', label: '단독 여행' },
        { value: '자유일정포함', label: '자유 일정 포함' }
    ];

    return (
        <FormContainer>
            <h2>맞춤 여행 조건 검색</h2>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <label htmlFor="startDate">시작 날짜: <span style={{color: 'red'}}>(필수)</span></label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={customizeConditions.startDate}
                        onChange={handleInputChange}
                        required // 필수 필드 표시
                    />
                    {validationErrors.startDate && <ErrorMessage>{validationErrors.startDate}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                    <label htmlFor="endDate">종료 날짜: <span style={{color: 'red'}}>(필수)</span></label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={customizeConditions.endDate}
                        onChange={handleInputChange}
                        required // 필수 필드 표시
                    />
                    {validationErrors.endDate && <ErrorMessage>{validationErrors.endDate}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                    <label htmlFor="countryId">국가: <span style={{color: 'red'}}>(필수)</span></label>
                    <select
                        id="countryId"
                        name="countryId"
                        value={customizeConditions.countryId}
                        onChange={handleCountryChange}
                        required // 필수 필드 표시
                    >
                        <option value="">국가 선택</option>
                        {countries.map(country => (
                            <option key={country.countryId} value={country.countryId}>
                                {country.countryNameKr}
                            </option>
                        ))}
                    </select>
                    {validationErrors.countryId && <ErrorMessage>{validationErrors.countryId}</ErrorMessage>}
                </FormGroup>

                {/* 국가를 선택했을 때만 도시 선택 필드를 렌더링 */}
                <FormGroup>
                    <label htmlFor="cityId">도시: <span style={{color: 'red'}}>(필수)</span></label>
                    <select
                        id="cityId"
                        name="cityId"
                        value={customizeConditions.cityId}
                        onChange={handleCityChange}
                        required // 필수 필드 표시
                        disabled={!customizeConditions.countryId} // 국가를 선택하지 않으면 비활성화
                    >
                        <option value="">도시 선택</option>
                        {cities.map(city => (
                            <option key={city.cityId} value={city.cityId}>
                                {city.cityNameKR}
                            </option>
                        ))}
                    </select>
                    {validationErrors.cityId && <ErrorMessage>{validationErrors.cityId}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                    <label htmlFor="themeCode">테마: <span style={{color: 'red'}}>(필수)</span></label>
                    <select
                        id="themeCode"
                        name="themeCode"
                        value={customizeConditions.themeName || ''} // themeCode 대신 themeName 사용
                        onChange={handleThemeChange}
                        required // 필수 필드 표시
                    >
                        <option value="">테마 선택</option>
                        {themesList.map(theme => (
                            <option key={theme.value} value={theme.value}>
                                {theme.label}
                            </option>
                        ))}
                    </select>
                    {validationErrors.themeName && <ErrorMessage>{validationErrors.themeName}</ErrorMessage>}
                </FormGroup>


                <FormGroup>
                    <label htmlFor="adultCount">성인 인원: <span style={{color: 'red'}}>(필수: 성인/아동 총 1명 이상)</span></label>
                    <input
                        type="number"
                        id="adultCount"
                        name="adultCount"
                        min="0"
                        value={customizeConditions.adultCount} // 0일 때 빈 값으로 표시하지 않고 0으로 표시
                        onChange={handlePersonCountChange}
                        required // 필수 필드 표시
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="childCount">아동 인원: <span style={{color: 'red'}}>(필수: 성인/아동 총 1명 이상)</span></label>
                    <input
                        type="number"
                        id="childCount"
                        name="childCount"
                        min="0"
                        value={customizeConditions.childCount} // 0일 때 빈 값으로 표시하지 않고 0으로 표시
                        onChange={handlePersonCountChange}
                        required // 필수 필드 표시
                    />
                    {validationErrors.personCount && <ErrorMessage>{validationErrors.personCount}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                    <label htmlFor="minPrice">최소 가격 (원): <span style={{color: 'red'}}>(필수 : 10만단위로 입력해주세요)</span></label>
                    <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        min="0"
                        value={customizeConditions.minPrice === 0 ? '' : customizeConditions.minPrice} // 0이면 빈 값으로 표시
                        onChange={handlePriceChange}
                        step="100000"
                        required // 필수 필드 표시
                    />
                    {validationErrors.minPrice && <ErrorMessage>{validationErrors.minPrice}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                    <label htmlFor="maxPrice">최대 가격 (원): <span style={{color: 'red'}}>(필수 : 10만단위로 입력해주세요)</span></label>
                    <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        min="0"
                        value={customizeConditions.maxPrice === 0 ? '' : customizeConditions.maxPrice} // 0이면 빈 값으로 표시
                        onChange={handlePriceChange}
                        step="100000"
                        required // 필수 필드 표시
                    />
                    {validationErrors.maxPrice && <ErrorMessage>{validationErrors.maxPrice}</ErrorMessage>}
                    {validationErrors.price && <ErrorMessage>{validationErrors.price}</ErrorMessage>} {/* 가격 통합 오류 메시지 */}
                </FormGroup>

                <FormGroup>
                    <label htmlFor="productType">여행 타입: <span style={{color: 'red'}}>(필수)</span></label>
                    <select
                        id="productType" // productTypes 대신 productType 사용
                        name="productType" // productTypes 대신 productType 사용
                        value={customizeConditions.productType || ''} // 단일 값으로 변경
                        onChange={handleProductTypeChange}
                        required // 필수 필드 표시
                    >
                        <option value="">여행 타입 선택</option>
                        {productType.map(type => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                    {validationErrors.productType && <ErrorMessage>{validationErrors.productType}</ErrorMessage>}
                </FormGroup>


                <SubmitButton type="submit">
                    조건 검색
                </SubmitButton>
            </form>
        </FormContainer>
    );
}
export default CustomizeCom;