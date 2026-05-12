// // // import React, { useState, useEffect } from 'react';
// // // import io from 'socket.io-client';
// // // import { useAuth } from '../context/AuthContext';
// // // import VideoCallChat from './VideoCallChat';

// // // const PanditUnifiedDashboard = () => {
// // //     const { user } = useAuth();
// // //     const [socket, setSocket] = useState(null);
// // //     const [connected, setConnected] = useState(false);
// // //     const [notifications, setNotifications] = useState([]);
// // //     const [activeChat, setActiveChat] = useState(null);
// // //     const [messages, setMessages] = useState([]);
// // //     const [newMessage, setNewMessage] = useState('');
// // //     const [showVoiceCall, setShowVoiceCall] = useState(false);
// // //     const [callerInfo, setCallerInfo] = useState(null);
    
// // //     const panditId = user?.phone || '8888888888';
// // //     const messagesEndRef = React.useRef(null);

// // //     useEffect(() => {
// // //         const s = io('http://localhost:5000');
// //         // setSocket(s);
        
// // //         s.on('connect', () => {
// // //             setConnected(true);
// // //             s.emit('user-join', String(panditId));
// // //             console.log('✅ Pandit Online:', panditId);
// // //         });

// // //         // 🔔 INCOMING CALL - यह EVENT सबसे महत्वपूर्ण है
// // //         s.on('incoming-call', (data) => {
// // //             console.log('🔔🔔🔔 INCOMING CALL RECEIVED!');
// // //             console.log('📞 From:', data.from);
            
// // //             // Add notification
// // //             const newNotif = {
// // //                 id: Date.now(),
// // //                 type: 'call',
// // //                 msg: `📞 INCOMING CALL from User ${data.from?.slice(-6)}`,
// // //                 data: data
// // //             };
// // //             setNotifications(prev => [newNotif, ...prev]);
            
// // //             // Browser Notification
// // //             if (Notification.permission === 'granted') {
// // //                 new Notification('📞 Incoming Call!', {
// // //                     body: `User ${data.from?.slice(-6)} is calling you`,
// // //                 });
// // //             }
            
// // //             // Alert for immediate testing
// // //             alert(`📞 INCOMING CALL from User ${data.from?.slice(-6)}!`);
// // //         });

// // //         // 💬 Incoming Chat Message
// // //         s.on('private-message', (data) => {
// // //             console.log('💬 New message:', data);
// // //             setNotifications(prev => [{
// // //                 id: Date.now(),
// // //                 type: 'chat',
// // //                 msg: `💬 New message from User ${data.from?.slice(-6)}: ${data.message.substring(0, 30)}`,
// // //                 data: data
// // //             }, ...prev]);
            
// // //             if (activeChat === data.from) {
// // //                 setMessages(prev => [...prev, data]);
// // //                 setTimeout(() => {
// // //                     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // //                 }, 100);
// // //             }
// // //         });

// // //         // Request notification permission
// // //         if (Notification.permission === 'default') {
// // //             Notification.requestPermission();
// // //         }

// // //         return () => s.close();
// // //     }, [panditId, activeChat]);

// // //     const acceptCall = (notif) => {
// // //         console.log('✅ Accepting call from:', notif.data.from);
// // //         // Open voice call window
// // //         setCallerInfo({
// // //             id: notif.data.from,
// // //             name: `User ${notif.data.from?.slice(-6)}`,
// // //             signal: notif.data.signal
// // //         });
// // //         setShowVoiceCall(true);
// // //         setNotifications(prev => prev.filter(n => n.id !== notif.id));
        
// // //         if (socket) {
// // //             socket.emit('answer-call', { to: notif.data.from, signal: 'accepted' });
// // //         }
// // //     };

// // //     const declineCall = (notif) => {
// // //         console.log('❌ Declining call from:', notif.data.from);
// // //         if (socket) {
// // //             socket.emit('end-call', { to: notif.data.from });
// // //         }
// // //         setNotifications(prev => prev.filter(n => n.id !== notif.id));
// // //     };

// // //     const openChat = (notif) => {
// // //         setActiveChat(notif.data.from);
// // //         loadMessages(notif.data.from);
// // //         setNotifications(prev => prev.filter(n => n.id !== notif.id));
// // //     };

// // //     const loadMessages = async (userId) => {
// // //         try {
// // //             const res = await fetch(`http://localhost:5000/api/chat/messages/${panditId}/${userId}`);
// // //             const data = await res.json();
// // //             if (data.success) setMessages(data.data);
// // //         } catch (err) {
// // //             console.error(err);
// // //         }
// // //     };

// // //     const sendMessage = () => {
// // //         if (!newMessage.trim() || !activeChat) return;
// // //         if (!socket || !socket.connected) return;
        
// // //         socket.emit('private-message', {
// // //             to: activeChat,
// // //             from: panditId,
// // //             message: newMessage
// // //         });
        
// // //         setMessages(prev => [...prev, { 
// // //             from: panditId, 
// // //             message: newMessage, 
// // //             time: new Date(),
// // //             createdAt: new Date()
// // //         }]);
// // //         setNewMessage('');
        
// // //         setTimeout(() => {
// // //             messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // //         }, 100);
// // //     };

// // //     const removeNotif = (id) => {
// // //         setNotifications(prev => prev.filter(n => n.id !== id));
// // //     };

// // //     const closeChat = () => {
// // //         setActiveChat(null);
// // //         setMessages([]);
// // //     };

// // //     return (
// // //         <div style={{ minHeight: '100vh', background: '#1a1a1a', padding: '20px', marginTop: '70px', color: 'white' }}>
// // //             <h1>🎯 Pandit Dashboard</h1>
// // //             <p>Status: {connected ? '🟢 ONLINE' : '🔴 OFFLINE'} | ID: {panditId}</p>
            
// // //             {/* Notifications Panel - RIGHT SIDE */}
// // //             <div style={{
// // //                 position: 'fixed', top: '80px', right: '20px', width: '350px', zIndex: 1000
// // //             }}>
// // //                 {notifications.map(notif => (
// // //                     <div key={notif.id} style={{
// // //                         background: notif.type === 'call' ? '#ff9800' : '#2196f3',
// // //                         marginBottom: '10px', padding: '15px', borderRadius: '10px',
// // //                         boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
// // //                     }}>
// // //                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
// // //                             <p style={{ margin: 0, fontWeight: 'bold', flex: 1 }}>{notif.msg}</p>
// // //                             <button onClick={() => removeNotif(notif.id)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer' }}>×</button>
// // //                         </div>
// // //                         <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
// // //                             {notif.type === 'call' ? (
// // //                                 <>
// // //                                     <button onClick={() => acceptCall(notif)} style={{ background: '#4CAF50', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Accept</button>
// // //                                     <button onClick={() => declineCall(notif)} style={{ background: '#f44336', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Decline</button>
// // //                                 </>
// // //                             ) : (
// // //                                 <button onClick={() => openChat(notif)} style={{ background: '#4CAF50', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reply</button>
// // //                             )}
// // //                         </div>
// // //                     </div>
// // //                 ))}
// // //             </div>
            
// // //             {/* Chat Window - BOTTOM RIGHT */}
// // //             {activeChat && !showVoiceCall && (
// // //                 <div style={{
// // //                     position: 'fixed', bottom: '20px', right: '20px', width: '380px', height: '500px',
// // //                     background: '#fff', borderRadius: '10px', display: 'flex', flexDirection: 'column', zIndex: 999,
// // //                     boxShadow: '0 0 10px rgba(0,0,0,0.3)', overflow: 'hidden'
// // //                 }}>
// // //                     <div style={{ background: '#075E54', color: 'white', padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
// // //                         <span>💬 Chat with User {activeChat.slice(-6)}</span>
// // //                         <button onClick={closeChat} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>×</button>
// // //                     </div>
// // //                     <div style={{ flex: 1, overflow: 'auto', padding: '10px', background: '#f0f2f5' }}>
// // //                         {messages.map((msg, i) => (
// // //                             <div key={i} style={{ textAlign: msg.from === panditId ? 'right' : 'left', marginBottom: '10px' }}>
// // //                                 <span style={{
// // //                                     background: msg.from === panditId ? '#DCF8C6' : '#fff',
// // //                                     padding: '8px 12px', borderRadius: '15px', display: 'inline-block', color: '#000'
// // //                                 }}>
// // //                                     {msg.message}
// // //                                 </span>
// // //                                 <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>
// // //                                     {new Date(msg.createdAt || msg.time).toLocaleTimeString()}
// // //                                 </div>
// // //                             </div>
// // //                         ))}
// // //                         <div ref={messagesEndRef} />
// // //                     </div>
// // //                     <div style={{ padding: '10px', display: 'flex', gap: '10px', background: '#fff', borderTop: '1px solid #ddd' }}>
// // //                         <input 
// // //                             type="text" 
// // //                             value={newMessage} 
// // //                             onChange={e => setNewMessage(e.target.value)} 
// // //                             onKeyPress={e => e.key === 'Enter' && sendMessage()} 
// // //                             style={{ 
// // //                                 flex: 1, 
// // //                                 padding: '10px', 
// // //                                 borderRadius: '25px', 
// // //                                 border: '1px solid #ddd', 
// // //                                 outline: 'none',
// // //                                 backgroundColor: '#fff',
// // //                                 color: '#000',
// // //                                 fontSize: '14px'
// // //                             }} 
// // //                             placeholder="Type a message..." 
// // //                         />
// // //                         <button onClick={sendMessage} style={{ background: '#075E54', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', color: 'white' }}>Send</button>
// // //                     </div>
// // //                 </div>
// // //             )}
            
// // //             {/* Voice Call Window */}
// // //             {showVoiceCall && callerInfo && (
// // //                 <VideoCallChat
// // //                     currentUserId={panditId}
// // //                     targetUserId={callerInfo.id}
// // //                     targetName={callerInfo.name}
// // //                     isInitiator={false}
// // //                     onClose={() => {
// // //                         setShowVoiceCall(false);
// // //                         setCallerInfo(null);
// // //                     }}
// // //                 />
// // //             )}

// // //             {/* Empty State */}
// // //             {notifications.length === 0 && !activeChat && !showVoiceCall && (
// // //                 <div style={{ background: '#2d2d2d', borderRadius: '15px', padding: '60px', textAlign: 'center', marginTop: '20px' }}>
// // //                     <div style={{ fontSize: '60px', marginBottom: '20px' }}>📞💬</div>
// // //                     <h2>No notifications yet</h2>
// // //                     <p style={{ color: '#888' }}>When someone messages or calls you, it will appear here</p>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // };

// // // export default PanditUnifiedDashboard;


// // import React, { useState, useEffect } from 'react';
// // import io from 'socket.io-client';
// // import { useAuth } from '../context/AuthContext';
// // import VideoCallChat from './VideoCallChat';

// // const PanditUnifiedDashboard = () => {
// //     const { user } = useAuth();
// //     const [socket, setSocket] = useState(null);
// //     const [connected, setConnected] = useState(false);
// //     const [notifications, setNotifications] = useState([]);
// //     const [activeChat, setActiveChat] = useState(null);
// //     const [messages, setMessages] = useState([]);
// //     const [newMessage, setNewMessage] = useState('');
// //     const [showVoiceCall, setShowVoiceCall] = useState(false);
// //     const [callerInfo, setCallerInfo] = useState(null);
    
// //     const panditId = user?.phone || '8888888888';
// //     const messagesEndRef = React.useRef(null);

// //     useEffect(() => {
// //         const s = io('https://astrologer-backendcoll-chaat.onrender.com');
// //         setSocket(s);
        
// //         s.on('connect', () => {
// //             setConnected(true);
// //             s.emit('user-join', String(panditId));
// //             console.log('✅ Pandit Online:', panditId);
// //         });

// //         // 🔔 INCOMING CALL
// //         s.on('incoming-call', (data) => {
// //             console.log('🔔🔔🔔 INCOMING CALL RECEIVED!');
// //             console.log('📞 From:', data.from);
            
// //             const newNotif = {
// //                 id: Date.now(),
// //                 type: 'call',
// //                 msg: `📞 INCOMING CALL from User ${data.from?.slice(-6)}`,
// //                 data: data
// //             };
// //             setNotifications(prev => [newNotif, ...prev]);
            
// //             if (Notification.permission === 'granted') {
// //                 new Notification('📞 Incoming Call!', {
// //                     body: `User ${data.from?.slice(-6)} is calling you`,
// //                 });
// //             }
// //         });

// //         // 💬 Incoming Chat Message
// //         s.on('private-message', (data) => {
// //             console.log('💬 New message:', data);
// //             setNotifications(prev => [{
// //                 id: Date.now(),
// //                 type: 'chat',
// //                 msg: `💬 New message from User ${data.from?.slice(-6)}: ${data.message.substring(0, 30)}`,
// //                 data: data
// //             }, ...prev]);
            
// //             if (activeChat === data.from) {
// //                 setMessages(prev => [...prev, data]);
// //                 setTimeout(() => {
// //                     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //                 }, 100);
// //             }
// //         });

// //         if (Notification.permission === 'default') {
// //             Notification.requestPermission();
// //         }

// //         return () => s.close();
// //     }, [panditId, activeChat]);

// //     // ✅ FIXED: Accept call - DON'T send 'accepted' string
// //     // const acceptCall = (notif) => {
// //     //     console.log('✅ Accepting call from:', notif.data.from);
// //     //     setCallerInfo({
// //     //         id: notif.data.from,
// //     //         name: `User ${notif.data.from?.slice(-6)}`,
// //     //         signal: notif.data.signal
// //     //     });
// //     //     setShowVoiceCall(true);
// //     //     setNotifications(prev => prev.filter(n => n.id !== notif.id));
// //     //     // VideoCallChat will handle the answer-call event
// //     // };

// //     const acceptCall = (notif) => {
// //     console.log('✅ Accepting call from:', notif.data.from);
    
// //     // ✅ CRITICAL: Send answer-call event to backend
// //     if (socket) {
// //         socket.emit('answer-call', { 
// //             to: notif.data.from, 
// //             signal: 'accepted' 
// //         });
// //         console.log('📤 answer-call emitted to:', notif.data.from);
// //     }
    
// //     // Open voice call window
// //     setCallerInfo({
// //         id: notif.data.from,
// //         name: `User ${notif.data.from?.slice(-6)}`,
// //         signal: notif.data.signal
// //     });
// //     setShowVoiceCall(true);
// //     setNotifications(prev => prev.filter(n => n.id !== notif.id));
// // };

// //     const declineCall = (notif) => {
// //         console.log('❌ Declining call from:', notif.data.from);
// //         if (socket) {
// //             socket.emit('end-call', { to: notif.data.from });
// //         }
// //         setNotifications(prev => prev.filter(n => n.id !== notif.id));
// //     };

// //     const openChat = (notif) => {
// //         setActiveChat(notif.data.from);
// //         loadMessages(notif.data.from);
// //         setNotifications(prev => prev.filter(n => n.id !== notif.id));
// //     };

// //     const loadMessages = async (userId) => {
// //         try {
// //             const res = await fetch(`https://astrologer-backendcoll-chaat.onrender.com/api/chat/messages/${panditId}/${userId}`);
// //             const data = await res.json();
// //             if (data.success) setMessages(data.data);
// //         } catch (err) {
// //             console.error(err);
// //         }
// //     };

// //     const sendMessage = () => {
// //         if (!newMessage.trim() || !activeChat) return;
// //         if (!socket || !socket.connected) return;
        
// //         socket.emit('private-message', {
// //             to: activeChat,
// //             from: panditId,
// //             message: newMessage
// //         });
        
// //         setMessages(prev => [...prev, { 
// //             from: panditId, 
// //             message: newMessage, 
// //             time: new Date(),
// //             createdAt: new Date()
// //         }]);
// //         setNewMessage('');
        
// //         setTimeout(() => {
// //             messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //         }, 100);
// //     };

// //     const removeNotif = (id) => {
// //         setNotifications(prev => prev.filter(n => n.id !== id));
// //     };

// //     const closeChat = () => {
// //         setActiveChat(null);
// //         setMessages([]);
// //     };

// //     return (
// //         <div style={{ minHeight: '100vh', background: '#1a1a1a', padding: '20px', marginTop: '70px', color: 'white' }}>
// //             <h1>🎯 Pandit Dashboard</h1>
// //             <p>Status: {connected ? '🟢 ONLINE' : '🔴 OFFLINE'} | ID: {panditId}</p>
            
// //             {/* Notifications Panel - RIGHT SIDE */}
// //             <div style={{
// //                 position: 'fixed', top: '80px', right: '20px', width: '350px', zIndex: 1000
// //             }}>
// //                 {notifications.map(notif => (
// //                     <div key={notif.id} style={{
// //                         background: notif.type === 'call' ? '#ff9800' : '#2196f3',
// //                         marginBottom: '10px', padding: '15px', borderRadius: '10px',
// //                         boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
// //                     }}>
// //                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
// //                             <p style={{ margin: 0, fontWeight: 'bold', flex: 1 }}>{notif.msg}</p>
// //                             <button onClick={() => removeNotif(notif.id)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer' }}>×</button>
// //                         </div>
// //                         <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
// //                             {notif.type === 'call' ? (
// //                                 <>
// //                                     <button onClick={() => acceptCall(notif)} style={{ background: '#4CAF50', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Accept</button>
// //                                     <button onClick={() => declineCall(notif)} style={{ background: '#f44336', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Decline</button>
// //                                 </>
// //                             ) : (
// //                                 <button onClick={() => openChat(notif)} style={{ background: '#4CAF50', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reply</button>
// //                             )}
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
            
// //             {/* Chat Window - BOTTOM RIGHT */}
// //             {activeChat && !showVoiceCall && (
// //                 <div style={{
// //                     position: 'fixed', bottom: '20px', right: '20px', width: '380px', height: '500px',
// //                     background: '#fff', borderRadius: '10px', display: 'flex', flexDirection: 'column', zIndex: 999,
// //                     boxShadow: '0 0 10px rgba(0,0,0,0.3)', overflow: 'hidden'
// //                 }}>
// //                     <div style={{ background: '#075E54', color: 'white', padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
// //                         <span>💬 Chat with User {activeChat.slice(-6)}</span>
// //                         <button onClick={closeChat} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>×</button>
// //                     </div>
// //                     <div style={{ flex: 1, overflow: 'auto', padding: '10px', background: '#f0f2f5' }}>
// //                         {messages.map((msg, i) => (
// //                             <div key={i} style={{ textAlign: msg.from === panditId ? 'right' : 'left', marginBottom: '10px' }}>
// //                                 <span style={{
// //                                     background: msg.from === panditId ? '#DCF8C6' : '#fff',
// //                                     padding: '8px 12px', borderRadius: '15px', display: 'inline-block', color: '#000'
// //                                 }}>
// //                                     {msg.message}
// //                                 </span>
// //                                 <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>
// //                                     {new Date(msg.createdAt || msg.time).toLocaleTimeString()}
// //                                 </div>
// //                             </div>
// //                         ))}
// //                         <div ref={messagesEndRef} />
// //                     </div>
// //                     <div style={{ padding: '10px', display: 'flex', gap: '10px', background: '#fff', borderTop: '1px solid #ddd' }}>
// //                         <input 
// //                             type="text" 
// //                             value={newMessage} 
// //                             onChange={e => setNewMessage(e.target.value)} 
// //                             onKeyPress={e => e.key === 'Enter' && sendMessage()} 
// //                             style={{ 
// //                                 flex: 1, 
// //                                 padding: '10px', 
// //                                 borderRadius: '25px', 
// //                                 border: '1px solid #ddd', 
// //                                 outline: 'none',
// //                                 backgroundColor: '#fff',
// //                                 color: '#000',
// //                                 fontSize: '14px'
// //                             }} 
// //                             placeholder="Type a message..." 
// //                         />
// //                         <button onClick={sendMessage} style={{ background: '#075E54', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', color: 'white' }}>Send</button>
// //                     </div>
// //                 </div>
// //             )}
            
// //             {/* Voice Call Window */}
// //             {showVoiceCall && callerInfo && (
// //                 <VideoCallChat
// //                     currentUserId={panditId}
// //                     targetUserId={callerInfo.id}
// //                     targetName={callerInfo.name}
// //                     isInitiator={false}
// //                     onClose={() => {
// //                         setShowVoiceCall(false);
// //                         setCallerInfo(null);
// //                     }}
// //                 />
// //             )}

// //             {/* Empty State */}
// //             {notifications.length === 0 && !activeChat && !showVoiceCall && (
// //                 <div style={{ background: '#2d2d2d', borderRadius: '15px', padding: '60px', textAlign: 'center', marginTop: '20px' }}>
// //                     <div style={{ fontSize: '60px', marginBottom: '20px' }}>📞💬</div>
// //                     <h2>No notifications yet</h2>
// //                     <p style={{ color: '#888' }}>When someone messages or calls you, it will appear here</p>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default PanditUnifiedDashboard;
// // import React, { useState, useEffect } from 'react';
// // import io from 'socket.io-client';
// // import { useAuth } from '../context/AuthContext';
// // import VideoCallChat from './VideoCallChat';

// // const PanditUnifiedDashboard = () => {
// //     const { user } = useAuth();
// //     const [socket, setSocket] = useState(null);
// //     const [connected, setConnected] = useState(false);
// //     const [notifications, setNotifications] = useState([]);
// //     const [activeChat, setActiveChat] = useState(null);
// //     const [messages, setMessages] = useState([]);
// //     const [newMessage, setNewMessage] = useState('');
// //     const [showVoiceCall, setShowVoiceCall] = useState(false);
// //     const [callerInfo, setCallerInfo] = useState(null);
    
// //     const panditId = user?.phone || '8888888888';
// //     const messagesEndRef = React.useRef(null);

// //     useEffect(() => {
// //         const s = io('http://localhost:5000');
//         // setSocket(s);
        
// //         s.on('connect', () => {
// //             setConnected(true);
// //             s.emit('user-join', String(panditId));
// //             console.log('✅ Pandit Online:', panditId);
// //         });

// //         // 🔔 INCOMING CALL - यह EVENT सबसे महत्वपूर्ण है
// //         s.on('incoming-call', (data) => {
// //             console.log('🔔🔔🔔 INCOMING CALL RECEIVED!');
// //             console.log('📞 From:', data.from);
            
// //             // Add notification
// //             const newNotif = {
// //                 id: Date.now(),
// //                 type: 'call',
// //                 msg: `📞 INCOMING CALL from User ${data.from?.slice(-6)}`,
// //                 data: data
// //             };
// //             setNotifications(prev => [newNotif, ...prev]);
            
// //             // Browser Notification
// //             if (Notification.permission === 'granted') {
// //                 new Notification('📞 Incoming Call!', {
// //                     body: `User ${data.from?.slice(-6)} is calling you`,
// //                 });
// //             }
            
// //             // Alert for immediate testing
// //             alert(`📞 INCOMING CALL from User ${data.from?.slice(-6)}!`);
// //         });

// //         // 💬 Incoming Chat Message
// //         s.on('private-message', (data) => {
// //             console.log('💬 New message:', data);
// //             setNotifications(prev => [{
// //                 id: Date.now(),
// //                 type: 'chat',
// //                 msg: `💬 New message from User ${data.from?.slice(-6)}: ${data.message.substring(0, 30)}`,
// //                 data: data
// //             }, ...prev]);
            
// //             if (activeChat === data.from) {
// //                 setMessages(prev => [...prev, data]);
// //                 setTimeout(() => {
// //                     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //                 }, 100);
// //             }
// //         });

// //         // Request notification permission
// //         if (Notification.permission === 'default') {
// //             Notification.requestPermission();
// //         }

// //         return () => s.close();
// //     }, [panditId, activeChat]);

// //     const acceptCall = (notif) => {
// //         console.log('✅ Accepting call from:', notif.data.from);
// //         // Open voice call window
// //         setCallerInfo({
// //             id: notif.data.from,
// //             name: `User ${notif.data.from?.slice(-6)}`,
// //             signal: notif.data.signal
// //         });
// //         setShowVoiceCall(true);
// //         setNotifications(prev => prev.filter(n => n.id !== notif.id));
        
// //         if (socket) {
// //             socket.emit('answer-call', { to: notif.data.from, signal: 'accepted' });
// //         }
// //     };

// //     const declineCall = (notif) => {
// //         console.log('❌ Declining call from:', notif.data.from);
// //         if (socket) {
// //             socket.emit('end-call', { to: notif.data.from });
// //         }
// //         setNotifications(prev => prev.filter(n => n.id !== notif.id));
// //     };

// //     const openChat = (notif) => {
// //         setActiveChat(notif.data.from);
// //         loadMessages(notif.data.from);
// //         setNotifications(prev => prev.filter(n => n.id !== notif.id));
// //     };

// //     const loadMessages = async (userId) => {
// //         try {
// //             const res = await fetch(`http://localhost:5000/api/chat/messages/${panditId}/${userId}`);
// //             const data = await res.json();
// //             if (data.success) setMessages(data.data);
// //         } catch (err) {
// //             console.error(err);
// //         }
// //     };

// //     const sendMessage = () => {
// //         if (!newMessage.trim() || !activeChat) return;
// //         if (!socket || !socket.connected) return;
        
// //         socket.emit('private-message', {
// //             to: activeChat,
// //             from: panditId,
// //             message: newMessage
// //         });
        
// //         setMessages(prev => [...prev, { 
// //             from: panditId, 
// //             message: newMessage, 
// //             time: new Date(),
// //             createdAt: new Date()
// //         }]);
// //         setNewMessage('');
        
// //         setTimeout(() => {
// //             messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //         }, 100);
// //     };

// //     const removeNotif = (id) => {
// //         setNotifications(prev => prev.filter(n => n.id !== id));
// //     };

// //     const closeChat = () => {
// //         setActiveChat(null);
// //         setMessages([]);
// //     };

// //     return (
// //         <div style={{ minHeight: '100vh', background: '#1a1a1a', padding: '20px', marginTop: '70px', color: 'white' }}>
// //             <h1>🎯 Pandit Dashboard</h1>
// //             <p>Status: {connected ? '🟢 ONLINE' : '🔴 OFFLINE'} | ID: {panditId}</p>
            
// //             {/* Notifications Panel - RIGHT SIDE */}
// //             <div style={{
// //                 position: 'fixed', top: '80px', right: '20px', width: '350px', zIndex: 1000
// //             }}>
// //                 {notifications.map(notif => (
// //                     <div key={notif.id} style={{
// //                         background: notif.type === 'call' ? '#ff9800' : '#2196f3',
// //                         marginBottom: '10px', padding: '15px', borderRadius: '10px',
// //                         boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
// //                     }}>
// //                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
// //                             <p style={{ margin: 0, fontWeight: 'bold', flex: 1 }}>{notif.msg}</p>
// //                             <button onClick={() => removeNotif(notif.id)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer' }}>×</button>
// //                         </div>
// //                         <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
// //                             {notif.type === 'call' ? (
// //                                 <>
// //                                     <button onClick={() => acceptCall(notif)} style={{ background: '#4CAF50', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Accept</button>
// //                                     <button onClick={() => declineCall(notif)} style={{ background: '#f44336', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Decline</button>
// //                                 </>
// //                             ) : (
// //                                 <button onClick={() => openChat(notif)} style={{ background: '#4CAF50', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reply</button>
// //                             )}
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
            
// //             {/* Chat Window - BOTTOM RIGHT */}
// //             {activeChat && !showVoiceCall && (
// //                 <div style={{
// //                     position: 'fixed', bottom: '20px', right: '20px', width: '380px', height: '500px',
// //                     background: '#fff', borderRadius: '10px', display: 'flex', flexDirection: 'column', zIndex: 999,
// //                     boxShadow: '0 0 10px rgba(0,0,0,0.3)', overflow: 'hidden'
// //                 }}>
// //                     <div style={{ background: '#075E54', color: 'white', padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
// //                         <span>💬 Chat with User {activeChat.slice(-6)}</span>
// //                         <button onClick={closeChat} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>×</button>
// //                     </div>
// //                     <div style={{ flex: 1, overflow: 'auto', padding: '10px', background: '#f0f2f5' }}>
// //                         {messages.map((msg, i) => (
// //                             <div key={i} style={{ textAlign: msg.from === panditId ? 'right' : 'left', marginBottom: '10px' }}>
// //                                 <span style={{
// //                                     background: msg.from === panditId ? '#DCF8C6' : '#fff',
// //                                     padding: '8px 12px', borderRadius: '15px', display: 'inline-block', color: '#000'
// //                                 }}>
// //                                     {msg.message}
// //                                 </span>
// //                                 <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>
// //                                     {new Date(msg.createdAt || msg.time).toLocaleTimeString()}
// //                                 </div>
// //                             </div>
// //                         ))}
// //                         <div ref={messagesEndRef} />
// //                     </div>
// //                     <div style={{ padding: '10px', display: 'flex', gap: '10px', background: '#fff', borderTop: '1px solid #ddd' }}>
// //                         <input 
// //                             type="text" 
// //                             value={newMessage} 
// //                             onChange={e => setNewMessage(e.target.value)} 
// //                             onKeyPress={e => e.key === 'Enter' && sendMessage()} 
// //                             style={{ 
// //                                 flex: 1, 
// //                                 padding: '10px', 
// //                                 borderRadius: '25px', 
// //                                 border: '1px solid #ddd', 
// //                                 outline: 'none',
// //                                 backgroundColor: '#fff',
// //                                 color: '#000',
// //                                 fontSize: '14px'
// //                             }} 
// //                             placeholder="Type a message..." 
// //                         />
// //                         <button onClick={sendMessage} style={{ background: '#075E54', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', color: 'white' }}>Send</button>
// //                     </div>
// //                 </div>
// //             )}
            
// //             {/* Voice Call Window */}
// //             {showVoiceCall && callerInfo && (
// //                 <VideoCallChat
// //                     currentUserId={panditId}
// //                     targetUserId={callerInfo.id}
// //                     targetName={callerInfo.name}
// //                     isInitiator={false}
// //                     onClose={() => {
// //                         setShowVoiceCall(false);
// //                         setCallerInfo(null);
// //                     }}
// //                 />
// //             )}

// //             {/* Empty State */}
// //             {notifications.length === 0 && !activeChat && !showVoiceCall && (
// //                 <div style={{ background: '#2d2d2d', borderRadius: '15px', padding: '60px', textAlign: 'center', marginTop: '20px' }}>
// //                     <div style={{ fontSize: '60px', marginBottom: '20px' }}>📞💬</div>
// //                     <h2>No notifications yet</h2>
// //                     <p style={{ color: '#888' }}>When someone messages or calls you, it will appear here</p>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default PanditUnifiedDashboard;



// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import { useAuth } from '../context/AuthContext';
// import VideoCallChat from './VideoCallChat';

// const PanditUnifiedDashboard = () => {
//     const { user } = useAuth();
//     const [socket, setSocket] = useState(null);
//     const [connected, setConnected] = useState(false);
//     const [notifications, setNotifications] = useState([]);
//     const [activeChat, setActiveChat] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [showVoiceCall, setShowVoiceCall] = useState(false);
//     const [callerInfo, setCallerInfo] = useState(null);
    
//     const panditId = user?.phone || '8888888888';
//     const messagesEndRef = React.useRef(null);

//     useEffect(() => {
//         const s = io('https://astrologer-backendcoll-chaat.onrender.com');
//         setSocket(s);
        
//         s.on('connect', () => {
//             setConnected(true);
//             s.emit('user-join', String(panditId));
//             console.log('✅ Pandit Online:', panditId);
//         });

//         // 🔔 INCOMING CALL - सबसे महत्वपूर्ण EVENT
//         s.on('incoming-call', (data) => {
//             console.log('🔔🔔🔔 INCOMING CALL RECEIVED!');
//             console.log('📞 From:', data.from);
            
//             // ✅ Alert दिखाएगा
//             alert(`📞 INCOMING CALL from User ${data.from?.slice(-6)}!`);
            
//             const newNotif = {
//                 id: Date.now(),
//                 type: 'call',
//                 msg: `📞 INCOMING CALL from User ${data.from?.slice(-6)}`,
//                 data: data
//             };
//             setNotifications(prev => [newNotif, ...prev]);
            
//             if (Notification.permission === 'granted') {
//                 new Notification('📞 Incoming Call!', {
//                     body: `User ${data.from?.slice(-6)} is calling you`,
//                 });
//             }
//         });

//         // 💬 Incoming Chat Message
//         s.on('private-message', (data) => {
//             console.log('💬 New message:', data);
//             setNotifications(prev => [{
//                 id: Date.now(),
//                 type: 'chat',
//                 msg: `💬 New message from User ${data.from?.slice(-6)}: ${data.message.substring(0, 30)}`,
//                 data: data
//             }, ...prev]);
            
//             if (activeChat === data.from) {
//                 setMessages(prev => [...prev, data]);
//                 setTimeout(() => {
//                     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//                 }, 100);
//             }
//         });

//         if (Notification.permission === 'default') {
//             Notification.requestPermission();
//         }

//         return () => s.close();
//     }, [panditId, activeChat]);

//     // ✅ Accept Call Function
//  const acceptCall = (notif) => {
//     console.log('✅ Accepting call from:', notif.data.from);
//     setCallerInfo({
//         id: notif.data.from,
//         name: `User ${notif.data.from?.slice(-6)}`,
//         signal: notif.data.signal
//     });
//     setShowVoiceCall(true);
//     setNotifications(prev => prev.filter(n => n.id !== notif.id));
// };

//     const declineCall = (notif) => {
//         console.log('❌ Declining call from:', notif.data.from);
//         if (socket) {
//             socket.emit('end-call', { to: notif.data.from });
//         }
//         setNotifications(prev => prev.filter(n => n.id !== notif.id));
//     };

//     const openChat = (notif) => {
//         setActiveChat(notif.data.from);
//         loadMessages(notif.data.from);
//         setNotifications(prev => prev.filter(n => n.id !== notif.id));
//     };

//     const loadMessages = async (userId) => {
//         try {
//             const res = await fetch(`https://astrologer-backendcoll-chaat.onrender.com/api/chat/messages/${panditId}/${userId}`);
//             const data = await res.json();
//             if (data.success) setMessages(data.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const sendMessage = () => {
//         if (!newMessage.trim() || !activeChat) return;
//         if (!socket || !socket.connected) return;
        
//         socket.emit('private-message', {
//             to: activeChat,
//             from: panditId,
//             message: newMessage
//         });
        
//         setMessages(prev => [...prev, { 
//             from: panditId, 
//             message: newMessage, 
//             time: new Date(),
//             createdAt: new Date()
//         }]);
//         setNewMessage('');
        
//         setTimeout(() => {
//             messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//         }, 100);
//     };

//     const removeNotif = (id) => {
//         setNotifications(prev => prev.filter(n => n.id !== id));
//     };

//     const closeChat = () => {
//         setActiveChat(null);
//         setMessages([]);
//     };

//     return (
//         <div style={{ minHeight: '100vh', background: '#1a1a1a', padding: '20px', marginTop: '70px', color: 'white' }}>
//             <h1>🎯 Pandit Dashboard</h1>
//             <p>Status: {connected ? '🟢 ONLINE' : '🔴 OFFLINE'} | ID: {panditId}</p>
            
//             {/* Notifications Panel - RIGHT SIDE */}
//             <div style={{
//                 position: 'fixed', top: '80px', right: '20px', width: '350px', zIndex: 1000
//             }}>
//                 {notifications.map(notif => (
//                     <div key={notif.id} style={{
//                         background: notif.type === 'call' ? '#ff9800' : '#2196f3',
//                         marginBottom: '10px', padding: '15px', borderRadius: '10px',
//                         boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
//                     }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                             <p style={{ margin: 0, fontWeight: 'bold', flex: 1 }}>{notif.msg}</p>
//                             <button onClick={() => removeNotif(notif.id)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer' }}>×</button>
//                         </div>
//                         <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
//                             {notif.type === 'call' ? (
//                                 <>
//                                     <button onClick={() => acceptCall(notif)} style={{ background: '#4CAF50', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Accept</button>
//                                     <button onClick={() => declineCall(notif)} style={{ background: '#f44336', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Decline</button>
//                                 </>
//                             ) : (
//                                 <button onClick={() => openChat(notif)} style={{ background: '#4CAF50', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reply</button>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
            
//             {/* Chat Window - BOTTOM RIGHT */}
//             {activeChat && !showVoiceCall && (
//                 <div style={{
//                     position: 'fixed', bottom: '20px', right: '20px', width: '380px', height: '500px',
//                     background: '#fff', borderRadius: '10px', display: 'flex', flexDirection: 'column', zIndex: 999,
//                     boxShadow: '0 0 10px rgba(0,0,0,0.3)', overflow: 'hidden'
//                 }}>
//                     <div style={{ background: '#075E54', color: 'white', padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
//                         <span>💬 Chat with User {activeChat.slice(-6)}</span>
//                         <button onClick={closeChat} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>×</button>
//                     </div>
//                     <div style={{ flex: 1, overflow: 'auto', padding: '10px', background: '#f0f2f5' }}>
//                         {messages.map((msg, i) => (
//                             <div key={i} style={{ textAlign: msg.from === panditId ? 'right' : 'left', marginBottom: '10px' }}>
//                                 <span style={{
//                                     background: msg.from === panditId ? '#DCF8C6' : '#fff',
//                                     padding: '8px 12px', borderRadius: '15px', display: 'inline-block', color: '#000'
//                                 }}>
//                                     {msg.message}
//                                 </span>
//                                 <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>
//                                     {new Date(msg.createdAt || msg.time).toLocaleTimeString()}
//                                 </div>
//                             </div>
//                         ))}
//                         <div ref={messagesEndRef} />
//                     </div>
//                     <div style={{ padding: '10px', display: 'flex', gap: '10px', background: '#fff', borderTop: '1px solid #ddd' }}>
//                         <input 
//                             type="text" 
//                             value={newMessage} 
//                             onChange={e => setNewMessage(e.target.value)} 
//                             onKeyPress={e => e.key === 'Enter' && sendMessage()} 
//                             style={{ 
//                                 flex: 1, 
//                                 padding: '10px', 
//                                 borderRadius: '25px', 
//                                 border: '1px solid #ddd', 
//                                 outline: 'none',
//                                 backgroundColor: '#fff',
//                                 color: '#000',
//                                 fontSize: '14px'
//                             }} 
//                             placeholder="Type a message..." 
//                         />
//                         <button onClick={sendMessage} style={{ background: '#075E54', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', color: 'white' }}>Send</button>
//                     </div>
//                 </div>
//             )}
            
//             {/* Voice Call Window */}
//             {showVoiceCall && callerInfo && (
//                 <VideoCallChat
//                     currentUserId={panditId}
//                     targetUserId={callerInfo.id}
//                     targetName={callerInfo.name}
//                     isInitiator={false}
//                     onClose={() => {
//                         setShowVoiceCall(false);
//                         setCallerInfo(null);
//                     }}
//                 />
//             )}

//             {/* Empty State */}
//             {notifications.length === 0 && !activeChat && !showVoiceCall && (
//                 <div style={{ background: '#2d2d2d', borderRadius: '15px', padding: '60px', textAlign: 'center', marginTop: '20px' }}>
//                     <div style={{ fontSize: '60px', marginBottom: '20px' }}>📞💬</div>
//                     <h2>No notifications yet</h2>
//                     <p style={{ color: '#888' }}>When someone messages or calls you, it will appear here</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PanditUnifiedDashboard;

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import VideoCallChat from './VideoCallChat';

const PanditUnifiedDashboard = () => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showVoiceCall, setShowVoiceCall] = useState(false);
    const [callerInfo, setCallerInfo] = useState(null);
    const [debugLogs, setDebugLogs] = useState([]);
    
    const panditId = user?.phone || '8888888888';
    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);

    // Add debug log function
    const addDebugLog = (message, data = null) => {
        console.log(`[DEBUG] ${message}`, data || '');
        setDebugLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg: message, data: data }]);
    };

    useEffect(() => {
        // First, verify panditId
        addDebugLog(`📱 Pandit ID: ${panditId}`);
        
        // Create socket connection with explicit options
        const s = io('https://astrologer-backendcoll-chaat.onrender.com', {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 1000,
            timeout: 20000
        });
        
        setSocket(s);
        socketRef.current = s;

        // Socket connection events
        s.on('connect', () => {
            addDebugLog('✅ Socket connected successfully!');
            setConnected(true);
            
            // Join room with pandit ID
            const joinData = String(panditId);
            s.emit('user-join', joinData);
            addDebugLog(`📢 Sent user-join event with ID: ${joinData}`);
            
            // Also try alternative event name (some backends use 'register')
            s.emit('register', { userId: joinData, role: 'pandit' });
        });

        s.on('connect_error', (error) => {
            addDebugLog(`❌ Connection error: ${error.message}`);
            setConnected(false);
        });

        s.on('disconnect', (reason) => {
            addDebugLog(`⚠️ Disconnected: ${reason}`);
            setConnected(false);
        });

        // 🔔 INCOMING CALL - With enhanced debugging
        s.on('incoming-call', (data) => {
            addDebugLog('🔔🔔🔔 INCOMING CALL RECEIVED!', data);
            addDebugLog(`📞 From: ${data.from}`);
            addDebugLog(`📞 Full call data:`, data);
            
            // Strong alert for debugging
            alert(`📞 INCOMING CALL from User ${data.from?.slice(-6)}!\n\nSignal: ${data.signal ? 'Yes' : 'No'}`);
            
            // Also show in console with sound effect
            console.log('%c📞 INCOMING CALL!', 'color: #ff9800; font-size: 16px; font-weight: bold;');
            console.log('Caller:', data.from);
            console.log('Signal data:', data.signal);
            
            const newNotif = {
                id: Date.now(),
                type: 'call',
                msg: `📞 INCOMING CALL from User ${data.from?.slice(-6)}`,
                data: data,
                timestamp: new Date()
            };
            setNotifications(prev => [newNotif, ...prev]);
            
            // Browser notification
            if (Notification.permission === 'granted') {
                new Notification('📞 Incoming Call!', {
                    body: `User ${data.from?.slice(-6)} is calling you`,
                    icon: 'https://cdn-icons-png.flaticon.com/512/3095/3095165.png',
                    sound: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3'
                });
            }
            
            // Try to play a sound
            try {
                const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
                audio.play().catch(e => console.log('Audio play failed:', e));
            } catch(e) { console.log('Audio error:', e); }
        });

        // Alternative event names that some backends use
        s.on('call-request', (data) => {
            addDebugLog('📞 Alternative call-request event received:', data);
            // Handle similarly if needed
        });

        s.on('webrtc-offer', (data) => {
            addDebugLog('📞 WebRTC offer received:', data);
            // Handle WebRTC offer
        });

        // 💬 Incoming Chat Message
        s.on('private-message', (data) => {
            addDebugLog('💬 New message received:', data);
            setNotifications(prev => [{
                id: Date.now(),
                type: 'chat',
                msg: `💬 New message from User ${data.from?.slice(-6)}: ${data.message?.substring(0, 30)}`,
                data: data,
                timestamp: new Date()
            }, ...prev]);
            
            if (activeChat === data.from) {
                setMessages(prev => [...prev, data]);
                setTimeout(() => {
                    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        });

        // Test event to verify connection works
        s.on('test-response', (data) => {
            addDebugLog('🔄 Test response received:', data);
        });

        // Send a test message after connection
        s.on('user-joined', (data) => {
            addDebugLog(`👤 User joined event:`, data);
        });

        // Request notification permission
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }

        // Send periodic ping to keep connection alive
        const pingInterval = setInterval(() => {
            if (s && s.connected) {
                s.emit('ping', { from: panditId, timestamp: Date.now() });
            }
        }, 30000);

        return () => {
            clearInterval(pingInterval);
            if (s) {
                s.emit('user-leave', String(panditId));
                s.close();
            }
        };
    }, [panditId, activeChat]);

    // ✅ Accept Call Function
    const acceptCall = (notif) => {
        addDebugLog(`✅ Accepting call from: ${notif.data.from}`);
        
        // Emit call-accepted event
        if (socket && socket.connected) {
            socket.emit('call-accepted', {
                to: notif.data.from,
                from: panditId,
                signal: notif.data.signal
            });
            addDebugLog(`📤 Emitted call-accepted to ${notif.data.from}`);
        }
        
        setCallerInfo({
            id: notif.data.from,
            name: `User ${notif.data.from?.slice(-6)}`,
            signal: notif.data.signal
        });
        setShowVoiceCall(true);
        setNotifications(prev => prev.filter(n => n.id !== notif.id));
    };

    const declineCall = (notif) => {
        addDebugLog(`❌ Declining call from: ${notif.data.from}`);
        if (socket && socket.connected) {
            socket.emit('end-call', { to: notif.data.from, from: panditId });
            socket.emit('call-declined', { to: notif.data.from, from: panditId });
        }
        setNotifications(prev => prev.filter(n => n.id !== notif.id));
    };

    const openChat = (notif) => {
        addDebugLog(`💬 Opening chat with: ${notif.data.from}`);
        setActiveChat(notif.data.from);
        loadMessages(notif.data.from);
        setNotifications(prev => prev.filter(n => n.id !== notif.id));
    };

    const loadMessages = async (userId) => {
        try {
            const res = await fetch(`https://astrologer-backendcoll-chaat.onrender.com/api/chat/messages/${panditId}/${userId}`);
            const data = await res.json();
            if (data.success) setMessages(data.data);
            addDebugLog(`📥 Loaded ${data.data?.length || 0} messages`);
        } catch (err) {
            addDebugLog(`❌ Error loading messages: ${err.message}`);
            console.error(err);
        }
    };

    const sendMessage = () => {
        if (!newMessage.trim() || !activeChat) return;
        if (!socket || !socket.connected) {
            addDebugLog('❌ Cannot send message: Socket not connected');
            return;
        }
        
        socket.emit('private-message', {
            to: activeChat,
            from: panditId,
            message: newMessage,
            timestamp: Date.now()
        });
        
        addDebugLog(`📤 Sent message to ${activeChat}: ${newMessage.substring(0, 50)}`);
        
        setMessages(prev => [...prev, { 
            from: panditId, 
            message: newMessage, 
            time: new Date(),
            createdAt: new Date()
        }]);
        setNewMessage('');
        
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const removeNotif = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const closeChat = () => {
        setActiveChat(null);
        setMessages([]);
    };

    const testCall = () => {
        addDebugLog('🧪 Testing socket connection...');
        if (socket && socket.connected) {
            socket.emit('test', { from: panditId, message: 'Test from pandit dashboard' });
            addDebugLog('📤 Sent test event to backend');
            alert('Test event sent! Check backend logs.');
        } else {
            addDebugLog('❌ Socket not connected!');
            alert('Socket not connected! Wait for connection.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#1a1a1a', padding: '20px', marginTop: '70px', color: 'white' }}>
            {/* Header with status */}
            <div style={{ background: '#2d2d2d', borderRadius: '10px', padding: '15px', marginBottom: '20px' }}>
                <h1 style={{ margin: 0, fontSize: '24px' }}>🎯 Pandit Dashboard</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <div>
                        <p style={{ margin: '5px 0' }}>
                            Status: {connected ? '🟢 ONLINE' : '🔴 OFFLINE'} 
                            <span style={{ fontSize: '12px', marginLeft: '10px', color: '#aaa' }}>ID: {panditId}</span>
                        </p>
                    </div>
                    <button 
                        onClick={testCall}
                        style={{ background: '#2196f3', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer', color: 'white' }}
                    >
                        Test Connection
                    </button>
                </div>
            </div>
            
            {/* Debug Logs Panel */}
            <div style={{ 
                background: '#0d1117', 
                borderRadius: '10px', 
                padding: '15px', 
                marginBottom: '20px',
                maxHeight: '200px',
                overflow: 'auto',
                fontFamily: 'monospace',
                fontSize: '11px'
            }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>📋 Debug Logs (Real-time)</h3>
                {debugLogs.map((log, idx) => (
                    <div key={idx} style={{ 
                        borderBottom: '1px solid #333', 
                        padding: '5px 0',
                        color: log.msg.includes('❌') ? '#ff6b6b' : log.msg.includes('✅') ? '#51cf66' : '#fff'
                    }}>
                        <span style={{ color: '#888' }}>[{log.time}]</span> {log.msg}
                        {log.data && <span style={{ color: '#ffd43b', fontSize: '10px' }}> → {JSON.stringify(log.data).substring(0, 100)}</span>}
                    </div>
                ))}
                {debugLogs.length === 0 && <p style={{ color: '#666' }}>Waiting for events...</p>}
            </div>
            
            {/* Notifications Panel - RIGHT SIDE */}
            <div style={{
                position: 'fixed', top: '80px', right: '20px', width: '350px', zIndex: 1000
            }}>
                {notifications.map(notif => (
                    <div key={notif.id} style={{
                        background: notif.type === 'call' ? '#ff9800' : '#2196f3',
                        marginBottom: '10px', padding: '15px', borderRadius: '10px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                        animation: 'slideIn 0.3s ease-out'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <p style={{ margin: 0, fontWeight: 'bold', flex: 1 }}>{notif.msg}</p>
                            <button onClick={() => removeNotif(notif.id)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer' }}>×</button>
                        </div>
                        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                            {notif.type === 'call' ? (
                                <>
                                    <button onClick={() => acceptCall(notif)} style={{ background: '#4CAF50', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Accept</button>
                                    <button onClick={() => declineCall(notif)} style={{ background: '#f44336', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Decline</button>
                                </>
                            ) : (
                                <button onClick={() => openChat(notif)} style={{ background: '#4CAF50', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reply</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Chat Window - BOTTOM RIGHT */}
            {activeChat && !showVoiceCall && (
                <div style={{
                    position: 'fixed', bottom: '20px', right: '20px', width: '380px', height: '500px',
                    background: '#fff', borderRadius: '10px', display: 'flex', flexDirection: 'column', zIndex: 999,
                    boxShadow: '0 0 10px rgba(0,0,0,0.3)', overflow: 'hidden'
                }}>
                    <div style={{ background: '#075E54', color: 'white', padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>💬 Chat with User {activeChat.slice(-6)}</span>
                        <button onClick={closeChat} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>×</button>
                    </div>
                    <div style={{ flex: 1, overflow: 'auto', padding: '10px', background: '#f0f2f5' }}>
                        {messages.map((msg, i) => (
                            <div key={i} style={{ textAlign: msg.from === panditId ? 'right' : 'left', marginBottom: '10px' }}>
                                <span style={{
                                    background: msg.from === panditId ? '#DCF8C6' : '#fff',
                                    padding: '8px 12px', borderRadius: '15px', display: 'inline-block', color: '#000'
                                }}>
                                    {msg.message}
                                </span>
                                <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>
                                    {new Date(msg.createdAt || msg.time).toLocaleTimeString()}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div style={{ padding: '10px', display: 'flex', gap: '10px', background: '#fff', borderTop: '1px solid #ddd' }}>
                        <input 
                            type="text" 
                            value={newMessage} 
                            onChange={e => setNewMessage(e.target.value)} 
                            onKeyPress={e => e.key === 'Enter' && sendMessage()} 
                            style={{ 
                                flex: 1, 
                                padding: '10px', 
                                borderRadius: '25px', 
                                border: '1px solid #ddd', 
                                outline: 'none',
                                backgroundColor: '#fff',
                                color: '#000',
                                fontSize: '14px'
                            }} 
                            placeholder="Type a message..." 
                        />
                        <button onClick={sendMessage} style={{ background: '#075E54', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', color: 'white' }}>Send</button>
                    </div>
                </div>
            )}
            
            {/* Voice Call Window */}
            {showVoiceCall && callerInfo && (
                <VideoCallChat
                    currentUserId={panditId}
                    targetUserId={callerInfo.id}
                    targetName={callerInfo.name}
                    isInitiator={false}
                    onClose={() => {
                        setShowVoiceCall(false);
                        setCallerInfo(null);
                        addDebugLog('📞 Call window closed');
                    }}
                />
            )}

            {/* Empty State */}
            {notifications.length === 0 && !activeChat && !showVoiceCall && (
                <div style={{ background: '#2d2d2d', borderRadius: '15px', padding: '60px', textAlign: 'center', marginTop: '20px' }}>
                    <div style={{ fontSize: '60px', marginBottom: '20px' }}>📞💬</div>
                    <h2>No notifications yet</h2>
                    <p style={{ color: '#888' }}>When someone messages or calls you, it will appear here</p>
                    <p style={{ color: '#666', fontSize: '12px', marginTop: '20px' }}>
                        Make sure: <br/>
                        1. Socket is connected (🟢 ONLINE)<br/>
                        2. User is calling the correct ID: <strong>{panditId}</strong><br/>
                        3. Check debug logs above for any errors
                    </p>
                </div>
            )}
            
            {/* Add CSS animation */}
            <style>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default PanditUnifiedDashboard;