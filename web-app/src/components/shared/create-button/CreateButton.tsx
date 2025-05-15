import { SlPlus } from 'react-icons/sl';

function CreateButton({ defaultText, onClick }: { defaultText: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="bg-emerald-500 rounded-2xl w-[280px] h-[60px] text-xl font-semibold 
                        text-white shadow-md hover:bg-emerald-600 transition duration-200 
                        ease-in-out hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2"
    >
      <SlPlus size={25} />
      Add {defaultText}
    </button>
  );
}
export default CreateButton;
