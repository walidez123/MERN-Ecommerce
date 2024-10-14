const SecendaryButton = ({ children }) => {
    return (
      <button className="border w-full bg-white text-black hover:text-white hover:bg-black p-2 px-4 rounded-md transition-all duration-500">
        {children}
      </button>
    );
  };
  export default SecendaryButton;
  