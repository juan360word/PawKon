import { Outlet } from "react-router-dom"


export default function Footer() {
  return (
  <>
    <section className="max-h-screen ">
       <p className="py-5">Los derechos de esta pagina son mios Fotter de prueba</p>
    </section>
    <Outlet/>
  </>
  )
}
