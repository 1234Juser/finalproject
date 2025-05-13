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
import ProductRegPage from './pages/product/ProductRegPage';
import WishGroupPage from "./pages/wish/WishGroupPage";
import WishListPage from "./pages/wish/WishListPage";
import {ToastContainer} from "react-toastify";
import GoogleCallbackPage from "./pages/member/GoogleCallbackPage";
import AdminMemberListPage from "./pages/member/AdminMemberListPage";
import EventListPage from "./pages/event/EventListPage";
import EventRegisterPage from "./pages/event/EventRegisterPage";
import EventDetailPage from "./pages/event/EventDetailPage";
import AdminBookingPage from "./pages/reservation/AdminBookingPage";
import EventRegisterCon from "./containers/event/EventRegisterCon";
import MyBookingPage from "./pages/reservation/MyBookingPage";
import ProductAllAdminPage from './pages/product/ProductAllAdminPage';
import FaqListPage from "./pages/faq/FaqListPage";
import FaqRegisterPage from "./pages/faq/FaqRegisterPage";
import FaqEditCon from "./containers/faq/FaqEditCon";
import AdminReviewPage from "./pages/review/AdminReviewPage";
import AdminBookingByProductPage from "./pages/reservation/AdminBookingByProductPage";
import MyReviewFormPage from "./pages/review/MyReviewFormPage";
import SearchProductPage from "./pages/search/SearchProductPage";
import AdminRealTimePage from "./pages/realtime/AdminRealTimePage";
import TripBuddyPage from "./pages/community/tripbuddy/TripBuddyPage";
import ChatMainPage from "./pages/community/chat/ChatMainPage";
import CommunityLayout from "./style/community/CommunityLayout";
import CompanionListPage from "./pages/companion/CompanionListPage";
import CompanionRegisterPage from "./pages/companion/CompanionRegisterPage";
import CompanionDetailPage from "./pages/companion/CompanionDetailPage";
import CompanionEditPage from "./pages/companion/CompanionEditPage";

function App() {
    return (
        <div className="main-content">
            <HeaderCon /> {/* 항상 헤더/네비가 상단에 고정 */}

          <Routes>
              <Route path="/" element={<MainPage />} />
              {/*이벤트페이지*/}
              <Route path="/event" element={<EventListPage/>}/>
              <Route path="/event/register" element={<EventRegisterPage />} />
              <Route path="/event/:id" element={<EventDetailPage />} />
              <Route path="/event/edit/:id" element={<EventRegisterCon />} />
              {/*faq페이지*/}
              <Route path="/faq" element={<FaqListPage/>}/>
              <Route path="/faq/register" element={<FaqRegisterPage />} />
              <Route path="/faq/edit/:faqCode" element={<FaqEditCon />} />
              {/*검색어리스트창*/}
              <Route path="/search" element={<SearchProductPage />} />
              {/*실시간조회수*/}
              <Route path="/realtime" element={<AdminRealTimePage />} />



              {/*회원가입/로그인*/}
                <Route path="/registerselect" element={<RegisterMethodSelectPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/oauth/kakao/callback" element={<KakaoCallbackPage />} />
                <Route path="/oauth/google/callback" element={<GoogleCallbackPage />} />
                {/*<Route path="/my/review" element={<MyReviewPage />} />*/}
                <Route path="/wish/groups" element={<WishGroupPage />} />
                <Route path="/wish/groups/:groupCode/items" element={<WishListPage />} />

                {/*  회원마이페이지*/}
                <Route path="/mypage">
                    <Route path="" element={<MyPagePage />} />
                    <Route path="withdrawl" element={<WithdrawlPage />} />
                </Route>
                <Route path="/my/reservations" element={<MyBookingPage />} />
                <Route path="/review/write/:orderCode" element={<MyReviewFormPage />} />

                {/*관리자마이페이지*/}
                <Route path="/adminmypage" element={<AdminMyPagePage />} />
                <Route path="/admin">
                    <Route path="memberSearch" element={<AdminMemberListPage />} />
                    <Route path="productAll" element={<ProductAllAdminPage/>}/>
                    <Route path="productReg" element={<ProductRegPage/>} />
                    <Route path="productEdit/:productUid" element={<ProductRegPage/>} />
                </Route>
                <Route path="/admin/booking" element={<AdminBookingPage />} />
                <Route path="/admin/booking/by-product" element={<AdminBookingByProductPage />} />
                <Route path="/admin/review" element={<AdminReviewPage />} />

                {/*네비게이션*/}
                <Route path="/domestic" element={<DomesticPage/>}/>
                <Route path="/international" element={<InternationalPage />} />
                <Route path="/products">
                    <Route path="country" element={<ProductPage />} />
                    <Route path="city" element={<ProductPage />} />
                    <Route path=":productUid" element={<ProductDetailPage/>} />
                </Route>

                {/*커뮤니티*/}
                <Route path="/community" element={<CommunityLayout />} >
                    <Route index element={<TripBuddyPage />} />
                    <Route path="companion" element={<CompanionListPage/>}/>
                    <Route path="companion/new" element={<CompanionRegisterPage/>}/>
                    <Route path="companion/:companionId" element={<CompanionDetailPage />} />
                    <Route path="companion/edit/:companionId" element={<CompanionEditPage />} />
                    <Route path="chat" element={<ChatMainPage/>}/>
                </Route>

            </Routes>
            <FooterCom/>
            {/* 토스트 창 : 찜하기 완료 후 사용 */}
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
}

export default App;