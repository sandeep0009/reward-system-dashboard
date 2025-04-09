import { useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"


const Layout=({children})=>{
    const location=useLocation();
    const hideNavbarPaths = ["/signin", "/signup"];
    const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
    return(
        <>
         {!shouldHideNavbar && <Navbar />}
        <div>
            {
                children
            }
        </div>
        </>
    )
}

export default Layout