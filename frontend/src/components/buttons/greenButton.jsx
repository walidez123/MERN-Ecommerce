const GreenButton = ({ children }) => {
    return (
      <button className=" text-white bg-green-800 hover:bg-white hover:text-green-800 p-2 px-4 rounded-md transition-all duration-500">
        {children}
      </button>
    );
  };
  export default GreenButton;
  