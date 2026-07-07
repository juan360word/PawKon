import { Link } from "react-router";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-8"
      style={{ backgroundColor: "#051d1b" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1
          className="text-9xl md:text-[12rem] font-black tracking-tighter"
          style={{ color: "#72cf2a" }}
        >
          404
        </h1>
        <p className="text-2xl font-bold mb-2" style={{ color: "#fffef0" }}>
          This page ran away like a scared cat 🐱
        </p>
        <p className="text-base opacity-60 mb-8" style={{ color: "#fffef0" }}>
          The page you're looking for doesn't exist or was moved.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-4 rounded-xl font-bold text-lg transition hover:opacity-90"
          style={{ backgroundColor: "#72cf2a", color: "#051d1b" }}
        >
          Back to home 🏠
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;