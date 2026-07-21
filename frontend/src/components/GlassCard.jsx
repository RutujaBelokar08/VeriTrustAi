import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01, boxShadow: '0 24px 80px rgba(37, 99, 235, 0.16)' } : undefined}
      transition={{ duration: 0.2 }}
      className={`rounded-[1.75rem] border border-slate-200/70 bg-white/70 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_20px_80px_rgba(2,8,23,0.28)] ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
