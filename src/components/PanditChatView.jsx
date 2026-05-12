import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const PanditChatView = ({ panditId, onClose }) => {
    const [chats, setChats] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const newSocket = io('https://astrologer-backendcoll-chaat.onrender.com');
        setSocket(newSocket);
        newSocket.emit('user-join', String(panditId));

        newSocket.on('private-message', (data) => {
            // Add message to current chat if open
            if (selectedUser === data.from) {
                setMessages(prev => [...prev, {
                    from: data.from,
                    message: data.message,
                    time: new Date(data.time)
                }]);
            }
            
            // Update chat list
            setChats(prev => ({
                ...prev,
                [data.from]: {
                    lastMessage: data.message,
                    time: new Date(data.time),
                    unread: selectedUser !== data.from ? (prev[data.from]?.unread || 0) + 1 : 0
                }
            }));
        });

        return () => newSocket.close();
    }, [panditId, selectedUser]);

    const selectUser = async (userId) => {
        setSelectedUser(userId);
        setMessages([]);
        
        // Mark as read
        setChats(prev => ({
            ...prev,
            [userId]: { ...prev[userId], unread: 0 }
        }));
        
        // Load chat history
        try {
            const res = await fetch(`https://astrologer-backendcoll-chaat.onrender.com/api/chat/messages/${panditId}/${userId}`);
            const data = await res.json();
            if (data.success) {
                setMessages(data.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const sendMessage = () => {
        if (!newMessage.trim() || !selectedUser) return;
        
        socket.emit('private-message', {
            to: selectedUser,
            from: panditId,
            message: newMessage
        });
        
        setMessages(prev => [...prev, {
            from: panditId,
            message: newMessage,
            time: new Date()
        }]);
        setNewMessage('');
    };

    return (
        <div className="fixed bottom-4 right-4 w-[600px] h-96 bg-white rounded-lg shadow-2xl flex z-50 border">
            {/* Users List */}
            <div className="w-40 border-r bg-gray-50 rounded-l-lg overflow-y-auto">
                <div className="p-2 bg-yellow-500 text-white text-center text-sm font-bold">
                    Chats
                </div>
                {Object.keys(chats).length === 0 ? (
                    <div className="p-3 text-center text-gray-400 text-xs">
                        No chats yet
                    </div>
                ) : (
                    Object.entries(chats).map(([userId, data]) => (
                        <button
                            key={userId}
                            onClick={() => selectUser(userId)}
                            className={`w-full p-2 text-left border-b hover:bg-yellow-50 text-sm ${
                                selectedUser === userId ? 'bg-yellow-100' : ''
                            }`}
                        >
                            <div className="font-semibold">User {userId.slice(-4)}</div>
                            <div className="text-xs text-gray-500 truncate">{data.lastMessage}</div>
                            {data.unread > 0 && (
                                <span className="bg-red-500 text-white text-xs rounded-full px-1 ml-1">
                                    {data.unread}
                                </span>
                            )}
                        </button>
                    ))
                )}
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedUser ? (
                    <>
                        <div className="bg-yellow-500 p-2 rounded-tr-lg flex justify-between">
                            <span className="text-white font-bold text-sm">User {selectedUser.slice(-4)}</span>
                            <button onClick={onClose} className="text-white">×</button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-gray-50">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.from === panditId ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs px-2 py-1 rounded-lg text-xs ${
                                        msg.from === panditId 
                                            ? 'bg-yellow-500 text-white' 
                                            : 'bg-gray-200'
                                    }`}>
                                        {msg.message}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        
                        <div className="p-2 border-t flex gap-1">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                className="flex-1 p-1 border rounded text-sm"
                                placeholder="Reply..."
                            />
                            <button onClick={sendMessage} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                        Select a chat to start messaging
                    </div>
                )}
            </div>
        </div>
    );
};

export default PanditChatView;