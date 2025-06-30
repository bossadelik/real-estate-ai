import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Star, Briefcase, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

const plans = [
    {
        name: 'Piano Base',
        price: '€6,99',
        priceNote: 'una tantum',
        description: 'Perfetto per ottimizzare un singolo annuncio.',
        features: [
            '1 annuncio',
            'Fino a 30 foto',
            '1 descrizione ottimizzata',
            'Consegna entro 48h',
            'Nessun supporto prioritario',
        ],
        priceId: 'price_base',
        cta: 'Inizia Ora',
        icon: <Star className="w-8 h-8 mb-4 text-blue-400" />,
        isPopular: false,
    },
    {
        name: 'Piano Pro',
        price: '€49',
        priceNote: '/mese',
        description: 'Ideale per professionisti e piccole agenzie.',
        features: [
            'Fino a 10 annunci al mese',
            '30 foto max per annuncio',
            'Priorità di consegna (entro 24h)',
            'Supporto email base',
        ],
        priceId: 'price_pro',
        cta: 'Scegli Pro',
        icon: <Briefcase className="w-8 h-8 mb-4 text-yellow-400" />,
        isPopular: true,
    },
    {
        name: 'Piano Custom',
        price: 'Da €399',
        priceNote: '/mese',
        description: 'Per agenzie con grandi volumi e necessità custom.',
        features: [
            'Branding personalizzato',
            'Testi su misura e più foto',
            'Integrazione API (webhook)',
            'Supporto email dedicato',
        ],
        priceId: 'contact_us',
        cta: 'Contattaci',
        icon: <Zap className="w-8 h-8 mb-4 text-red-400" />,
        isPopular: false,
    },
];

const PricingTable = () => {
    const { toast } = useToast();

    const handlePlanSelection = (plan) => {
        toast({
            title: "🚧 Funzionalità non implementata",
            description: "L'integrazione con Stripe è in arrivo! Richiedila nel prossimo prompt.",
            variant: "destructive"
        });
    };

    return (
        <div id="pricing-section" className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Piani per ogni esigenza</h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">Scegli il piano perfetto per te e inizia a creare annunci che convertono.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={cn(
                                'relative flex flex-col bg-white/5 backdrop-blur-lg rounded-2xl p-8 border transition-all duration-300',
                                plan.isPopular ? 'border-teal-400 ring-2 ring-teal-400 shadow-2xl' : 'border-white/10'
                            )}
                        >
                            {plan.isPopular && (
                                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                    <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs font-bold uppercase px-4 py-1 rounded-full">
                                        Più Popolare
                                    </div>
                                </div>
                            )}

                            <div className="flex-grow">
                                {plan.icon}
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-gray-400 mb-6">{plan.description}</p>
                                <div className="mb-8">
                                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                                    <span className="text-lg text-gray-400">{plan.priceNote}</span>
                                </div>
                                <ul className="space-y-4 text-gray-300">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8">
                                <Button asChild size="lg" className={cn(
                                    'w-full font-bold text-lg',
                                    plan.isPopular ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:scale-105 transition-transform' : 'bg-white/10 hover:bg-white/20 text-white'
                                )}>
                                    <Link to={plan.priceId === 'contact_us' ? '/contatti' : '/crea-annuncio'}>{plan.cta}</Link>
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingTable;