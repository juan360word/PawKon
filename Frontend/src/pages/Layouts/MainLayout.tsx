import { Outlet } from "react-router-dom"
import NavLayout from "./NavLayout"
import { useLenis } from "../../Hooks/useLenis"
import Footer from "./Footer"

const MainLayout = () => {
  
  useLenis()


  return (
  
  <>
    <div className="min-h-screen flex flex-col">
    <NavLayout/>
    
    <main className="flex-1">
      <Outlet/>
    </main>
    <Footer/>
    </div>
     
  </>
  )
}

export default MainLayout