import {LiaPencilAltSolid, LiaRedoAltSolid, LiaSave, LiaTrashSolid} from "react-icons/lia";

function ActionButtons({isEditing, onClick, isFormValid}: {isEditing: boolean, onClick: () => void, isFormValid: boolean}) {
    if(!isEditing) {
        return (
            <>
                <button onClick={onClick} className="rounded-md border w-40 h-14 shadow-sm flex flex-row justify-center items-center text-lg gap-2 font-semibold">
                    <LiaPencilAltSolid size={30} />
                    EDIT
                </button>
                <button className="rounded-md border w-40 h-14 text-red-700 shadow-sm flex flex-row justify-center items-center text-lg gap-2 font-semibold">
                    <LiaTrashSolid size={30} />
                    DELETE
                </button>
            </>
        );
    }
    return (
        <>
            <button disabled={!isFormValid}
                    className={isFormValid ? "rounded-md border w-40 h-14 shadow-sm flex flex-row justify-center items-center text-lg gap-2 font-semibold text-blue-500" :
                        "rounded-md border w-40 h-14 shadow-sm flex flex-row justify-center items-center text-lg gap-2 font-semibold text-gray-400"}>
                <LiaSave size={30} />
                SAVE
            </button>
            <button onClick={onClick} className="rounded-md border w-40 h-14 text-gray-500 shadow-sm flex flex-row justify-center items-center text-lg gap-2 font-semibold">
                <LiaRedoAltSolid size={30} />
                CANCEL
            </button>
        </>
    );
}

export default ActionButtons;