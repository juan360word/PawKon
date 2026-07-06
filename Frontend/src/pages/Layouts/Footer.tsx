import Logo from "../../Components/Logo"
import { Link } from "react-router-dom"


export default function Footer() {
  return (
  <>
    <footer style={{ backgroundColor: "#151212" }} className="pt-16 pb-8 px-8 md:px-20">
      <div className="max-w-6xl mx-auto">

        {/* contenido principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12">

          {/* Logo + descripción */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Logo/>
            <p style={{ color: "#fffef0" }} className="text-sm opacity-60 max-w-xs leading-relaxed">
              Caring for your pets with over 30 years of experience.
              The best specialists, the latest technology, and all the love they deserve.
            </p>
          </div>

          {/* Links de navegación */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#72cf2a" }}>
              Quick Links
            </h4>
            <Link to="/" className="text-sm opacity-60 hover:opacity-100 transition" style={{ color: "#fffef0" }}>
              Home
            </Link>
            <Link to="/appointments" className="text-sm opacity-60 hover:opacity-100 transition" style={{ color: "#fffef0" }}>
              Appointments
            </Link>
            <Link to="/adoption" className="text-sm opacity-60 hover:opacity-100 transition" style={{ color: "#fffef0" }}>
              Adoption
            </Link>
            <Link to="/login" className="text-sm opacity-60 hover:opacity-100 transition" style={{ color: "#fffef0" }}>
              Login
            </Link>
          </div>

          {/* Info de contacto */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#72cf2a" }}>
              Contact
            </h4>
            <p className="text-sm opacity-60" style={{ color: "#fffef0" }}>
              📍 123 Pet Street, Animal City
            </p>
            <p className="text-sm opacity-60" style={{ color: "#fffef0" }}>
              📞 +1 (555) 123-4567
            </p>
            <p className="text-sm opacity-60" style={{ color: "#fffef0" }}>
              ✉️ hello@pawkon.com
            </p>
            <p className="text-sm opacity-60" style={{ color: "#fffef0" }}>
              🕒 Mon - Sat: 8am - 8pm
            </p>
          </div>
        </div>

        {/* línea divisoria + copyright */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255, 254, 240, 0.1)" }}
        >
          <p className="text-xs opacity-40" style={{ color: "#fffef0" }}>
            © {new Date().getFullYear()} PawKon. All rights reserved.
          </p>
          <p className="text-xs opacity-40" style={{ color: "#fffef0" }}>
            Made with 💚 by juan360dev
          </p>
        </div>

      </div>
    </footer>
  </>
  )
}
