import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const ContactPage = () => {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            toast({
                title: "⚠️ Campi mancanti",
                description: "Per favore, compila tutti i campi.",
                variant: "destructive",
            });
            return;
        }
        setIsSending(true);
        
        const { error } = await supabase
            .from('contacts')
            .insert([{ name, email, message }]);

        setIsSending(false);

        if (error) {
            toast({
                title: "❌ Errore nell'invio",
                description: "C'è stato un problema. Riprova più tardi.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "✅ Messaggio inviato!",
                description: "Grazie per averci contattato. Ti risponderemo il prima possibile.",
            });
            setName('');
            setEmail('');
            setMessage('');
        }
    };

    return (
        <>
            <Helmet>
                <title>Contatti - ImmobiliareGPT</title>
                <meta name="description" content="Contattaci per piani personalizzati, supporto o qualsiasi altra richiesta. Siamo qui per aiutarti." />
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
            >
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                            <Mail className="w-8 h-8 text-teal-400" />
                            Contattaci
                        </h1>
                        <p className="text-lg text-gray-300">Hai bisogno di un piano personalizzato o hai domande? Scrivici.</p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="name" className="text-gray-300 mb-2 block">Il tuo nome</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Mario Rossi" disabled={isSending} />
                            </div>
                            <div>
                                <Label htmlFor="email" className="text-gray-300 mb-2 block">La tua email</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="mario.rossi@email.com" disabled={isSending} />
                            </div>
                            <div>
                                <Label htmlFor="message" className="text-gray-300 mb-2 block">Messaggio</Label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Scrivi qui la tua richiesta..."
                                    className="w-full h-40 bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                                    disabled={isSending}
                                />
                            </div>
                            <p className="text-xs text-gray-400">
                                Il tuo messaggio verrà inviato a <span className="font-medium text-teal-400">info@immobiliaregpt.it</span>.
                            </p>
                            <Button
                                type="submit"
                                disabled={isSending}
                                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                            >
                                {isSending ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        Invio in corso...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        Invia Messaggio
                                    </>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default ContactPage;