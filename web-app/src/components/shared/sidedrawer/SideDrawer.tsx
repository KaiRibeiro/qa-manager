import {SlChemistry, SlControlPlay, SlHome, SlLogout} from "react-icons/sl";
import {LiaClipboardCheckSolid, LiaListOlSolid} from "react-icons/lia";
import {Link} from "react-router-dom";

function SideDrawer({isSideDrawerOpen, onClick}: { isSideDrawerOpen: boolean, onClick: () => void }) {
    return (
        //TODO Create active item logic
        <>
            <div className="flex flex-row">
                <div
                    className={`flex flex-col fixed z-50 bg-gradient-to-r from-gray-900 to-gray-800 h-screen w-60 shadow-lg shadow-black transition-all duration-300 ease-in-out gap-30 ${isSideDrawerOpen ? 'left-0' : '-left-full'} `}>
                    <ul className="flex flex-col justify-center items-start mt-10 space-y-14 text-gray-100 font-semibold tracking-wider">
                        <Link
                            className="relative flex w-full h-14 items-center space-x-4 pl-6 pr-4 bg-gradient-to-r from-emerald-600/50 to-emerald-500/20 text-white font-semibold rounded-r-lg shadow-md"
                            to="/">
                            <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r"></span>
                            <li className="relative flex w-full h-14 items-center space-x-4 pr-4">
                                <SlHome size={22}/>
                                <span className="tracking-wide">HOME</span>
                            </li>
                        </Link>
                        <Link className="flex w-full h-14  items-center justify-start space-x-4 pl-4" to="/testplans">
                            <li className="flex w-full h-14  items-center justify-start space-x-4">
                                <LiaClipboardCheckSolid size={30}/>
                                <span>TEST PLANS</span>
                            </li>
                        </Link>
                        <Link className="flex w-full h-14  items-center justify-start space-x-4 pl-4" to="/testcases">
                            <li className="flex w-full h-14  items-center justify-start space-x-4">
                                <SlChemistry size={30}/>
                                <span>TEST CASES</span>
                            </li>
                        </Link>
                        <li className="flex w-full h-14 items-center justify-start space-x-4 pl-4">
                            <LiaListOlSolid size={30}/>
                            <span>TEST STEPS</span>
                        </li>
                        <li className="flex w-full h-14  items-center justify-start space-x-4 pl-4">
                            <SlControlPlay size={30}/>
                            <span>TEST RUNS</span>
                        </li>
                    </ul>
                    <div
                        className="flex flex-row justify-center m-auto items-center w-full h-14 space-x-4 text-gray-100 text-lg font-semibold tracking-wider">
                        <SlLogout className="text-red-700" size={20}/>
                        <button>LOG OUT</button>
                    </div>
                </div>
                <div onClick={onClick}
                     className={`fixed z-0 backdrop-blur-xs h-screen w-screen transition-all duration-300 ease-in-out ${isSideDrawerOpen ? 'left-0' : '-left-full'} `}>
                </div>
            </div>
        </>
    );
}

export default SideDrawer;