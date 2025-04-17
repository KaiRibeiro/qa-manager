import NavbarLogo from "../logo/NavbarLogo";
import {useState} from "react";
import HamburgerMenu from "../menu/HamburgerMenu";
import SideDrawer from "../sidedrawer/SideDrawer";
import {Link} from "react-router-dom";
import {SlChemistry, SlControlPlay, SlHome, SlLogout} from "react-icons/sl";
import {LiaClipboardCheckSolid, LiaListOlSolid} from "react-icons/lia";

function Navbar() {

    const [isDrawerOpen, setDrawerOpen] = useState(false);

    return (
        //TODO Create active item logic
        <>
            <div className="flex flex-row">
                <nav
                    className="fixed top-0 w-full h-12 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 z-50 shadow-md border-b border-gray-800 px-6">
                    <div className="flex items-center flex-shrink-0">
                        <div className="md:hidden mr-4 fixed left-0 ml-10">
                            <HamburgerMenu isDrawerOpen={isDrawerOpen} onClick={() => setDrawerOpen(!isDrawerOpen)}/>
                        </div>
                        <Link to="/">
                            <div className="text-xl font-semibold">
                                <NavbarLogo/>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:flex flex-grow justify-center h-full">
                        <ul className="flex flex-row gap-x-24 text-gray-100 font-semibold tracking-wider items-center h-full">
                            <Link className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer" to="/">
                                <li className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer">
                                    <span className="z-10 flex items-center space-x-2 text-white font-semibold tracking-wider">
                                        <SlHome size={22}/>
                                        <span>HOME</span>
                                    </span>
                                    <span
                                        className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full">
                                    </span>
                                </li>
                            </Link>

                            <Link className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer" to="/testplans">
                                <li className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer">
                                    <span className="z-10 flex items-center space-x-2 text-white font-semibold tracking-wider">
                                        <LiaClipboardCheckSolid size={26}/>
                                        <span>TEST PLANS</span>
                                    </span>
                                </li>
                                <span
                                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full">
                                </span>
                            </Link>

                            <Link className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer" to="/testcases">
                                <li className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer">
                                    <span className="z-10 flex items-center space-x-2 text-white font-semibold tracking-wider">
                                        <SlChemistry size={26}/>
                                        <span>TEST CASES</span>
                                    </span>
                                    <span
                                        className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full">
                                    </span>
                                </li>
                            </Link>

                            <li className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer">
                                <span className="z-10 flex items-center space-x-2 text-white font-semibold tracking-wider">
                                    <LiaListOlSolid size={26}/>
                                    <span>TEST STEPS</span>
                                </span>
                                <span
                                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full">
                                </span>
                            </li>

                            <li className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer">
                                <span className="z-10 flex items-center space-x-2 text-white font-semibold tracking-wider">
                                    <SlControlPlay size={26}/>
                                    <span>TEST RUNS</span>
                                </span>
                                <span
                                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full">
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="hidden md:flex items-center text-gray-100 font-semibold space-x-2 h-full border-l pl-2 group cursor-pointer">
                        <SlLogout className="text-red-700 transition-colors duration-300 group-hover:text-red-500" size={22} />
                        <button className="relative overflow-hidden transition-all duration-300 ease-in-out transform group-hover:-translate-y-0.5 group-hover:text-red-400 cursor-pointer">
                            <span className="z-10">LOG OUT</span>
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                        </button>
                    </div>

                </nav>
                <div className="fixed top-12">
                    <SideDrawer isSideDrawerOpen={isDrawerOpen} onClick={() => setDrawerOpen(!isDrawerOpen)}/>
                </div>
            </div>
        </>
    );
}

export default Navbar;