import {Kpi} from "../../types/kpi";

function KpiCard({kpi}: { kpi: Kpi }) {
    return (
        <>
            <div
                className="flex flex-col bg-white p-4 rounded-xl shadow-md min-w-72 min-h-32 text-center justify-center">
                <h1 className="text-4xl font-bold">{kpi.kpiValue}{kpi.isPercent && <span>%</span>}</h1>
                <h2 className="text-xl text-gray-600">{kpi.kpiName}</h2>
            </div>
        </>
    );
}

export default KpiCard