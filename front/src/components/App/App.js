import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000); // 3秒後にメインコンテンツ表示
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a", color: "white" }}>
      {showIntro ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: "bold" }}
        >
          <motion.div 
            style={{ backgroundColor: "#3b82f6", padding: "16px 24px", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", textAlign: "center" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            My Dummy Website
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "32px", backgroundColor: "#333", borderRadius: "12px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", maxWidth: "400px", margin: "auto" }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "16px", color: "#3b82f6" }}>Welcome to My Site</h1>
          <p style={{ fontSize: "1.125rem", marginBottom: "16px" }}>This is a dummy website with an opening animation.</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ padding: "10px 16px", backgroundColor: "#3b82f6", borderRadius: "6px", color: "white", fontWeight: "600", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)", border: "none", cursor: "pointer" }}
          >
            Explore More
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
