import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const PanditNotification = ({ panditId }) => {
    const [notifications, setNotifications] = useState([]);
    const [activeToast, setActiveToast] = useState(null);

    useEffect(() => {
        if (!panditId) return;

        // Socket connection with debug logs
        const socket = io('https://astrologer-backendcoll-chaat.onrender.com');

        socket.on('connect', () => {
            console.log("✅ [NOTIF SOCKET] Connected:", socket.id);
            socket.emit('user-join', String(panditId));
        });

        // 🔔 Listen for NEW MESSAGE
        socket.on('new-message-notification', (data) => {
            console.log("🔥 [FRONTEND SIGNAL RECEIVED]:", data);
            
            // Play a quick alert sound
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
            audio.play().catch(e => console.warn("Audio play blocked"));

            const newNotif = {
                id: Date.now(),
                message: data.message,
                from: data.from,
                title: data.title || "Naya Sandesh"
            };

            setNotifications(prev => [newNotif, ...prev]);
            setActiveToast(newNotif);

            // Auto-hide toast after 7 seconds
            setTimeout(() => setActiveToast(null), 7000);
        });

        return () => socket.disconnect();
    }, [panditId]);

    return (
        <div className="fixed top-20 right-5 z-[9999]">
            {/* 🚀 FLOAT POPUP (Toast) */}
            {activeToast && (
                <div className="bg-white border-l-4 border-orange-500 shadow-2xl rounded-lg p-4 w-72 animate-bounce">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-orange-600">✨ {activeToast.title}</span>
                        <button onClick={() => setActiveToast(null)} className="text-gray-400 text-lg">✕</button>
                    </div>
                    <p className="text-sm text-gray-700 mt-2 font-medium">"{activeToast.message}"</p>
                    <p className="text-[10px] text-gray-400 mt-1 italic">From: {activeToast.from}</p>
                </div>
            )}

            {/* 🔔 BELL ICON */}
            <div className="mt-4 bg-white p-3 rounded-full shadow-lg border-2 border-orange-100 cursor-pointer hover:scale-110 transition-transform">
                <span className="text-2xl">🔔</span>
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                        {notifications.length}
                    </span>
                )}
            </div>
        </div>
    );
};

export default PanditNotification;