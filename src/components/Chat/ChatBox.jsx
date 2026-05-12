import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ChatBox = ({ currentUserId, panditId, panditName, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef(null);

    // Debug logs
    console.log('🔵 ChatBox Props:', { currentUserId, panditId, panditName });

    useEffect(() => {
        if (!currentUserId || !panditId) {
            console.error('❌ Missing required props!', { currentUserId, panditId });
            return;
        }

        console.log('🔵 Connecting to socket...');
        const newSocket = io('https://astrologer-backendcoll-chaat.onrender.com');
        
        newSocket.on('connect', () => {
            console.log('✅ Socket connected! ID:', newSocket.id);
            setIsConnected(true);
            newSocket.emit('user-join', String(currentUserId));
            console.log('📢 Emitted user-join:', currentUserId);
        });
        
        newSocket.on('private-message', (data) => {
            console.log('📨 Received message:', data);
            setMessages(prev => [...prev, {
                from: data.from,
                message: data.message,
                time: new Date(data.time)
            }]);
        });
        
        newSocket.on('connect_error', (err) => {
            console.error('❌ Socket connection error:', err);
            setIsConnected(false);
        });
        
        setSocket(newSocket);
        
        return () => {
            console.log('🔴 Disconnecting socket...');
            newSocket.close();
        };
    }, [currentUserId, panditId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (!newMessage.trim()) {
            console.log('⚠️ Empty message');
            return;
        }
        
        if (!socket || !isConnected) {
            console.log('❌ Socket not connected!');
            alert('Not connected to server. Please refresh.');
            return;
        }
        
        const messageData = {
            to: String(panditId),
            from: String(currentUserId),
            message: newMessage
        };
        
        console.log('🚀 Sending Payload:', messageData);
        socket.emit('private-message', messageData);
        
        setMessages(prev => [...prev, {
            from: currentUserId,
            message: newMessage,
            time: new Date()
        }]);
        setNewMessage('');
    };

    return (
        <div className="fixed bottom-4 right-4 w-96 h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50 border">
            <div className="bg-yellow-500 p-3 rounded-t-lg flex justify-between items-center">
                <div>
                    <span className="text-white font-bold">Chat with {panditName}</span>
                    <p className="text-white text-xs">
                        {isConnected ? '🟢 Online' : '🔴 Connecting...'}
                    </p>
                    <p className="text-white text-xs opacity-70">
                        ID: {panditId}
                    </p>
                </div>
                <button onClick={onClose} className="text-white text-xl">×</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
                {messages.length === 0 && (
                    <div className="text-center text-gray-400 mt-10">
                        <p>No messages yet</p>
                        <p className="text-xs">Start chatting with {panditName}</p>
                    </div>
                )}
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${String(msg.from) === String(currentUserId) ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-3 py-2 rounded-lg ${
                            String(msg.from) === String(currentUserId) 
                                ? 'bg-yellow-500 text-white rounded-br-none' 
                                : 'bg-gray-200 text-gray-800 rounded-bl-none'
                        }`}>
                            <p className="text-sm">{msg.message}</p>
                            <p className="text-xs opacity-70 mt-1">
                                {new Date(msg.time).toLocaleTimeString()}
                            </p>
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
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-yellow-500 text-sm"
                    placeholder="Type a message..."
                />
                <button 
                    onClick={sendMessage}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition text-sm"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;