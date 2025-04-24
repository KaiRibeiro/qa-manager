function ConfirmedModal({
  title,
  description,
  onClose,
}: {
  title: string;
  description: string;
  onClose: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="bg-white p-6 rounded-lg shadow-lg z-50 max-w-sm w-full flex flex-col space-y-5">
          <h2 className="text-2xl text-center font-semibold">{title}</h2>
          <p className="text-gray-600 text-center">{description}</p>
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="bg-emerald-500 rounded-2xl w-[280px] h-[60px] text-xl font-bold text-white shadow-md hover:bg-emerald-600 transition duration-200 ease-in-out hover:cursor-pointer "
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmedModal;
