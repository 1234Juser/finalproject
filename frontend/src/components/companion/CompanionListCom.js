import React, { useState, useEffect, useRef } from "react";
import { FaCaretDown, FaBullhorn } from "react-icons/fa"; // FaBullhorn 아이콘 추가 (공지용)
import {
    Container,
    PageTitle,
    CompanionTable,
    ButtonContainer,
    StyledLink,
    PagingWrapper,
    PagingButton,
    SearchContainer,
    SearchInputContainer,
    SearchForm,
    SearchInput,
    StyledFaSearch,
    SearchOptionsContainer,
    ToggleButton,
    DropdownMenu,
    DropdownItem,
    NoticeBadge // 공지사항 뱃지 스타일 (CompanionListStyle.js에 추가 필요)
} from "../../style/companion/CompanionListStyle";

const DEFAULT_PROFILE_IMAGE = "/img/default-profile.jpg";

function CompanionListCom({
                              loading,
                              error,
                              companions,
                              currentPage,
                              totalPages,
                              onRowClick,
                              onPageChange,
                              itemsPerPage = 10,
                              searchKeyword,
                              onSearchChange,
                              onSearchSubmit,
                              searchType,
                              onSearchTypeChange
                          }) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleSearchTypeSelect = (type) => {
        onSearchTypeChange(type);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


    const renderPagination = () => {
        if (totalPages === 0) return null;
        const pages = [];
        for (let i = 0; i < totalPages; i++) {
            pages.push(
                <PagingButton
                    key={i}
                    onClick={() => onPageChange(i)}
                    $active={currentPage === i} // active -> $active 로 변경
                >
                    {i + 1}
                </PagingButton>
            );
        }
        return (
            <PagingWrapper>
                <PagingButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>
                    이전
                </PagingButton>
                {pages}
                <PagingButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1 || totalPages === 0}>
                    다음
                </PagingButton>
            </PagingWrapper>
        );
    };


    if (loading) return <Container><p>로딩 중...</p></Container>;
    if (error) return <Container><p>{error}</p></Container>;

    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
    const loginType = localStorage.getItem("loginType");

    const canCreatePost = roles.includes("ROLE_ADMIN") || roles.includes("ROLE_USER") || loginType === "kakao" || loginType === "google";

    const handleIconClickSearch = (e) => {
        e.preventDefault();
        onSearchSubmit(e);
    };

    const Palette = {
        blue: "#198dbb", // 예시 색상, 실제 Palette 객체 값 사용
        // ... 기타 필요한 색상들
    };


    return (
        <Container>
            <PageTitle>커뮤니티 게시판</PageTitle>
            <SearchContainer>
                <SearchInputContainer>
                    <SearchForm onSubmit={onSearchSubmit}>
                        <StyledFaSearch onClick={handleIconClickSearch} />
                        <SearchInput
                            type="text"
                            placeholder="검색어를 입력하세요"
                            value={searchKeyword}
                            onChange={onSearchChange}
                        />
                    </SearchForm>
                    <SearchOptionsContainer ref={dropdownRef}>
                        <ToggleButton onClick={toggleDropdown}>
                            {searchType === "title" ? "제목" : "작성자"}
                            <FaCaretDown style={{ marginLeft: '5px' }} />
                        </ToggleButton>
                        {isDropdownOpen && (
                            <DropdownMenu>
                                <DropdownItem onClick={() => handleSearchTypeSelect("title")}>
                                    제목
                                </DropdownItem>
                                <DropdownItem onClick={() => handleSearchTypeSelect("author")}>
                                    작성자
                                </DropdownItem>
                            </DropdownMenu>
                        )}
                    </SearchOptionsContainer>
                </SearchInputContainer>
                {canCreatePost && (
                    <ButtonContainer style={{ margin: 0 }}>
                        <StyledLink to="/community/companion/new">등록</StyledLink>
                    </ButtonContainer>
                )}
            </SearchContainer>

            <CompanionTable>
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회수</th>
                </tr>
                </thead>
                <tbody>
                {companions.length > 0 ? (
                    companions.map((companion, index) => (
                        <tr
                            key={companion.companionId}
                            onClick={() => onRowClick(companion.companionId)}
                            className={companion.companionNotice ? 'notice-row' : ''}
                        >
                            <td>
                                {companion.companionNotice ? (
                                    <FaBullhorn style={{ color: Palette.blue, marginRight: '5px' }} />
                                ) : (
                                    index + 1 + (currentPage * itemsPerPage)
                                )}
                            </td>
                            <td>
                                {companion.companionNotice && <NoticeBadge>[공지]</NoticeBadge>}
                                {companion.companionTitle}
                            </td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={companion.authorProfileImageUrl || DEFAULT_PROFILE_IMAGE}
                                        alt={`${companion.authorName || '익명'} 프로필`}
                                        style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                                    />
                                    {companion.authorName || '익명'}
                                </div>
                            </td>
                            <td>{new Date(companion.companionCreatedAt).toLocaleDateString()}</td>
                            <td>{companion.companionViewCount}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>
                            {"검색 결과가 없습니다."}
                        </td>
                    </tr>
                )}
                </tbody>
            </CompanionTable>
            {renderPagination()}
        </Container>
    );
}

export default CompanionListCom;