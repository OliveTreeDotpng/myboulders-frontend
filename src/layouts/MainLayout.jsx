import Sidebar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet /> {/* Här renderas alla routes som ligger "inuti" denna layout */}
      </main>
    </div>
  );
};

export default MainLayout;

