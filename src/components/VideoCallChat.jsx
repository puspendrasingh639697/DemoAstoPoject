// import React, { useState, useEffect, useRef } from 'react';
// import { supabase } from '../supabaseClient';

// const VideoCallChat = ({ currentUserId, targetUserId, targetName, onClose, isInitiator = false, incomingOffer = null }) => {
//     const [callStatus, setCallStatus] = useState('idle');
//     const [localStream, setLocalStream] = useState(null);
//     const [isMuted, setIsMuted] = useState(false);
//     const [error, setError] = useState(null);
    
//     const peerConnection = useRef(null);
//     const remoteAudioRef = useRef();
//     const localAudioRef = useRef();

//     const configuration = {
//         iceServers: [
//             { urls: 'stun:stun.l.google.com:19302' },
//             { urls: 'stun:stun1.l.google.com:19302' },
//             { urls: 'stun:stun2.l.google.com:19302' }
//         ]
//     };

//     // Get microphone
//     const getMicrophone = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             setLocalStream(stream);
//             if (localAudioRef.current) {
//                 localAudioRef.current.srcObject = stream;
//             }
//             return stream;
//         } catch (err) {
//             console.error('Microphone error:', err);
//             setError('Microphone access denied');
//             return null;
//         }
//     };

//     // Send ICE candidate to database
//     const sendIceCandidate = async (candidate) => {
//         try {
//             await supabase.from('unified_interactions').insert({
//                 sender_id: currentUserId,
//                 receiver_id: targetUserId,
//                 action_type: 'ice_candidate',
//                 payload: { candidate: candidate }
//             });
//         } catch (err) {
//             console.error('Send ICE error:', err);
//         }
//     };

//     // Send answer to database
//     const sendAnswer = async (answer) => {
//         try {
//             await supabase.from('unified_interactions').insert({
//                 sender_id: currentUserId,
//                 receiver_id: targetUserId,
//                 action_type: 'call_answer',
//                 payload: { answer: answer }
//             });
//         } catch (err) {
//             console.error('Send answer error:', err);
//         }
//     };

//     // Send offer to database
//     const sendOffer = async (offer) => {
//         try {
//             await supabase.from('unified_interactions').insert({
//                 sender_id: currentUserId,
//                 receiver_id: targetUserId,
//                 action_type: 'call_offer',
//                 payload: { offer: offer }
//             });
//         } catch (err) {
//             console.error('Send offer error:', err);
//         }
//     };

//     // Initialize peer connection
//     const initPeerConnection = (stream) => {
//         if (peerConnection.current) {
//             peerConnection.current.close();
//         }
        
//         const pc = new RTCPeerConnection(configuration);
//         peerConnection.current = pc;
        
//         // Add local tracks
//         stream.getTracks().forEach(track => {
//             pc.addTrack(track, stream);
//         });
        
//         // Handle remote stream
//         pc.ontrack = (event) => {
//             console.log('📞 Received remote audio');
//             if (remoteAudioRef.current) {
//                 remoteAudioRef.current.srcObject = event.streams[0];
//                 remoteAudioRef.current.play().catch(e => console.log(e));
//             }
//         };
        
//         // Handle ICE candidates
//         pc.onicecandidate = (event) => {
//             if (event.candidate) {
//                 console.log('📡 Sending ICE candidate');
//                 sendIceCandidate(event.candidate);
//             }
//         };
        
//         // Handle connection state
//         pc.onconnectionstatechange = () => {
//             console.log('🔌 Connection state:', pc.connectionState);
//             if (pc.connectionState === 'connected') {
//                 console.log('✅ Call connected!');
//                 setCallStatus('connected');
//             } else if (pc.connectionState === 'failed') {
//                 setError('Connection failed');
//                 endCall();
//             }
//         };
        
//         return pc;
//     };

//     // Start call as initiator
//     const startCall = async () => {
//         console.log('📞 Starting call...');
//         setCallStatus('calling');
        
//         const stream = await getMicrophone();
//         if (!stream) {
//             setCallStatus('idle');
//             return;
//         }
        
//         const pc = initPeerConnection(stream);
        
//         try {
//             const offer = await pc.createOffer();
//             await pc.setLocalDescription(offer);
//             console.log('📤 Sending offer');
//             await sendOffer(offer);
//             setCallStatus('ringing');
//         } catch (err) {
//             console.error('Offer error:', err);
//             setError('Failed to start call');
//             endCall();
//         }
//     };
    
//     // Accept call with incoming offer
//     const acceptCall = async (offer) => {
//         console.log('📞 Accepting call...');
//         setCallStatus('connecting');
        
//         const stream = await getMicrophone();
//         if (!stream) {
//             setCallStatus('idle');
//             return;
//         }
        
//         const pc = initPeerConnection(stream);
        
//         try {
//             await pc.setRemoteDescription(new RTCSessionDescription(offer));
//             const answer = await pc.createAnswer();
//             await pc.setLocalDescription(answer);
//             console.log('📤 Sending answer');
//             await sendAnswer(answer);
//         } catch (err) {
//             console.error('Answer error:', err);
//             setError('Failed to accept call');
//             endCall();
//         }
//     };
    
//     // End call
//     const endCall = () => {
//         console.log('📞 Ending call');
//         if (peerConnection.current) {
//             peerConnection.current.close();
//             peerConnection.current = null;
//         }
//         if (localStream) {
//             localStream.getTracks().forEach(track => track.stop());
//             setLocalStream(null);
//         }
//         setCallStatus('idle');
//         onClose();
//     };
    
//     // Toggle mute
//     const toggleMute = () => {
//         if (localStream) {
//             const track = localStream.getAudioTracks()[0];
//             track.enabled = !track.enabled;
//             setIsMuted(!track.enabled);
//         }
//     };
    
//     // Listen for incoming signals
//     useEffect(() => {
//         // If we have an incoming offer from props, accept it
//         if (incomingOffer && !isInitiator && callStatus === 'idle') {
//             acceptCall(incomingOffer);
//         }
        
//         // Subscribe to database signals
//         const subscription = supabase
//             .channel('call_signals')
//             .on('postgres_changes', 
//                 { event: 'INSERT', schema: 'public', table: 'unified_interactions', filter: `receiver_id=eq.${currentUserId}` },
//                 async (payload) => {
//                     const data = payload.new;
//                     console.log('📨 Signal:', data.action_type);
                    
//                     if (data.action_type === 'call_offer' && !isInitiator && callStatus === 'idle' && !incomingOffer) {
//                         acceptCall(data.payload.offer);
//                     }
                    
//                     if (data.action_type === 'call_answer' && peerConnection.current && !peerConnection.current.currentRemoteDescription) {
//                         await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.payload.answer));
//                         console.log('✅ Answer set');
//                     }
                    
//                     if (data.action_type === 'ice_candidate' && data.payload?.candidate && peerConnection.current) {
//                         try {
//                             await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.payload.candidate));
//                             console.log('✅ ICE candidate added');
//                         } catch (err) {
//                             console.error('ICE error:', err);
//                         }
//                     }
//                 }
//             )
//             .subscribe();
        
//         if (isInitiator && callStatus === 'idle') {
//             setTimeout(startCall, 500);
//         }
        
//         return () => {
//             subscription.unsubscribe();
//         };
//     }, []);
    
//     return (
//         <div className="fixed inset-0 bg-black/95 z-[1000] flex items-center justify-center">
//             <div className="w-96 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
//                 <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 text-center">
//                     <div className="text-white font-bold text-lg">{targetName}</div>
//                     <div className="text-sm text-white/80">
//                         {callStatus === 'connected' && '🔴 In Call'}
//                         {callStatus === 'calling' && '📞 Calling...'}
//                         {callStatus === 'ringing' && '📱 Ringing...'}
//                         {callStatus === 'connecting' && '🔗 Connecting...'}
//                     </div>
//                     {error && <div className="text-red-300 text-xs mt-1">{error}</div>}
//                 </div>
                
//                 <audio ref={localAudioRef} muted autoPlay />
//                 <audio ref={remoteAudioRef} autoPlay playsInline />
                
//                 <div className="p-8 flex flex-col items-center">
//                     <div className={`w-28 h-28 rounded-full flex items-center justify-center text-5xl mb-6 ${
//                         callStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-gradient-to-r from-yellow-500 to-yellow-600 animate-pulse'
//                     }`}>
//                         {callStatus === 'connected' ? '🎤' : '📞'}
//                     </div>
                    
//                     <div className="text-white text-center text-sm mb-6">
//                         {callStatus === 'connected' && '✅ Connected - You can talk now'}
//                         {callStatus === 'calling' && 'Calling...'}
//                         {callStatus === 'ringing' && 'Ringing...'}
//                         {callStatus === 'connecting' && 'Connecting...'}
//                     </div>
                    
//                     <div className="flex gap-6">
//                         {callStatus === 'connected' && (
//                             <button onClick={toggleMute} className="w-14 h-14 bg-gray-700 rounded-full text-white text-2xl">
//                                 {isMuted ? '🔇' : '🎤'}
//                             </button>
//                         )}
//                         <button onClick={endCall} className="w-14 h-14 bg-red-600 rounded-full text-white text-2xl">
//                             📞
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default VideoCallChat;


import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { FaPhone, FaPhoneSlash, FaMicrophone, FaMicrophoneSlash, FaSpinner, FaUserCircle } from 'react-icons/fa';
import { MdCallEnd, MdCall } from 'react-icons/md';
import { RiVideoCallFill } from 'react-icons/ri';

const VideoCallChat = ({ currentUserId, targetUserId, targetName, onClose, isInitiator = false, incomingOffer = null }) => {
    const [callStatus, setCallStatus] = useState('idle');
    const [localStream, setLocalStream] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [error, setError] = useState(null);
    const [callDuration, setCallDuration] = useState(0);
    
    const peerConnection = useRef(null);
    const remoteAudioRef = useRef();
    const localAudioRef = useRef();
    const durationIntervalRef = useRef(null);

    const configuration = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' }
        ]
    };

    // Format call duration
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Get microphone
    const getMicrophone = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setLocalStream(stream);
            if (localAudioRef.current) {
                localAudioRef.current.srcObject = stream;
            }
            return stream;
        } catch (err) {
            console.error('Microphone error:', err);
            setError('Microphone access denied. Please allow microphone permissions.');
            return null;
        }
    };

    // Send ICE candidate to database
    const sendIceCandidate = async (candidate) => {
        try {
            await supabase.from('unified_interactions').insert({
                sender_id: currentUserId,
                receiver_id: targetUserId,
                action_type: 'ice_candidate',
                payload: { candidate: candidate }
            });
        } catch (err) {
            console.error('Send ICE error:', err);
        }
    };

    // Send answer to database
    const sendAnswer = async (answer) => {
        try {
            await supabase.from('unified_interactions').insert({
                sender_id: currentUserId,
                receiver_id: targetUserId,
                action_type: 'call_answer',
                payload: { answer: answer }
            });
        } catch (err) {
            console.error('Send answer error:', err);
        }
    };

    // Send offer to database
    const sendOffer = async (offer) => {
        try {
            await supabase.from('unified_interactions').insert({
                sender_id: currentUserId,
                receiver_id: targetUserId,
                action_type: 'call_offer',
                payload: { offer: offer }
            });
        } catch (err) {
            console.error('Send offer error:', err);
        }
    };

    // Initialize peer connection
    const initPeerConnection = (stream) => {
        if (peerConnection.current) {
            peerConnection.current.close();
        }
        
        const pc = new RTCPeerConnection(configuration);
        peerConnection.current = pc;
        
        // Add local tracks
        stream.getTracks().forEach(track => {
            pc.addTrack(track, stream);
        });
        
        // Handle remote stream
        pc.ontrack = (event) => {
            console.log('📞 Received remote audio');
            if (remoteAudioRef.current) {
                remoteAudioRef.current.srcObject = event.streams[0];
                remoteAudioRef.current.play().catch(e => console.log(e));
            }
        };
        
        // Handle ICE candidates
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                console.log('📡 Sending ICE candidate');
                sendIceCandidate(event.candidate);
            }
        };
        
        // Handle connection state
        pc.onconnectionstatechange = () => {
            console.log('🔌 Connection state:', pc.connectionState);
            if (pc.connectionState === 'connected') {
                console.log('✅ Call connected!');
                setCallStatus('connected');
                // Start call duration timer
                durationIntervalRef.current = setInterval(() => {
                    setCallDuration(prev => prev + 1);
                }, 1000);
            } else if (pc.connectionState === 'failed') {
                setError('Connection failed');
                endCall();
            } else if (pc.connectionState === 'disconnected') {
                console.log('Call disconnected');
            }
        };
        
        return pc;
    };

    // Start call as initiator
    const startCall = async () => {
        console.log('📞 Starting call...');
        setCallStatus('calling');
        
        const stream = await getMicrophone();
        if (!stream) {
            setCallStatus('idle');
            return;
        }
        
        const pc = initPeerConnection(stream);
        
        try {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            console.log('📤 Sending offer');
            await sendOffer(offer);
            setCallStatus('ringing');
        } catch (err) {
            console.error('Offer error:', err);
            setError('Failed to start call');
            endCall();
        }
    };
    
    // Accept call with incoming offer
    const acceptCall = async (offer) => {
        console.log('📞 Accepting call...');
        setCallStatus('connecting');
        
        const stream = await getMicrophone();
        if (!stream) {
            setCallStatus('idle');
            return;
        }
        
        const pc = initPeerConnection(stream);
        
        try {
            await pc.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            console.log('📤 Sending answer');
            await sendAnswer(answer);
        } catch (err) {
            console.error('Answer error:', err);
            setError('Failed to accept call');
            endCall();
        }
    };
    
    // End call
    const endCall = () => {
        console.log('📞 Ending call');
        if (durationIntervalRef.current) {
            clearInterval(durationIntervalRef.current);
            durationIntervalRef.current = null;
        }
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            setLocalStream(null);
        }
        setCallStatus('idle');
        setCallDuration(0);
        onClose();
    };
    
    // Toggle mute
    const toggleMute = () => {
        if (localStream) {
            const track = localStream.getAudioTracks()[0];
            track.enabled = !track.enabled;
            setIsMuted(!track.enabled);
        }
    };
    
    // Listen for incoming signals
    useEffect(() => {
        // If we have an incoming offer from props, accept it
        if (incomingOffer && !isInitiator && callStatus === 'idle') {
            acceptCall(incomingOffer);
        }
        
        // Subscribe to database signals
        const subscription = supabase
            .channel('call_signals')
            .on('postgres_changes', 
                { event: 'INSERT', schema: 'public', table: 'unified_interactions', filter: `receiver_id=eq.${currentUserId}` },
                async (payload) => {
                    const data = payload.new;
                    console.log('📨 Signal:', data.action_type);
                    
                    if (data.action_type === 'call_offer' && !isInitiator && callStatus === 'idle' && !incomingOffer) {
                        acceptCall(data.payload.offer);
                    }
                    
                    if (data.action_type === 'call_answer' && peerConnection.current && !peerConnection.current.currentRemoteDescription) {
                        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.payload.answer));
                        console.log('✅ Answer set');
                    }
                    
                    if (data.action_type === 'ice_candidate' && data.payload?.candidate && peerConnection.current) {
                        try {
                            await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.payload.candidate));
                            console.log('✅ ICE candidate added');
                        } catch (err) {
                            console.error('ICE error:', err);
                        }
                    }
                }
            )
            .subscribe();
        
        if (isInitiator && callStatus === 'idle') {
            setTimeout(startCall, 500);
        }
        
        return () => {
            subscription.unsubscribe();
            if (durationIntervalRef.current) {
                clearInterval(durationIntervalRef.current);
            }
        };
    }, []);
    
    return (
        <div className="fixed inset-0 bg-black/95 z-[1000] flex items-center justify-center animate-fadeIn">
            <div className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-yellow-500/30">
                {/* Header */}
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-5 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <FaUserCircle className="text-white text-3xl" />
                        <div className="text-white font-bold text-xl">{targetName}</div>
                    </div>
                    <div className="text-sm text-white/90 flex items-center justify-center gap-2">
                        {callStatus === 'connected' && (
                            <>
                                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                                <span>In Call • {formatDuration(callDuration)}</span>
                            </>
                        )}
                        {callStatus === 'calling' && '📞 Calling...'}
                        {callStatus === 'ringing' && '📱 Ringing...'}
                        {callStatus === 'connecting' && '🔗 Connecting...'}
                        {callStatus === 'idle' && 'Call ended'}
                    </div>
                    {error && <div className="text-red-200 text-xs mt-2">{error}</div>}
                </div>
                
                {/* Audio Elements */}
                <audio ref={localAudioRef} muted autoPlay />
                <audio ref={remoteAudioRef} autoPlay playsInline />
                
                {/* Call UI */}
                <div className="p-8 flex flex-col items-center">
                    {/* Avatar Animation */}
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center text-6xl mb-6 transition-all duration-300 ${
                        callStatus === 'connected' 
                            ? 'bg-gradient-to-r from-green-500 to-green-600 animate-pulse shadow-lg shadow-green-500/50' 
                            : callStatus === 'calling' || callStatus === 'ringing'
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 animate-bounce shadow-lg shadow-yellow-500/50'
                            : 'bg-gradient-to-r from-gray-700 to-gray-600'
                    }`}>
                        {callStatus === 'connected' ? (
                            <FaMicrophone className="text-white text-4xl" />
                        ) : callStatus === 'calling' || callStatus === 'ringing' ? (
                            <FaPhone className="text-white text-4xl animate-pulse" />
                        ) : (
                            <FaPhoneSlash className="text-white text-4xl" />
                        )}
                    </div>
                    
                    {/* Status Text */}
                    <div className="text-white text-center text-sm mb-6">
                        {callStatus === 'connected' && (
                            <div className="space-y-1">
                                <p className="text-green-400 font-semibold">✅ Connected</p>
                                <p className="text-gray-400 text-xs">You can talk now</p>
                            </div>
                        )}
                        {callStatus === 'calling' && <p className="text-yellow-400">Calling {targetName}...</p>}
                        {callStatus === 'ringing' && <p className="text-yellow-400">{targetName} is ringing...</p>}
                        {callStatus === 'connecting' && <p className="text-blue-400">Establishing connection...</p>}
                    </div>
                    
                    {/* Control Buttons */}
                    <div className="flex gap-6">
                        {callStatus === 'connected' && (
                            <button 
                                onClick={toggleMute} 
                                className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-200 ${
                                    isMuted 
                                        ? 'bg-red-600 hover:bg-red-700' 
                                        : 'bg-gray-700 hover:bg-gray-600'
                                } text-white shadow-lg hover:shadow-xl`}
                            >
                                {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                            </button>
                        )}
                        <button 
                            onClick={endCall} 
                            className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white text-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl animate-pulse"
                        >
                            <MdCallEnd />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCallChat;