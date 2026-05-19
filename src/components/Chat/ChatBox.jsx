import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabaseClient';
// import { supabase } from '../supabaseClient';

const ChatBox = ({ currentUserId, panditId, panditName, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [onlineStatus, setOnlineStatus] = useState(false);
    const [notification, setNotification] = useState(null);
    
    const messagesEndRef = useRef(null);
    const channelRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    // Load messages
    const loadMessages = async () => {
        const { data } = await supabase
            .from('unified_interactions')
            .select('*')
            .eq('action_type', 'message')
            .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${panditId}),and(sender_id.eq.${panditId},receiver_id.eq.${currentUserId})`)
            .order('created_at', { ascending: true });
        if (data) setMessages(data);
    };

    // Show notification
    const showNotification = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    useEffect(() => {
        if (!currentUserId || !panditId) return;

        loadMessages();
        
        // Set online status
        const setOnline = async () => {
            await supabase.from('unified_interactions').upsert({
                sender_id: currentUserId,
                action_type: 'online',
                is_active: true
            });
        };
        setOnline();

        const roomKey = [currentUserId, panditId].sort().join('_');
        const channel = supabase.channel(`room_${roomKey}`);
        
        // Listen for new messages
        channel.on('postgres_changes', 
            { event: 'INSERT', schema: 'public', table: 'unified_interactions' }, 
            (payload) => {
                const data = payload.new;
                if (data.action_type === 'message' && 
                    data.sender_id === panditId && 
                    data.receiver_id === currentUserId) {
                    setMessages(prev => [...prev, data]);
                    showNotification(`📩 New message from ${panditName}`);
                    
                    // Mark as read
                    supabase.from('unified_interactions')
                        .update({ is_read: true })
                        .eq('id', data.id);
                }
            }
        );

        // Listen for typing
        channel.on('broadcast', { event: 'typing' }, ({ payload }) => {
            if (payload.sender === panditId) {
                setIsTyping(payload.isTyping);
            }
        });

        channel.subscribe((status) => {
            setIsConnected(status === 'SUBSCRIBED');
        });

        channelRef.current = channel;

        // Check pandit online status
        const checkOnline = async () => {
            const { data } = await supabase
                .from('profiles')
                .select('is_online')
                .eq('id', panditId)
                .single();
            if (data) setOnlineStatus(data.is_online);
        };
        checkOnline();

        return () => {
            supabase.from('unified_interactions').upsert({
                sender_id: currentUserId,
                action_type: 'online',
                is_active: false
            });
            supabase.removeChannel(channel);
        };
    }, [currentUserId, panditId]);

    // Send message
    const sendMessage = async () => {
        if (!newMessage.trim() || !isConnected) return;
        
        const messageData = {
            sender_id: currentUserId,
            receiver_id: panditId,
            action_type: 'message',
            content: newMessage,
            is_read: false
        };
        
        const { error } = await supabase.from('unified_interactions').insert([messageData]);
        if (!error) {
            setMessages(prev => [...prev, messageData]);
            setNewMessage('');
        }
        
        if (channelRef.current) {
            channelRef.current.send({
                type: 'broadcast',
                event: 'typing',
                payload: { sender: currentUserId, isTyping: false }
            });
        }
    };

    // Handle typing
    const handleTyping = (e) => {
        setNewMessage(e.target.value);
        
        if (!channelRef.current || !isConnected) return;
        
        channelRef.current.send({
            type: 'broadcast',
            event: 'typing',
            payload: { sender: currentUserId, isTyping: e.target.value.length > 0 }
        });
        
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            channelRef.current.send({
                type: 'broadcast',
                event: 'typing',
                payload: { sender: currentUserId, isTyping: false }
            });
        }, 2000);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            {/* Notification Toast */}
            {notification && (
                <div className="fixed top-20 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
                    {notification}
                </div>
            )}

            {/* Chat Window */}
            <div className="fixed bottom-0 right-0 w-96 h-[550px] bg-white rounded-t-2xl shadow-2xl flex flex-col z-50 border border-gray-200" style={{ zIndex: 1000 }}>
                {/* Header */}
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-t-2xl flex justify-between items-center cursor-pointer">
                    <div>
                        <span className="text-white font-bold text-lg">
                            {panditName}
                            {isTyping && <span className="text-xs text-yellow-200 ml-2 animate-pulse">✏️ typing...</span>}
                        </span>
                        <p className="text-white text-xs">
                            {onlineStatus ? '🟢 Online' : '⚫ Offline'} | {isConnected ? '📡 Connected' : '🔴 Connecting...'}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700">
                            📞 Call
                        </button>
                        <button onClick={onClose} className="text-white text-2xl hover:text-gray-200">×</button>
                    </div>
                </div>
                
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-400 py-10">
                            💬 No messages yet
                            <p className="text-xs mt-2">Start a conversation!</p>
                        </div>
                    ) : (
                        messages.map((msg, i) => {
                            const isMe = msg.sender_id === currentUserId;
                            return (
                                <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                                    <div className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm ${isMe ? 'bg-yellow-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border'}`}>
                                        <p className="text-sm break-words">{msg.content}</p>
                                        <p className="text-[10px] opacity-70 mt-1 text-right">
                                            {new Date(msg.created_at).toLocaleTimeString()}
                                            {isMe && (msg.is_read ? ' ✓✓' : ' ✓')}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>
                
                {/* Input Area */}
                <div className="p-3 border-t bg-white flex gap-2 rounded-b-2xl">
                    <input 
                        type="text" 
                        value={newMessage} 
                        onChange={handleTyping}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()} 
                        className="flex-1 p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500" 
                        placeholder="Type a message..." 
                    />
                    <button 
                        onClick={sendMessage} 
                        disabled={!newMessage.trim()}
                        className="px-6 py-3 rounded-xl font-bold bg-yellow-500 text-white hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatBox;