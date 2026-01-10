import "./App.css";
import { Routes, Route } from "react-router-dom";

/*import LoginPage from "./pages/LoginPage/Loginpage";
import HomePage from "./pages/HomePage/HomePage";
import Survey from "./pages/pick/survey";
import Swipe from "./pages/pick/swipe";
import Result from "./pages/pick/result";
import RefinedSwipe from "./pages/pick/refinedSwipe";
import Archive from "./pages/archive";
import IconCalendar from "./pages/archive/iconCalendar";
import RecordList from "./pages/archive/recordList";
import DetailPopup from "./pages/archive/detailPopup";*/
import Footer from "./components/Layout/Footer"
function App() {
  return (
    <Routes>
      <Route path="/footer" element={<Footer />} />{/*
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/pick/survey" element={<Survey />} />
      <Route path="/pick/swipe" element={<Swipe />} />
      <Route path="/pick/result" element={<Result />} />
      <Route path="/pick/refinedSwipe" element={<RefinedSwipe />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/archive/iconCalendar" element={<IconCalendar />} />
      <Route path="/archive/recordList" element={<RecordList />} />
      <Route path="/archive/detailPopup" element={<DetailPopup />} />*/}
    </Routes>
  );
}

export default App;
