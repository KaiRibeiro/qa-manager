import KpiRow from "../../components/kpi/KpiRow";
import PieChart from "../../components/charts/PieChart";

function Home() {

    return (
        <>
            <main
                className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 grid grid-cols-1 gap-6 p-6 md:grid-cols-12 pt-12">
                <div className="md:col-span-12">
                    <KpiRow/>
                </div>
                <div className="md:col-span-5">
                    <PieChart />
                </div>
                <div className="md:col-span-3">
                    <PieChart />
                </div>
                <div className="md:col-span-4">
                    <PieChart />
                </div>
                <div className="md:col-span-12">
                    <PieChart />
                </div>
            </main>
        </>

    )
}

export default Home
