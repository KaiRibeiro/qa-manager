import { HiOutlineDocumentSearch } from 'react-icons/hi';

function NoResultsMessage() {
  //TODO: Make it reusable
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <HiOutlineDocumentSearch size={72} className="mb-4 text-gray-500" />
        <h2 className="text-4xl font-semibold text-gray-700">No Test Plans Found</h2>
        <p className="text-gray-500 mt-2 text-2xl">You haven't created any test plans yet.</p>
      </div>
    </>
  );
}

export default NoResultsMessage;
