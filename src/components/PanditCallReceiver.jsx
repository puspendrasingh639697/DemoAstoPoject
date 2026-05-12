// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import { useAuth } from '../context/AuthContext';

// const PanditCallReceiver = () => {
//     const { user } = useAuth();
//     const [socket, setSocket] = useState(null);
//     const [connected, setConnected] = useState(false);
//     const [incomingCall, setIncomingCall] = useState(null);
//     const [showPopup, setShowPopup] = useState(false);
//     const [callerId, setCallerId] = useState('');
    
//     const panditId = user?.phone || '8888888888';

//     useEffect(() => {
//         const s = io('https://astrologer-backendcoll-chaat.onrender.com');
//         setSocket(s);
        
//         s.on('connect', () => {
//             setConnected(true);
//             s.emit('user-join', String(panditId));
//             console.log('✅ Pandit Online:', panditId);
//         });

//         // 🔔 INCOMING CALL
//         s.on('incoming-call', (data) => {
//             console.log('🔔🔔🔔 INCOMING CALL!');
//             console.log('📞 From:', data.from);
//             setCallerId(data.from);
//             setIncomingCall(data);
//             setShowPopup(true);
//         });

//         return () => s.close();
//     }, [panditId]);

//     const acceptCall = () => {
//         console.log('✅ Accepting call from:', callerId);
//         if (socket) {
//             socket.emit('answer-call', { to: callerId, signal: 'accepted' });
//         }
//         alert(`📞 Call connected with User ${callerId?.slice(-6)}! You can now chat.`);
//         setShowPopup(false);
//         setIncomingCall(null);
//     };

//     const declineCall = () => {
//         console.log('❌ Declining call from:', callerId);
//         if (socket && incomingCall) {
//             socket.emit('end-call', { to: incomingCall.from });
//         }
//         setShowPopup(false);
//         setIncomingCall(null);
//     };

//     return (
//         <div style={{ minHeight: '100vh', background: '#1a1a1a', padding: '20px', marginTop: '70px', color: 'white', textAlign: 'center' }}>
//             <h1>📞 Pandit Call Receiver</h1>
            
//             <div style={{ 
//                 background: connected ? '#2e7d32' : '#c62828', 
//                 padding: '15px', 
//                 borderRadius: '10px', 
//                 marginBottom: '20px'
//             }}>
//                 <h2>{connected ? '🟢 ONLINE' : '🔴 OFFLINE'}</h2>
//                 <p>Your ID: <strong>{panditId}</strong></p>
//             </div>
            
//             {showPopup && (
//                 <div style={{
//                     position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
//                     background: '#ff9800', padding: '30px', borderRadius: '15px',
//                     textAlign: 'center', zIndex: 2000, minWidth: '300px',
//                     boxShadow: '0 0 20px rgba(0,0,0,0.5)'
//                 }}>
//                     <div style={{ fontSize: '60px', marginBottom: '10px' }}>📞</div>
//                     <h2>Incoming Call!</h2>
//                     <p>User <strong>{callerId?.slice(-6)}</strong> is calling</p>
//                     <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
//                         <button onClick={acceptCall} style={{ background: '#4CAF50', color: 'white', padding: '10px 25px', border: 'none', borderRadius: '25px', cursor: 'pointer', fontSize: '16px' }}>
//                             ✅ Accept
//                         </button>
//                         <button onClick={declineCall} style={{ background: '#f44336', color: 'white', padding: '10px 25px', border: 'none', borderRadius: '25px', cursor: 'pointer', fontSize: '16px' }}>
//                             ❌ Decline
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PanditCallReceiver;

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const PanditCallReceiver = () => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [incomingCall, setIncomingCall] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [callerId, setCallerId] = useState('');
    const [debugLogs, setDebugLogs] = useState([]);
    
    const panditId = user?.phone || '8888888888';
    const audioRef = useRef(null);

    const addLog = (msg, data = null) => {
        const log = { time: new Date().toLocaleTimeString(), msg, data };
        setDebugLogs(prev => [...prev, log]);
        console.log(`[${log.time}] ${msg}`, data || '');
    };

    useEffect(() => {
        addLog(`🚀 Starting Pandit Receiver with ID: ${panditId}`);
        
        // Create audio element for ringtone
        audioRef.current = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
        
        const s = io('https://astrologer-backendcoll-chaat.onrender.com', {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5
        });
        
        setSocket(s);
        
        s.on('connect', () => {
            addLog('✅ Socket CONNECTED successfully');
            setConnected(true);
            
            // Join room with pandit ID (most important!)
            s.emit('user-join', String(panditId));
            addLog(`📤 Emitted 'user-join' with ID: ${panditId}`);
            
            // Try alternative join methods (for different backends)
            s.emit('register', { userId: String(panditId), role: 'pandit' });
            s.emit('join', { id: String(panditId), type: 'pandit' });
        });
        
        s.on('disconnect', () => {
            addLog('⚠️ Socket DISCONNECTED');
            setConnected(false);
        });
        
        // 🔔 LISTEN TO ALL POSSIBLE CALL EVENTS
        const callEvents = ['incoming-call', 'call-request', 'new-call', 'start-call', 'call', 'webrtc-offer'];
        
        callEvents.forEach(eventName => {
            s.on(eventName, (data) => {
                addLog(`🔔🔔🔔 Event '${eventName}' RECEIVED!`, data);
                
                const fromId = data.from || data.callerId || data.caller || data.userId;
                
                if (fromId) {
                    setCallerId(fromId);
                    setIncomingCall(data);
                    setShowPopup(true);
                    
                    // Play ringtone
                    if (audioRef.current) {
                        audioRef.current.play().catch(e => console.log('Audio play error:', e));
                    }
                    
                    // Show browser notification
                    if (Notification.permission === 'granted') {
                        new Notification('📞 Incoming Call!', {
                            body: `User ${fromId.slice(-6)} is calling you`,
                            icon: 'https://cdn-icons-png.flaticon.com/512/3095/3095165.png'
                        });
                    }
                    
                    // Alert for debugging
                    alert(`📞 INCOMING CALL from User ${fromId.slice(-6)}!\nEvent: ${eventName}`);
                } else {
                    addLog(`⚠️ Received ${eventName} but no caller ID found`, data);
                }
            });
        });
        
        // Listen to ALL events for debugging
        s.onAny((event, ...args) => {
            if (event.includes('call') || event.includes('Call')) {
                addLog(`📡 Any event caught: '${event}'`, args[0]);
            }
        });
        
        // Request notification permission
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
        
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            if (s) s.close();
        };
    }, [panditId]);
    
    const acceptCall = () => {
        addLog(`✅ Accepting call from: ${callerId}`);
        if (socket) {
            // Emit multiple events to ensure backend receives
            socket.emit('call-accepted', { to: callerId, from: panditId, signal: 'accepted' });
            socket.emit('answer-call', { to: callerId, from: panditId });
            socket.emit('accept-call', { callerId, panditId });
        }
        
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        
        alert(`📞 Call accepted! Connecting with User ${callerId?.slice(-6)}...`);
        setShowPopup(false);
        setIncomingCall(null);
    };
    
    const declineCall = () => {
        addLog(`❌ Declining call from: ${callerId}`);
        if (socket) {
            socket.emit('end-call', { to: callerId, from: panditId });
            socket.emit('call-declined', { to: callerId, from: panditId });
        }
        
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        
        setShowPopup(false);
        setIncomingCall(null);
    };
    
    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0f', padding: '20px', color: 'white' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>📞 Pandit Call Receiver</h1>
            
            {/* Status Card */}
            <div style={{ 
                background: connected ? 'linear-gradient(135deg, #1b5e20, #2e7d32)' : 'linear-gradient(135deg, #b71c1c, #c62828)', 
                padding: '20px', 
                borderRadius: '15px', 
                marginBottom: '20px',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>{connected ? '🟢' : '🔴'}</div>
                <h2 style={{ margin: '0' }}>{connected ? 'ONLINE' : 'OFFLINE'}</h2>
                <p style={{ margin: '10px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
                    Your ID: <strong>{panditId}</strong>
                </p>
            </div>
            
            {/* Instructions */}
            <div style={{ background: '#1e1e2e', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>📖 How to Test:</h3>
                <ol style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>Make sure Status shows <strong>🟢 ONLINE</strong></li>
                    <li>Open User Dashboard in another tab/window</li>
                    <li>User should call to ID: <strong>{panditId}</strong></li>
                    <li>You will see popup + hear ringtone + see alert</li>
                </ol>
            </div>
            
            {/* Debug Logs */}
            <div style={{ background: '#0d0d12', borderRadius: '10px', padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>📋 Debug Logs (Real-time)</h3>
                <div style={{ maxHeight: '300px', overflow: 'auto', fontFamily: 'monospace', fontSize: '11px' }}>
                    {debugLogs.length === 0 ? (
                        <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
                            Waiting for events...
                        </div>
                    ) : (
                        debugLogs.slice(-15).map((log, i) => (
                            <div key={i} style={{ 
                                borderBottom: '1px solid #222', 
                                padding: '6px 0',
                                color: log.msg.includes('✅') ? '#81c784' : 
                                       log.msg.includes('🔔') ? '#ffb74d' : 
                                       log.msg.includes('❌') ? '#ef9a9a' : '#aaa'
                            }}>
                                <span style={{ color: '#666' }}>[{log.time}]</span> {log.msg}
                                {log.data && (
                                    <div style={{ fontSize: '9px', color: '#ffd54f', marginTop: '3px', wordBreak: 'break-all' }}>
                                        {JSON.stringify(log.data).substring(0, 150)}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
            
            {/* Incoming Call Popup */}
            {showPopup && (
                <div style={{
                    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    background: 'linear-gradient(135deg, #ff9800, #f57c00)',
                    padding: '30px', borderRadius: '20px',
                    textAlign: 'center', zIndex: 2000, minWidth: '320px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    animation: 'pulse 0.5s infinite'
                }}>
                    <div style={{ fontSize: '70px', marginBottom: '10px' }}>📞</div>
                    <h2 style={{ color: 'white', margin: '10px 0' }}>Incoming Call!</h2>
                    <p style={{ color: 'white', fontSize: '18px', margin: '10px 0' }}>
                        User <strong>{callerId?.slice(-6)}</strong> is calling
                    </p>
                    <div style={{ marginTop: '25px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <button onClick={acceptCall} style={{ 
                            background: '#4CAF50', 
                            color: 'white', 
                            padding: '12px 30px', 
                            border: 'none', 
                            borderRadius: '30px', 
                            cursor: 'pointer', 
                            fontSize: '16px',
                            fontWeight: 'bold',
                            transition: 'transform 0.2s'
                        }}>
                            ✅ Accept
                        </button>
                        <button onClick={declineCall} style={{ 
                            background: '#f44336', 
                            color: 'white', 
                            padding: '12px 30px', 
                            border: 'none', 
                            borderRadius: '30px', 
                            cursor: 'pointer', 
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>
                            ❌ Decline
                        </button>
                    </div>
                </div>
            )}
            
            <style>{`
                @keyframes pulse {
                    0% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.02); }
                    100% { transform: translate(-50%, -50%) scale(1); }
                }
            `}</style>
        </div>
    );
};

export default PanditCallReceiver;