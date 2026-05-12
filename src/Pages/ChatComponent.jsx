import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ChatComponent = ({ currentUser, otherUser }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [otherUserTyping, setOtherUserTyping] = useState(false);
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);
    let typingTimeout = null;

    useEffect(() => {
        // Connect to socket
        const newSocket = io('https://astrologer-backendcoll-chaat.onrender.com');
        setSocket(newSocket);

        // Join with user ID
        newSocket.emit('user-join', currentUser);

        // Load old messages
        fetch(`https://astrologer-backendcoll-chaat.onrender.com/api/chat/messages/${currentUser}/${otherUser}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setMessages(data.data);
            });

        // Listen for new messages
        newSocket.on('private-message', (data) => {
            setMessages(prev => [...prev, {
                from: data.from,
                message: data.message,
                createdAt: data.time
            }]);
        });

        // Listen for typing
        newSocket.on('user-typing', (data) => {
            setOtherUserTyping(true);
            setTimeout(() => setOtherUserTyping(false), 2000);
        });

        return () => newSocket.close();
    }, [currentUser, otherUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const messageData = {
            from: currentUser,
            to: otherUser,
            message: newMessage
        };

        // Send via socket
        socket.emit('private-message', {
            to: otherUser,
            from: currentUser,
            message: newMessage
        });

        // Save to database
        fetch('https://astrologer-backendcoll-chaat.onrender.com/api/chat/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messageData)
        });

        setMessages(prev => [...prev, {
            from: currentUser,
            message: newMessage,
            createdAt: new Date()
        }]);

        setNewMessage('');
    };

    const handleTyping = () => {
        if (!typingTimeout) {
            socket.emit('typing', { to: otherUser, from: currentUser });
            typingTimeout = setTimeout(() => {
                typingTimeout = null;
            }, 2000);
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-2xl mx-auto border rounded-lg">
            {/* Header */}
            <div className="bg-yellow-500 p-4 rounded-t-lg">
                <h3 className="text-white font-bold">Chat with {otherUser}</h3>
                {otherUserTyping && <p className="text-white text-sm">Typing...</p>}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`mb-3 ${msg.from === currentUser ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-3 rounded-lg max-w-xs ${
                            msg.from === currentUser 
                                ? 'bg-yellow-500 text-white' 
                                : 'bg-gray-200 text-gray-800'
                        }`}>
                            <p className="text-sm">{msg.message}</p>
                            <p className="text-xs opacity-75 mt-1">
                                {new Date(msg.createdAt).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyUp={handleTyping}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-yellow-500"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;