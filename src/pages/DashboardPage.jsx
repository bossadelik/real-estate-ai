import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { LayoutGrid, Download, Clock, Info, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const { toast } = useToast();
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            if (!user) return;
            setLoading(true);
            const { data, error } = await supabase
                .from('ad_requests')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) {
                toast({
                    title: "Errore nel caricamento degli annunci",
                    description: error.message,
                    variant: "destructive"
                });
            } else {
                setJobs(data);
            }
            setLoading(false);
        };

        fetchJobs();
    }, [user, toast]);

    const handleDownload = () => {
        toast({
            title: "🚧 Funzionalità non implementata",
            description: "Il download dei file sarà disponibile a breve.",
        });
    };

    return (
        <>
            <Helmet>
                <title>Dashboard - ImmobiliareGPT</title>
                <meta name="description" content="Visualizza lo stato dei tuoi ordini e la cronologia dei tuoi annunci ottimizzati." />
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
            >
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        <LayoutGrid className="w-8 h-8 text-blue-400" />
                        La tua Dashboard
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">Monitora i tuoi annunci e accedi alla cronologia.</p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl min-h-[300px]">
                        <div className="p-6 border-b border-white/10">
                            <h2 className="text-xl font-semibold text-white">I tuoi annunci recenti</h2>
                        </div>
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader className="w-8 h-8 animate-spin text-teal-400" />
                            </div>
                        ) : jobs.length === 0 ? (
                            <div className="text-center p-12">
                                <p className="text-gray-400 mb-4">Non hai ancora creato nessun annuncio.</p>
                                <Button asChild>
                                    <Link to="/crea-annuncio">Inizia ora</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="divide-y divide-white/10">
                                {jobs.map((job, index) => (
                                    <motion.div 
                                        key={job.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="p-6 flex flex-col md:flex-row items-center justify-between gap-4"
                                    >
                                        <div className="flex-1 text-center md:text-left">
                                            <p className="font-bold text-white text-lg">{job.title}</p>
                                            <p className="text-sm text-gray-400 flex items-center gap-2 justify-center md:justify-start">
                                                <Clock className="w-4 h-4" />
                                                <span>Caricato il: {new Date(job.created_at).toLocaleDateString()}</span>
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                                job.status === 'Completato' ? 'bg-green-500/20 text-green-300' :
                                                job.status === 'In elaborazione' ? 'bg-blue-500/20 text-blue-300' :
                                                'bg-red-500/20 text-red-300'
                                            }`}>
                                                {job.status}
                                            </span>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={handleDownload}
                                                disabled={job.status !== 'Completato'}
                                                className="disabled:opacity-50 disabled:cursor-not-allowed border-white/20 hover:bg-white/10"
                                            >
                                                <Download className="w-4 h-4 mr-2" />
                                                Download
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mt-6 text-center text-gray-400 text-sm flex items-center justify-center gap-2">
                        <Info className="w-4 h-4" />
                        <span>I file degli annunci completati vengono conservati per 7 giorni.</span>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default DashboardPage;