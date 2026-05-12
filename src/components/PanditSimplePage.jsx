import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const PanditSimplePage = () => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [incomingCall, setIncomingCall] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [activeChat, setActiveChat] = useState(null);
    const [chats, setChats] = useState({});

    const panditId = user?.phone || user?.id || user?.mobile || '8888888888';

    useEffect(() => {
        if (!panditId) return;

        console.log('🔵 SIMPLE PANDIT PAGE LOADED for:', panditId);

        const newSocket = io('https://astrologer-backendcoll-chaat.onrender.com');
        setSocket(newSocket);
        
        newSocket.on('connect', () => {
            console.log('✅ Connected!');
            setIsConnected(true);
            newSocket.emit('user-join', String(panditId));
        });
        
        // ✅ MAIN EVENT - Incoming Call
        newSocket.on('incoming-call', (data) => {
            console.log('🔔🔔🔔 CALL RECEIVED!', data);
            alert(`📞 CALL FROM USER ${data.from?.slice(-6)}!`);
            setIncomingCall(data);
        });
        
        newSocket.on('private-message', (data) => {
            console.log('Message:', data);
            if (activeChat === data.from) {
                setMessages(prev => [...prev, data]);
            }
            setChats(prev => ({
                ...prev,
                [data.from]: {
                    lastMessage: data.message,
                    time: new Date(),
                    unread: activeChat !== data.from ? (prev[data.from]?.unread || 0) + 1 : 0
                }
            }));
        });
        
        return () => newSocket.close();
    }, [panditId, activeChat]);

    const sendMessage = () => {
        if (!newMessage.trim() || !activeChat) return;
        socket.emit('private-message', {
            to: activeChat,
            from: panditId,
            message: newMessage
        });
        setMessages(prev => [...prev, { from: panditId, message: newMessage, time: new Date() }]);
        setNewMessage('');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Connection Status */}
            <div className="mb-4 text-center">
                <span className={`inline-block px-4 py-2 rounded-full ${isConnected ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {isConnected ? '🟢 Connected to Server' : '🔴 Disconnected'}
            </span>
            </div>
            
            {/* Incoming Call Popup */}
            {incomingCall && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 text-center shadow-2xl animate-bounce">
                        <div className="text-7xl mb-4">📞</div>
                        <h2 className="text-2xl font-bold mb-2">Incoming Call!</h2>
                        <p className="text-gray-600 mb-6">
                            User <span className="text-yellow-600 font-bold">{incomingCall.from?.slice(-6)}</span> is calling you
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button 
                                onClick={() => {
                                    alert('Call Accepted!');
                                    setIncomingCall(null);
                                }}
                                className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-green-600"
                            >
                                ✅ Accept
                            </button>
                            <button 
                                onClick={() => setIncomingCall(null)}
                                className="bg-red-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-red-600"
                            >
                                ❌ Decline
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Pandit Dashboard */}
            <div className="max-w-6xl mx-auto">
                <div className="bg-yellow-500 text-white p-4 rounded-t-xl">
                    <h1 className="text-2xl font-bold">Pandit Dashboard</h1>
                    <p>Welcome! Your ID: {panditId}</p>
                </div>
                
                <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
                    <div className="flex h-[500px]">
                        {/* Users List */}
                        <div className="w-80 border-r bg-gray-50">
                            <div className="p-3 bg-gray-100 font-bold border-b">Users ({Object.keys(chats).length})</div>
                            <div className="overflow-y-auto h-[440px]">
                                {Object.keys(chats).length === 0 ? (
                                    <div className="p-4 text-center text-gray-400">No messages yet</div>
                                ) : (
                                    Object.entries(chats).map(([userId, chat]) => (
                                        <button
                                            key={userId}
                                            onClick={() => setActiveChat(userId)}
                                            className={`w-full p-3 text-left border-b hover:bg-yellow-50 ${activeChat === userId ? 'bg-yellow-100' : ''}`}
                                        >
                                            <div className="font-semibold">User {userId.slice(-6)}</div>
                                            <div className="text-sm text-gray-500">{chat.lastMessage}</div>
                                            {chat.unread > 0 && (
                                                <span className="bg-red-500 text-white text-xs rounded-full px-2">{chat.unread}</span>
                                            )}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                        
                        {/* Chat Area */}
                        <div className="flex-1 flex flex-col">
                            {activeChat ? (
                                <>
                                    <div className="p-3 bg-yellow-500 text-white font-bold">
                                        Chat with User {activeChat.slice(-6)}
                                    </div>
                                    <div className="flex-1 overflow-auto p-3 space-y-2">
                                        {messages.map((msg, i) => (
                                            <div key={i} className={`flex ${msg.from === panditId ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-xs p-2 rounded-lg ${msg.from === panditId ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>
                                                    {msg.message}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 border-t flex gap-2">
                                        <input
                                            className="flex-1 p-2 border rounded"
                                            value={newMessage}
                                            onChange={e => setNewMessage(e.target.value)}
                                            onKeyPress={e => e.key === 'Enter' && sendMessage()}
                                            placeholder="Type reply..."
                                        />
                                        <button onClick={sendMessage} className="bg-yellow-500 text-white px-4 py-2 rounded">Send</button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-gray-400">
                                    Select a user to start chatting
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PanditSimplePage;