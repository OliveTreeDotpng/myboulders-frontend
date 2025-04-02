import Sidebar from "../components/NavBar";
import UserSearch from "../components/UserSearch"; 
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <main style={{ flex: 1, padding: "1rem", position: "relative" }}> {/* Lägg till position: relative */}
                <UserSearch />
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;

