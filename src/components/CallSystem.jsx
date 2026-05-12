import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// ===================== PANDIT SIDE =====================
export const PanditCallReceiver = ({ panditId }) => {
    const [socket, setSocket] = useState(null);
    const [incomingCall, setIncomingCall] = useState(null);
    const [connected, setConnected] = useState(false);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const s = io('https://astrologer-backendcoll-chaat.onrender.com');
        setSocket(s);
        s.on('connect', () => {
            setConnected(true);
            s.emit('user-join', String(panditId));
            addLog(`✅ Connected as ${panditId}`);
        });
        s.on('incoming-call', (data) => {
            addLog(`🔔 INCOMING CALL from ${data.from}`);
            setIncomingCall(data);
            // Browser Notification
            if (Notification.permission === 'granted') {
                new Notification('📞 Incoming Call!', {
                    body: `User ${data.from.slice(-6)} is calling`
                });
            }
        });
        if (Notification.permission === 'default') Notification.requestPermission();
        return () => s.close();
    }, [panditId]);

    const addLog = (msg) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
    const acceptCall = () => {
        alert('✅ Call Accepted! Video chat starting...');
        setIncomingCall(null);
    };
    const declineCall = () => {
        if (socket && incomingCall) socket.emit('end-call', { to: incomingCall.from });
        setIncomingCall(null);
    };

    return (
        <div style={{ padding: 20 }}>
            <h3>📞 Pandit Call Status</h3>
            <p>Status: {connected ? '🟢 ONLINE' : '🔴 OFFLINE'}</p>
            {incomingCall && (
                <div style={{
                    position: 'fixed', bottom: 20, right: 20,
                    background: 'white', padding: 20, borderRadius: 10,
                    boxShadow: '0 0 10px black', border: '2px solid orange',
                    zIndex: 1000
                }}>
                    <h4>📞 Incoming Call!</h4>
                    <p>User {incomingCall.from.slice(-6)}</p>
                    <button onClick={acceptCall} style={{ background: 'green', color: 'white', padding: 8, margin: 5 }}>Accept</button>
                    <button onClick={declineCall} style={{ background: 'red', color: 'white', padding: 8, margin: 5 }}>Decline</button>
                </div>
            )}
            <details>
                <summary>Call Logs</summary>
                <div style={{ height: 150, overflow: 'auto', fontSize: 12 }}>
                    {logs.map((log, i) => <div key={i}>📌 {log}</div>)}
                </div>
            </details>
        </div>
    );
};

// ===================== USER SIDE =====================
export const UserCallButton = ({ panditId, panditName }) => {
    const [socket, setSocket] = useState(null);
    const [calling, setCalling] = useState(false);

    const makeCall = () => {
        const s = io('https://astrologer-backendcoll-chaat.onrender.com');
        setSocket(s);
        s.on('connect', () => {
            s.emit('user-join', 'user_temp');
            s.emit('call-user', { to: String(panditId), from: '9999999999', signal: 'call_request' });
            setCalling(true);
            setTimeout(() => {
                alert(`Calling ${panditName}...`);
                s.close();
            }, 500);
        });
    };

    return (
        <button onClick={makeCall} disabled={calling} style={{
            background: '#4CAF50', color: 'white', padding: '8px 16px',
            border: 'none', borderRadius: '5px', cursor: 'pointer'
        }}>
            {calling ? '📞 Calling...' : '📞 Call Now'}
        </button>
    );
};

// ===================== INTEGRATION =====================
// Pandit Dashboard में यह डालो:
// import { PanditCallReceiver } from './CallSystem';
// <PanditCallReceiver panditId="8888888888" />

// User के Pandit Card में यह डालो:
// import { UserCallButton } from './CallSystem';
// <UserCallButton panditId="8888888888" panditName="Acharya Sheetal" />