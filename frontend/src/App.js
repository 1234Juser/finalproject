import './App.css';
import {Route, Routes} from "react-router-dom";
import HeaderCom from "./components/common/HeaderCom";

function App() {
  return (
      <div className="App">
        <Routes>
           <Route path="/" element={<HeaderCom />} />
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
