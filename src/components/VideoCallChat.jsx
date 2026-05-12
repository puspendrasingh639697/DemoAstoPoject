// // // import React, { useState, useEffect, useRef } from 'react';
// // // import io from 'socket.io-client';

// // // const VideoCallChat = ({ currentUserId, targetUserId, targetName, onClose, isInitiator = false }) => {
// // //     const [socket, setSocket] = useState(null);
// // //     const [messages, setMessages] = useState([]);
// // //     const [newMessage, setNewMessage] = useState('');
// // //     const [inCall, setInCall] = useState(false);
// // //     const [callStatus, setCallStatus] = useState('idle');
// // //     const [localStream, setLocalStream] = useState(null);
// // //     const [socketReady, setSocketReady] = useState(false);
    
// // //     const localVideo = useRef();
// // //     const remoteVideo = useRef();
// // //     const peerConnection = useRef(null);
// // //     const messagesEndRef = useRef(null);

// // //     const configuration = {
// // //         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
// // //     };

// // //     // Initialize socket and media
// // //     useEffect(() => {
// // //         let isMounted = true;

// // //         const init = async () => {
// // //             // Create socket connection
// // //             const s = io('http://localhost:5000');
// // //             setSocket(s);
            
// // //             s.on('connect', () => {
// // //                 console.log('✅ Socket connected:', s.id);
// // //                 s.emit('user-join', currentUserId);
// // //                 setSocketReady(true);
// // //             });

// // //             // Get camera/microphone
// // //             try {
// // //                 const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
// // //                 if (isMounted) {
// // //                     setLocalStream(stream);
// // //                     if (localVideo.current) localVideo.current.srcObject = stream;
// // //                 }
// // //             } catch (err) {
// // //                 console.error('Camera error:', err);
// // //             }

// // //             // Listen for incoming call
// // //             s.on('incoming-call', async ({ from, signal }) => {
// // //                 console.log('📞 Incoming call from:', from);
// // //                 if (from === targetUserId) {
// // //                     setCallStatus('ringing');
// // //                     const accept = window.confirm(`📞 Incoming call from ${targetName}. Accept?`);
// // //                     if (accept) {
// // //                         await acceptCall(signal);
// // //                     } else {
// // //                         s.emit('end-call', { to: from });
// // //                         onClose();
// // //                     }
// // //                 }
// // //             });

// // //             s.on('call-answered', async ({ signal }) => {
// // //                 console.log('✅ Call answered');
// // //                 if (peerConnection.current) {
// // //                     await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
// // //                     setCallStatus('connected');
// // //                     setInCall(true);
// // //                 }
// // //             });

// // //             s.on('call-ended', () => {
// // //                 console.log('🔴 Call ended');
// // //                 endCall();
// // //             });

// // //             s.on('private-message', (data) => {
// // //                 console.log('💬 Message:', data);
// // //                 if (data.from === targetUserId || data.to === targetUserId) {
// // //                     setMessages(prev => [...prev, data]);
// // //                 }
// // //             });

// // //             // Load chat history
// // //             try {
// // //                 const res = await fetch(`http://localhost:5000/api/chat/messages/${currentUserId}/${targetUserId}`);
// // //                 const data = await res.json();
// // //                 if (data.success) setMessages(data.data);
// // //             } catch (err) {
// // //                 console.error('Error loading messages:', err);
// // //             }

// // //             // If initiator, start call after socket is ready
// // //             if (isInitiator) {
// // //                 // Wait a bit for socket to be ready
// // //                 setTimeout(() => {
// // //                     if (s && s.connected) {
// // //                         startCall(s);
// // //                     } else {
// // //                         s.on('connect', () => startCall(s));
// // //                     }
// // //                 }, 500);
// // //             }
// // //         };

// // //         init();

// // //         return () => {
// // //             isMounted = false;
// // //             if (localStream) {
// // //                 localStream.getTracks().forEach(track => track.stop());
// // //             }
// // //             if (peerConnection.current) {
// // //                 peerConnection.current.close();
// // //             }
// // //             if (socket) {
// // //                 socket.close();
// // //             }
// // //         };
// // //     }, [currentUserId, targetUserId]);

// // //     const startCall = async (sock) => {
// // //         const activeSocket = sock || socket;
// // //         if (!activeSocket || !activeSocket.connected) {
// // //             console.error('Socket not ready');
// // //             alert('Connection not ready. Please try again.');
// // //             return;
// // //         }

// // //         console.log('📞 Starting call...');
// // //         setCallStatus('calling');
        
// // //         peerConnection.current = new RTCPeerConnection(configuration);
        
// // //         if (localStream) {
// // //             localStream.getTracks().forEach(track => {
// // //                 peerConnection.current.addTrack(track, localStream);
// // //             });
// // //         }
        
// // //         peerConnection.current.ontrack = (event) => {
// // //             console.log('📹 Remote stream received');
// // //             if (remoteVideo.current) {
// // //                 remoteVideo.current.srcObject = event.streams[0];
// // //             }
// // //         };
        
// // //         const offer = await peerConnection.current.createOffer();
// // //         await peerConnection.current.setLocalDescription(offer);
        
// // //         activeSocket.emit('call-user', {
// // //             to: targetUserId,
// // //             from: currentUserId,
// // //             signal: offer
// // //         });
        
// // //         setCallStatus('ringing');
        
// // //         // Timeout after 30 seconds
// // //         setTimeout(() => {
// // //             if (callStatus === 'ringing') {
// // //                 alert('No answer from ' + targetName);
// // //                 endCall();
// // //             }
// // //         }, 30000);
// // //     };

// // //     const acceptCall = async (signal) => {
// // //         peerConnection.current = new RTCPeerConnection(configuration);
        
// // //         if (localStream) {
// // //             localStream.getTracks().forEach(track => {
// // //                 peerConnection.current.addTrack(track, localStream);
// // //             });
// // //         }
        
// // //         peerConnection.current.ontrack = (event) => {
// // //             console.log('📹 Remote stream received');
// // //             if (remoteVideo.current) {
// // //                 remoteVideo.current.srcObject = event.streams[0];
// // //             }
// // //         };
        
// // //         await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
// // //         const answer = await peerConnection.current.createAnswer();
// // //         await peerConnection.current.setLocalDescription(answer);
        
// // //         if (socket) {
// // //             socket.emit('answer-call', { to: targetUserId, signal: answer });
// // //         }
        
// // //         setCallStatus('connected');
// // //         setInCall(true);
// // //     };

// // //     const endCall = () => {
// // //         if (peerConnection.current) {
// // //             peerConnection.current.close();
// // //             peerConnection.current = null;
// // //         }
// // //         if (socket) {
// // //             socket.emit('end-call', { to: targetUserId });
// // //         }
// // //         setCallStatus('idle');
// // //         setInCall(false);
// // //         onClose();
// // //     };

// // //     const sendMessage = () => {
// // //         if (!newMessage.trim()) return;
// // //         if (!socket || !socket.connected) {
// // //             alert('Not connected to server');
// // //             return;
// // //         }
        
// // //         socket.emit('private-message', {
// // //             to: targetUserId,
// // //             from: currentUserId,
// // //             message: newMessage
// // //         });
        
// // //         setMessages(prev => [...prev, {
// // //             from: currentUserId,
// // //             message: newMessage,
// // //             time: new Date()
// // //         }]);
// // //         setNewMessage('');
// // //     };

// // //     useEffect(() => {
// // //         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // //     }, [messages]);

// // //     const getStatusText = () => {
// // //         switch(callStatus) {
// // //             case 'calling': return '📞 Calling...';
// // //             case 'ringing': return '🔔 Ringing...';
// // //             case 'connected': return '📹 Connected';
// // //             default: return '💬 Chat';
// // //         }
// // //     };

// // //     return (
// // //         <div style={{
// // //             position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
// // //             width: '900px', height: '600px', background: '#1a1a1a', borderRadius: '15px',
// // //             zIndex: 2000, display: 'flex', flexDirection: 'column', border: '2px solid #ff9800'
// // //         }}>
// // //             {/* Header */}
// // //             <div style={{ background: '#ff9800', padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
// // //                 <span style={{ fontWeight: 'bold' }}>{targetName} - {getStatusText()}</span>
// // //                 <button onClick={endCall} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>×</button>
// // //             </div>
            
// // //             {/* Video Area */}
// // //             {inCall && (
// // //                 <div style={{ display: 'flex', gap: '10px', padding: '10px', background: '#000' }}>
// // //                     <video ref={remoteVideo} autoPlay style={{ width: '70%', height: '250px', background: '#333', borderRadius: '10px', objectFit: 'cover' }} />
// // //                     <video ref={localVideo} autoPlay muted style={{ width: '28%', height: '250px', background: '#333', borderRadius: '10px', objectFit: 'cover' }} />
// // //                 </div>
// // //             )}
            
// // //             {/* Chat Area */}
// // //             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px', background: '#2d2d2d' }}>
// // //                 <div style={{ flex: 1, overflow: 'auto', marginBottom: '10px' }}>
// // //                     {messages.length === 0 && (
// // //                         <div style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>
// // //                             No messages yet. Start chatting!
// // //                         </div>
// // //                     )}
// // //                     {messages.map((msg, i) => (
// // //                         <div key={i} style={{ textAlign: msg.from === currentUserId ? 'right' : 'left', marginBottom: '8px' }}>
// // //                             <span style={{
// // //                                 background: msg.from === currentUserId ? '#ff9800' : '#555',
// // //                                 padding: '8px 12px', borderRadius: '15px', display: 'inline-block', color: 'white'
// // //                             }}>
// // //                                 {msg.message}
// // //                             </span>
// // //                         </div>
// // //                     ))}
// // //                     <div ref={messagesEndRef} />
// // //                 </div>
// // //                 <div style={{ display: 'flex', gap: '10px' }}>
// // //                     <input
// // //                         type="text"
// // //                         value={newMessage}
// // //                         onChange={e => setNewMessage(e.target.value)}
// // //                         onKeyPress={e => e.key === 'Enter' && sendMessage()}
// // //                         style={{ flex: 1, padding: '10px', borderRadius: '20px', border: 'none' }}
// // //                         placeholder="Type a message..."
// // //                     />
// // //                     <button onClick={sendMessage} style={{ background: '#ff9800', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}>Send</button>
// // //                     {!inCall && callStatus !== 'ringing' && callStatus !== 'calling' && (
// // //                         <button onClick={() => startCall(socket)} style={{ background: '#4CAF50', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', color: 'white' }}>📞 Call</button>
// // //                     )}
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default VideoCallChat;


// // import React, { useState, useEffect, useRef } from 'react';
// // import io from 'socket.io-client';
// // import { FaPhoneSlash, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

// // const VideoCallChat = ({ currentUserId, targetUserId, targetName, onClose, isInitiator = false }) => {
// //     const [socket, setSocket] = useState(null);
// //     const [messages, setMessages] = useState([]);
// //     const [newMessage, setNewMessage] = useState('');
// //     const [inCall, setInCall] = useState(false);
// //     const [callStatus, setCallStatus] = useState('idle');
// //     const [localStream, setLocalStream] = useState(null);
// //     const [isMuted, setIsMuted] = useState(false);
    
// //     const messagesEndRef = useRef(null);
// //     const peerConnection = useRef(null);
// //     const audioRef = useRef();

// //     const configuration = {
// //         iceServers: [
// //             { urls: 'stun:stun.l.google.com:19302' },
// //             { urls: 'stun:stun1.l.google.com:19302' }
// //         ]
// //     };

// //     // Load chat history
// //     const loadMessages = async () => {
// //         try {
// //             const res = await fetch(`http://localhost:5000/api/chat/messages/${currentUserId}/${targetUserId}`);
// //             const data = await res.json();
// //             if (data.success && data.data) {
// //                 const sorted = data.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
// //                 setMessages(sorted);
// //             }
// //         } catch (err) {
// //             console.error('Error loading messages:', err);
// //         }
// //     };

// //     // Get audio only
// //     const getAudio = async () => {
// //         try {
// //             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
// //             setLocalStream(stream);
// //             console.log('✅ Microphone Working');
// //             return true;
// //         } catch (err) {
// //             console.error('Microphone error:', err);
// //             alert('Please allow microphone access');
// //             return false;
// //         }
// //     };

// //     // Start Call (User Side)
// //     const startCall = async () => {
// //         console.log('📞 Starting voice call to', targetName);
// //         setCallStatus('calling');
        
// //         const hasAudio = await getAudio();
// //         if (!hasAudio) return;
        
// //         peerConnection.current = new RTCPeerConnection(configuration);
        
// //         localStream.getTracks().forEach(track => {
// //             peerConnection.current.addTrack(track, localStream);
// //         });
        
// //         peerConnection.current.ontrack = (event) => {
// //             console.log('🎤 Remote audio received!');
// //             if (audioRef.current) {
// //                 audioRef.current.srcObject = event.streams[0];
// //                 audioRef.current.play();
// //             }
// //             setInCall(true);
// //             setCallStatus('connected');
// //         };
        
// //         peerConnection.current.oniceconnectionstatechange = () => {
// //             console.log('ICE State:', peerConnection.current.iceConnectionState);
// //         };
        
// //         const offer = await peerConnection.current.createOffer();
// //         await peerConnection.current.setLocalDescription(offer);
        
// //         if (socket && socket.connected) {
// //             socket.emit('call-user', {
// //                 to: targetUserId,
// //                 from: currentUserId,
// //                 signal: offer
// //             });
// //         }
        
// //         setCallStatus('ringing');
        
// //         setTimeout(() => {
// //             if (callStatus === 'ringing') {
// //                 setCallStatus('idle');
// //                 alert('No answer from ' + targetName);
// //                 endCall();
// //             }
// //         }, 30000);
// //     };

// //     // Accept Call (Pandit Side)
// //     const acceptCall = async (signal) => {
// //         console.log('📞 Accepting voice call from', targetName);
// //         setCallStatus('connecting');
        
// //         const hasAudio = await getAudio();
// //         if (!hasAudio) return;
        
// //         peerConnection.current = new RTCPeerConnection(configuration);
        
// //         localStream.getTracks().forEach(track => {
// //             peerConnection.current.addTrack(track, localStream);
// //         });
        
// //         peerConnection.current.ontrack = (event) => {
// //             console.log('🎤 Remote audio received!');
// //             if (audioRef.current) {
// //                 audioRef.current.srcObject = event.streams[0];
// //                 audioRef.current.play();
// //             }
// //             setInCall(true);
// //             setCallStatus('connected');
// //         };
        
// //         peerConnection.current.oniceconnectionstatechange = () => {
// //             console.log('ICE State:', peerConnection.current.iceConnectionState);
// //         };
        
// //         try {
// //             await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
// //             const answer = await peerConnection.current.createAnswer();
// //             await peerConnection.current.setLocalDescription(answer);
            
// //             if (socket) {
// //                 socket.emit('answer-call', { to: targetUserId, signal: answer });
// //             }
// //             setCallStatus('connected');
// //         } catch (err) {
// //             console.error('Error accepting call:', err);
// //         }
// //     };

// //     const endCall = () => {
// //         console.log('🔴 Ending voice call');
// //         if (peerConnection.current) {
// //             peerConnection.current.close();
// //             peerConnection.current = null;
// //         }
// //         if (localStream) {
// //             localStream.getTracks().forEach(track => track.stop());
// //             setLocalStream(null);
// //         }
// //         if (socket) {
// //             socket.emit('end-call', { to: targetUserId });
// //         }
// //         setInCall(false);
// //         setCallStatus('idle');
// //         onClose();
// //     };

// //     const toggleMute = () => {
// //         if (localStream) {
// //             const audioTrack = localStream.getAudioTracks()[0];
// //             if (audioTrack) {
// //                 audioTrack.enabled = !audioTrack.enabled;
// //                 setIsMuted(!audioTrack.enabled);
// //             }
// //         }
// //     };

// //     const sendMessage = () => {
// //         if (!newMessage.trim()) return;
// //         if (!socket || !socket.connected) {
// //             alert('Not connected to server');
// //             return;
// //         }
        
// //         socket.emit('private-message', {
// //             to: targetUserId,
// //             from: currentUserId,
// //             message: newMessage
// //         });
        
// //         setMessages(prev => [...prev, {
// //             from: currentUserId,
// //             message: newMessage,
// //             time: new Date(),
// //             createdAt: new Date()
// //         }]);
// //         setNewMessage('');
        
// //         setTimeout(() => {
// //             messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //         }, 100);
// //     };

// //     useEffect(() => {
// //         const s = io('http://localhost:5000');
// //         setSocket(s);
        
// //         s.on('connect', () => {
// //             console.log('✅ Socket connected:', s.id);
// //             s.emit('user-join', currentUserId);
// //         });

// //         s.on('incoming-call', async (data) => {
// //             console.log('📞 INCOMING VOICE CALL:', data);
// //             if (data.from === targetUserId) {
// //                 setCallStatus('ringing');
// //                 const accept = window.confirm(`📞 Incoming voice call from ${targetName}. Accept?`);
// //                 if (accept) {
// //                     await acceptCall(data.signal);
// //                 } else {
// //                     s.emit('end-call', { to: data.from });
// //                     onClose();
// //                 }
// //             }
// //         });

// //         s.on('call-answered', async (data) => {
// //             console.log('✅ Call answered');
// //             if (peerConnection.current && data.signal) {
// //                 await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.signal));
// //                 setCallStatus('connected');
// //                 setInCall(true);
// //             }
// //         });

// //         s.on('call-ended', () => {
// //             console.log('🔴 Call ended');
// //             endCall();
// //         });

// //         s.on('private-message', (data) => {
// //             if (data.from === targetUserId || data.to === targetUserId) {
// //                 setMessages(prev => [...prev, data]);
// //                 setTimeout(() => {
// //                     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //                 }, 100);
// //             }
// //         });

// //         loadMessages();

// //         if (isInitiator) {
// //             setTimeout(() => startCall(), 1000);
// //         }

// //         return () => {
// //             if (socket) socket.close();
// //             if (localStream) {
// //                 localStream.getTracks().forEach(track => track.stop());
// //             }
// //             if (peerConnection.current) {
// //                 peerConnection.current.close();
// //             }
// //         };
// //     }, []);

// //     useEffect(() => {
// //         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //     }, [messages]);

// //     const getStatusText = () => {
// //         switch(callStatus) {
// //             case 'calling': return '📞 Calling...';
// //             case 'ringing': return '🔔 Ringing...';
// //             case 'connected': return '🎤 Voice Call Connected';
// //             case 'connecting': return '🔄 Connecting...';
// //             default: return '💬 Chat';
// //         }
// //     };

// //     const getStatusColor = () => {
// //         if (callStatus === 'connected') return '#4CAF50';
// //         if (callStatus === 'calling') return '#ff9800';
// //         if (callStatus === 'ringing') return '#ff9800';
// //         return '#ff9800';
// //     };

// //     return (
// //         <div style={{
// //             position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
// //             width: '450px', height: '580px', background: '#1a1a1a', borderRadius: '15px',
// //             zIndex: 2000, display: 'flex', flexDirection: 'column', 
// //             border: `2px solid ${getStatusColor()}`,
// //             boxShadow: '0 0 20px rgba(0,0,0,0.5)'
// //         }}>
// //             {/* Header */}
// //             <div style={{ background: getStatusColor(), padding: '15px', borderRadius: '13px 13px 0 0', textAlign: 'center' }}>
// //                 <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}>{targetName}</div>
// //                 <div style={{ fontSize: '12px', color: 'white', opacity: 0.8 }}>{getStatusText()}</div>
// //             </div>
            
// //             {/* Audio Element */}
// //             <audio ref={audioRef} autoPlay style={{ display: 'none' }} />
            
// //             {/* Call Status Image */}
// //             <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: '#2d2d2d' }}>
// //                 <div style={{
// //                     width: '120px', height: '120px', borderRadius: '50%', background: '#075E54',
// //                     display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
// //                 }}>
// //                     <FaMicrophone size={50} color="white" />
// //                 </div>
// //                 <div style={{ color: 'white', textAlign: 'center' }}>
// //                     {callStatus === 'connected' && <div>🎤 Voice call connected</div>}
// //                     {callStatus === 'calling' && <div>📞 Calling {targetName}...</div>}
// //                     {callStatus === 'ringing' && <div>🔔 Incoming voice call...</div>}
// //                     {callStatus === 'connecting' && <div>🔄 Connecting...</div>}
// //                 </div>
// //             </div>
            
// //             {/* Call Controls */}
// //             <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', gap: '20px', background: '#1a1a1a' }}>
// //                 {inCall && (
// //                     <button onClick={toggleMute} style={{
// //                         background: isMuted ? '#f44336' : '#555',
// //                         color: 'white', padding: '12px', border: 'none', borderRadius: '50%',
// //                         cursor: 'pointer', width: '50px', height: '50px'
// //                     }}>
// //                         {isMuted ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
// //                     </button>
// //                 )}
// //                 <button onClick={endCall} style={{
// //                     background: '#f44336', color: 'white', padding: '12px 24px', border: 'none',
// //                     borderRadius: '30px', cursor: 'pointer', fontSize: '16px',
// //                     display: 'flex', alignItems: 'center', gap: '8px'
// //                 }}>
// //                     <FaPhoneSlash /> End Call
// //                 </button>
// //             </div>
            
// //             {/* Chat Area */}
// //             <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', background: '#2d2d2d', borderTop: '1px solid #444' }}>
// //                 <div style={{ height: '180px', overflow: 'auto', marginBottom: '10px', padding: '10px' }}>
// //                     {messages.length === 0 && (
// //                         <div style={{ textAlign: 'center', color: '#888', marginTop: '30px' }}>
// //                             💬 No messages yet
// //                         </div>
// //                     )}
// //                     {messages.map((msg, i) => (
// //                         <div key={i} style={{ textAlign: msg.from === currentUserId ? 'right' : 'left', marginBottom: '10px' }}>
// //                             <div style={{
// //                                 display: 'inline-block',
// //                                 maxWidth: '80%',
// //                                 background: msg.from === currentUserId ? '#ff9800' : '#555',
// //                                 padding: '8px 12px',
// //                                 borderRadius: '15px',
// //                                 color: 'white',
// //                                 wordWrap: 'break-word'
// //                             }}>
// //                                 {msg.message}
// //                             </div>
// //                             <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>
// //                                 {new Date(msg.createdAt || msg.time).toLocaleTimeString()}
// //                             </div>
// //                         </div>
// //                     ))}
// //                     <div ref={messagesEndRef} />
// //                 </div>
                
// //                 {/* Input Area */}
// //                 <div style={{ display: 'flex', gap: '10px', padding: '10px', background: '#1a1a1a', borderRadius: '10px' }}>
// //                     <input
// //                         type="text"
// //                         value={newMessage}
// //                         onChange={e => setNewMessage(e.target.value)}
// //                         onKeyPress={e => e.key === 'Enter' && sendMessage()}
// //                         style={{ flex: 1, padding: '10px', borderRadius: '25px', border: 'none', outline: 'none', fontSize: '14px', background: '#fff', color: '#000' }}
// //                         placeholder="Type a message..."
// //                     />
// //                     <button onClick={sendMessage} style={{ background: '#ff9800', border: 'none', padding: '8px 15px', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', color: '#fff' }}>
// //                         Send
// //                     </button>
// //                     {!inCall && callStatus !== 'ringing' && callStatus !== 'calling' && (
// //                         <button onClick={startCall} style={{ background: '#4CAF50', border: 'none', padding: '8px 15px', borderRadius: '25px', cursor: 'pointer', color: 'white', fontWeight: 'bold' }}>
// //                             📞 Call
// //                         </button>
// //                     )}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default VideoCallChat;

// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import { FaPhoneSlash, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

// const VideoCallChat = ({ currentUserId, targetUserId, targetName, onClose, isInitiator = false }) => {
//     const [socket, setSocket] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [inCall, setInCall] = useState(false);
//     const [callStatus, setCallStatus] = useState('idle');
//     const [localStream, setLocalStream] = useState(null);
//     const [isMuted, setIsMuted] = useState(false);
    
//     const messagesEndRef = useRef(null);
//     const peerConnection = useRef(null);
//     const audioRef = useRef();

//     const configuration = {
//         iceServers: [
//             { urls: 'stun:stun.l.google.com:19302' },
//             { urls: 'stun:stun1.l.google.com:19302' }
//         ]
//     };

//     const loadMessages = async () => {
//         try {
//             const res = await fetch(`http://localhost:5000/api/chat/messages/${currentUserId}/${targetUserId}`);
//             const data = await res.json();
//             if (data.success && data.data) {
//                 const sorted = data.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//                 setMessages(sorted);
//             }
//         } catch (err) {
//             console.error('Error loading messages:', err);
//         }
//     };

//     const getAudio = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             setLocalStream(stream);
//             console.log('✅ Microphone Working');
//             return stream;
//         } catch (err) {
//             console.error('Microphone error:', err);
//             alert('Please allow microphone access');
//             return null;
//         }
//     };

//     const startCall = async () => {
//         console.log('📞 Starting voice call to', targetName);
//         setCallStatus('calling');
        
//         const stream = await getAudio();
//         if (!stream) return;
        
//         setLocalStream(stream);
        
//         peerConnection.current = new RTCPeerConnection(configuration);
        
//         stream.getTracks().forEach(track => {
//             peerConnection.current.addTrack(track, stream);
//         });
        
//         peerConnection.current.ontrack = (event) => {
//             console.log('🎤 Remote audio received!');
//             if (audioRef.current) {
//                 audioRef.current.srcObject = event.streams[0];
//                 audioRef.current.play();
//             }
//             setInCall(true);
//             setCallStatus('connected');
//         };
        
//         peerConnection.current.oniceconnectionstatechange = () => {
//             console.log('ICE State:', peerConnection.current.iceConnectionState);
//         };
        
//         const offer = await peerConnection.current.createOffer();
//         await peerConnection.current.setLocalDescription(offer);
        
//         if (socket && socket.connected) {
//             socket.emit('call-user', {
//                 to: targetUserId,
//                 from: currentUserId,
//                 signal: {
//                     type: offer.type,
//                     sdp: offer.sdp
//                 }
//             });
//         }
        
//         setCallStatus('ringing');
        
//         setTimeout(() => {
//             if (callStatus === 'ringing') {
//                 setCallStatus('idle');
//                 alert('No answer from ' + targetName);
//                 endCall();
//             }
//         }, 30000);
//     };

//     const acceptCall = async (signal) => {
//         console.log('📞 Accepting voice call from', targetName);
//         setCallStatus('connecting');
        
//         const stream = await getAudio();
//         if (!stream) return;
        
//         setLocalStream(stream);
        
//         peerConnection.current = new RTCPeerConnection(configuration);
        
//         stream.getTracks().forEach(track => {
//             peerConnection.current.addTrack(track, stream);
//         });
        
//         peerConnection.current.ontrack = (event) => {
//             console.log('🎤 Remote audio received!');
//             if (audioRef.current) {
//                 audioRef.current.srcObject = event.streams[0];
//                 audioRef.current.play();
//             }
//             setInCall(true);
//             setCallStatus('connected');
//         };
        
//         peerConnection.current.oniceconnectionstatechange = () => {
//             console.log('ICE State:', peerConnection.current.iceConnectionState);
//         };
        
//         try {
//             // Handle signal properly
//             let remoteSignal = signal;
//             if (typeof signal === 'string') {
//                 remoteSignal = JSON.parse(signal);
//             }
            
//             const remoteDesc = new RTCSessionDescription({
//                 type: remoteSignal.type || 'offer',
//                 sdp: remoteSignal.sdp || remoteSignal
//             });
            
//             await peerConnection.current.setRemoteDescription(remoteDesc);
//             const answer = await peerConnection.current.createAnswer();
//             await peerConnection.current.setLocalDescription(answer);
            
//             if (socket) {
//                 socket.emit('answer-call', { 
//                     to: targetUserId, 
//                     signal: {
//                         type: answer.type,
//                         sdp: answer.sdp
//                     }
//                 });
//             }
//             setCallStatus('connected');
//         } catch (err) {
//             console.error('Error accepting call:', err);
//             setCallStatus('idle');
//         }
//     };

//     const endCall = () => {
//         console.log('🔴 Ending voice call');
//         if (peerConnection.current) {
//             peerConnection.current.close();
//             peerConnection.current = null;
//         }
//         if (localStream) {
//             localStream.getTracks().forEach(track => track.stop());
//             setLocalStream(null);
//         }
//         if (socket) {
//             socket.emit('end-call', { to: targetUserId });
//         }
//         setInCall(false);
//         setCallStatus('idle');
//         onClose();
//     };

//     const toggleMute = () => {
//         if (localStream) {
//             const audioTrack = localStream.getAudioTracks()[0];
//             if (audioTrack) {
//                 audioTrack.enabled = !audioTrack.enabled;
//                 setIsMuted(!audioTrack.enabled);
//             }
//         }
//     };

//     const sendMessage = () => {
//         if (!newMessage.trim()) return;
//         if (!socket || !socket.connected) {
//             alert('Not connected to server');
//             return;
//         }
        
//         socket.emit('private-message', {
//             to: targetUserId,
//             from: currentUserId,
//             message: newMessage
//         });
        
//         setMessages(prev => [...prev, {
//             from: currentUserId,
//             message: newMessage,
//             time: new Date(),
//             createdAt: new Date()
//         }]);
//         setNewMessage('');
        
//         setTimeout(() => {
//             messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//         }, 100);
//     };

//     useEffect(() => {
//         const s = io('http://localhost:5000');
//         setSocket(s);
        
//         s.on('connect', () => {
//             console.log('✅ Socket connected:', s.id);
//             s.emit('user-join', currentUserId);
//         });

//         s.on('incoming-call', async (data) => {
//             console.log('📞 INCOMING VOICE CALL:', data);
//             if (data.from === targetUserId) {
//                 setCallStatus('ringing');
//                 const accept = window.confirm(`📞 Incoming voice call from ${targetName}. Accept?`);
//                 if (accept) {
//                     await acceptCall(data.signal);
//                 } else {
//                     s.emit('end-call', { to: data.from });
//                     onClose();
//                 }
//             }
//         });

//         s.on('call-answered', async (data) => {
//             console.log('✅ Call answered');
//             if (peerConnection.current && data.signal) {
//                 try {
//                     const answerSignal = typeof data.signal === 'string' ? JSON.parse(data.signal) : data.signal;
//                     const answerDesc = new RTCSessionDescription({
//                         type: answerSignal.type || 'answer',
//                         sdp: answerSignal.sdp || answerSignal
//                     });
//                     await peerConnection.current.setRemoteDescription(answerDesc);
//                     setCallStatus('connected');
//                     setInCall(true);
//                 } catch (err) {
//                     console.error('Error setting answer:', err);
//                 }
//             }
//         });

//         s.on('call-ended', () => {
//             console.log('🔴 Call ended');
//             endCall();
//         });

//         s.on('private-message', (data) => {
//             if (data.from === targetUserId || data.to === targetUserId) {
//                 setMessages(prev => [...prev, data]);
//                 setTimeout(() => {
//                     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//                 }, 100);
//             }
//         });

//         loadMessages();

//         if (isInitiator) {
//             setTimeout(() => startCall(), 1000);
//         }

//         return () => {
//             if (socket) socket.close();
//             if (localStream) {
//                 localStream.getTracks().forEach(track => track.stop());
//             }
//             if (peerConnection.current) {
//                 peerConnection.current.close();
//             }
//         };
//     }, []);

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     const getStatusText = () => {
//         switch(callStatus) {
//             case 'calling': return '📞 Calling...';
//             case 'ringing': return '🔔 Ringing...';
//             case 'connected': return '🎤 Voice Call Connected';
//             case 'connecting': return '🔄 Connecting...';
//             default: return '💬 Chat';
//         }
//     };

//     const getStatusColor = () => {
//         if (callStatus === 'connected') return '#4CAF50';
//         if (callStatus === 'calling') return '#ff9800';
//         if (callStatus === 'ringing') return '#ff9800';
//         return '#ff9800';
//     };

//     return (
//         <div style={{
//             position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
//             width: '450px', height: '580px', background: '#1a1a1a', borderRadius: '15px',
//             zIndex: 2000, display: 'flex', flexDirection: 'column', 
//             border: `2px solid ${getStatusColor()}`,
//             boxShadow: '0 0 20px rgba(0,0,0,0.5)'
//         }}>
//             {/* Header */}
//             <div style={{ background: getStatusColor(), padding: '15px', borderRadius: '13px 13px 0 0', textAlign: 'center' }}>
//                 <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}>{targetName}</div>
//                 <div style={{ fontSize: '12px', color: 'white', opacity: 0.8 }}>{getStatusText()}</div>
//             </div>
            
//             {/* Audio Element */}
//             <audio ref={audioRef} autoPlay style={{ display: 'none' }} />
            
//             {/* Call Status Image */}
//             <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: '#2d2d2d' }}>
//                 <div style={{
//                     width: '120px', height: '120px', borderRadius: '50%', background: '#075E54',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
//                 }}>
//                     <FaMicrophone size={50} color="white" />
//                 </div>
//                 <div style={{ color: 'white', textAlign: 'center' }}>
//                     {callStatus === 'connected' && <div>🎤 Voice call connected</div>}
//                     {callStatus === 'calling' && <div>📞 Calling {targetName}...</div>}
//                     {callStatus === 'ringing' && <div>🔔 Incoming voice call...</div>}
//                     {callStatus === 'connecting' && <div>🔄 Connecting...</div>}
//                 </div>
//             </div>
            
//             {/* Call Controls */}
//             <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', gap: '20px', background: '#1a1a1a' }}>
//                 {inCall && (
//                     <button onClick={toggleMute} style={{
//                         background: isMuted ? '#f44336' : '#555',
//                         color: 'white', padding: '12px', border: 'none', borderRadius: '50%',
//                         cursor: 'pointer', width: '50px', height: '50px'
//                     }}>
//                         {isMuted ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
//                     </button>
//                 )}
//                 <button onClick={endCall} style={{
//                     background: '#f44336', color: 'white', padding: '12px 24px', border: 'none',
//                     borderRadius: '30px', cursor: 'pointer', fontSize: '16px',
//                     display: 'flex', alignItems: 'center', gap: '8px'
//                 }}>
//                     <FaPhoneSlash /> End Call
//                 </button>
//             </div>
            
//             {/* Chat Area */}
//             <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', background: '#2d2d2d', borderTop: '1px solid #444' }}>
//                 <div style={{ height: '180px', overflow: 'auto', marginBottom: '10px', padding: '10px' }}>
//                     {messages.length === 0 && (
//                         <div style={{ textAlign: 'center', color: '#888', marginTop: '30px' }}>
//                             💬 No messages yet
//                         </div>
//                     )}
//                     {messages.map((msg, i) => (
//                         <div key={i} style={{ textAlign: msg.from === currentUserId ? 'right' : 'left', marginBottom: '10px' }}>
//                             <div style={{
//                                 display: 'inline-block',
//                                 maxWidth: '80%',
//                                 background: msg.from === currentUserId ? '#ff9800' : '#555',
//                                 padding: '8px 12px',
//                                 borderRadius: '15px',
//                                 color: 'white',
//                                 wordWrap: 'break-word'
//                             }}>
//                                 {msg.message}
//                             </div>
//                             <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>
//                                 {new Date(msg.createdAt || msg.time).toLocaleTimeString()}
//                             </div>
//                         </div>
//                     ))}
//                     <div ref={messagesEndRef} />
//                 </div>
                
//                 {/* Input Area */}
//                 <div style={{ display: 'flex', gap: '10px', padding: '10px', background: '#1a1a1a', borderRadius: '10px' }}>
//                     <input
//                         type="text"
//                         value={newMessage}
//                         onChange={e => setNewMessage(e.target.value)}
//                         onKeyPress={e => e.key === 'Enter' && sendMessage()}
//                         style={{ flex: 1, padding: '10px', borderRadius: '25px', border: 'none', outline: 'none', fontSize: '14px', background: '#fff', color: '#000' }}
//                         placeholder="Type a message..."
//                     />
//                     <button onClick={sendMessage} style={{ background: '#ff9800', border: 'none', padding: '8px 15px', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', color: '#fff' }}>
//                         Send
//                     </button>
//                     {!inCall && callStatus !== 'ringing' && callStatus !== 'calling' && (
//                         <button onClick={startCall} style={{ background: '#4CAF50', border: 'none', padding: '8px 15px', borderRadius: '25px', cursor: 'pointer', color: 'white', fontWeight: 'bold' }}>
//                             📞 Call
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default VideoCallChat;

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { FaPhoneSlash, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const VideoCallChat = ({ currentUserId, targetUserId, targetName, onClose, isInitiator = false }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [inCall, setInCall] = useState(false);
    const [callStatus, setCallStatus] = useState('idle');
    const [localStream, setLocalStream] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    
    const messagesEndRef = useRef(null);
    const peerConnection = useRef(null);
    const audioRef = useRef();

    const configuration = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' }
        ]
    };

    const loadMessages = async () => {
        try {
            const res = await fetch(`https://astrologer-backendcoll-chaat.onrender.com/api/chat/messages/${currentUserId}/${targetUserId}`);
            const data = await res.json();
            if (data.success && data.data) {
                const sorted = data.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                setMessages(sorted);
            }
        } catch (err) {
            console.error('Error loading messages:', err);
        }
    };

    const getAudio = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setLocalStream(stream);
            console.log('✅ Microphone Working');
            return stream;
        } catch (err) {
            console.error('Microphone error:', err);
            alert('Please allow microphone access');
            return null;
        }
    };

    const startCall = async () => {
        console.log('📞 Starting voice call to', targetName);
        setCallStatus('calling');
        
        const stream = await getAudio();
        if (!stream) {
            console.error('❌ No microphone access');
            setCallStatus('idle');
            return;
        }
        
        setLocalStream(stream);
        
        peerConnection.current = new RTCPeerConnection(configuration);
        
        stream.getTracks().forEach(track => {
            peerConnection.current.addTrack(track, stream);
        });
        
        peerConnection.current.ontrack = (event) => {
            console.log('🎤 Remote audio received!');
            if (audioRef.current) {
                audioRef.current.srcObject = event.streams[0];
                audioRef.current.play().catch(e => console.log('Audio play error:', e));
            }
            setInCall(true);
            setCallStatus('connected');
        };
        
        peerConnection.current.oniceconnectionstatechange = () => {
            console.log('ICE State:', peerConnection.current.iceConnectionState);
            if (peerConnection.current.iceConnectionState === 'connected') {
                console.log('✅ Voice call connected!');
            } else if (peerConnection.current.iceConnectionState === 'failed') {
                console.log('❌ Voice call failed');
                alert('Connection failed. Please try again.');
                endCall();
            }
        };
        
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        
        if (socket && socket.connected) {
            socket.emit('call-user', {
                to: targetUserId,
                from: currentUserId,
                signal: {
                    type: offer.type,
                    sdp: offer.sdp
                }
            });
        }
        
        setCallStatus('ringing');
        
        setTimeout(() => {
            if (callStatus === 'ringing') {
                setCallStatus('idle');
                alert('No answer from ' + targetName);
                endCall();
            }
        }, 30000);
    };

    const acceptCall = async (signal) => {
        console.log('📞 Accepting voice call from', targetName);
        setCallStatus('connecting');
        
        const stream = await getAudio();
        if (!stream) {
            console.error('❌ No microphone access');
            setCallStatus('idle');
            return;
        }
        
        setLocalStream(stream);
        
        peerConnection.current = new RTCPeerConnection(configuration);
        
        stream.getTracks().forEach(track => {
            peerConnection.current.addTrack(track, stream);
        });
        
        peerConnection.current.ontrack = (event) => {
            console.log('🎤 Remote audio received!');
            if (audioRef.current) {
                audioRef.current.srcObject = event.streams[0];
                audioRef.current.play().catch(e => console.log('Audio play error:', e));
            }
            setInCall(true);
            setCallStatus('connected');
        };
        
        peerConnection.current.oniceconnectionstatechange = () => {
            console.log('ICE State:', peerConnection.current.iceConnectionState);
            if (peerConnection.current.iceConnectionState === 'connected') {
                console.log('✅ Voice call connected!');
            } else if (peerConnection.current.iceConnectionState === 'failed') {
                console.log('❌ Voice call failed');
                endCall();
            }
        };
        
        try {
            let remoteSignal = signal;
            if (typeof signal === 'string') {
                remoteSignal = JSON.parse(signal);
            }
            
            const remoteDesc = new RTCSessionDescription({
                type: remoteSignal.type || 'offer',
                sdp: remoteSignal.sdp || remoteSignal
            });
            
            await peerConnection.current.setRemoteDescription(remoteDesc);
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);
            
            if (socket) {
                socket.emit('answer-call', { 
                    to: targetUserId, 
                    signal: {
                        type: answer.type,
                        sdp: answer.sdp
                    }
                });
            }
            setCallStatus('connected');
        } catch (err) {
            console.error('Error accepting call:', err);
            setCallStatus('idle');
        }
    };

    const endCall = () => {
        console.log('🔴 Ending voice call');
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            setLocalStream(null);
        }
        if (socket) {
            socket.emit('end-call', { to: targetUserId });
        }
        setInCall(false);
        setCallStatus('idle');
        onClose();
    };

    const toggleMute = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMuted(!audioTrack.enabled);
                console.log(isMuted ? '🔊 Unmuted' : '🔇 Muted');
            }
        }
    };

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        if (!socket || !socket.connected) {
            alert('Not connected to server');
            return;
        }
        
        socket.emit('private-message', {
            to: targetUserId,
            from: currentUserId,
            message: newMessage
        });
        
        setMessages(prev => [...prev, {
            from: currentUserId,
            message: newMessage,
            time: new Date(),
            createdAt: new Date()
        }]);
        setNewMessage('');
        
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    useEffect(() => {
        const s = io('https://astrologer-backendcoll-chaat.onrender.com');
        setSocket(s);
        
        s.on('connect', () => {
            console.log('✅ Socket connected:', s.id);
            s.emit('user-join', currentUserId);
        });

        s.on('incoming-call', async (data) => {
            console.log('📞 INCOMING VOICE CALL:', data);
            if (data.from === targetUserId && !isInitiator) {
                setCallStatus('ringing');
                const accept = window.confirm(`📞 Incoming voice call from ${targetName}. Accept?`);
                if (accept) {
                    await acceptCall(data.signal);
                } else {
                    s.emit('end-call', { to: data.from });
                    onClose();
                }
            }
        });

        s.on('call-answered', async (data) => {
            console.log('✅ Call answered');
            if (peerConnection.current && data.signal) {
                try {
                    const answerSignal = typeof data.signal === 'string' ? JSON.parse(data.signal) : data.signal;
                    const answerDesc = new RTCSessionDescription({
                        type: answerSignal.type || 'answer',
                        sdp: answerSignal.sdp || answerSignal
                    });
                    await peerConnection.current.setRemoteDescription(answerDesc);
                    setCallStatus('connected');
                    setInCall(true);
                } catch (err) {
                    console.error('Error setting answer:', err);
                }
            }
        });

        s.on('call-ended', () => {
            console.log('🔴 Call ended');
            endCall();
        });

        s.on('private-message', (data) => {
            if (data.from === targetUserId || data.to === targetUserId) {
                setMessages(prev => [...prev, data]);
                setTimeout(() => {
                    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        });

        loadMessages();

        if (isInitiator) {
            setTimeout(() => startCall(), 1000);
        }

        return () => {
            if (socket) socket.close();
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            if (peerConnection.current) {
                peerConnection.current.close();
            }
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const getStatusText = () => {
        switch(callStatus) {
            case 'calling': return '📞 Calling...';
            case 'ringing': return '🔔 Ringing...';
            case 'connected': return '🎤 Voice Call Connected';
            case 'connecting': return '🔄 Connecting...';
            default: return '💬 Chat';
        }
    };

    const getStatusColor = () => {
        if (callStatus === 'connected') return '#4CAF50';
        if (callStatus === 'calling') return '#ff9800';
        if (callStatus === 'ringing') return '#ff9800';
        return '#ff9800';
    };

    return (
        <div style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '450px', height: '580px', background: '#1a1a1a', borderRadius: '15px',
            zIndex: 2000, display: 'flex', flexDirection: 'column', 
            border: `2px solid ${getStatusColor()}`,
            boxShadow: '0 0 20px rgba(0,0,0,0.5)'
        }}>
            {/* Header */}
            <div style={{ background: getStatusColor(), padding: '15px', borderRadius: '13px 13px 0 0', textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}>{targetName}</div>
                <div style={{ fontSize: '12px', color: 'white', opacity: 0.8 }}>{getStatusText()}</div>
            </div>
            
            {/* Audio Element */}
            <audio ref={audioRef} autoPlay style={{ display: 'none' }} />
            
            {/* Call Status Image */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: '#2d2d2d' }}>
                <div style={{
                    width: '120px', height: '120px', borderRadius: '50%', background: '#075E54',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
                }}>
                    <FaMicrophone size={50} color="white" />
                </div>
                <div style={{ color: 'white', textAlign: 'center' }}>
                    {callStatus === 'connected' && <div>🎤 Voice call connected</div>}
                    {callStatus === 'calling' && <div>📞 Calling {targetName}...</div>}
                    {callStatus === 'ringing' && <div>🔔 Incoming voice call...</div>}
                    {callStatus === 'connecting' && <div>🔄 Connecting...</div>}
                </div>
            </div>
            
            {/* Call Controls */}
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', gap: '20px', background: '#1a1a1a' }}>
                {inCall && (
                    <button onClick={toggleMute} style={{
                        background: isMuted ? '#f44336' : '#555',
                        color: 'white', padding: '12px', border: 'none', borderRadius: '50%',
                        cursor: 'pointer', width: '50px', height: '50px'
                    }}>
                        {isMuted ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
                    </button>
                )}
                <button onClick={endCall} style={{
                    background: '#f44336', color: 'white', padding: '12px 24px', border: 'none',
                    borderRadius: '30px', cursor: 'pointer', fontSize: '16px',
                    display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                    <FaPhoneSlash /> End Call
                </button>
            </div>
            
            {/* Chat Area */}
            <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', background: '#2d2d2d', borderTop: '1px solid #444' }}>
                <div style={{ height: '180px', overflow: 'auto', marginBottom: '10px', padding: '10px' }}>
                    {messages.length === 0 && (
                        <div style={{ textAlign: 'center', color: '#888', marginTop: '30px' }}>
                            💬 No messages yet
                        </div>
                    )}
                    {messages.map((msg, i) => (
                        <div key={i} style={{ textAlign: msg.from === currentUserId ? 'right' : 'left', marginBottom: '10px' }}>
                            <div style={{
                                display: 'inline-block',
                                maxWidth: '80%',
                                background: msg.from === currentUserId ? '#ff9800' : '#555',
                                padding: '8px 12px',
                                borderRadius: '15px',
                                color: 'white',
                                wordWrap: 'break-word'
                            }}>
                                {msg.message}
                            </div>
                            <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>
                                {new Date(msg.createdAt || msg.time).toLocaleTimeString()}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                
                {/* Input Area */}
                <div style={{ display: 'flex', gap: '10px', padding: '10px', background: '#1a1a1a', borderRadius: '10px' }}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && sendMessage()}
                        style={{ flex: 1, padding: '10px', borderRadius: '25px', border: 'none', outline: 'none', fontSize: '14px', background: '#fff', color: '#000' }}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage} style={{ background: '#ff9800', border: 'none', padding: '8px 15px', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', color: '#fff' }}>
                        Send
                    </button>
                    {!inCall && callStatus !== 'ringing' && callStatus !== 'calling' && (
                        <button onClick={startCall} style={{ background: '#4CAF50', border: 'none', padding: '8px 15px', borderRadius: '25px', cursor: 'pointer', color: 'white', fontWeight: 'bold' }}>
                            📞 Call
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoCallChat;