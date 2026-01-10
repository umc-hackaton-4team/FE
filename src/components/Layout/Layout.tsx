import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="mx-auto flex h-screen max-w-[430px] flex-col overflow-hidden">
      <Header />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
