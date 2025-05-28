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
import ChatRoomPage from "./pages/chat/ChatRoomPage";
import CommunityLayout from "./style/community/CommunityLayout";
import ChatRoomListPage from "./pages/chat/ChatRoomListPage";
import CompanionListPage from "./pages/companion/CompanionListPage";
import CompanionRegisterPage from "./pages/companion/CompanionRegisterPage";
import CompanionDetailPage from "./pages/companion/CompanionDetailPage";
import CompanionEditPage from "./pages/companion/CompanionEditPage";
import MyReviewEditPage from "./pages/review/MyReveiwEditPage";
import AdminReviewByProductPage from "./pages/review/AdminReviewByProductPage";
import OptionFormPage from "./pages/order/OptionFormPage";
import OrderCheckoutPage from "./pages/order/OrderCheckoutPage";
import CompanionMyPagePage from "./pages/companion/CompanionMyPagePage";
import InquiryChatAdminPage from "./pages/inquiry/InquiryChatAdminPage";
import InquiryChatAdminAnswerPage from "./pages/inquiry/InquiryChatAdminAnswerPage";
import PaymentPage from "./pages/payment/PaymentPage";
import CustomizePage from "./pages/customize/CustomizePage";
import CustomizeSearchPage from "./pages/customize/CustomizeSearchPage";
import CompanyPage from "./pages/common/CompanyPage";
import PaymentCompletePage from "./pages/payment/PaymentCompletePage";
import MyReceiptPage from "./pages/reservation/MyReceiptPage";
import CeoPage from "./pages/common/CeoPage";
import PrivateRoute from "./components/PrivateRoute";
import UserOnlyRoute from "./components/UserOnlyRoute";

function App() {
    return (
        <div className="main-content">
            <HeaderCon /> {/* 항상 헤더/네비가 상단에 고정 */}

          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/about" element={<CompanyPage/>}/>
              <Route path="/ceo" element={<CeoPage/>}/>
              {/*이벤트페이지*/}
              <Route path="/event" element={<EventListPage/>}/>
              <Route path="/event/register" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><EventRegisterPage /></PrivateRoute>} />
              <Route path="/event/:id" element={<EventDetailPage />} />
              <Route path="/event/edit/:id" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><EventRegisterCon /></PrivateRoute>} />
              {/*faq페이지*/}
              <Route path="/faq" element={<FaqListPage/>}/>
              <Route path="/faq/register" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><FaqRegisterPage /></PrivateRoute>} />
              <Route path="/faq/edit/:faqCode" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><FaqEditCon /></PrivateRoute>} />
              {/*검색어리스트창*/}
              <Route path="/search" element={<SearchProductPage />} />
              {/*실시간조회수*/}
              <Route path="/realtime" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><AdminRealTimePage /></PrivateRoute>} />
              {/*맞춤여행*/}
              <Route path="/customizedtravel" element={<CustomizePage/>}/>
              <Route path="/search-results" element={<CustomizeSearchPage/>}/>



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
                    <Route path="" element={<UserOnlyRoute><MyPagePage /></UserOnlyRoute>} />
                    <Route path="withdrawl" element={<UserOnlyRoute><WithdrawlPage /></UserOnlyRoute>} />
                    <Route path="community" element={<UserOnlyRoute><CompanionMyPagePage/></UserOnlyRoute>} />
                </Route>
              <Route path="/my/reservations" element={<UserOnlyRoute><MyBookingPage /></UserOnlyRoute>} />
              <Route path="/review/write/:orderCode" element={<UserOnlyRoute><MyReviewFormPage /></UserOnlyRoute>} />
              <Route path="/review/edit/:reviewCode" element={<UserOnlyRoute><MyReviewEditPage /></UserOnlyRoute>} />
              <Route path="/reservations/receipt/:bookingUid" element={<UserOnlyRoute><MyReceiptPage /></UserOnlyRoute>} />


              {/*관리자마이페이지*/}
                <Route path="/adminmypage" element={<AdminMyPagePage />} />
                <Route path="/admin">
                    <Route path="memberSearch" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><AdminMemberListPage /></PrivateRoute>} />
                    <Route path="productAll" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><ProductAllAdminPage/></PrivateRoute>} />
                    <Route path="productReg" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><ProductRegPage/></PrivateRoute>} />
                    <Route path="productEdit/:productUid" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><ProductRegPage/></PrivateRoute>} />
                </Route>
                <Route path="/admin/booking" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><AdminBookingPage /></PrivateRoute>} />
                <Route path="/admin/booking/by-product" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><AdminBookingByProductPage /></PrivateRoute>} />
                <Route path="/admin/review" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><AdminReviewPage /></PrivateRoute>} />
                <Route path="/admin/review/by-product" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><AdminReviewByProductPage /></PrivateRoute>} />
                <Route path="/admin/inquirychat" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><InquiryChatAdminPage/></PrivateRoute>} />
                <Route path="/admin/inquirychat/:inquiryChatId" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><InquiryChatAdminAnswerPage/></PrivateRoute>} />

                {/*네비게이션*/}
                <Route path="/domestic" element={<DomesticPage/>}/>
                <Route path="/international" element={<InternationalPage />} />
                <Route path="/products">
                    <Route path="country" element={<ProductPage />} />
                    <Route path="city" element={<ProductPage />} />
                    <Route path=":productUid" element={<ProductDetailPage/>} />
                </Route>
                <Route path="/products/:productUid/option/create" element={<OptionFormPage/>} />
                <Route path="/products/:productUid/order/create/:optionCode" element={<OrderCheckoutPage/>} />>
                <Route path="/payments/create/:orderCode" element={<PaymentPage />} />
                <Route path="/payments/complete" element={<PaymentCompletePage />} />

              {/*커뮤니티*/}
              <Route path="/community" element={<CommunityLayout />} >
                  <Route index element={<CompanionListPage />} />
                  <Route path="chat" element={<ChatRoomListPage/>}/>
                  <Route path="chat/:roomUid" element={<ChatRoomPage />} />
                  <Route path="companion" element={<CompanionListPage/>}/>
                  <Route path="companion/new" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]["ROLE_USER"]}><CompanionRegisterPage/>/></PrivateRoute>} />
                  <Route path="companion/:companionId" element={<CompanionDetailPage />}/>
                  <Route path="companion/edit/:companionId" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]["ROLE_USER"]}><CompanionEditPage /></PrivateRoute>} />
              </Route>

            </Routes>
            <FooterCom/>
            {/* 토스트 창 : 찜하기 완료 후 사용 */}
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
}

export default App;