import {PlanStatus} from "../../../types/PlanStatus";

function StatusTag({status}: { status: PlanStatus }) {
    return (
        <>
            <div
                className={`${status === PlanStatus.COMPLETE ? "text-emerald-800 bg-emerald-400"
                    : status === PlanStatus.IN_PROGRESS ? "text-yellow-800 bg-amber-100"
                        : "text-gray-800 bg-gray-400"} w-full h-8 flex justify-center items-center rounded-sm p-4`}
            >
                {status}
            </div>
        </>
    );
}

export default StatusTag;