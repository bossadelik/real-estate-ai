import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/sections/Hero';
import BeforeAfterSlider from '@/components/sections/BeforeAfterSlider';
import PricingTable from '@/components/sections/PricingTable';
import { motion } from 'framer-motion';

const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>ImmobiliareGPT - Annunci Immobiliari con AI</title>
                <meta name="description" content="Trasforma le tue foto e testi in annunci immobiliari professionali e irresistibili con la potenza dell'intelligenza artificiale. Inizia ora!" />
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Hero />
                <BeforeAfterSlider 
                    title="Dal Caos alla Chiarezza"
                    description="Guarda come trasformiamo una foto qualunque in un'immagine da copertina, pulita, luminosa e irresistibile."
                    beforeImage="https://storage.googleapis.com/hostinger-horizons-assets-prod/d9c2d5fd-9608-4719-b125-084393810a2a/b2f83a4425dcf57a30ef6831723a6bd5.jpg"
                    afterImage="https://storage.googleapis.com/hostinger-horizons-assets-prod/d9c2d5fd-9608-4719-b125-084393810a2a/8f7e91a3142a161f57c5640bf6d9dce5.jpg"
                />
                <PricingTable />
                <BeforeAfterSlider 
                    title="Dettagli che Fanno la Differenza"
                    description="Anche un bagno può diventare un punto di forza. Valorizziamo ogni angolo della proprietà per massimizzare l'impatto."
                    beforeImage="https://storage.googleapis.com/hostinger-horizons-assets-prod/d9c2d5fd-9608-4719-b125-084393810a2a/fa51735d2590037604dd9e8715094b66.jpg"
                    afterImage="https://storage.googleapis.com/hostinger-horizons-assets-prod/d9c2d5fd-9608-4719-b125-084393810a2a/cb83b41cbe8081df7b3b02da65715e68.jpg"
                />
            </motion.div>
        </>
    );
};

export default HomePage;