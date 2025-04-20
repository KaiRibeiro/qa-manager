function HamburgerMenu({ isDrawerOpen, onClick }: { isDrawerOpen: boolean; onClick: () => void }) {
  return (
    <>
      <button
        onClick={onClick}
        className={
          !isDrawerOpen
            ? 'flex flex-col justify-center items-center space-y-1.5 cursor-pointer group'
            : 'flex flex-row justify-center items-center space-x-1.5 cursor-pointer group'
        }
      >
        <span
          className={
            !isDrawerOpen
              ? 'bg-white w-6 h-1 rounded-sm transition group-hover:bg-emerald-500'
              : 'bg-emerald-600 w-1 h-6 rounded-sm group-hover:bg-emerald-700'
          }
        ></span>
        <span
          className={
            !isDrawerOpen
              ? 'bg-white w-6 h-1 rounded-sm transition group-hover:bg-emerald-500'
              : 'bg-emerald-600 w-1 h-6 rounded-sm group-hover:bg-emerald-700'
          }
        ></span>
        <span
          className={
            !isDrawerOpen
              ? 'bg-white w-6 h-1 rounded-sm transition group-hover:bg-emerald-500'
              : 'bg-emerald-600 w-1 h-6 rounded-sm group-hover:bg-emerald-700'
          }
        ></span>
      </button>
    </>
  );
}

export default HamburgerMenu;
