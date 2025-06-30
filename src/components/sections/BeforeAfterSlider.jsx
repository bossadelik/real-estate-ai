import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

const BeforeAfterSlider = ({ title, description, beforeImage, afterImage }) => {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            {title}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-4xl mx-auto aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl border-4 border-white/10"
        >
          <AnimatePresence>
            <motion.div
              className="absolute top-0 left-0 h-full w-full"
              style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
              key="after"
            >
              <img src={afterImage} alt="After editing" className="h-full w-full object-cover" />
              <div className="absolute top-4 left-4 bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                DOPO
              </div>
            </motion.div>
          </AnimatePresence>
          <motion.div className="h-full w-full" key="before">
            <img src={beforeImage} alt="Before editing" className="h-full w-full object-cover" />
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              PRIMA
            </div>
          </motion.div>
          <div
            className="absolute top-0 bottom-0 bg-white w-1 cursor-ew-resize"
            style={{ left: `calc(${sliderValue}% - 2px)` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 rounded-full bg-white text-gray-800 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
        </motion.div>
        <div className="max-w-xl mx-auto mt-8">
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            onValueChange={(value) => setSliderValue(value[0])}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;