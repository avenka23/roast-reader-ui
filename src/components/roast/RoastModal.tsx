import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { RoastItem } from '../../types/api';
import { RoastTabs } from './RoastTabs';

interface RoastModalProps {
  item: RoastItem | null;
  onClose: () => void;
}

export function RoastModal({ item, onClose }: RoastModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (item) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[5vh] bottom-[5vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg z-50 flex flex-col"
          >
            <div className="bg-dark-100 rounded-2xl overflow-hidden border border-white/5 flex flex-col max-h-full">
              {/* Header */}
              <div className="bg-gradient-to-br from-dark-200 to-dark-100 p-6 border-b border-fire/20 flex-shrink-0">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-white pr-8">{item.movie.title}</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white text-2xl leading-none p-1 -mt-1 -mr-1"
                  >
                    &times;
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto flex-1">
                <RoastTabs item={item} />
              </div>

              {/* Disclaimer Footer */}
              <div className="text-center py-3 px-6 bg-fire/10 border-t border-fire/20 text-gray-500 text-sm italic flex-shrink-0">
                {item.disclaimer || 'Satire. Facts unchanged.'}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
