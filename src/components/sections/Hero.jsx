import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5 [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-block bg-teal-400/10 text-teal-300 text-sm font-semibold px-4 py-1 rounded-full mb-4">
                    La Rivoluzione degli Annunci Immobiliari
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-teal-300 to-white bg-clip-text text-transparent mb-6">
                    Annunci Irresistibili. <br /> In Pochi Secondi.
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-10">
                    Trasforma foto amatoriali in capolavori professionali e crea descrizioni magnetiche. ImmobiliareGPT è l'assistente AI che vende al posto tuo.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg">
                        <a href="#pricing-section">
                            <Sparkles className="mr-2 h-5 w-5" /> Inizia Ora
                        </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/50 text-white font-bold text-lg hover:bg-white/10 transition-colors duration-300">
                        <a href="#pricing-section">
                            <Zap className="mr-2 h-5 w-5" /> Scopri i Piani
                        </a>
                    </Button>
                </div>
            </motion.div>
        </div>
    </div>
  );
};

export default Hero;