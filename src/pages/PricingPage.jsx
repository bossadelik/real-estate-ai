import React from 'react';
import { Helmet } from 'react-helmet';
import PricingTable from '@/components/sections/PricingTable';
import { motion } from 'framer-motion';

const PricingPage = () => {
    return (
        <>
            <Helmet>
                <title>Piani e Prezzi - ImmobiliareGPT</title>
                <meta name="description" content="Scopri i piani tariffari di ImmobiliareGPT. Scegli la soluzione perfetta per te, dal singolo annuncio al piano per agenzie." />
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <PricingTable />
            </motion.div>
        </>
    );
};

export default PricingPage;