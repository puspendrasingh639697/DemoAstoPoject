import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { 
  MdCall, 
  MdCallEnd, 
  MdMic, 
  MdMicOff, 
  MdVideocam, 
  MdVideocamOff,
  MdPhoneInTalk,
  MdPhoneMissed,
  MdPhoneAnswered
} from 'react-icons/md';
import { FaPhoneAlt, FaVideo, FaTimes } from 'react-icons/fa';

const VideoCall = ({ currentUserId, targetUserId, targetName, onClose }) => {
    const [socket, setSocket] = useState(null);
    const [callStatus, setCallStatus] = useState('ready');
    const [caller, setCaller] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [ringingTimeout, setRingingTimeout] = useState(null);
    
    const localVideo = useRef();
    const remoteVideo = useRef();
    const peerConnection = useRef(null);
    const localStream = useRef(null);

    const configuration = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' }
        ]
    };

    useEffect(() => {
        const newSocket = io('https://astrologer-backendcoll-chaat.onrender.com');
        setSocket(newSocket);
        newSocket.emit('user-join', String(currentUserId));

        // Get camera & microphone
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localStream.current = stream;
                if (localVideo.current) {
                    localVideo.current.srcObject = stream;
                }
            })
            .catch(err => {
                console.error('Camera error:', err);
                alert('Please allow camera and microphone access');
            });

        // Listen for incoming call
        newSocket.on('incoming-call', async ({ from, signal }) => {
            console.log('📞 Incoming call from:', from);
            setCaller(from);
            setCallStatus('ringing');
            
            // Show browser notification
            if (Notification.permission === 'granted') {
                new Notification('📞 Incoming Video Call!', {
                    body: `${targetName || 'Someone'} is calling you...`,
                    icon: '/favicon.ico'
                });
            }
            
            await handleIncomingCall(from, signal);
        });
        
        // Listen for call answered
        newSocket.on('call-answered', async ({ signal }) => {
            if (peerConnection.current) {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
                setCallStatus('connected');
                if (ringingTimeout) clearTimeout(ringingTimeout);
            }
        });
        
        // Listen for call ended
        newSocket.on('call-ended', () => {
            endCall();
        });

        // Listen for call notification
        newSocket.on('call-notification', ({ from }) => {
            console.log('🔔 Call notification from:', from);
            if (Notification.permission === 'granted') {
                new Notification('📞 Incoming Call!', {
                    body: 'Someone is calling you...',
                    icon: '/favicon.ico'
                });
            }
        });

        // Request notification permission
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }

        return () => {
            if (localStream.current) {
                localStream.current.getTracks().forEach(track => track.stop());
            }
            if (peerConnection.current) {
                peerConnection.current.close();
            }
            if (ringingTimeout) clearTimeout(ringingTimeout);
            newSocket.close();
        };
    }, [currentUserId]);

    const handleIncomingCall = async (from, signal) => {
        peerConnection.current = new RTCPeerConnection(configuration);
        
        if (localStream.current) {
            localStream.current.getTracks().forEach(track => {
                peerConnection.current.addTrack(track, localStream.current);
            });
        }
        
        peerConnection.current.ontrack = (event) => {
            if (remoteVideo.current) {
                remoteVideo.current.srcObject = event.streams[0];
            }
        };
        
        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate && socket) {
                socket.emit('ice-candidate', {
                    to: from,
                    candidate: event.candidate
                });
            }
        };
        
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        
        socket.emit('answer-call', { to: from, signal: answer });
        setCallStatus('connected');
    };

    const startCall = async () => {
        setCallStatus('calling');
        
        // Send call notification to target
        socket.emit('call-notification', {
            to: targetUserId,
            from: currentUserId,
            type: 'incoming_call'
        });
        
        peerConnection.current = new RTCPeerConnection(configuration);
        
        if (localStream.current) {
            localStream.current.getTracks().forEach(track => {
                peerConnection.current.addTrack(track, localStream.current);
            });
        }
        
        peerConnection.current.ontrack = (event) => {
            if (remoteVideo.current) {
                remoteVideo.current.srcObject = event.streams[0];
            }
        };
        
        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate && socket) {
                socket.emit('ice-candidate', {
                    to: targetUserId,
                    candidate: event.candidate
                });
            }
        };
        
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        
        socket.emit('call-user', {
            to: targetUserId,
            from: currentUserId,
            signal: offer
        });
        
        setCallStatus('ringing');
        
        // Timeout after 30 seconds
        const timeout = setTimeout(() => {
            if (callStatus === 'ringing') {
                setCallStatus('ready');
                alert('No answer from ' + targetName);
                endCall();
            }
        }, 30000);
        setRingingTimeout(timeout);
    };

    const acceptCall = () => {
        if (caller) {
            setCallStatus('connected');
            setCaller(null);
        }
    };

    const endCall = () => {
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        if (socket) {
            socket.emit('end-call', { to: targetUserId || caller });
        }
        if (ringingTimeout) clearTimeout(ringingTimeout);
        setCallStatus('ready');
        onClose();
    };

    const toggleMute = () => {
        if (localStream.current) {
            const audioTrack = localStream.current.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMuted(!audioTrack.enabled);
            }
        }
    };

    const toggleVideo = () => {
        if (localStream.current) {
            const videoTrack = localStream.current.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoOff(!videoTrack.enabled);
            }
        }
    };

    const getStatusText = () => {
        switch(callStatus) {
            case 'calling': return 'Calling...';
            case 'ringing': return 'Ringing...';
            case 'connected': return 'Connected';
            case 'ready': return 'Ready';
            default: return 'Ready';
        }
    };

    const getStatusIcon = () => {
        switch(callStatus) {
            case 'calling': return <MdPhoneInTalk className="animate-pulse text-yellow-400" size={24} />;
            case 'ringing': return <MdPhoneInTalk className="animate-bounce text-yellow-400" size={24} />;
            case 'connected': return <MdPhoneAnswered className="text-green-400" size={24} />;
            default: return <MdCall className="text-gray-400" size={24} />;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl w-full max-w-5xl overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800">
                    <div className="flex items-center gap-3">
                        {getStatusIcon()}
                        <div>
                            <h2 className="text-white text-xl font-bold">
                                {callStatus === 'connected' 
                                    ? `Call with ${targetName || targetUserId || caller}` 
                                    : getStatusText()
                                }
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {targetName || targetUserId || caller}
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={endCall}
                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>
                
                {/* Videos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                    {/* Remote Video */}
                    <div className="bg-gray-800 rounded-lg overflow-hidden aspect-video relative">
                        <video 
                            ref={remoteVideo} 
                            autoPlay 
                            playsInline
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
                            <span className="text-white text-sm">{targetName || targetUserId || caller}</span>
                        </div>
                        {callStatus !== 'connected' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                                <div className="text-white text-center">
                                    <FaVideo size={48} className="mx-auto mb-3 opacity-50" />
                                    <p>Waiting for connection...</p>
                                    {callStatus === 'ringing' && (
                                        <p className="text-sm text-yellow-400 mt-2 animate-pulse">Ringing...</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Local Video */}
                    <div className="bg-gray-800 rounded-lg overflow-hidden aspect-video relative">
                        <video 
                            ref={localVideo} 
                            autoPlay 
                            muted 
                            playsInline
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
                            <span className="text-white text-sm">You</span>
                        </div>
                        {isVideoOff && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                <FaVideo size={48} className="text-gray-600" />
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Controls */}
                <div className="p-4 border-t border-gray-700 flex justify-center gap-4 bg-gray-800">
                    {callStatus === 'ready' && targetUserId && (
                        <button 
                            onClick={startCall}
                            className="bg-green-600 text-white p-4 rounded-full hover:bg-green-700 transition transform hover:scale-105"
                        >
                            <FaPhoneAlt size={24} />
                        </button>
                    )}
                    
                    {caller && callStatus === 'ringing' && (
                        <button 
                            onClick={acceptCall}
                            className="bg-green-600 text-white p-4 rounded-full hover:bg-green-700 transition transform hover:scale-105 animate-pulse"
                        >
                            <MdPhoneAnswered size={24} />
                        </button>
                    )}
                    
                    {callStatus === 'connected' && (
                        <>
                            <button 
                                onClick={toggleMute}
                                className={`p-4 rounded-full transition transform hover:scale-105 ${
                                    isMuted ? 'bg-red-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                                }`}
                            >
                                {isMuted ? <MdMicOff size={24} /> : <MdMic size={24} />}
                            </button>
                            
                            <button 
                                onClick={toggleVideo}
                                className={`p-4 rounded-full transition transform hover:scale-105 ${
                                    isVideoOff ? 'bg-red-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                                }`}
                            >
                                {isVideoOff ? <MdVideocamOff size={24} /> : <MdVideocam size={24} />}
                            </button>
                        </>
                    )}
                    
                    {(callStatus === 'calling' || callStatus === 'ringing') && (
                        <button 
                            onClick={endCall}
                            className="bg-red-600 text-white p-4 rounded-full hover:bg-red-700 transition transform hover:scale-105"
                        >
                            <MdCallEnd size={24} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoCall;