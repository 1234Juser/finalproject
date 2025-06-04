import {containerStyle, mainStyle, sidebarStyle} from "../../style/member/MyPageStyle";
import AdminSideBarPage from "../../pages/common/AdminSideBarPage";
import {
    StyledTable,
    TableContainer,
    PaginationContainer,
    NavButton, ImageButton, DivContainer
} from "../../style/product/StyledProductAllAdmin";
import {Link} from "react-router-dom";
import {StyledTitle} from "../../style/product/StyleProductReg";

function ProductAllAdminCom({products, handlePrev, handleNext, renderPageButtons, pageRange, totalPages, onDelete,
                            handleFirst, handleLast, currentPage}) {

    const handleImagePopup = (imageUrl) => {
        // 팝업 창 옵션 설정
        const popupWidth = 800;
        const popupHeight = 600;
        const left = (window.screen.width / 2) - (popupWidth / 2);
        const top = (window.screen.height / 2) - (popupHeight / 2);

        // 새 팝업 창 열기
        // 두 번째 인자는 창 이름, 세 번째 인자는 창 옵션
        const newWindow = window.open('', '_blank',
            `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes`);

        if (newWindow) {
            // 새 창에 HTML 콘텐츠 추가
            newWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>상품 이미지</title>
                    <style>
                        body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f0f0f0; }
                        img { max-width: 95%; max-height: 95vh; border: 1px solid #ccc; box-shadow: 0 0 10px rgba(0,0,0,0.2); }
                    </style>
                </head>
                <body>
                    <img src="${imageUrl}" alt="Product Image" />
                </body>
                </html>
            `);
            newWindow.document.close(); // 문서 작성을 완료합니다.
        } else {
            alert('팝업 차단 기능 때문에 창을 열 수 없습니다. 팝업 차단을 해제해주세요.');
        }
    };


    return (
        <div style={containerStyle}>
            <aside style={sidebarStyle}>
                <AdminSideBarPage />
            </aside>
            <main style={mainStyle}>
                <StyledTitle>전체 상품 목록</StyledTitle>

                <DivContainer>
                    <div>
                        <ul>
                            <li>제목을 클릭하면 상품을 수정할 수 있습니다.</li>
                            <li>★ 신규 국가/도시 투어 등록은 개발팀에게 문의하세요 ★</li>
                        </ul>
                    </div>
                    <ImageButton onClick={() => handleImagePopup('/static/img/product/table.png')}>
                        국가/도시 코드
                    </ImageButton>
                </DivContainer>
                <TableContainer>
                    <StyledTable>
                        <thead>
                        <tr>
                            <th>CODE</th>
                            <th>UID</th>
                            <th>Country Id</th>
                            <th>City Id</th>
                            <th>Theme</th>
                            <th>Product Title</th>
                            <th>Adult</th>
                            <th>Kids</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Min</th>
                            <th>Max</th>
                            <th>Status</th>
                            <th>Review</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((p, i) => (
                            <tr key={p.productCode}>
                                <td>{p.productCode}</td>
                                <td>{p.productUid}</td>
                                <td>{p.countryId}</td>
                                <td>{p.cityId}</td>
                                <td>{p.themeCode}</td>
                                <td>
                                    <Link
                                        to={`/admin/productEdit/${p.productUid}`}
                                        style={{color: 'blue'}}
                                    >{p.productTitle}
                                    </Link>
                                </td>
                                <td>{p.productAdult.toLocaleString()}</td>
                                <td>{p.productChild.toLocaleString()}</td>
                                <td>{p.productStartDate}</td>
                                <td>{p.productEndDate}</td>
                                <td>{p.productMinParticipants}</td>
                                <td>{p.productMaxParticipants}</td>
                                <td>{p.productStatus}</td>
                                <td>{p.reviewCount}</td>
                                <td>
                                <span
                                    onClick={() => onDelete(p.productUid)}
                                    style={{color: 'red', cursor: "pointer"}}
                                >
                                    삭제
                                </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </StyledTable>
                </TableContainer>
                <PaginationContainer>
                    <NavButton onClick={handleFirst} disabled={currentPage === 1}>
                        |&lt;
                    </NavButton>
                    <NavButton onClick={handlePrev} disabled={pageRange.start === 1}>
                        &lt;&lt;
                    </NavButton>
                    {renderPageButtons()}
                    <NavButton onClick={handleNext} disabled={pageRange.end === totalPages}>
                        &gt;&gt;
                    </NavButton>
                    <NavButton onClick={handleLast} disabled={currentPage === totalPages}>
                        &gt;|
                    </NavButton>
                </PaginationContainer>
            </main>
        </div>
    )
}

export  default ProductAllAdminCom;
