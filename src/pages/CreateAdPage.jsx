import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, Mail, X, Send, CheckCircle, Image as ImageIcon, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';


const MAX_FILES = 30;
const MAX_FILE_SIZE_MB = 2;

const CreateAdPage = () => {
    const { toast } = useToast();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState('idle');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [imageRightsAccepted, setImageRightsAccepted] = useState(false);
    
    useEffect(() => {
        if (user) {
            setEmail(user.email);
        }
    }, [user]);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = [];
        
        for (const file of files) {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast({
                    title: `⚠️ File troppo grande: ${file.name}`,
                    description: `La dimensione massima per file è ${MAX_FILE_SIZE_MB}MB.`,
                    variant: "destructive",
                });
                continue;
            }
            validFiles.push(file);
        }

        if (images.length + validFiles.length > MAX_FILES) {
            toast({
                title: "⚠️ Limite di file superato",
                description: `Puoi caricare un massimo di ${MAX_FILES} immagini.`,
                variant: "destructive",
            });
            return;
        }

        const newImages = [...images, ...validFiles];
        setImages(newImages);

        const newPreviews = [...previews];
        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                newPreviews.push(e.target.result);
                if (newPreviews.length === newImages.length) {
                    setPreviews(newPreviews);
                }
            };
            reader.readAsDataURL(file);
        });
        
        if (validFiles.length > 0) {
            toast({
                title: `✅ ${validFiles.length} immagini caricate!`,
                description: `Hai caricato un totale di ${newImages.length} immagini.`,
            });
        }
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        setImages(newImages);
        setPreviews(newPreviews);
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (images.length === 0) {
            toast({ title: "⚠️ Nessuna immagine", description: "Carica almeno una foto.", variant: "destructive" });
            return;
        }
        if (!title.trim() || !description.trim() || !email.trim()) {
            toast({ title: "⚠️ Campi mancanti", description: "Compila tutti i campi.", variant: "destructive" });
            return;
        }
        if (!validateEmail(email)) {
            toast({ title: "⚠️ Email non valida", description: "Inserisci un indirizzo email valido.", variant: "destructive" });
            return;
        }
        if (!imageRightsAccepted) {
            toast({ title: "⚠️ Condizioni non accettate", description: "Devi accettare le condizioni per inviare le immagini.", variant: "destructive" });
            return;
        }
        if (!termsAccepted) {
            toast({ title: "⚠️ Termini non accettati", description: "Devi accettare i termini.", variant: "destructive" });
            return;
        }

        setIsProcessing(true);

        try {
            const { data: adRequestData, error: adRequestError } = await supabase
                .from('ad_requests')
                .insert([{ 
                    title, 
                    description, 
                    email, 
                    user_id: user.id,
                    status: 'In elaborazione'
                 }])
                .select();

            if (adRequestError) throw adRequestError;
            if (!adRequestData || adRequestData.length === 0) throw new Error("Creazione richiesta annuncio fallita.");

            const adRequestId = adRequestData[0].id;
            
            toast({
                title: "⏳ Caricamento immagini in corso...",
                description: `Non chiudere la pagina. Immagini caricate: 0/${images.length}`
            });

            const uploadPromises = images.map(file => {
                const fileExt = file.name.split('.').pop();
                const fileName = `${crypto.randomUUID()}.${fileExt}`;
                const filePath = `${user.id}/${adRequestId}/${fileName}`;
                return supabase.storage.from('ad-images').upload(filePath, file);
            });

            const uploadResults = await Promise.all(uploadPromises);

            const imageRecords = [];
            for (const result of uploadResults) {
                if (result.error) {
                    throw new Error(`Upload immagine fallito: ${result.error.message}`);
                }
                const { data: { path } } = result;
                const { data: { publicUrl } } = supabase.storage.from('ad-images').getPublicUrl(path);

                imageRecords.push({
                    id: crypto.randomUUID(),
                    ad_request_id: adRequestId,
                    user_id: user.id,
                    file_name: path.split('/').pop(),
                    original_image_url: publicUrl,
                    status: 'uploaded',
                });
            }
            
            if (imageRecords.length > 0) {
                const { error: imageInsertError } = await supabase.from('ad_images').insert(imageRecords);
                if (imageInsertError) throw imageInsertError;
            }

            setSubmissionStatus('success');
            
        } catch (error) {
            console.error("Submission failed:", error);
            toast({
                title: "❌ Errore durante l'invio",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const resetForm = () => {
        setImages([]);
        setPreviews([]);
        setTitle('');
        setDescription('');
        if(user) setEmail(user.email);
        else setEmail('');
        setTermsAccepted(false);
        setImageRightsAccepted(false);
        setSubmissionStatus('idle');
    };

    return (
        <>
            <Helmet>
                <title>Crea Annuncio - ImmobiliareGPT</title>
                <meta name="description" content="Carica le tue foto e inserisci i dettagli del tuo immobile. L'AI di ImmobiliareGPT farà il resto." />
            </Helmet>
            <div className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatePresence mode="wait">
                    {submissionStatus === 'idle' ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
                        >
                            <div className="text-center mb-8">
                                <h1 className="text-3xl md:text-4xl font-bold text-white">Crea il tuo Annuncio Ottimizzato</h1>
                                <p className="text-gray-300 mt-2">Segui i passaggi e lascia che l'AI faccia la sua magia.</p>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><UploadCloud className="w-7 h-7 text-blue-400" />1. Carica le foto (max {MAX_FILES})</h2>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/jpeg, image/png"
                                            multiple
                                            onChange={handleImageUpload}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            id="image-upload"
                                            disabled={isProcessing}
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className="flex flex-col items-center justify-center w-full min-h-[12rem] border-2 border-dashed border-blue-400/50 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-300 cursor-pointer p-4"
                                        >
                                            <ImageIcon className="w-16 h-16 text-blue-400 mb-4" />
                                            <p className="text-white text-lg font-medium mb-2">Trascina le foto o clicca per caricare</p>
                                            <p className="text-gray-400 text-sm">PNG, JPG. Max 2MB/foto. Caricate: {images.length}/{MAX_FILES}</p>
                                        </label>
                                    </div>
                                    {previews.length > 0 && (
                                        <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                            {previews.map((preview, index) => (
                                                <motion.div key={index} className="relative group" layout>
                                                    <img src={preview} alt={`preview ${index}`} className="w-full h-24 object-cover rounded-lg shadow-md" />
                                                    <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {/* Checkbox obbligatoria per i diritti delle immagini */}
                                    <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                                        <div className="flex items-start space-x-3">
                                            <Checkbox 
                                                id="image-rights" 
                                                checked={imageRightsAccepted} 
                                                onCheckedChange={setImageRightsAccepted} 
                                                disabled={isProcessing}
                                                className="mt-1"
                                            />
                                            <label htmlFor="image-rights" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
                                                <span className="font-semibold text-yellow-300">Dichiarazione obbligatoria:</span> Dichiaro di avere i diritti per utilizzare e condividere le immagini caricate, di aver ottenuto eventuali consensi da terzi, e autorizzo ImmobiliareGPT a elaborarle esclusivamente per scopi tecnici e creativi (miglioramento visivo, generazione descrizioni). Le immagini non contengono dati personali sensibili. Con l'invio sollevo ImmobiliareGPT da qualsiasi responsabilità derivante da un uso improprio delle immagini.
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><FileText className="w-7 h-7 text-teal-400" />2. Dettagli dell'annuncio</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="title" className="text-gray-300 mb-2 block">Titolo annuncio</Label>
                                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Es. Villa moderna con vista panoramica" disabled={isProcessing} />
                                        </div>
                                        <div>
                                            <Label htmlFor="description" className="text-gray-300 mb-2 block">Descrizione</Label>
                                            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrivi i punti di forza dell'immobile, mq, locali, posizione..." className="w-full h-32 bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none" disabled={isProcessing} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><Mail className="w-7 h-7 text-purple-400" />3. La tua Email</h2>
                                    <Label htmlFor="email" className="text-gray-300 mb-2 block">Email per ricevere il risultato</Label>
                                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tuo.indirizzo@email.com" disabled={isProcessing || (user && user.email)} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><ShieldCheck className="w-7 h-7 text-red-400" />4. Conferma</h2>
                                    <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-lg">
                                        <Checkbox id="terms" checked={termsAccepted} onCheckedChange={setTermsAccepted} disabled={isProcessing} />
                                        <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300">
                                            Confermo di possedere i diritti sul materiale caricato e accetto i termini di servizio.
                                        </label>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isProcessing || !termsAccepted || !imageRightsAccepted}
                                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                            Elaborazione...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-2" />
                                            Invia e Ottimizza
                                        </>
                                    )}
                                </Button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl text-center"
                        >
                            <CheckCircle className="w-24 h-24 text-teal-400 mx-auto mb-6" />
                            <h2 className="text-4xl font-bold text-white mb-4">Richiesta Inviata!</h2>
                            <p className="text-lg text-gray-300 mb-8">
                                Il tuo annuncio è in fase di elaborazione. Puoi monitorare lo stato nella tua <Link to="/dashboard" className="font-bold text-teal-300 underline">Dashboard</Link>.
                            </p>
                            <Button
                                onClick={() => navigate('/dashboard')}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Vai alla Dashboard
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default CreateAdPage;