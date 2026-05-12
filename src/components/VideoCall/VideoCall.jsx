import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const VideoCall = ({ currentUserId, targetUserId, targetName, onClose }) => {
    const [socket, setSocket] = useState(null);
    const [inCall, setInCall] = useState(false);
    const [caller, setCaller] = useState(null);
    const [callStatus, setCallStatus] = useState('ready'); // ready, calling, ringing, connected
    
    const localVideo = useRef();
    const remoteVideo = useRef();
    const peerConnection = useRef(null);
    const localStream = useRef(null);

    const configuration = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' }
        ]
    };

    useEffect(() => {
        const newSocket = io('https://astrologer-backendcoll-chaat.onrender.com');
        setSocket(newSocket);
        newSocket.emit('user-join', currentUserId);

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
            setCaller(from);
            setCallStatus('ringing');
            await handleIncomingCall(from, signal);
        });
        
        // Listen for call answered
        newSocket.on('call-answered', async ({ signal }) => {
            if (peerConnection.current) {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
                setCallStatus('connected');
            }
        });
        
        // Listen for call ended
        newSocket.on('call-ended', () => {
            endCall();
        });

        return () => {
            if (localStream.current) {
                localStream.current.getTracks().forEach(track => track.stop());
            }
            if (peerConnection.current) {
                peerConnection.current.close();
            }
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
        
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        
        socket.emit('answer-call', { to: from, signal: answer });
        setCallStatus('connected');
    };

    const startCall = async () => {
        setCallStatus('calling');
        
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
        
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        
        socket.emit('call-user', {
            to: targetUserId,
            from: currentUserId,
            signal: offer
        });
        
        setCallStatus('ringing');
        
        // Timeout after 30 seconds
        setTimeout(() => {
            if (callStatus === 'ringing') {
                setCallStatus('ready');
                alert('No answer from ' + targetName);
                endCall();
            }
        }, 30000);
    };

    const acceptCall = () => {
        if (caller) {
            setInCall(true);
            setCallStatus('connected');
            setCaller(null);
        }
    };

    const endCall = () => {
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        socket?.emit('end-call', { to: targetUserId || caller });
        setCallStatus('ready');
        setInCall(false);
        onClose();
    };

    const getStatusText = () => {
        switch(callStatus) {
            case 'calling': return 'Calling... 📞';
            case 'ringing': return 'Ringing... 🔔';
            case 'connected': return 'Connected ✅';
            case 'ready': return 'Ready to call';
            default: return 'Ready';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl w-full max-w-5xl">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <div>
                        <h2 className="text-white text-xl font-bold">
                            {callStatus === 'connected' ? `Calling ${targetName || targetUserId || caller}` : getStatusText()}
                        </h2>
                        <p className="text-gray-400 text-sm">{getStatusText()}</p>
                    </div>
                    <button 
                        onClick={endCall}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        End Call
                    </button>
                </div>
                
                {/* Videos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                    <div className="bg-gray-800 rounded-lg overflow-hidden aspect-video relative">
                        <video ref={remoteVideo} autoPlay className="w-full h-full object-cover" />
                        <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
                            <span className="text-white text-sm">{targetName || targetUserId || caller}</span>
                        </div>
                        {callStatus !== 'connected' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="text-white text-center">
                                    <div className="animate-pulse">📹 Waiting for connection...</div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="bg-gray-800 rounded-lg overflow-hidden aspect-video relative">
                        <video ref={localVideo} autoPlay muted className="w-full h-full object-cover" />
                        <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
                            <span className="text-white text-sm">You</span>
                        </div>
                    </div>
                </div>
                
                {/* Controls */}
                <div className="p-4 border-t border-gray-700 flex justify-center gap-4">
                    {callStatus === 'ready' && targetUserId && (
                        <button 
                            onClick={startCall}
                            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition flex items-center gap-2 text-lg"
                        >
                            <span>📹</span> Start Call
                        </button>
                    )}
                    
                    {caller && callStatus === 'ringing' && (
                        <button 
                            onClick={acceptCall}
                            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition flex items-center gap-2 text-lg animate-pulse"
                        >
                            <span>📞</span> Accept Call
                        </button>
                    )}
                    
                    {(callStatus === 'calling' || callStatus === 'ringing') && (
                        <button 
                            onClick={endCall}
                            className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition flex items-center gap-2 text-lg"
                        >
                            <span>❌</span> Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoCall;