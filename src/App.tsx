import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Home from "./pages/home";
import SurveyA from "./pages/pick/surveyA";
import SurveyB from "./pages/pick/surveyB";
import Swipe from "./pages/pick/swipe";
import Result from "./pages/pick/result";
import RefinedSwipe from "./pages/pick/refinedSwipe";
import Archive from "./pages/archive";
import IconCalendar from "./pages/archive/iconCalendar";
import RecordList from "./pages/archive/recordList";
import DetailPopup from "./pages/archive/detailPopup";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/pick/surveyA" element={<SurveyA />} />
      <Route path="/pick/surveyB" element={<SurveyB />} />
      <Route path="/pick/swipe" element={<Swipe />} />
      <Route path="/pick/result" element={<Result />} />
      <Route path="/pick/refinedSwipe" element={<RefinedSwipe />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/archive/iconCalendar" element={<IconCalendar />} />
      <Route path="/archive/recordList" element={<RecordList />} />
      <Route path="/archive/detailPopup" element={<DetailPopup />} />

    </Routes>
  );
}

export default App;
