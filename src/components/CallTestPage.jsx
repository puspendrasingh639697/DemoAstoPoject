import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const CallTestPage = () => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [incomingCall, setIncomingCall] = useState(null);
    const [connected, setConnected] = useState(false);
    const [logs, setLogs] = useState([]);
    
    const panditId = user?.phone || '8888888888';

    useEffect(() => {
        const s = io('https://astrologer-backendcoll-chaat.onrender.com');
        setSocket(s);
        
        s.on('connect', () => {
            setConnected(true);
            s.emit('user-join', panditId);
            addLog(`✅ Connected as Pandit ${panditId}`);
        });
        
        s.on('incoming-call', (data) => {
            addLog(`🔔🔔🔔 INCOMING CALL from ${data.from}`);
            setIncomingCall(data);
            
            // Browser Notification
            new Notification(`📞 Incoming Call from User ${data.from.slice(-6)}`);
        });
        
        return () => s.close();
    }, []);

    const addLog = (msg) => {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, `[${time}] ${msg}`]);
        console.log(msg);
    };

    const acceptCall = () => {
        alert(`✅ Call Accepted from ${incomingCall?.from}`);
        setIncomingCall(null);
    };

    const declineCall = () => {
        if (socket && incomingCall) {
            socket.emit('end-call', { to: incomingCall.from });
        }
        setIncomingCall(null);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#1a1a1a', padding: '20px', marginTop: '60px', color: 'white' }}>
            <h1>📞 PANDIT CALL RECEIVER</h1>
            
            <div style={{ padding: '15px', background: connected ? '#2e7d32' : '#c62828', borderRadius: '10px', marginBottom: '20px' }}>
                Status: {connected ? '🟢 ONLINE - Ready to receive calls' : '🔴 OFFLINE'}
                <br />
                Your ID: <strong>{panditId}</strong>
            </div>
            
            {incomingCall && (
                <div style={{
                    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                    background: '#ff9800', padding: '30px', borderRadius: '20px',
                    textAlign: 'center', zIndex: 1000, color: 'black', minWidth: '300px'
                }}>
                    <div style={{ fontSize: '60px' }}>📞</div>
                    <h2>INCOMING CALL!</h2>
                    <p>User {incomingCall.from?.slice(-6)} is calling</p>
                    <button onClick={acceptCall} style={{ background: 'green', color: 'white', padding: '10px 20px', margin: '5px', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>✅ ACCEPT</button>
                    <button onClick={declineCall} style={{ background: 'red', color: 'white', padding: '10px 20px', margin: '5px', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>❌ DECLINE</button>
                </div>
            )}
            
            <div style={{ background: '#2d2d2d', borderRadius: '10px', padding: '10px', marginTop: '20px' }}>
                <h3>📋 Call Logs</h3>
                <div style={{ height: '300px', overflow: 'auto', fontFamily: 'monospace', fontSize: '12px' }}>
                    {logs.map((log, i) => <div key={i}>📌 {log}</div>)}
                </div>
            </div>
            
            <div style={{ marginTop: '20px', padding: '10px', background: '#333', borderRadius: '10px' }}>
                <p>✅ इस पेज को खुला रखें - यहाँ Call आएगी</p>
                <p>✅ User से Call करने पर यहाँ POPUP दिखेगा</p>
            </div>
        </div>
    );
};

export default CallTestPage;