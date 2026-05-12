import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const PanditDashboard = () => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [incomingCall, setIncomingCall] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [callerId, setCallerId] = useState('');
    const [logs, setLogs] = useState([]);

    const panditId = user?.phone || '8888888888';

    const addLog = (msg) => {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, `[${time}] ${msg}`]);
        console.log(msg);
    };

    useEffect(() => {
        if (!panditId) return;

        addLog('🔵 Pandit Dashboard Starting for ID: ' + panditId);

        const newSocket = io('https://astrologer-backendcoll-chaat.onrender.com');
        setSocket(newSocket);
        
        newSocket.on('connect', () => {
            addLog('✅ Socket Connected!');
            setIsConnected(true);
            newSocket.emit('user-join', String(panditId));
            addLog('📢 Registered as: ' + panditId);
        });
        
        newSocket.on('incoming-call', (data) => {
            addLog('🔔🔔🔔 INCOMING CALL DETECTED!');
            addLog('📞 Caller ID: ' + data.from);
            setCallerId(data.from);
            setIncomingCall(data);
            setShowPopup(true);
            
            // Browser Notification
            if (Notification.permission === 'granted') {
                new Notification('📞 Incoming Call!', {
                    body: `User ${data.from?.slice(-6)} is calling you`,
                });
            }
        });
        
        newSocket.on('connect_error', (err) => {
            addLog('❌ Connection Error: ' + err.message);
        });
        
        // Request notification permission
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
        
        return () => {
            addLog('🔴 Cleaning up...');
            newSocket.close();
        };
    }, [panditId]);

    const acceptCall = () => {
        addLog('✅ Call ACCEPTED from: ' + callerId);
        alert('📞 Call Accepted! Starting video call...');
        setShowPopup(false);
        setIncomingCall(null);
    };

    const declineCall = () => {
        addLog('❌ Call DECLINED from: ' + callerId);
        if (socket && incomingCall) {
            socket.emit('end-call', { to: incomingCall.from });
        }
        setShowPopup(false);
        setIncomingCall(null);
    };

    const pandits = [
        { name: 'Acharya Sheetal', exp: 17, lang: 'Hindi, English', skill: 'Vedic Astrology' },
        { name: 'Pandit Suresh Mishra', exp: 10, lang: 'Hindi', skill: 'Vedic Astrology' },
        { name: 'Acharya Shardha', exp: 15, lang: 'English', skill: 'Tarot, Vedic' },
        { name: 'Pandit Anil Tripathi', exp: 22, lang: 'Hindi, Sanskrit', skill: 'Vedic Pujan' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '20px', marginTop: '60px' }}>
            
            {/* Call Popup */}
            {showPopup && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '320px',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    zIndex: 1000,
                    border: '3px solid #f5b042',
                    animation: 'bounce 0.5s'
                }}>
                    <div style={{
                        background: '#f5b042',
                        padding: '12px',
                        borderRadius: '10px 10px 0 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span style={{ color: 'white', fontWeight: 'bold' }}>📞 Incoming Call!</span>
                        <button onClick={declineCall} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>×</button>
                    </div>
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                        <div style={{ fontSize: '50px' }}>📞</div>
                        <p style={{ fontWeight: 'bold', margin: '10px 0', fontSize: '16px' }}>User {callerId?.slice(-6)}</p>
                        <p style={{ color: '#666', marginBottom: '15px' }}>is calling you...</p>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button onClick={acceptCall} style={{ background: '#4CAF50', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}>
                                ✅ Accept
                            </button>
                            <button onClick={declineCall} style={{ background: '#f44336', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}>
                                ❌ Decline
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Status Bar */}
            <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '15px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
                <div>
                    <h2 style={{ margin: 0 }}>Pandit Dashboard</h2>
                    <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '12px' }}>ID: {panditId}</p>
                </div>
                <div style={{
                    padding: '5px 15px',
                    borderRadius: '20px',
                    background: isConnected ? '#4CAF50' : '#f44336',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}>
                    {isConnected ? '🟢 ONLINE' : '🔴 OFFLINE'}
                </div>
            </div>

            {/* Welcome */}
            <div style={{ background: '#fff3e0', padding: '15px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' }}>
                <h3 style={{ margin: 0 }}>Welcome Pandit Ji!</h3>
                <p style={{ margin: '5px 0 0 0', color: '#666' }}>You are online and ready to receive calls</p>
            </div>

            {/* Debug Logs */}
            <details style={{ marginBottom: '20px' }}>
                <summary style={{ cursor: 'pointer', padding: '10px', background: '#333', color: 'white', borderRadius: '8px' }}>📋 Debug Logs</summary>
                <div style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '10px', borderRadius: '8px', marginTop: '5px', maxHeight: '200px', overflow: 'auto', fontFamily: 'monospace', fontSize: '12px' }}>
                    {logs.length === 0 ? (
                        <div>Waiting for events...</div>
                    ) : (
                        logs.map((log, i) => <div key={i}>📌 {log}</div>)
                    )}
                </div>
            </details>

            {/* Pandit Cards */}
            <h3>Our Expert Pandits</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                {pandits.map((p, i) => (
                    <div key={i} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ background: '#f5b042', padding: '15px', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', background: 'white', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                <span style={{ fontSize: '30px' }}>🔱</span>
                            </div>
                            <h4 style={{ margin: 0, color: 'white' }}>{p.name}</h4>
                            <div style={{ color: '#ffe0b3', fontSize: '12px' }}>★★★★★</div>
                        </div>
                        <div style={{ padding: '12px' }}>
                            <p style={{ margin: '5px 0', fontSize: '13px' }}>📅 {p.exp} years</p>
                            <p style={{ margin: '5px 0', fontSize: '13px' }}>🗣️ {p.lang}</p>
                            <p style={{ margin: '5px 0', fontSize: '13px' }}>🔮 {p.skill}</p>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    );
};

export default PanditDashboard;