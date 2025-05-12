import {containerStyle, mainStyle, sidebarStyle} from "../../style/member/MyPageStyle";
import AdminSideBarPage from "../../pages/common/AdminSideBarPage";
import {StyledTable, TableContainer, PaginationContainer, NavButton} from "../../style/product/StyledProductAllAdmin";
import {Link} from "react-router-dom";

function ProductAllAdminCom({products, handlePrev, handleNext, renderPageButtons, pageRange, totalPages, onDelete}) {

    return (
        <div style={containerStyle}>
            <aside style={sidebarStyle}>
                <AdminSideBarPage />
            </aside>
            <main style={mainStyle}>
                <h1>전체 상품 목록</h1>
                <hr />
                <PaginationContainer>
                    <NavButton onClick={handlePrev} disabled={pageRange.start === 1}>
                        &lt;&lt;
                    </NavButton>
                    {renderPageButtons()}
                    <NavButton onClick={handleNext} disabled={pageRange.end === totalPages}>
                        &gt;&gt;
                    </NavButton>
                </PaginationContainer>
                <div>
                    <ul>
                        <li>제목을 클릭하면 상품을 수정할 수 있습니다.</li>
                        <li>★ 신규 국가/도시 투어 등록은 개발팀에게 문의하세요 ★</li>
                    </ul>
                </div>
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
                            <th>Type</th>
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
                                <td>{p.productType}</td>
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
            </main>
        </div>
    )
}

export  default ProductAllAdminCom;
