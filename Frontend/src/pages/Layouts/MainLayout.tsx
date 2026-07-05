import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Logo from "../../Components/Logo"

const MainLayout = () => {
  return (
  
  <>
    <header className="py-5 ">
        <div className=' max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between'>
            <div className="w-44 sm:w-60">
                <Logo/> 
            </div>
        </div>  
    </header>
   

        <Outlet/>
   
    
    <Footer/>
  </>
  )
}

export default MainLayout