const StandardButton = ({ children }) => {
  return (
    <div className="border w-full text-white hover:text-black hover:bg-white p-2 px-4 rounded-md transition-all duration-500 ">
      {children}
    </div>
  );
};
export default StandardButton;
