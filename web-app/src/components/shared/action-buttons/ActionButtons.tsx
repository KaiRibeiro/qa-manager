import {LiaPencilAltSolid, LiaRedoAltSolid, LiaSave, LiaTrashSolid} from "react-icons/lia";

function ActionButtons({isEditing, onClick, isFormValid}: {isEditing: boolean, onClick: () => void, isFormValid: boolean}) {
    if(!isEditing) {
        return (
            <>
                <button
                    onClick={onClick}
                    className="rounded-md border border-gray-300 w-40 h-14 shadow-sm flex
                    flex-row justify-center items-center text-lg gap-2 font-semibold
                    text-gray-700 bg-white hover:bg-gray-100 hover:shadow-md transition duration-200 ease-in-out
                    hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <LiaPencilAltSolid size={30} />
                    EDIT
                </button>

                <button
                    className="rounded-md border border-red-300 w-40 h-14 text-red-700 bg-white shadow-sm
                    flex flex-row justify-center items-center text-lg gap-2 font-semibold
                    hover:bg-red-50 hover:shadow-md transition duration-200 ease-in-out
                    hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <LiaTrashSolid size={30} />
                    DELETE
                </button>

            </>
        );
    }
    return (
        <>
            <button
                disabled={!isFormValid}
                className={`rounded-md border w-40 h-14 shadow-sm flex flex-row justify-center items-center text-lg gap-2 font-semibold 
              ${isFormValid
                    ? "text-blue-600 bg-white border-blue-300 hover:bg-blue-50 hover:shadow-md hover:cursor-pointer transition duration-200 ease-in-out"
                    : "text-gray-400 bg-white border-gray-300 cursor-not-allowed opacity-50"
                }`}
            >
                <LiaSave size={30} />
                SAVE
            </button>

            <button
                onClick={onClick}
                className="rounded-md border border-gray-300 w-40 h-14 text-gray-600 bg-white shadow-sm
             flex flex-row justify-center items-center text-lg gap-2 font-semibold
             hover:bg-gray-100 hover:shadow-md transition duration-200 ease-in-out
             hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <LiaRedoAltSolid size={30} />
                CANCEL
            </button>

        </>
    );
}

export default ActionButtons;