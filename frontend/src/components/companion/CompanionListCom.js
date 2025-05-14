import React from "react";
import {
    Container,
    PageTitle,
    CompanionTable,
    ButtonContainer,
    StyledLink,
    PagingWrapper,
    PagingButton
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
                              itemsPerPage = 10 // 페이지 당 아이템 수, 번호 매기기에 사용
                          }) {

    const renderPagination = () => {
        if (totalPages === 0) return null;
        const pages = [];
        for (let i = 0; i < totalPages; i++) {
            pages.push(
                <PagingButton
                    key={i}
                    onClick={() => onPageChange(i)}
                    active={currentPage === i}
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
    const canCreatePost = roles.includes("ROLE_ADMIN") || roles.includes("ROLE_USER");


    return (
        <Container>
            <PageTitle>커뮤니티 게시판</PageTitle>
            {canCreatePost && (
                <ButtonContainer>
                    <StyledLink to="/community/companion/new">등록</StyledLink>
                </ButtonContainer>
            )}
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
                        <tr key={companion.companionId} onClick={() => onRowClick(companion.companionId)}>
                            <td>
                                {index + 1 + (currentPage * itemsPerPage)}
                            </td>
                            <td>{companion.companionTitle}</td>
                            <td style={{ display: 'flex', alignItems: 'center' }}> {/* 작성자 셀 스타일 추가 */}
                                <img
                                    src={companion.authorProfileImageUrl || DEFAULT_PROFILE_IMAGE}
                                    alt={`${companion.authorName || '익명'} 프로필`}
                                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                                />
                                {companion.authorName || '익명'}
                            </td>


                            <td>{new Date(companion.companionCreatedAt).toLocaleDateString()}</td>
                            <td>{companion.companionViewCount}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>게시글이 없습니다.</td>
                    </tr>
                )}
                </tbody>
            </CompanionTable>
            {renderPagination()}
        </Container>
    );
}

export default CompanionListCom;