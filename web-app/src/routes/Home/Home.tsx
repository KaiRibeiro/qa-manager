import {Link} from "react-router-dom";

function Home() {

    return (
        <>
            <main className="min-h-screen bg-gray-800">
                <h1 className="text-3xl font-bold ">PAGINA HOME</h1>
                <Link to='/login'>login</Link>
            </main>
        </>
    )
}

export default Home
