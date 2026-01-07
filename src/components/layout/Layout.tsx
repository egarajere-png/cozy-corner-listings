import { ReactNode, useEffect, useState } from "react";
import { Topbar, Header, BackToTop } from "./Header";
import { Footer } from "./Footer";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="fixed inset-0 bg-primary z-[100] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col items-center"
      >
        <div className="preloader-circle mb-8" />
        <h1 
          className="preloader-text text-2xl md:text-4xl"
          style={{ fontSize: 'clamp(1.5rem, 3vw + 1rem, 3rem)' }}
        >
          Lakashe Homes
        </h1>
      </motion.div>
    </motion.div>
  );
};

export const Layout = ({ children }: LayoutProps) => {
  const [loading, setLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Check if preloader has been shown in this session
    const hasShownPreloader = sessionStorage.getItem("hasShownPreloader");
    if (hasShownPreloader) {
      setLoading(false);
      setShowPreloader(false);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
    sessionStorage.setItem("hasShownPreloader", "true");
    setTimeout(() => setShowPreloader(false), 500);
  };

  return (
    <>
      <AnimatePresence>
        {showPreloader && loading && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>
      
      <div className={loading ? "overflow-hidden h-screen" : ""}>
        <Topbar />
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};
