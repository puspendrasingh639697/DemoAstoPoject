// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Check if user is logged in from localStorage
//         const savedUser = localStorage.getItem('user');
//         if (savedUser) {
//             setUser(JSON.parse(savedUser));
//         }
//         setLoading(false); // चेकिंग पूरी होने के बाद ही इसे false करें
//     }, []);

//     const login = (userData) => {
//         setUser(userData);
//         localStorage.setItem('user', JSON.stringify(userData));
//     };

//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem('user');
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout, loading }}>
//             {/* 🛡️ सुरक्षा गार्ड: जब तक loading true है, तब तक कंपोनेंट्स को लोड मत होने दो */}
//             {loading ? (
//                 <div style={{
//                     height: '100vh', 
//                     display: 'flex', 
//                     justifyContent: 'center', 
//                     alignItems: 'center', 
//                     background: '#1a1a1a', 
//                     color: '#FFD700',
//                     fontSize: '20px',
//                     fontWeight: 'bold',
//                     fontFamily: 'sans-serif'
//                 }}>
//                     ✨ Loading Astrology App...
//                 </div>
//             ) : (
//                 children
//             )}
//         </AuthContext.Provider>
//     );
// };

import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      } else {
        // Demo mode - check localStorage
        const savedUser = localStorage.getItem('demoUser');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        const savedUser = localStorage.getItem('demoUser');
        setUser(savedUser ? JSON.parse(savedUser) : null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (userData) => {
    localStorage.setItem('demoUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('demoUser');
    supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};