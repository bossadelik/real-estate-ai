import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    toast({ title: 'Logout effettuato con successo!' });
    navigate('/');
  };

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/prezzi', text: 'Piani' },
    { to: '/crea-annuncio', text: 'Crea Annuncio' },
    { to: '/dashboard', text: 'Dashboard' },
    { to: '/contatti', text: 'Contatti' },
  ];

  const activeLinkStyle = {
    color: '#38bdf8',
    fontWeight: 'bold',
  };

  const navLinkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1 + 0.2,
        type: 'spring',
        stiffness: 120,
      },
    }),
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/50 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <img className="h-10 w-auto" alt="ImmobiliareGPT Logo" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/d9c2d5fd-9608-4719-b125-084393810a2a/8d5a4685b9ca7f58f48ef3bfcfe402f9.png" />
              <span className="text-2xl font-bold text-white">ImmobiliareGPT</span>
            </Link>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, i) => (
              <motion.div key={link.to} custom={i} initial="hidden" animate="visible" variants={navLinkVariants}>
                 <NavLink
                  to={link.to}
                  style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                  className="text-gray-300 hover:text-sky-400 transition-colors duration-300"
                >
                  {link.text}
                </NavLink>
              </motion.div>
            ))}
          </div>
          
          <div className="hidden md:block">
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              {user ? (
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-300 flex items-center gap-2"><User className="w-4 h-4" /> {user.email}</span>
                    <Button onClick={handleLogout} variant="outline" className="text-white border-red-500/50 hover:bg-red-500/20 hover:text-white">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                </div>
              ) : (
                <Button asChild className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold hover:scale-105 transition-transform">
                  <Link to="/login"><LogIn className="mr-2 h-4 w-4"/> Login</Link>
                </Button>
              )}
            </motion.div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.text}
              </NavLink>
            ))}
             <div className="pt-4 border-t border-white/10 mt-4">
                 {user ? (
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-sm text-gray-300 flex items-center gap-2"><User className="w-4 h-4" /> {user.email}</span>
                        <Button onClick={handleLogout} variant="outline" className="w-full text-white border-red-500/50 hover:bg-red-500/20 hover:text-white">
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                    </div>
                ) : (
                    <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold">
                        <Link to="/login" onClick={() => setIsOpen(false)}><LogIn className="mr-2 h-4 w-4"/> Login</Link>
                    </Button>
                )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;