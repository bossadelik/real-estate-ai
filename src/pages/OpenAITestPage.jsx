import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { OpenAIService } from '@/lib/openaiService';

const OpenAITestPage = () => {
    const { toast } = useToast();
    const [prompt, setPrompt] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('Sei un assistente utile e professionale.');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [testType, setTestType] = useState('general'); // 'general' or 'realestate'

    // Esempi predefiniti
    const examples = {
        general: {
            prompt: 'Scrivi una breve poesia sull\'intelligenza artificiale',
            systemPrompt: 'Sei un poeta creativo che scrive in italiano.'
        },
        realestate: {
            prompt: 'Villa moderna con vista panoramica, 200 mq, 4 camere, 3 bagni, giardino privato, zona residenziale tranquilla',
            systemPrompt: 'Sei un esperto copywriter specializzato in annunci immobiliari. Riscrivi questa descrizione rendendola più accattivante e professionale.'
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!prompt.trim()) {
            toast({
                title: "⚠️ Prompt mancante",
                description: "Inserisci un prompt per testare OpenAI.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);
        setResponse('');

        try {
            const result = await OpenAIService.sendChatRequest({
                prompt: prompt.trim(),
                systemPrompt: systemPrompt.trim() || undefined,
                model: 'gpt-4',
                maxTokens: 500
            });

            if (result.success) {
                setResponse(result.content);
                toast({
                    title: "✅ Successo!",
                    description: "Risposta ricevuta da OpenAI.",
                });
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Test OpenAI Error:', error);
            toast({
                title: "❌ Errore",
                description: `Errore nella chiamata OpenAI: ${error.message}`,
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const loadExample = (type) => {
        const example = examples[type];
        setPrompt(example.prompt);
        setSystemPrompt(example.systemPrompt);
        setTestType(type);
    };

    const testRealEstateOptimization = async () => {
        setIsLoading(true);
        setResponse('');

        try {
            const result = await OpenAIService.optimizeRealEstateDescription(
                'Villa moderna con vista panoramica',
                'Villa di 200 mq con 4 camere, 3 bagni, giardino privato. Zona tranquilla.'
            );

            if (result.success) {
                setResponse(result.content);
                toast({
                    title: "✅ Ottimizzazione completata!",
                    description: "Descrizione immobiliare ottimizzata con successo.",
                });
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Real Estate Optimization Error:', error);
            toast({
                title: "❌ Errore",
                description: `Errore nell'ottimizzazione: ${error.message}`,
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Test OpenAI - ImmobiliareGPT</title>
                <meta name="description" content="Pagina di test per verificare l'integrazione con OpenAI GPT-4" />
            </Helmet>
            <div className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <div className="flex justify-center items-center mb-6">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full shadow-2xl">
                                <Sparkles className="w-12 h-12 text-white" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Test OpenAI Integration</h1>
                        <p className="text-lg text-gray-300">Verifica che l'integrazione con OpenAI funzioni correttamente</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl space-y-8"
                    >
                        {/* Esempi rapidi */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <MessageSquare className="w-6 h-6 text-blue-400" />
                                Esempi Rapidi
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Button
                                    onClick={() => loadExample('general')}
                                    variant="outline"
                                    className="h-auto p-4 text-left border-blue-500/50 hover:bg-blue-500/10"
                                >
                                    <div>
                                        <div className="font-semibold text-blue-300">Test Generale</div>
                                        <div className="text-sm text-gray-400 mt-1">Prova una richiesta generica a GPT-4</div>
                                    </div>
                                </Button>
                                <Button
                                    onClick={() => loadExample('realestate')}
                                    variant="outline"
                                    className="h-auto p-4 text-left border-teal-500/50 hover:bg-teal-500/10"
                                >
                                    <div>
                                        <div className="font-semibold text-teal-300">Test Immobiliare</div>
                                        <div className="text-sm text-gray-400 mt-1">Ottimizza una descrizione immobiliare</div>
                                    </div>
                                </Button>
                            </div>
                        </div>

                        {/* Form di test */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="systemPrompt" className="text-gray-300 mb-2 block">
                                    System Prompt (Istruzioni per l'AI)
                                </Label>
                                <textarea
                                    id="systemPrompt"
                                    value={systemPrompt}
                                    onChange={(e) => setSystemPrompt(e.target.value)}
                                    placeholder="Inserisci le istruzioni per l'AI..."
                                    className="w-full h-24 bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                    disabled={isLoading}
                                />
                            </div>

                            <div>
                                <Label htmlFor="prompt" className="text-gray-300 mb-2 block">
                                    Prompt Utente
                                </Label>
                                <textarea
                                    id="prompt"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Inserisci il tuo prompt qui..."
                                    className="w-full h-32 bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Elaborazione...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-2" />
                                            Invia a OpenAI
                                        </>
                                    )}
                                </Button>

                                <Button
                                    type="button"
                                    onClick={testRealEstateOptimization}
                                    disabled={isLoading}
                                    variant="outline"
                                    className="border-teal-500/50 hover:bg-teal-500/10 text-teal-300"
                                >
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Test Immobiliare
                                </Button>
                            </div>
                        </form>

                        {/* Risposta */}
                        {(response || isLoading) && (
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    {isLoading ? (
                                        <Loader2 className="w-6 h-6 text-yellow-400 animate-spin" />
                                    ) : (
                                        <CheckCircle className="w-6 h-6 text-green-400" />
                                    )}
                                    Risposta OpenAI
                                </h3>
                                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                                    {isLoading ? (
                                        <div className="flex items-center justify-center py-8">
                                            <Loader2 className="w-8 h-8 text-purple-400 animate-spin mr-3" />
                                            <span className="text-gray-300">Attendere risposta da OpenAI...</span>
                                        </div>
                                    ) : (
                                        <div className="text-gray-100 whitespace-pre-wrap leading-relaxed">
                                            {response}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Informazioni di sicurezza */}
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-green-300 mb-2">🔐 Integrazione Sicura</h4>
                                    <ul className="text-sm text-gray-300 space-y-1">
                                        <li>• La tua API Key OpenAI è protetta nei Supabase Secrets</li>
                                        <li>• Le chiamate passano attraverso Edge Functions sicure</li>
                                        <li>• Nessuna esposizione di credenziali nel frontend</li>
                                        <li>• Comunicazione criptata end-to-end</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default OpenAITestPage;