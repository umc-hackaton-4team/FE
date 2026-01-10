import "./App.css";
import { Routes, Route } from "react-router-dom";

/*import LoginPage from "./pages/LoginPage/Loginpage";
import Swipe from "./pages/pick/swipe";
import Result from "./pages/pick/result";
import RefinedSwipe from "./pages/pick/refinedSwipe";
import Archive from "./pages/archive";
import IconCalendar from "./pages/archive/iconCalendar";
import RecordList from "./pages/archive/recordList";
import DetailPopup from "./pages/archive/detailPopup";*/
import HomePage from "./pages/HomePage/HomePage";
import Layout from "../src/components/Layout/Layout";
import Survey from "./pages/PickPage/survey";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pick/" element={<Survey />} />
        {/*
        <Route path="/login" element={<LoginPage />} />
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
