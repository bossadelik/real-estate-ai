import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import PricingPage from '@/pages/PricingPage';
import CreateAdPage from '@/pages/CreateAdPage';
import DashboardPage from '@/pages/DashboardPage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/LoginPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const location = useLocation();
  const backgroundPattern = `data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M30 30c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8zm-16 0c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <div 
          className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 -z-10"
        ></div>
        <div 
          className="fixed inset-0 opacity-20 -z-10"
          style={{ backgroundImage: `url("${backgroundPattern}")` }}
        ></div>
        
        <Navbar />
        <main className="flex-grow">
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/prezzi" element={<PricingPage />} />
                    <Route path="/crea-annuncio" element={
                        <ProtectedRoute>
                            <CreateAdPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/contatti" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </AnimatePresence>
        </main>
        <Footer />
        <Toaster />
    </div>
  );
}

export default App;