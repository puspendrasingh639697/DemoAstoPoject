import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const PanditCallReceiver = () => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [incomingCall, setIncomingCall] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [callerId, setCallerId] = useState('');
    
    const panditId = user?.phone || '8888888888';

    useEffect(() => {
        const s = io('https://astrologer-backendcoll-chaat.onrender.com');
        setSocket(s);
        
        s.on('connect', () => {
            setConnected(true);
            s.emit('user-join', String(panditId));
            console.log('✅ Pandit Online:', panditId);
        });

        // 🔔 INCOMING CALL
        s.on('incoming-call', (data) => {
            console.log('🔔🔔🔔 INCOMING CALL!');
            console.log('📞 From:', data.from);
            setCallerId(data.from);
            setIncomingCall(data);
            setShowPopup(true);
        });

        return () => s.close();
    }, [panditId]);

    const acceptCall = () => {
        console.log('✅ Accepting call from:', callerId);
        if (socket) {
            socket.emit('answer-call', { to: callerId, signal: 'accepted' });
        }
        alert(`📞 Call connected with User ${callerId?.slice(-6)}! You can now chat.`);
        setShowPopup(false);
        setIncomingCall(null);
    };

    const declineCall = () => {
        console.log('❌ Declining call from:', callerId);
        if (socket && incomingCall) {
            socket.emit('end-call', { to: incomingCall.from });
        }
        setShowPopup(false);
        setIncomingCall(null);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#1a1a1a', padding: '20px', marginTop: '70px', color: 'white', textAlign: 'center' }}>
            <h1>📞 Pandit Call Receiver</h1>
            
            <div style={{ 
                background: connected ? '#2e7d32' : '#c62828', 
                padding: '15px', 
                borderRadius: '10px', 
                marginBottom: '20px'
            }}>
                <h2>{connected ? '🟢 ONLINE' : '🔴 OFFLINE'}</h2>
                <p>Your ID: <strong>{panditId}</strong></p>
            </div>
            
            {showPopup && (
                <div style={{
                    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    background: '#ff9800', padding: '30px', borderRadius: '15px',
                    textAlign: 'center', zIndex: 2000, minWidth: '300px',
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                }}>
                    <div style={{ fontSize: '60px', marginBottom: '10px' }}>📞</div>
                    <h2>Incoming Call!</h2>
                    <p>User <strong>{callerId?.slice(-6)}</strong> is calling</p>
                    <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <button onClick={acceptCall} style={{ background: '#4CAF50', color: 'white', padding: '10px 25px', border: 'none', borderRadius: '25px', cursor: 'pointer', fontSize: '16px' }}>
                            ✅ Accept
                        </button>
                        <button onClick={declineCall} style={{ background: '#f44336', color: 'white', padding: '10px 25px', border: 'none', borderRadius: '25px', cursor: 'pointer', fontSize: '16px' }}>
                            ❌ Decline
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PanditCallReceiver;