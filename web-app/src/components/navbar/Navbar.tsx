import NavbarLogo from "../logo/NavbarLogo";
import {useState} from "react";
import HamburgerMenu from "../menu/HamburgerMenu";
import SideDrawer from "../sidedrawer/SideDrawer";

function Navbar() {

    const [isDrawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <div className="flex flex-row">
                <nav className="fixed top-0 w-full h-16 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 z-50 shadow-md border-b border-gray-800">
                    <div className="absolute left-4 md:hidden">
                        <HamburgerMenu isDrawerOpen={isDrawerOpen} onClick={() => {setDrawerOpen(!isDrawerOpen);}} />
                    </div>
                    <div className="text-xl font-semibold">
                        <NavbarLogo/>
                    </div>
                </nav>
                <div className="fixed top-16">
                    <SideDrawer isSideDrawerOpen={isDrawerOpen} onClick={() => setDrawerOpen(!isDrawerOpen)} />
                </div>
            </div>
        </>
    );
}

export default Navbar;