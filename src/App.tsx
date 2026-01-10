import "./App.css";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { ToastContainer } from "./components/common/Toast";
import { PageSpinner } from "./components/common/Spinner";

// Lazy-loaded pages for better performance
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SuccessPage = lazy(() => import("./pages/HomePage/SuccessPage"));
const AuthCallback = lazy(() => import("./pages/LoginPage/AuthCallback"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const Survey = lazy(() => import("./pages/PickPage/survey"));
const Swipe = lazy(() => import("./pages/PickPage/swipe"));
const PickLoadingPage = lazy(() => import("./pages/PickPage/PickLoading"));
const RecommendPage = lazy(() => import("./pages/RecommendPage/RecommendPage"));
const ArchivePage = lazy(() => import("./pages/ArchivePage/ArchivePage"));
const MemoryDetailPage = lazy(() => import("./pages/ArchivePage/MemoryDetailPage"));

function App() {
  return (
    <>
      <Suspense fallback={<PageSpinner />}>
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
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
