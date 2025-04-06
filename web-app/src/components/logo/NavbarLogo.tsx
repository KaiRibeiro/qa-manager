import { Link } from 'react-router-dom';

function NavbarLogo() {
    return (
        <div className="text-center lg:text-left select-none">
            <Link to="/">
                <h1 className="font-bold text-emerald-500 text-2xl">
                    QA<span className="tracking-wider text-white">manager</span>
                </h1>
            </Link>
        </div>
    );
}

export default NavbarLogo;