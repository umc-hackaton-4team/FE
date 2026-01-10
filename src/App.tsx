import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthCallback from "./pages/LoginPage/AuthCallback";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";
import Survey from "./pages/PickPage/survey";
import Swipe from "./pages/PickPage/swipe";
import PickLoadingPage from "./pages/PickPage/PickLoading";
import ArchivePage from "./pages/ArchivePage/ArchivePage";
import MemoryDetailPage from "./pages/ArchivePage/MemoryDetailPage";
import { ToastContainer } from "./components/common/Toast";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pick" element={<Survey />} />
          <Route path="/pick/swipe" element={<Swipe />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/archive/:memoryId" element={<MemoryDetailPage />} />
        </Route>
        <Route path="/pick/loading" element={<PickLoadingPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
