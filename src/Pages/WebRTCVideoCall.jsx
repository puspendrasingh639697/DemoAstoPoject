import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const WebRTCVideoCall = ({ currentUserId, targetUserId, targetName, onClose }) => {
    const [socket, setSocket] = useState(null);
    const [inCall, setInCall] = useState(false);
    const [caller, setCaller] = useState(null);
    const [connectionState, setConnectionState] = useState('connecting');
    
    const localVideo = useRef();
    const remoteVideo = useRef();
    const peerConnection = useRef(null);
    const localStreamRef = useRef(null);

    const configuration = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' }
        ]
    };

    useEffect(() => {
        // Connect to socket
        const newSocket = io('https://astrologer-backendcoll-chaat.onrender.com');
        setSocket(newSocket);
        newSocket.emit('user-join', currentUserId);

        // Get user media
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localStreamRef.current = stream;
                if (localVideo.current) {
                    localVideo.current.srcObject = stream;
                }
            })
            .catch(err => {
                console.error('Media error:', err);
                setConnectionState('error');
            });

        // Socket event listeners
        newSocket.on('incoming-call', async ({ from, signal }) => {
            setCaller(from);
            setInCall(true);
            setConnectionState('connecting');
            
            await handleIncomingCall(from, signal);
        });
        
        newSocket.on('call-answered', async ({ signal }) => {
            if (peerConnection.current) {
                try {
                    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
                    setConnectionState('connected');
                } catch (err) {
                    console.error('Answer error:', err);
                }
            }
        });
        
        newSocket.on('call-ended', () => {
            endCall();
        });

        return () => {
            newSocket.close();
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => track.stop());
            }
            if (peerConnection.current) {
                peerConnection.current.close();
            }
        };
    }, [currentUserId]);

    const handleIncomingCall = async (from, signal) => {
        try {
            peerConnection.current = new RTCPeerConnection(configuration);
            
            // Add local stream
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => {
                    peerConnection.current.addTrack(track, localStreamRef.current);
                });
            }
            
            // Handle remote stream
            peerConnection.current.ontrack = (event) => {
                if (remoteVideo.current) {
                    remoteVideo.current.srcObject = event.streams[0];
                }
            };
            
            // Handle ICE candidates
            peerConnection.current.onicecandidate = (event) => {
                if (event.candidate && socket) {
                    socket.emit('ice-candidate', {
                        to: from,
                        candidate: event.candidate
                    });
                }
            };
            
            // Set remote description
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
            
            // Create answer
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);
            
            // Send answer
            socket.emit('answer-call', { to: from, signal: answer });
            
        } catch (err) {
            console.error('Incoming call error:', err);
            setConnectionState('error');
        }
    };

    const startCall = async () => {
        try {
            setInCall(true);
            setConnectionState('connecting');
            
            peerConnection.current = new RTCPeerConnection(configuration);
            
            // Add local stream
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => {
                    peerConnection.current.addTrack(track, localStreamRef.current);
                });
            }
            
            // Handle remote stream
            peerConnection.current.ontrack = (event) => {
                if (remoteVideo.current) {
                    remoteVideo.current.srcObject = event.streams[0];
                }
            };
            
            // Handle ICE candidates
            peerConnection.current.onicecandidate = (event) => {
                if (event.candidate && socket) {
                    socket.emit('ice-candidate', {
                        to: targetUserId,
                        candidate: event.candidate
                    });
                }
            };
            
            // Handle connection state
            peerConnection.current.onconnectionstatechange = () => {
                if (peerConnection.current.connectionState === 'connected') {
                    setConnectionState('connected');
                } else if (peerConnection.current.connectionState === 'failed') {
                    setConnectionState('failed');
                }
            };
            
            // Create offer
            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);
            
            // Send offer
            socket.emit('call-user', {
                to: targetUserId,
                from: currentUserId,
                signal: offer
            });
            
        } catch (err) {
            console.error('Start call error:', err);
            setConnectionState('error');
        }
    };

    const acceptCall = () => {
        if (caller) {
            setInCall(true);
            setCaller(null);
        }
    };

    const endCall = () => {
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
        }
        if (socket) {
            socket.emit('end-call', { to: targetUserId || caller });
        }
        setInCall(false);
        onClose();
    };

    const getStatusMessage = () => {
        switch(connectionState) {
            case 'connecting': return 'Connecting... 📞';
            case 'connected': return 'Connected ✅';
            case 'failed': return 'Connection failed ❌';
            case 'error': return 'Error occurred ⚠️';
            default: return 'Ready';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl w-full max-w-6xl">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <div>
                        <h2 className="text-white text-xl font-bold">Call with {targetName || targetUserId}</h2>
                        <p className="text-gray-400 text-sm">{getStatusMessage()}</p>
                    </div>
                    <button 
                        onClick={endCall} 
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        End Call
                    </button>
                </div>
                
                {/* Videos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                    {/* Remote Video */}
                    <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video">
                        <video 
                            ref={remoteVideo} 
                            autoPlay 
                            playsInline
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
                            <span className="text-white text-sm">{targetName || targetUserId}</span>
                        </div>
                        {connectionState === 'connecting' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="text-white text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                                    <p>Connecting...</p>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Local Video */}
                    <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video">
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
                    </div>
                </div>
                
                {/* Controls */}
                <div className="p-4 border-t border-gray-700 flex justify-center gap-4">
                    {!inCall && targetUserId && (
                        <button 
                            onClick={startCall}
                            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 flex items-center gap-2"
                        >
                            <span>📹</span> Start Call
                        </button>
                    )}
                    
                    {caller && !inCall && (
                        <button 
                            onClick={acceptCall}
                            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 flex items-center gap-2"
                        >
                            <span>📞</span> Accept Call
                        </button>
                    )}
                    
                    {inCall && (
                        <button 
                            onClick={endCall}
                            className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 flex items-center gap-2"
                        >
                            <span>🔴</span> End Call
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebRTCVideoCall;