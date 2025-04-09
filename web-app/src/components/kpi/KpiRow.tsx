import KpiCard from "./KpiCard";

function KpiRow() {
    return (
        <>
            <div className="flex flex-col gap-4 md:flex-row justify-around w-full mt-10">
                <KpiCard kpi={{kpiName: "Count", kpiValue: 10, isPercent: false}}/>
                <KpiCard kpi={{kpiName: "Percentage", kpiValue: 30, isPercent: true}}/>
                <KpiCard kpi={{kpiName: "Fails", kpiValue: 120, isPercent: false}}/>
                <KpiCard kpi={{kpiName: "Pass", kpiValue: 110, isPercent: false}}/>
            </div>
        </>
    );
}

export default KpiRow;