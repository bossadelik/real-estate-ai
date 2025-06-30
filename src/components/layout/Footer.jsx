import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-3">
               <img className="h-8 w-auto" alt="ImmobiliareGPT Logo" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/d9c2d5fd-9608-4719-b125-084393810a2a/8d5a4685b9ca7f58f48ef3bfcfe402f9.png" />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">ImmobiliareGPT</span>
            </Link>
             <p className="mt-2 text-sm max-w-xs">Ottimizza annunci immobiliari. Foto e testi perfetti in un click.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6">
            <div>
              <p className="mb-6 text-sm font-semibold text-gray-200 uppercase">Risorse</p>
              <ul className="space-y-4">
                <li><Link to="/prezzi" className="hover:text-white">Piani e Prezzi</Link></li>
                <li><Link to="/crea-annuncio" className="hover:text-white">Crea Annuncio</Link></li>
                 <li><Link to="/contatti" className="hover:text-white">Contatti</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-6 text-sm font-semibold text-gray-200 uppercase">Legale</p>
              <ul className="space-y-4">
                <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                <li><a href="#" className="hover:text-white">Termini & Condizioni</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <div className="text-center text-sm">
          <span>© {new Date().getFullYear()} ImmobiliareGPT™. Tutti i diritti riservati.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;