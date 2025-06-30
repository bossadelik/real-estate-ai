import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, ShieldCheck, FileCheck, Tag, Package, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
const InfoAndPricing = ({
  selectedPlan,
  onSelectPlan
}) => {
  const plans = [{
    name: 'Piano Singolo',
    price: '€5,90',
    priceId: 'price_single',
    features: ['1 annuncio', 'Max 30 foto'],
    icon: <Package className="w-8 h-8 mb-4 text-blue-400" />
  }, {
    name: 'Piano Pro',
    price: '€29,00',
    priceId: 'price_pro',
    features: ['Fino a 10 annunci', 'Max 30 foto ciascuno', 'Validità 30 giorni'],
    icon: <Users className="w-8 h-8 mb-4 text-teal-400" />
  }];
  return <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold text-center text-white mb-8 flex items-center justify-center gap-3">
          <Tag className="w-8 h-8 text-purple-400" />
          Scegli il tuo piano
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {plans.map(plan => <motion.div key={plan.name} whileHover={{
          y: -5,
          scale: 1.03
        }} transition={{
          type: 'spring',
          stiffness: 300
        }} onClick={() => onSelectPlan(plan.priceId)} className={cn('bg-white/10 backdrop-blur-lg rounded-2xl p-8 border cursor-pointer transition-all duration-300', selectedPlan === plan.priceId ? 'border-teal-400 ring-2 ring-teal-400 shadow-2xl' : 'border-white/20 hover:border-teal-400/50')}>
              <div className="text-center">
                {plan.icon}
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="text-4xl font-extrabold my-4 bg-gradient-to-r from-blue-400 via-teal-300 to-white bg-clip-text text-transparent">
                  {plan.price}
                </p>
                <ul className="space-y-2 text-gray-300">
                  {plan.features.map((feature, i) => <li key={i} className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </li>)}
                </ul>
              </div>
            </motion.div>)}
        </div>
      </div>

      <div id="termini" className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <FileCheck className="w-7 h-7 text-blue-400" />
          Cosa include il servizio
        </h2>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-gray-300">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
            <span>Ottimizzazione fino a 30 foto per annuncio (JPG o PNG, max 2MB ciascuna)</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
            <span>Riscrittura professionale della descrizione dell’immobile</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
            <span>Consegna entro 48 ore lavorative</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
            <span>Servizio via email o link diretto di ritorno</span>
          </div>
        </div>
        <div className="mt-6 border-t border-yellow-500/30 pt-6">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6" />
                Attenzione
            </h3>
            <p className="text-yellow-200/80">
                Non inviare immagini superiori a 2MB o in formati diversi da JPG/PNG. Non verranno accettati file ZIP, PDF o contenuti illeciti.
            </p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-red-400" />
          Clausola di responsabilità e Termini
        </h2>
        <div className="space-y-4 text-gray-400 text-sm">
          <p>📤 Invia fino a 30 immagini e una breve descrizione con caratteristiche tecniche dell’immobile (titolo, mq, locali, posizione, ecc.)</p>
          <p>📎 Tutti i contenuti inviati devono essere di tua proprietà o liberamente utilizzabili. Accettando i termini, dichiari di avere i diritti sulle immagini e testi caricati e sollevi il fornitore da ogni responsabilità legale relativa al contenuto.</p>
          <p>Caricando immagini e testi, confermi di essere in possesso dei diritti necessari per l’utilizzo, pubblicazione e modifica del materiale inviato. L’azienda non è responsabile per contenuti protetti da copyright, soggetti non autorizzati, dati sensibili o immagini inappropriate. Il servizio si riserva il diritto di rifiutare materiali non conformi alle policy di utilizzo.</p>
        </div>
      </div>
    </div>;
};
export default InfoAndPricing;