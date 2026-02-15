import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Memory } from '../types';
import { X } from 'lucide-react';

const memories: Memory[] = [
  // First Batch (PNGs)
  { 
    id: 1, 
    title: "", 
    description: "", 
    imageUrl: "https://image2url.com/r2/default/files/1771131465727-1971abd2-0b4c-4b9d-967c-66f85cfa07be.png", 
    rotation: -3 
  },
  { 
    id: 2, 
    title: "", 
    description: "", 
    imageUrl: "https://image2url.com/r2/default/files/1771131491488-42ad337a-dc4a-4e98-ba52-ff845f0d13b2.png", 
    rotation: 2 
  },
  { 
    id: 3, 
    title: "", 
    description: "", 
    imageUrl: "https://image2url.com/r2/default/files/1771131507154-79a74e61-a775-4edc-bbc9-15fa44250cb6.png", 
    rotation: -2 
  },
  { 
    id: 4, 
    title: "", 
    description: "", 
    imageUrl: "https://image2url.com/r2/default/files/1771131525816-51bba588-0a52-4d01-a820-de9df50e09e5.png", 
    rotation: 4 
  },
  // Second Batch (JPEGs)
  { 
    id: 5, 
    title: "", 
    description: "", 
    imageUrl: "https://image2url.com/r2/default/files/1771131184797-97a1e1cc-2975-4212-b677-cae21071e2ba.jpeg", 
    rotation: 3 
  },
  { 
    id: 6, 
    title: "", 
    description: "", 
    imageUrl: "https://image2url.com/r2/default/files/1771131215175-40b039a9-0ea3-4ca2-8624-b21a21df820a.jpeg", 
    rotation: -4 
  },
  { 
    id: 7, 
    title: "", 
    description: "", 
    imageUrl: "https://image2url.com/r2/default/files/1771131233494-5fcbe602-c0be-4294-83f8-47f2c7c580c7.jpeg", 
    rotation: 1 
  },
  { 
    id: 8, 
    title: "", 
    description: "", 
    imageUrl: "https://image2url.com/r2/default/files/1771131248120-e3393e7c-2e23-473a-9b31-8ea10d833b62.jpeg", 
    rotation: -2 
  },
];

const MemoryGallery: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="w-full py-24 bg-slate-900 min-h-screen relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.05),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
           <h2 className="text-5xl md:text-6xl font-serif-display text-rose-100 mb-6 tracking-wide drop-shadow-lg">
             Captured Moments
           </h2>
        </div>

        {/* Masonry Layout for attractive scattered look */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-8 space-y-8 mx-auto max-w-7xl">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              layoutId={`card-container-${memory.id}`}
              onClick={() => setSelectedId(memory.id)}
              className="break-inside-avoid mb-8 cursor-pointer relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                zIndex: 20,
                rotate: 0,
                transition: { duration: 0.3 }
              }}
              // Varied rotation based on index for scattered look
              style={{ 
                rotate: index % 2 === 0 ? memory.rotation : -memory.rotation 
              }}
            >
              {/* Polaroid Frame */}
              <div className="bg-white p-3 pb-12 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform transition-transform duration-500 hover:shadow-[0_20px_40px_rgba(225,29,72,0.3)] rounded-sm">
                <motion.div 
                  layoutId={`card-image-${memory.id}`} 
                  className="aspect-[3/4] bg-gray-100 overflow-hidden border border-gray-200"
                >
                   <img 
                     src={memory.imageUrl} 
                     alt="Memory" 
                     className="w-full h-full object-cover filter sepia-[0.1] group-hover:sepia-0 transition-all duration-500" 
                   />
                </motion.div>
                {/* Text Completely Removed */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }} 
               className="absolute inset-0 bg-black/95 backdrop-blur-md"
               onClick={() => setSelectedId(null)}
            />
            
            {memories.filter(m => m.id === selectedId).map(memory => (
              <motion.div
                key={memory.id}
                layoutId={`card-container-${memory.id}`}
                className="relative z-10 w-auto max-w-4xl max-h-[90vh] flex items-center justify-center pointer-events-none"
              >
                {/* Close Button positioned relative to screen/container since modal has no bg */}
                <button 
                  onClick={() => setSelectedId(null)}
                  className="fixed top-6 right-6 md:top-10 md:right-10 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-all pointer-events-auto"
                >
                  <X size={24} />
                </button>

                {/* Just the Image in Modal */}
                <motion.div 
                  layoutId={`card-image-${memory.id}`} 
                  className="rounded-md overflow-hidden shadow-2xl pointer-events-auto"
                >
                   <img 
                     src={memory.imageUrl} 
                     alt="Full Memory" 
                     className="max-h-[85vh] w-auto object-contain" 
                   />
                </motion.div>
                {/* No Text Here */}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryGallery;