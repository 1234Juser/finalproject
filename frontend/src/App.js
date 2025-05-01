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
import ProductDetailPage from './pages/product/ProductDetailPage';
import WithdrawlPage from "./pages/member/WithdrawlPage";
import RegisterMethodSelectPage from "./pages/member/RegisterMethodSelectPage";
import KakaoCallbackPage from "./pages/member/KakaoCallbackPage";
// import ProductRegPage from './pages/product/ProductRegPage';
import WishGroupPage from "./pages/wish/WishGroupPage";
import GoogleCallbackPage from "./pages/member/GoogleCallbackPage";
// import WishListPage from "./pages/wish/WishListPage";

function App() {
  return (
      <div className="main-content">
          <HeaderCon /> {/* 항상 헤더/네비가 상단에 고정 */}

          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/registerselect" element={<RegisterMethodSelectPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/oauth/kakao/callback" element={<KakaoCallbackPage />} />
              <Route path="/oauth/google/callback" element={<GoogleCallbackPage />} />
              {/*<Route path="/" element={<IndexPage />} />*/}
          {/*<Route path="/like" element={<LikePage />} />*/}
              

              {/*<Route path="/myreservation" element={<MyReservationPage />} />*/}
          {/*<Route path="/myreview" element={<MyReviewPage />} />*/}
          <Route path="/wish/groups/:memberCode" element={<WishGroupPage />} />
          {/*<Route path="/wish/groups/:groupCode/items" element={<WishListPage />} />*/}
              <Route path="/mypage">e
                <Route path="" element={<MyPagePage />} />
                <Route path="withdrawl" element={<WithdrawlPage />} />
              </Route>
              <Route path="/adminmypage">
                <Route path="" element={<AdminMyPagePage />} />
                {/*<Route path="product" element={<ProductRegPage/>} />*/}
              </Route>
            <Route path="/domestic" element={<DomesticPage/>}/>
              <Route path="/international" element={<InternationalPage />} />
              <Route path="/products">
                <Route path="country" element={<ProductPage />} />
                <Route path="city" element={<ProductPage />} />
                <Route path=":productUid" element={<ProductDetailPage/>} />
              </Route>

        </Routes>
        <FooterCom/>
      </div>
  );
}

export default App;
