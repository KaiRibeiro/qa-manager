import { HiOutlineDocumentSearch } from 'react-icons/hi';

function NoResultsMessage() {
  //TODO: Make it reusable
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <HiOutlineDocumentSearch size={72} className="mb-4 text-gray-500" />
        <h2 className="text-4xl font-semibold text-gray-700">No Test Plans Found</h2>
        <p className="text-gray-500 mt-2 text-2xl">You haven't created any test plans yet.</p>
        <button
          type="button"
          className="mt-10 bg-emerald-500 rounded-2xl w-[280px] h-[60px] text-xl font-bold text-white shadow-md hover:bg-emerald-600 transition duration-200 ease-in-out hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-lg font-medium">Create Test Plan</span>
        </button>
      </div>
    </>
  );
}

export default NoResultsMessage;
