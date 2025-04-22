import logo from './logo.svg';
import './App.css';
import MyReviewPage from "./pages/mypages/MyReviewPage";
import {Route, Routes} from "react-router-dom";
import HeaderCom from "./components/common/HeaderCom";
import IndexPage from "./pages/IndexPage";
import LikePage from "./pages/LikePage";
import MyPage from "./pages/mypages/MyPage";
import MyReservationPage from "./pages/mypages/MyReservationPage";

function App() {
  return (
      <div className="App">
        <Routes>
          <Route element={<HeaderCom />} />
          <Route path="/" element={<IndexPage />} />
          <Route path="/like" element={<LikePage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/myreservation" element={<MyReservationPage />} />
          <Route path="/myreview" element={<MyReviewPage />} />
        </Routes>
      </div>
  );
}

export default App;
