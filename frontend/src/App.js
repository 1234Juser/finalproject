import './App.css';
import {Route, Routes} from "react-router-dom";
import DomesticPage from './pages/product/DomesticPage';
import RegisterPage from "./pages/member/RegisterPage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/member/LoginPage";
import MyPagePage from "./pages/member/MyPagePage";
import FooterCom from './components/common/FooterCom';
import HeaderCon from "./containers/common/HeaderCon";
import AdminMyPagePage from "./pages/member/AdminMyPagePage";
import InternationalPage from './pages/product/InternationalPage';
import ProductPage from './pages/product/ProductPage';

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
            <Route path="/domestic" element={<DomesticPage/>}/>
              <Route path="/international" element={<InternationalPage />} />
              <Route path="/products">
                <Route path="country" element={<ProductPage />} />
                <Route path="city" element={<ProductPage />} />
              </Route>
              
        </Routes>
        <FooterCom/>
      </div>
  );
}

export default App;
