import {containerStyle, mainStyle, sidebarStyle} from "../../style/member/MyPageStyle";
import AdminSideBarPage from "../../pages/common/AdminSideBarPage";
import {StyledTable, TableContainer} from "../../style/product/StyledProductAllAdmin";
import {Link} from "react-router-dom";

function ProductAllAdminCom({products, currentPage, totalPages, totalItems, onPageChange, onDelete}) {

    return (
        <div style={containerStyle}>
            <aside style={sidebarStyle}>
                <AdminSideBarPage />
            </aside>
            <main style={mainStyle}>
                <h1>전체 상품 목록</h1>
                <hr />
                    <div style={{ marginTop: "20px", textAlign: "left" }}>
                        <button
                            onClick={() => onPageChange(1)}
                            disabled={currentPage === 1}
                            style={{
                                margin: "0 5px",
                                padding: "5px 10px",
                                backgroundColor: currentPage === 1 ? "lightgray" : "white",
                                border: "1px solid black",
                                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                            }}
                        >
                            {"<<"}
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => onPageChange(index + 1)}
                                style={{
                                    margin: "0 5px",
                                    padding: "5px 10px",
                                    backgroundColor: currentPage === index + 1 ? "lightgray" : "white",
                                    border: "1px solid black",
                                    cursor: currentPage === index + 1 ? "not-allowed" : "pointer",
                                }}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            style={{
                                margin: "0 5px",
                                padding: "5px 10px",
                                backgroundColor: currentPage === totalPages ? "lightgray" : "white",
                                border: "1px solid black",
                                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                            }}
                        >
                            {">>"}
                        </button>
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
