const DangerButton = ({children})=>{
    return(
        <button className="border hover:bg-red-600 hover:border-red-600 p-2 px-4 rounded-md transition-all duration-500">
        {children}
      </button>
    )
}
export default DangerButton