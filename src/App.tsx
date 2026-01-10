import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthCallback from "./pages/LoginPage/AuthCallback";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "../src/components/Layout/Layout";
import Survey from "./pages/PickPage/survey";
import RecommendPage from "./pages/RecommendPage/RecommendPage";

/*import Swipe from "./pages/pick/swipe";
import Result from "./pages/pick/result";
import RefinedSwipe from "./pages/pick/refinedSwipe";
import Archive from "./pages/archive";
import IconCalendar from "./pages/archive/iconCalendar";
import RecordList from "./pages/archive/recordList";
import DetailPopup from "./pages/archive/detailPopup";*/

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pick/" element={<Survey />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/pick/result" element={<RecommendPage />} />
        {/*
        <Route path="/pick/swipe" element={<Swipe />} />
        <Route path="/pick/result" element={<Result />} />
        <Route path="/pick/refinedSwipe" element={<RefinedSwipe />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/archive/iconCalendar" element={<IconCalendar />} />
        <Route path="/archive/recordList" element={<RecordList />} />
        <Route path="/archive/detailPopup" element={<DetailPopup />} />
        */}
      </Route>
    </Routes>
  );
}

export default App;
