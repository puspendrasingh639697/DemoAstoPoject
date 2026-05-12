import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const PanditCallTest = () => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [incomingCall, setIncomingCall] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [callLogs, setCallLogs] = useState([]);

    const panditId = user?.phone || user?.id || user?.mobile || '8888888888';

    useEffect(() => {
        if (!panditId) return;

        addLog('🔵 Starting Pandit Dashboard for: ' + panditId);

        const newSocket = io('https://astrologer-backendcoll-chaat.onrender.com');
        setSocket(newSocket);
        
        newSocket.on('connect', () => {
            addLog('✅ Socket Connected! ID: ' + newSocket.id);
            setIsConnected(true);
            newSocket.emit('user-join', String(panditId));
            addLog('📢 Joined as: ' + panditId);
        });
        
        // 🔔 MAIN EVENT - Incoming Call
        newSocket.on('incoming-call', (data) => {
            addLog('🔔🔔🔔 INCOMING CALL DETECTED!');
            addLog('📞 Caller: ' + data.from);
            addLog('📞 Signal: ' + JSON.stringify(data.signal).substring(0, 100));
            
            // Show alert
            alert(`📞 INCOMING CALL from User ${data.from?.slice(-6)}!`);
            
            setIncomingCall(data);
        });
        
        newSocket.on('connect_error', (err) => {
            addLog('❌ Connection Error: ' + err.message);
        });
        
        return () => {
            addLog('🔴 Cleaning up...');
            newSocket.close();
        };
    }, [panditId]);

    const addLog = (message) => {
        console.log(message);
        setCallLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg: message }]);
    };

    return (
        <div className="min-h-screen bg-gray-900 p-8 mt-16">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-white">📞 Pandit Call Dashboard</h1>
                <p className="text-gray-400 mt-2">Your ID: <span className="text-yellow-400 font-bold">{panditId}</span></p>
                <div className="mt-2">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${isConnected ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        {isConnected ? '🟢 CONNECTED TO SERVER' : '🔴 DISCONNECTED'}
                    </span>
                </div>
            </div>
            
            {/* Incoming Call Popup */}
            {incomingCall && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-center shadow-2xl animate-pulse">
                        <div className="text-8xl mb-4 animate-bounce">📞</div>
                        <h2 className="text-3xl font-bold text-white mb-2">INCOMING CALL!</h2>
                        <p className="text-white text-lg mb-6">
                            User <span className="font-bold text-yellow-900">{incomingCall.from?.slice(-6)}</span> is calling you
                        </p>
                        <div className="flex gap-6 justify-center">
                            <button 
                                onClick={() => {
                                    alert('✅ Call Accepted! Starting video...');
                                    setIncomingCall(null);
                                }}
                                className="bg-green-600 text-white px-8 py-3 rounded-full text-xl font-bold hover:bg-green-700 transition transform hover:scale-105"
                            >
                                ✅ ACCEPT
                            </button>
                            <button 
                                onClick={() => {
                                    setIncomingCall(null);
                                    if (socket) {
                                        socket.emit('end-call', { to: incomingCall.from });
                                    }
                                }}
                                className="bg-red-600 text-white px-8 py-3 rounded-full text-xl font-bold hover:bg-red-700 transition transform hover:scale-105"
                            >
                                ❌ DECLINE
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Call Logs */}
            <div className="max-w-4xl mx-auto mt-6">
                <div className="bg-gray-800 rounded-xl overflow-hidden">
                    <div className="bg-yellow-500 text-black p-3 font-bold text-lg">
                        📋 Call Logs / Events
                    </div>
                    <div className="h-96 overflow-y-auto p-4 space-y-2 font-mono text-sm">
                        {callLogs.length === 0 ? (
                            <div className="text-gray-500 text-center py-10">
                                Waiting for events...
                            </div>
                        ) : (
                            callLogs.map((log, i) => (
                                <div key={i} className="border-l-4 border-yellow-500 bg-gray-700 p-2 rounded">
                                    <span className="text-gray-400">[{log.time}]</span>
                                    <span className="text-white ml-2">{log.msg}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            
            {/* Instructions */}
            <div className="max-w-4xl mx-auto mt-6 bg-blue-900 rounded-xl p-4">
                <h3 className="text-yellow-400 font-bold mb-2">📌 Instructions:</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                    <li>✅ 1. This window should stay OPEN</li>
                    <li>✅ 2. User से Call करें (9999999999 → /pandits → Call button)</li>
                    <li>✅ 3. जैसे ही Call आएगा, यहाँ POPUP दिखेगा और ALERT आएगा</li>
                    <li>✅ 4. Call Logs में "INCOMING CALL DETECTED" दिखना चाहिए</li>
                </ul>
            </div>
        </div>
    );
};

export default PanditCallTest;