import './App.css';
import {Route, Routes} from "react-router-dom";
import HeaderCom from "./components/common/HeaderCom";
import RegisterPage from "./pages/member/RegisterPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
      <div className="main-content">
          <HeaderCom /> {/* 항상 헤더/네비가 상단에 고정 */}

          <Routes>
             <Route path="/" element={<MainPage />} />
             <Route path="/register" element={<RegisterPage />} />


              {/*<Route path="/" element={<IndexPage />} />*/}
          {/*<Route path="/like" element={<LikePage />} />*/}
          {/*<Route path="/my" element={<MyPage />} />*/}
          {/*<Route path="/myreservation" element={<MyReservationPage />} />*/}
          {/*<Route path="/myreview" element={<MyReviewPage />} />*/}
        </Routes>
      </div>
  );
}

export default App;
