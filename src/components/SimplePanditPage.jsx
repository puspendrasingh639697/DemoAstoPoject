import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const SimplePanditPage = () => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [incomingCall, setIncomingCall] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [logs, setLogs] = useState([]);

    const panditId = user?.phone || '8888888888';

    const addLog = (msg) => {
        const time = new Date().toLocaleTimeString();
        const logMsg = `[${time}] ${msg}`;
        setLogs(prev => [...prev, logMsg]);
        console.log(logMsg);
    };

    useEffect(() => {
        addLog('🔵 Component Mounted for ID: ' + panditId);

        const newSocket = io('https://astrologer-backendcoll-chaat.onrender.com');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            addLog('✅ Socket CONNECTED! ID: ' + newSocket.id);
            setIsConnected(true);
            newSocket.emit('user-join', String(panditId));
            addLog('📢 Emitted user-join: ' + panditId);
        });

        // 🔔 INCOMING CALL - यह event सुनो
        newSocket.on('incoming-call', (data) => {
            addLog('🔔🔔🔔 INCOMING CALL DETECTED!');
            addLog('📞 Caller ID: ' + data.from);
            addLog('📞 Signal: ' + JSON.stringify(data.signal).substring(0, 100));
            setIncomingCall(data);
            
            // Browser Alert भी दिखाओ
            alert(`📞 INCOMING CALL from User ${data.from?.slice(-6)}!`);
        });

        newSocket.on('connect_error', (err) => {
            addLog('❌ Socket ERROR: ' + err.message);
        });

        return () => {
            addLog('🔴 Component Unmounting, closing socket');
            newSocket.close();
        };
    }, [panditId]);

    const acceptCall = () => {
        addLog('✅ Call ACCEPTED from: ' + incomingCall?.from);
        alert('Call Accepted!');
        setIncomingCall(null);
    };

    const declineCall = () => {
        addLog('❌ Call DECLINED from: ' + incomingCall?.from);
        if (socket && incomingCall) {
            socket.emit('end-call', { to: incomingCall.from });
        }
        setIncomingCall(null);
    };

    return (
        <div style={{ padding: '20px', marginTop: '70px', fontFamily: 'monospace' }}>
            <h1>📞 Pandit Call Debugger</h1>
            
            {/* Status */}
            <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '10px' }}>
                <div>
                    Status: 
                    <span style={{
                        display: 'inline-block',
                        marginLeft: '10px',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        background: isConnected ? '#4CAF50' : '#f44336',
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        {isConnected ? '🟢 CONNECTED' : '🔴 DISCONNECTED'}
                    </span>
                </div>
                <div style={{ marginTop: '10px' }}>
                    Your ID: <strong style={{ fontSize: '18px' }}>{panditId}</strong>
                </div>
            </div>

            {/* Incoming Call Popup */}
            {incomingCall && (
                <div style={{
                    position: 'fixed',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'white',
                    padding: '30px',
                    borderRadius: '15px',
                    boxShadow: '0 0 30px rgba(0,0,0,0.5)',
                    textAlign: 'center',
                    zIndex: 1000,
                    border: '4px solid #ff9800'
                }}>
                    <div style={{ fontSize: '60px' }}>📞</div>
                    <h2 style={{ margin: '10px 0' }}>Incoming Call!</h2>
                    <p>User <strong style={{ fontSize: '20px', color: '#ff9800' }}>{incomingCall.from?.slice(-6)}</strong></p>
                    <p style={{ color: '#666' }}>is calling you...</p>
                    <div style={{ marginTop: '20px' }}>
                        <button onClick={acceptCall} style={{
                            background: '#4CAF50',
                            color: 'white',
                            padding: '10px 25px',
                            margin: '5px',
                            border: 'none',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}>✅ ACCEPT</button>
                        <button onClick={declineCall} style={{
                            background: '#f44336',
                            color: 'white',
                            padding: '10px 25px',
                            margin: '5px',
                            border: 'none',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}>❌ DECLINE</button>
                    </div>
                </div>
            )}

            {/* Logs - Console View */}
            <div style={{ marginTop: '20px', border: '2px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ background: '#333', color: 'white', padding: '10px', fontWeight: 'bold' }}>
                    📋 DEBUG CONSOLE
                </div>
                <div style={{ 
                    height: '350px', 
                    overflowY: 'auto', 
                    padding: '10px', 
                    background: '#1e1e1e', 
                    color: '#d4d4d4',
                    fontFamily: 'monospace',
                    fontSize: '12px'
                }}>
                    {logs.length === 0 ? (
                        <div style={{ color: '#888' }}>Waiting for events...</div>
                    ) : (
                        logs.map((log, i) => (
                            <div key={i} style={{ 
                                padding: '4px 0', 
                                borderBottom: '1px solid #333',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {log}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Instructions */}
            <div style={{ marginTop: '20px', padding: '15px', background: '#e3f2fd', borderRadius: '8px' }}>
                <p><strong>📌 INSTRUCTIONS FOR TESTING:</strong></p>
                <p>1. 🔵 इस पेज को खुला रखें - यह Pandit Dashboard है</p>
                <p>2. 🧑‍💻 User Browser में जाएं (दूसरा Browser - Chrome Normal)</p>
                <p>3. 📞 User Login करें: 9999999999</p>
                <p>4. 📱 User /pandits पर जाएं और "Call" button click करें</p>
                <p>5. 🔔 यहाँ "INCOMING CALL DETECTED" log और POPUP दिखना चाहिए</p>
            </div>
        </div>
    );
};

export default SimplePanditPage;