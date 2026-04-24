import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ finishLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => finishLoading(), 3500);
    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white">
          Vocal<span className="text-amber-400">Local</span>
        </h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="h-1 bg-linear-to-r from-transparent via-amber-400 to-transparent mt-2"
        />
        <p className="mt-4 text-slate-500 tracking-[0.3em] uppercase text-xs font-bold">
          Pilibhit's Digital Service Hub
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Loader;