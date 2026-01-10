import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SuccessPage from "./pages/HomePage/SuccessPage";
import AuthCallback from "./pages/LoginPage/AuthCallback";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Survey from "./pages/PickPage/survey";
import Swipe from "./pages/PickPage/swipe";
import PickLoadingPage from "./pages/PickPage/PickLoading";
import RecommendPage from "./pages/RecommendPage/RecommendPage";
import ArchivePage from "./pages/ArchivePage/ArchivePage";
import MemoryDetailPage from "./pages/ArchivePage/MemoryDetailPage";
import { ToastContainer } from "./components/common/Toast";

function App() {
  return (
    <>
      <Routes>
        {/* 공개 라우트 */}
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Route>

        {/* 인증 필요 라우트 */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/todaycandy" element={<SuccessPage />} />
            <Route path="/pick" element={<Survey />} />
            <Route path="/pick/swipe" element={<Swipe />} />
            <Route path="/pick/result" element={<RecommendPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/archive/:memoryId" element={<MemoryDetailPage />} />
          </Route>
          <Route path="/pick/loading" element={<PickLoadingPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
