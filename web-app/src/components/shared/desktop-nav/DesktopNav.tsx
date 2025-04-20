import { Link, useLocation } from 'react-router-dom';
import { SlChemistry, SlControlPlay, SlHome } from 'react-icons/sl';
import { LiaClipboardCheckSolid, LiaListOlSolid } from 'react-icons/lia';

const isActiveRoute = (route: string) => {
  if(useLocation().pathname === route) {
    return <span className="absolute bottom-0 left-0 h-[2px] bg-emerald-400 w-full"></span>
  }
  return <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
}

function DesktopNav() {
  return (
    <>
      <ul className="flex flex-row gap-x-24 text-gray-100 font-semibold tracking-wider items-center h-full">
        <Link
          className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer"
          to="/"
        >
          <li className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer">
            <span className="z-10 flex items-center space-x-2 text-white font-semibold tracking-wider">
              <SlHome size={22} />
              <span>HOME</span>
            </span>
            {isActiveRoute("/")}
          </li>
        </Link>

        <Link
          className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer"
          to="/testplans"
        >
          <li className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer">
            <span className="z-10 flex items-center space-x-2 text-white font-semibold tracking-wider">
              <LiaClipboardCheckSolid size={26} />
              <span>TEST PLANS</span>
            </span>
            {isActiveRoute("/testplans")}
          </li>
        </Link>

        <Link
          className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer"
          to="/testcases"
        >
          <li className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer">
            <span className="z-10 flex items-center space-x-2 text-white font-semibold tracking-wider">
              <SlChemistry size={26} />
              <span>TEST CASES</span>
            </span>
            {isActiveRoute("/testcases")}
          </li>
        </Link>

        <li className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer">
          <span className="z-10 flex items-center space-x-2 text-white font-semibold tracking-wider">
            <LiaListOlSolid size={26} />
            <span>TEST STEPS</span>
          </span>
          {isActiveRoute("/steps")}
        </li>

        <li className="relative group flex items-center justify-center space-x-2 h-full w-38 cursor-pointer">
          <span className="z-10 flex items-center space-x-2 text-white font-semibold tracking-wider">
            <SlControlPlay size={26} />
            <span>TEST RUNS</span>
          </span>
          {isActiveRoute("/runs")}
        </li>
      </ul>
    </>
  );
}

export default DesktopNav;
