

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const PanditInbox = ({ panditId, onClose }) => {
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chats, setChats] = useState({});
    const [socket, setSocket] = useState(null);
    const [incomingCall, setIncomingCall] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!panditId) return;

        console.log('🔵 ===== PANDIT INBOX STARTED =====');
        console.log('📱 Pandit ID:', panditId);

        const newSocket = io('https://astrologer-backendcoll-chaat.onrender.com');
        setSocket(newSocket);
        
        newSocket.on('connect', () => {
            console.log('✅ SOCKET CONNECTED! ID:', newSocket.id);
            newSocket.emit('user-join', String(panditId));
            console.log('📢 EMITTED user-join for:', panditId);
        });
        
        // 🔔 CRITICAL - Incoming Call Listener
        newSocket.on('incoming-call', (data) => {
            console.log('🔔🔔🔔🔔🔔 INCOMING CALL DETECTED! 🔔🔔🔔🔔🔔');
            console.log('📞 Call Data:', data);
            console.log('📞 From:', data.from);
            console.log('📞 Signal:', data.signal);
            
            // Alert - ये जरूर दिखेगा
            alert(`📞 INCOMING VIDEO CALL from User ${data.from?.slice(-6)}!\n\nClick OK to accept`);
            
            // Set state for popup
            setIncomingCall(data);
            
            // Browser Notification
            if (Notification.permission === 'granted') {
                new Notification('📞 Incoming Video Call!', {
                    body: `User ${data.from?.slice(-6)} is calling you...`,
                    icon: '/favicon.ico'
                });
            }
        });
        
        // Regular messages
        newSocket.on('private-message', (data) => {
            console.log('📨 MESSAGE RECEIVED:', data);
            
            if (activeChat === data.from) {
                setMessages(prev => [...prev, {
                    from: data.from,
                    message: data.message,
                    time: new Date(data.time)
                }]);
                setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
            }
            
            setChats(prev => ({
                ...prev,
                [data.from]: {
                    userId: data.from,
                    lastMessage: data.message,
                    lastTime: new Date(data.time),
                    unread: activeChat !== data.from ? (prev[data.from]?.unread || 0) + 1 : 0
                }
            }));
        });
        
        newSocket.on('connect_error', (err) => {
            console.error('❌ SOCKET ERROR:', err);
        });
        
        // Request notification permission
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
        
        return () => {
            console.log('🔴 CLEANING UP SOCKET');
            newSocket.close();
        };
    }, [panditId, activeChat]);

    const openChat = async (userId) => {
        console.log('📂 OPENING CHAT WITH:', userId);
        setActiveChat(userId);
        setMessages([]);
        
        setChats(prev => ({
            ...prev,
            [userId]: { ...prev[userId], unread: 0 }
        }));
        
        try {
            const res = await fetch(`https://astrologer-backendcoll-chaat.onrender.com/api/chat/messages/${panditId}/${userId}`);
            const data = await res.json();
            if (data.success) {
                console.log('📜 History loaded:', data.data?.length, 'messages');
                setMessages(data.data);
            }
        } catch (err) {
            console.error('Error loading history:', err);
        }
    };

    const sendMessage = () => {
        if (!newMessage.trim() || !activeChat) return;
        
        console.log('📤 SENDING MESSAGE:', newMessage);
        socket.emit('private-message', {
            to: String(activeChat),
            from: String(panditId),
            message: newMessage
        });
        
        setMessages(prev => [...prev, {
            from: panditId,
            message: newMessage,
            time: new Date()
        }]);
        setNewMessage('');
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-[900px] h-[600px] flex overflow-hidden shadow-2xl">
                {/* Sidebar - Users List */}
                <div className="w-64 border-r bg-gray-50 flex flex-col">
                    <div className="p-4 bg-yellow-500 text-white font-bold">
                        💬 Inbox ({Object.keys(chats).length})
                    </div>
                    <div className="flex-1 overflow-auto">
                        {Object.keys(chats).length === 0 ? (
                            <div className="p-4 text-center text-gray-400">
                                <div className="text-4xl mb-2">💬</div>
                                <p>No messages yet</p>
                                <p className="text-xs mt-2">When users message you, they'll appear here</p>
                            </div>
                        ) : (
                            Object.values(chats).map(chat => (
                                <button
                                    key={chat.userId}
                                    onClick={() => openChat(chat.userId)}
                                    className={`w-full p-3 text-left border-b hover:bg-yellow-50 transition ${
                                        activeChat === chat.userId ? 'bg-yellow-100' : ''
                                    }`}
                                >
                                    <div className="font-semibold text-sm">User {chat.userId.slice(-6)}</div>
                                    <div className="text-xs text-gray-500 truncate mt-1">{chat.lastMessage}</div>
                                    {chat.unread > 0 && (
                                        <span className="inline-block mt-1 bg-red-500 text-white text-xs rounded-full px-2">
                                            {chat.unread}
                                        </span>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                    <button onClick={onClose} className="p-3 border-t hover:bg-gray-100 transition">
                        Close
                    </button>
                </div>
                
                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {activeChat ? (
                        <>
                            <div className="p-3 bg-yellow-500 text-white font-bold">
                                Chat with User {activeChat.slice(-6)}
                            </div>
                            <div className="flex-1 overflow-auto p-3 space-y-2 bg-gray-50">
                                {messages.length === 0 && (
                                    <div className="text-center text-gray-400 mt-10">
                                        No messages yet
                                    </div>
                                )}
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.from === panditId ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                                            msg.from === panditId 
                                                ? 'bg-yellow-500 text-white rounded-br-none' 
                                                : 'bg-white border shadow-sm rounded-bl-none'
                                        }`}>
                                            {msg.message}
                                            <div className="text-xs opacity-70 mt-1">
                                                {new Date(msg.createdAt || msg.time).toLocaleTimeString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="p-3 border-t bg-white flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-yellow-500"
                                    placeholder="Type your reply..."
                                />
                                <button 
                                    onClick={sendMessage}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                                >
                                    Send
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                            <div className="text-6xl mb-3">💬</div>
                            <p className="text-lg">Select a conversation</p>
                            <p className="text-sm">Click on any user from the left panel</p>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Incoming Call Popup */}
            {incomingCall && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[60]">
                    <div className="bg-white rounded-xl p-6 text-center w-96 shadow-2xl animate-pulse">
                        <div className="text-7xl mb-3">📞</div>
                        <h3 className="text-2xl font-bold mb-2">Incoming Call!</h3>
                        <p className="text-gray-600 my-4">
                            User <span className="font-bold text-yellow-600">{incomingCall.from?.slice(-6)}</span> is calling you
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button 
                                onClick={() => {
                                    alert('✅ Call Accepted! Starting video...');
                                    setIncomingCall(null);
                                }}
                                className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition text-lg font-bold"
                            >
                                Accept
                            </button>
                            <button 
                                onClick={() => {
                                    setIncomingCall(null);
                                    if (socket) {
                                        socket.emit('end-call', { to: incomingCall.from });
                                    }
                                }}
                                className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition text-lg font-bold"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PanditInbox;