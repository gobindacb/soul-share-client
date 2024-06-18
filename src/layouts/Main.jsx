import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";


const Main = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar2/>
            {/* <Navbar/> */}
            {/* Outlet */}
            <div className="min-h-[calc(100vh-306px)]">
            <Outlet/>
            </div>
            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default Main;