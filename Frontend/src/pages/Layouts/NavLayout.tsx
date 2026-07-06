
import Logo from "../../Components/Logo"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from "../../Store/AuthStore"
import { useLogout } from "../../Hooks/useAuth"

export default function NavLayout() {
  const [isVisible, setVisible] = useState(true)
  const [lastScroll, setScroll] = useState(0)
  const [isMenuOpen, setMenu] = useState(false)

  const user = useAuthStore((item) => item.user)
  const logout = useLogout()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 50) {
        setVisible(true)
      } else if (currentScrollY > lastScroll) {
        setVisible(false)
        setMenu(false)
      } else {
        setVisible(true)
      }

      setScroll(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScroll])

  return (
    <motion.nav
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ backgroundColor: '#051d1b' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to={'/'}>
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to={'/appointments'} className="text-sm transition hover:opacity-70" style={{ color: "#fffef0" }}>
            Appointments
          </Link>
          <Link to={'/adoption'} className="text-sm transition hover:opacity-70" style={{ color: "#72cf2a" }}>
            Adoption
          </Link>
          {user?.role === 'Doctor' && (
            <Link to={'/doctor'} className="text-sm transition hover:opacity-70" style={{ color: "#72cf2a" }}>
              Doctor Panel
            </Link>
          )}
          {user ? (
            <div className="items-center flex gap-4">
              <span className="text-sm" style={{ color: "#fffef0" }}>
                Hi, {user.name}
              </span>
              <button onClick={logout} className="text-sm font-medium px-4 py-2 rounded-xl transition hover:opacity-80" style={{ backgroundColor: "#72cf2a", color: "#051d1b" }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to={'/login'} className="text-sm font-medium px-4 py-2 rounded-xl transition hover:opacity-80" style={{ backgroundColor: "#72cf2a", color: "#051d1b" }}>
              Login
            </Link>
          )}
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenu(!isMenuOpen)}
        >
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5"
            style={{ backgroundColor: "#fffef0" }}
          />
          <motion.span
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5"
            style={{ backgroundColor: "#fffef0" }}
          />
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5"
            style={{ backgroundColor: "#fffef0" }}
          />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden flex flex-col gap-4 pt-4 pb-2 px-2"
          >
            <Link to="/appointments" onClick={() => setMenu(false)} className="text-sm font-medium" style={{ color: "#fffef0" }}>
              Appointments
            </Link>
            <Link to="/adoption" onClick={() => setMenu(false)} className="text-sm font-medium" style={{ color: "#fffef0" }}>
              Adoption
            </Link>
            {user?.role === "Doctor" && (
              <Link to="/doctor" onClick={() => setMenu(false)} className="text-sm font-medium" style={{ color: "#72cf2a" }}>
                Doctor Panel
              </Link>
            )}
            {user ? (
              <>
                <span className="text-sm" style={{ color: "#fffef0" }}>
                  Hi, {user.name}
                </span>
                <button
                  onClick={() => { logout(); setMenu(false) }}
                  className="text-sm font-medium px-4 py-2 rounded-lg w-fit"
                  style={{ backgroundColor: "#72cf2a", color: "#051d1b" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenu(false)}
                className="text-sm font-medium px-4 py-2 rounded-lg w-fit"
                style={{ backgroundColor: "#72cf2a", color: "#051d1b" }}
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
