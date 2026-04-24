import React from 'react';
import { motion } from 'framer-motion';
import { X, Lock } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 `z-100` flex items-center justify-center px-4">
      {/* Background Overlay */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      {/* Modal Box */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="relative bg-[#0f172a] border border-white/10 p-8 rounded-[2.5rem] max-w-md w-full text-center shadow-2xl"
      >
        <button onClick={onClose} className="absolute right-6 top-6 text-slate-400 hover:text-white">
          <X size={24} />
        </button>

        <div className="w-16 h-16 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="text-amber-400" size={28} />
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">Login Required</h3>
        <p className="text-slate-400 mb-8">
          Please login to view contact details and connect with local experts in Pilibhit.
        </p>

        <div className="space-y-4">
          <button className="w-full bg-amber-400 text-black font-bold py-4 rounded-2xl hover:bg-amber-300 transition-all">
            Continue with Google
          </button>
          <button className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl hover:bg-white/10 transition-all">
            Use Email / Phone
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;