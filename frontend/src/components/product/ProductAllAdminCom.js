import {containerStyle, mainStyle, sidebarStyle} from "../../style/member/MyPageStyle";
import AdminSideBarPage from "../../pages/common/AdminSideBarPage";
import {StyledTable, TableContainer} from "../../style/product/StyledProductAllAdmin";
import {Link} from "react-router-dom";

function ProductAllAdminCom({products}) {

    return (
        <div style={containerStyle}>
            <aside style={sidebarStyle}>
                <AdminSideBarPage />
            </aside>
            <main style={mainStyle}>
                <h1>전체 상품 목록</h1>
                <hr />
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
                        <th>Min Parti</th>
                        <th>Max Parti</th>
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
                            <td>{p.productAdult}</td>
                            <td>{p.productChild}</td>
                            <td>{p.productStartDate}</td>
                            <td>{p.productEndDate}</td>
                            <td>{p.productMinParticipants}</td>
                            <td>{p.productMaxParticipants}</td>
                            <td>{p.productStatus}</td>
                            <td>{p.productType}</td>
                            <td>{p.reviewCount}</td>
                            <td>
                                <a
                                    href={`/delete/${p.productCode}`}
                                    style={{color: 'red'}}
                                >
                                    삭제
                                </a>
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