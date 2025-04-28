import './App.css';
import {Route, Routes} from "react-router-dom";
import DomesticCon from "./containers/DomesticCon";
import RegisterPage from "./pages/member/RegisterPage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/member/LoginPage";
import MyPagePage from "./pages/member/MyPagePage";
import FooterCom from './components/common/FooterCom';
import HeaderCon from "./containers/common/HeaderCon";
import AdminMyPagePage from "./pages/member/AdminMyPagePage";

function App() {
  return (
      <div className="main-content">
          <HeaderCon /> {/* 항상 헤더/네비가 상단에 고정 */}

          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              {/*<Route path="/" element={<IndexPage />} />*/}
          {/*<Route path="/like" element={<LikePage />} />*/}
          <Route path="/mypage" element={<MyPagePage />} />
              <Route path="/adminmypage" element={<AdminMyPagePage />} />

              {/*<Route path="/myreservation" element={<MyReservationPage />} />*/}
          {/*<Route path="/myreview" element={<MyReviewPage />} />*/}
            <Route path="/domestic" element={<DomesticCon />} />
        </Routes>
        <FooterCom/>
      </div>
  );
}

export default App;
