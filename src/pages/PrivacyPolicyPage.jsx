import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Mail, FileText, Clock, Lock, Eye, UserCheck, AlertCircle } from 'lucide-react';

const PrivacyPolicyPage = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy - ImmobiliareGPT</title>
                <meta name="description" content="Informativa sulla Privacy di ImmobiliareGPT. Scopri come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali." />
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="py-16 sm:py-24"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <div className="flex justify-center items-center mb-6">
                            <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 rounded-full shadow-2xl">
                                <Shield className="w-12 h-12 text-white" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                        <p className="text-lg text-gray-300">Ultimo aggiornamento: 20/06/2025</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl space-y-8"
                    >
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-gray-300 leading-relaxed mb-8">
                                La presente Informativa sulla Privacy descrive come raccogliamo, utilizziamo e proteggiamo i dati personali degli utenti che accedono e utilizzano il nostro sito web e la nostra applicazione.
                            </p>

                            <div className="space-y-8">
                                {/* Sezione 1 */}
                                <div className="border-l-4 border-blue-500 pl-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <FileText className="w-6 h-6 text-blue-400" />
                                        <h2 className="text-2xl font-bold text-white">1. Titolare del trattamento</h2>
                                    </div>
                                    <div className="bg-blue-500/10 rounded-lg p-4">
                                        <p className="text-gray-300 mb-2"><strong className="text-white">KIACE</strong> – P.IVA 11446870013</p>
                                        <p className="text-gray-300 flex items-center gap-2">
                                            <Mail className="w-4 h-4" />
                                            Email: <a href="mailto:kiacestudio@gmail.com" className="text-blue-400 hover:text-blue-300">kiacestudio@gmail.com</a>
                                        </p>
                                    </div>
                                </div>

                                {/* Sezione 2 */}
                                <div className="border-l-4 border-teal-500 pl-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Eye className="w-6 h-6 text-teal-400" />
                                        <h2 className="text-2xl font-bold text-white">2. Tipi di dati raccolti</h2>
                                    </div>
                                    <p className="text-gray-300 mb-4">Possiamo raccogliere:</p>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                                            Dati identificativi (es. nome, email)
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                                            Dati tecnici (IP, tipo di browser, dispositivo)
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                                            Dati di utilizzo (interazioni con l'app)
                                        </li>
                                    </ul>
                                </div>

                                {/* Sezione 3 */}
                                <div className="border-l-4 border-purple-500 pl-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <AlertCircle className="w-6 h-6 text-purple-400" />
                                        <h2 className="text-2xl font-bold text-white">3. Finalità del trattamento</h2>
                                    </div>
                                    <p className="text-gray-300 mb-4">I dati sono trattati per:</p>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                                            Fornire e migliorare il servizio
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                                            Comunicare con l'utente
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                                            Gestire richieste o supporto tecnico
                                        </li>
                                    </ul>
                                </div>

                                {/* Sezione 4 */}
                                <div className="border-l-4 border-yellow-500 pl-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <UserCheck className="w-6 h-6 text-yellow-400" />
                                        <h2 className="text-2xl font-bold text-white">4. Base giuridica</h2>
                                    </div>
                                    <p className="text-gray-300">
                                        Trattiamo i dati solo con il consenso dell'utente o quando necessario per erogare il servizio richiesto.
                                    </p>
                                </div>

                                {/* Sezione 5 */}
                                <div className="border-l-4 border-red-500 pl-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Clock className="w-6 h-6 text-red-400" />
                                        <h2 className="text-2xl font-bold text-white">5. Conservazione dei dati</h2>
                                    </div>
                                    <p className="text-gray-300">
                                        I dati sono conservati solo per il tempo necessario a raggiungere le finalità indicate.
                                    </p>
                                </div>

                                {/* Sezione 6 */}
                                <div className="border-l-4 border-green-500 pl-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <FileText className="w-6 h-6 text-green-400" />
                                        <h2 className="text-2xl font-bold text-white">6. Cookie</h2>
                                    </div>
                                    <p className="text-gray-300">
                                        Il sito/app può utilizzare cookie tecnici e, ove necessario, cookie di terze parti.
                                    </p>
                                </div>

                                {/* Sezione 7 */}
                                <div className="border-l-4 border-indigo-500 pl-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <UserCheck className="w-6 h-6 text-indigo-400" />
                                        <h2 className="text-2xl font-bold text-white">7. Diritti dell'utente</h2>
                                    </div>
                                    <p className="text-gray-300 mb-4">L'utente ha il diritto di:</p>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></span>
                                            Accedere ai propri dati
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></span>
                                            Richiedere la rettifica o la cancellazione
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></span>
                                            Opporsi al trattamento
                                        </li>
                                    </ul>
                                </div>

                                {/* Sezione 8 */}
                                <div className="border-l-4 border-pink-500 pl-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Lock className="w-6 h-6 text-pink-400" />
                                        <h2 className="text-2xl font-bold text-white">8. Sicurezza</h2>
                                    </div>
                                    <p className="text-gray-300">
                                        Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali.
                                    </p>
                                </div>

                                {/* Sezione 9 */}
                                <div className="border-l-4 border-cyan-500 pl-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Mail className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-2xl font-bold text-white">9. Contatti</h2>
                                    </div>
                                    <div className="bg-cyan-500/10 rounded-lg p-4">
                                        <p className="text-gray-300 mb-2">Per domande o richieste:</p>
                                        <p className="text-cyan-400 font-medium">
                                            <a href="mailto:kiacestudio@gmail.com" className="hover:text-cyan-300 transition-colors">
                                                kiacestudio@gmail.com
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default PrivacyPolicyPage;