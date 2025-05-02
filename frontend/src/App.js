import './App.css';
import {Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
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
import WishListPage from "./pages/wish/WishListPage";
import {ToastContainer} from "react-toastify";
import GoogleCallbackPage from "./pages/member/GoogleCallbackPage";
import WishListPage from "./pages/wish/WishListPage";

function App() {
  return (
      <div className="main-content">
          <HeaderCon /> {/* 항상 헤더/네비가 상단에 고정 */}

          <Routes>
              <Route path="/" element={<MainPage />} />
              {/*회원가입/로그인*/}
              <Route path="/registerselect" element={<RegisterMethodSelectPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/oauth/kakao/callback" element={<KakaoCallbackPage />} />
              <Route path="/oauth/google/callback" element={<GoogleCallbackPage />} />
          {/*<Route path="/myreview" element={<MyReviewPage />} />*/}
              <Route path="/wish/groups" element={<WishGroupPage />} />
              <Route path="/wish/groups/:groupCode/items" element={<WishListPage />} />
                <Route path="/wish/groups" element={<WishGroupPage />} />
                <Route path="/wish/groups/:groupCode/items" element={<WishListPage />} />


              {/*  회원마이페이지*/}
              <Route path="/mypage">
                <Route path="" element={<MyPagePage />} />
                <Route path="withdrawl" element={<WithdrawlPage />} />
              </Route>
              {/*관리자마이페이지*/}
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
          {/* 토스트 창 : 찜하기 완료 후 사용 */}
          <ToastContainer position="top-center" autoClose={2000} />
      </div>
  );
}

export default App;
