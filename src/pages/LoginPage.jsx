import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleOAuthLogin = async (provider) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: provider,
        });

        if (error) {
            toast({
                title: `Errore durante il login con ${provider}`,
                description: error.message,
                variant: "destructive",
            });
        } else {
            navigate('/dashboard');
        }
    };

    const GoogleIcon = () => (
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );

    const AppleIcon = () => (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.22 9.18c-1.21-.06-2.11 1.27-2.05 2.48.04.83.71 1.95 1.88 2.1.03.01 1.4.33 2.55-1.06-.3.17-.64.3-1 .41-.2.06-.41.12-.62.18-.9.26-1.8.44-2.77.44-1.03 0-1.88-.31-2.58-.93-.73-.63-1.2-1.53-1.2-2.64 0-1.13.48-2.01 1.22-2.64.7-.6 1.55-.91 2.55-.91.93 0 1.77.26 2.55.79.17.11.33.23.49.36.13-.1.26-.2.39-.29-.08-.05-.17-.1-.25-.15zM12.01 24c-1.3 0-2.58-.4-3.68-1.22-.96-.71-1.6-1.66-1.89-2.8-.28-1.11.02-2.21.88-3.31.8-.99 1.9-1.55 3.28-1.55.28 0 .55.03.81.08.21.04.42.09.62.15.2.06.4.11.59.17.23.07.46.13.68.2.38.11.76.22 1.15.22.96 0 1.8-.34 2.48-.99.6-.56.91-1.3.91-2.21 0-.99-.41-1.84-1.22-2.55-.83-.73-1.88-.99-3.15-.99-1.06 0-2.01.31-2.84.93-.83.63-1.43 1.5-1.74 2.61-.07.26-.36.41-.65.34-.28-.07-.44-.36-.36-.65.36-1.27 1.06-2.3 2-3.06.9-.73 2.01-1.11 3.31-1.11 1.27 0 2.41.39 3.41 1.15.99.76 1.5 1.81 1.5 3.15 0 1.11-.41 2.08-1.22 2.91-.83.83-1.88 1.25-3.15 1.25-.39 0-.76-.06-1.11-.17-.23-.07-.46-.14-.68-.22-.2-.06-.4-.11-.59-.17-.21-.06-.42-.1-.62-.15-.26-.04-.53-.07-.81-.07-1.22 0-2.21.46-2.96 1.38-.83 1.01-1.2 2.21-.83 3.62.34 1.33 1.15 2.41 2.41 3.25 1.13.76 2.36 1.13 3.68 1.13.28 0 .5-.22.5-.5s-.22-.5-.5-.5z" />
        </svg>
    );

    return (
        <>
            <Helmet>
                <title>Login - ImmobiliareGPT</title>
                <meta name="description" content="Accedi alla tua dashboard per gestire i tuoi annunci immobiliari." />
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex items-center justify-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="flex justify-center items-center mb-4">
                            <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 rounded-full shadow-2xl">
                                <LogIn className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">Accedi al tuo account</h1>
                        <p className="text-gray-300 mt-2">Sblocca la dashboard per monitorare i tuoi annunci.</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl space-y-4">
                        <Button
                            onClick={() => handleOAuthLogin('google')}
                            className="w-full bg-white text-gray-800 hover:bg-gray-200 font-semibold py-6 text-lg"
                        >
                            <GoogleIcon />
                            Accedi con Google
                        </Button>
                        <Button
                            onClick={() => handleOAuthLogin('apple')}
                            className="w-full bg-black text-white hover:bg-gray-800 font-semibold py-6 text-lg border border-gray-600"
                        >
                            <AppleIcon />
                            Accedi con Apple
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default LoginPage;