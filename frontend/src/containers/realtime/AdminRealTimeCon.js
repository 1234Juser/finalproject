// src/containers/realtime/AdminRealTimeCon.js
import React, { useEffect, useState } from "react";
import AdminSideBarCon from "../../containers/common/AdminSideBarCon";
import { containerStyle, sidebarStyle } from "../../style/member/AdminMemberListStyle";
import AdminRealTimeCom from "../../components/realtime/AdminRealTimeCom";
import axios from "axios";

function AdminRealTimeCon() {
    const [cityViewCounts, setCityViewCounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCityViewCounts = async () => {
            try {
                const response = await axios.get("/city/all-view-counts");
                const sortedCities = response.data.sort((a, b) => b.viewCount - a.viewCount);
                setCityViewCounts(sortedCities);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
                console.error("도시 조회수 데이터 가져오기 오류:", err);
            }
        };

        fetchCityViewCounts();
    }, []);

    if (loading) {
        // 사이드바 레이아웃 유지를 위해 로딩 중에도 컨테이너 구조는 유지합니다.
        return (
            <div style={containerStyle}>
                <aside style={sidebarStyle}>
                    <AdminSideBarCon />
                </aside>
                <div style={{ flexGrow: 1, padding: '20px' }}>로딩 중...</div>
            </div>
        );
    }

    if (error) {
        // 사이드바 레이아웃 유지를 위해 에러 발생 시에도 컨테이너 구조는 유지합니다.
        return (
            <div style={containerStyle}>
                <aside style={sidebarStyle}>
                    <AdminSideBarCon />
                </aside>
                <div style={{ flexGrow: 1, padding: '20px' }}>데이터를 가져오는 중 오류가 발생했습니다: {error.message}</div>
            </div>
        );
    }

    return (
        <div style={containerStyle}> {/* AdminMemberListStyle의 containerStyle 적용 */}
            <aside style={sidebarStyle}> {/* AdminMemberListStyle의 sidebarStyle 적용 */}
                <AdminSideBarCon />
            </aside>
            {/* AdminRealTimeCom에 데이터만 전달 */}
            <AdminRealTimeCom cityViewCounts={cityViewCounts} />
        </div>
    );
}

export default AdminRealTimeCon;