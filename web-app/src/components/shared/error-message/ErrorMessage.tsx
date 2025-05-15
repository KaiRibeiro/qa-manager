import { AiOutlineWarning } from 'react-icons/ai';

function ErrorMessage() {
  return (
    <div className="flex items-center justify-center bg-red-100 text-red-700 w-screen" role="alert">
      <div className="flex items-center border border-red-400 bg-white p-8 rounded-lg shadow-lg">
        <AiOutlineWarning className="mr-4 text-6xl" />
        <div>
          <strong className="font-bold text-3xl">Error: </strong>
          <span className="block sm:inline text-2xl">
            Something went wrong. Please try again later.
          </span>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
