const DangerButton = ({children})=>{
    return(
        <div className="border hover:bg-red-600 hover:border-red-600 p-2 px-4 rounded-md transition-all duration-500">
        {children}
      </div>
    )
}
export default DangerButton