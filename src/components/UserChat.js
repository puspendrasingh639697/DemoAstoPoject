import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import VideoCallChat from './VideoCallChat';

const UserChat = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isPanditTyping, setIsPanditTyping] = useState(false);
    const [showCall, setShowCall] = useState(false);
    const [callData, setCallData] = useState(null);

    // Testing UUID Configuration
    const userId = user?.id || 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d';
    const panditId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'; // पंडित की फिक्स UUID
    
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
        loadMessages();

        // 1. पंडित के नए मैसेज सुनना
        const msgChannel = supabase.channel('user-db-messages')
            .on('postgres_changes', 
                { event: 'INSERT', schema: 'public', table: 'activities', filter: `to_user=eq.${userId}` },
                (payload) => {
                    if (payload.new.from_user === panditId && payload.new.type === 'chat') {
                        setMessages(prev => [...prev, payload.new]);
                    }
                }
            ).subscribe();

        // 2. पंडित का टाइपिंग स्टेटस सुनना
        const typingChannel = supabase.channel('user-db-typing')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'typing_status', filter: `typing_to=eq.${userId}` },
                (payload) => {
                    if (payload.new?.user_id === panditId) {
                        setIsPanditTyping(payload.new.is_typing);
                    }
                }
            ).subscribe();

        // 3. पंडित अगर कॉल काटे तो यहाँ भी बंद हो जाए
        const callChannel = supabase.channel(`call_${userId}`);
        callChannel.on('broadcast', { event: 'voice-call-ended' }, () => {
            setShowCall(false);
            setCallData(null);
        }).subscribe();

        return () => {
            supabase.removeChannel(msgChannel);
            supabase.removeChannel(typingChannel);
            supabase.removeChannel(callChannel);
        };
    }, [userId]);

    const loadMessages = async () => {
        const { data } = await supabase
            .from('activities')
            .select('*')
            .eq('type', 'chat')
            .or(`and(from_user.eq.${userId},to_user.eq.${panditId}),and(from_user.eq.${panditId},to_user.eq.${userId})`)
            .order('created_at', { ascending: true });
        if (data) setMessages(data);
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        const temp = { from_user: userId, to_user: panditId, type: 'chat', message: newMessage, created_at: new Date().toISOString() };
        
        await supabase.from('activities').insert([temp]);
        setMessages(prev => [...prev, temp]);
        setNewMessage('');

        await supabase.from('typing_status').upsert({ user_id: userId, typing_to: panditId, is_typing: false, last_updated: new Date().toISOString() });
    };

    const handleTyping = async (e) => {
        setNewMessage(e.target.value);
        await supabase.from('typing_status').upsert({ user_id: userId, typing_to: panditId, is_typing: true, last_updated: new Date().toISOString() });

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(async () => {
            await supabase.from('typing_status').upsert({ user_id: userId, typing_to: panditId, is_typing: false, last_updated: new Date().toISOString() });
        }, 2000);
    };

    const startCall = () => {
        setCallData({ id: panditId, name: "Pandit Ji", isInitiator: true });
        setShowCall(true);
    };

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    return (
        <div style={{ maxWidth: '500px', margin: '80px auto', background: '#fff', borderRadius: '12px', height: '600px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', color: '#000', overflow: 'hidden' }}>
            <div style={{ background: '#FFD700', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>🚩 Chat with Pandit Ji {isPanditTyping && <small style={{color: '#d32f2f'}}> (Typing...)</small>}</h3>
                <button onClick={startCall} style={{ background: '#000', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>📞 Call</button>
            </div>
            
            <div style={{ flex: 1, overflow: 'auto', padding: '15px', background: '#f9f9f9' }}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ textAlign: msg.from_user === userId ? 'right' : 'left', marginBottom: '12px' }}>
                        <span style={{ background: msg.from_user === userId ? '#e1ffc7' : '#fff', padding: '10px 14px', borderRadius: '15px', display: 'inline-block', border: '1px solid #eee' }}>
                            {msg.message}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div style={{ padding: '12px', display: 'flex', gap: '10px', background: '#fff', borderTop: '1px solid #eee' }}>
                <input type="text" value={newMessage} onChange={handleTyping} onKeyDown={e => e.key === 'Enter' && sendMessage()} style={{ flex: 1, padding: '12px', borderRadius: '25px', border: '1px solid #ccc', outline: 'none' }} placeholder="Ask Pandit ji something..." />
                <button onClick={sendMessage} style={{ background: '#FFD700', border: 'none', padding: '10px 20px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>Send</button>
            </div>

            {showCall && callData && (
                <VideoCallChat currentUserId={userId} targetUserId={callData.id} targetName={callData.name} isInitiator={callData.isInitiator} incomingSignal={null} onClose={() => { setShowCall(false); setCallData(null); }} />
            )}
        </div>
    );
};

export default UserChat;