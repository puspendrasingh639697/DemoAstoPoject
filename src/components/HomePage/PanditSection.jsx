// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { useAuth } from '../../context/AuthContext';
// // // // // // import ChatBox from '../Chat/ChatBox';
// // // // // // import PanditInbox from '../PanditInbox';
// // // // // // // import PanditInbox from '../Pandit/PanditInbox';

// // // // // // const PanditSection = () => {
// // // // // //     const [pandits, setPandits] = useState([]);
// // // // // //     const [loading, setLoading] = useState(true);
// // // // // //     const [selectedPandit, setSelectedPandit] = useState(null);
// // // // // //     const [showChat, setShowChat] = useState(false);
// // // // // //     const [showPanditInbox, setShowPanditInbox] = useState(false);
// // // // // //     const { user } = useAuth();

// // // // // //     const isPandit = user?.phone === '8888888888' || user?.mobile === '8888888888';

// // // // // //     useEffect(() => {
// // // // // //         const demoPandits = [
// // // // // //             { _id: '8888888888', firstName: 'Acharya Sheetal', experience: 17, languages: 'Hindi, English', skills: 'Vedic Astrology', rating: 5 },
// // // // // //             { _id: '7777777777', firstName: 'Pandit Suresh Mishra', experience: 10, languages: 'Hindi', skills: 'Vedic Astrology', rating: 5 },
// // // // // //             { _id: '6666666666', firstName: 'Acharya Shardha', experience: 15, languages: 'English', skills: 'Tarot, Vedic', rating: 5 },
// // // // // //             { _id: '5555555555', firstName: 'Pandit Anil Tripathi', experience: 22, languages: 'Hindi, Sanskrit', skills: 'Vedic Pujan', rating: 5 },
// // // // // //         ];
// // // // // //         setPandits(demoPandits);
// // // // // //         setLoading(false);
// // // // // //     }, []);

// // // // // //     if (loading) {
// // // // // //         return <div className="flex justify-center items-center h-64">Loading Pandits...</div>;
// // // // // //     }

// // // // // //     return (
// // // // // //         <div className="container mx-auto px-4 py-8 mt-16">
// // // // // //             <div className="bg-yellow-50 p-4 rounded-lg mb-8 text-center">
// // // // // //                 <h2 className="text-3xl font-bold text-gray-800">Our Expert Pandits</h2>
// // // // // //                 <p className="text-gray-600 mt-2">Welcome {user?.name || user?.phone || 'User'}!</p>
// // // // // //             </div>
            
// // // // // //             {isPandit && (
// // // // // //                 <div className="flex justify-end mb-4">
// // // // // //                     <button 
// // // // // //                         onClick={() => {
// // // // // //                             console.log('🔔 Opening Pandit Inbox for:', user?.phone);
// // // // // //                             setShowPanditInbox(true);
// // // // // //                         }}
// // // // // //                         className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center gap-2"
// // // // // //                     >
// // // // // //                         💬 Messages Inbox
// // // // // //                     </button>
// // // // // //                 </div>
// // // // // //             )}
            
// // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // //                 {pandits.map((pandit) => (
// // // // // //                     <div key={pandit._id} className="bg-white rounded-xl shadow-lg overflow-hidden border">
// // // // // //                         <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-5 text-center">
// // // // // //                             <h3 className="text-white font-bold text-lg">{pandit.firstName}</h3>
// // // // // //                         </div>
// // // // // //                         <div className="p-4">
// // // // // //                             <p className="text-gray-700">📅 {pandit.experience} years</p>
// // // // // //                             <p className="text-gray-700">🗣️ {pandit.languages}</p>
// // // // // //                             <p className="text-gray-700">🔮 {pandit.skills}</p>
                            
// // // // // //                             {!isPandit && (
// // // // // //                                 <button 
// // // // // //                                     onClick={() => {
// // // // // //                                         console.log('📱 Opening chat with:', pandit.firstName, 'ID:', pandit._id);
// // // // // //                                         setSelectedPandit(pandit);
// // // // // //                                         setShowChat(true);
// // // // // //                                     }}
// // // // // //                                     className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
// // // // // //                                 >
// // // // // //                                     💬 Chat Now
// // // // // //                                 </button>
// // // // // //                             )}
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 ))}
// // // // // //             </div>

// // // // // //             {showChat && selectedPandit && user && !isPandit && (
// // // // // //                 <ChatBox 
// // // // // //                     currentUserId={user.phone || user.id || user.mobile || '9999999999'}
// // // // // //                     panditId={selectedPandit._id}
// // // // // //                     panditName={selectedPandit.firstName}
// // // // // //                     onClose={() => {
// // // // // //                         setShowChat(false);
// // // // // //                         setSelectedPandit(null);
// // // // // //                     }}
// // // // // //                 />
// // // // // //             )}

// // // // // //             {showPanditInbox && isPandit && (
// // // // // //                 <PanditInbox 
// // // // // //                     panditId={user.phone || user.id || user.mobile || '8888888888'}
// // // // // //                     onClose={() => setShowPanditInbox(false)}
// // // // // //                 />
// // // // // //             )}
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default PanditSection;


// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useAuth } from '../../context/AuthContext';
// // // // // import ChatBox from '../Chat/ChatBox';
// // // // // import VideoCall from '../VideoCall/VideoCall';
// // // // // // import PanditInbox from '../Pandit/PanditInbox';
// // // // // import { FaVideo, FaComments } from 'react-icons/fa';
// // // // // import PanditInbox from '../PanditInbox';

// // // // // const PanditSection = () => {
// // // // //     const [pandits, setPandits] = useState([]);
// // // // //     const [loading, setLoading] = useState(true);
// // // // //     const [selectedPandit, setSelectedPandit] = useState(null);
// // // // //     const [showChat, setShowChat] = useState(false);
// // // // //     const [showVideo, setShowVideo] = useState(false);
// // // // //     const [showPanditInbox, setShowPanditInbox] = useState(false);
// // // // //     const { user } = useAuth();

// // // // //     const isPandit = user?.phone === '8888888888' || user?.mobile === '8888888888';

// // // // //     useEffect(() => {
// // // // //         const demoPandits = [
// // // // //             { _id: '8888888888', firstName: 'Acharya Sheetal', experience: 17, languages: 'Hindi, English', skills: 'Vedic Astrology', rating: 5 },
// // // // //             { _id: '7777777777', firstName: 'Pandit Suresh Mishra', experience: 10, languages: 'Hindi', skills: 'Vedic Astrology', rating: 5 },
// // // // //             { _id: '6666666666', firstName: 'Acharya Shardha', experience: 15, languages: 'English', skills: 'Tarot, Vedic', rating: 5 },
// // // // //             { _id: '5555555555', firstName: 'Pandit Anil Tripathi', experience: 22, languages: 'Hindi, Sanskrit', skills: 'Vedic Pujan', rating: 5 },
// // // // //         ];
// // // // //         setPandits(demoPandits);
// // // // //         setLoading(false);
// // // // //     }, []);

// // // // //     const handleChat = (pandit) => {
// // // // //         setSelectedPandit(pandit);
// // // // //         setShowChat(true);
// // // // //         setShowVideo(false);
// // // // //     };

// // // // //     const handleVideoCall = (pandit) => {
// // // // //         setSelectedPandit(pandit);
// // // // //         setShowVideo(true);
// // // // //         setShowChat(false);
// // // // //     };

// // // // //     if (loading) {
// // // // //         return <div className="flex justify-center items-center h-64">Loading Pandits...</div>;
// // // // //     }

// // // // //     return (
// // // // //         <div className="container mx-auto px-4 py-8 mt-16">
// // // // //             <div className="bg-yellow-50 p-4 rounded-lg mb-8 text-center">
// // // // //                 <h2 className="text-3xl font-bold text-gray-800">Our Expert Pandits</h2>
// // // // //                 <p className="text-gray-600 mt-2">Welcome {user?.name || user?.phone || 'User'}!</p>
// // // // //             </div>
            
// // // // //             {isPandit && (
// // // // //                 <div className="flex justify-end mb-4">
// // // // //                     <button 
// // // // //                         onClick={() => setShowPanditInbox(true)}
// // // // //                         className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center gap-2"
// // // // //                     >
// // // // //                         <FaComments /> Messages Inbox
// // // // //                     </button>
// // // // //                 </div>
// // // // //             )}
            
// // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // //                 {pandits.map((pandit) => (
// // // // //                     <div key={pandit._id} className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition">
// // // // //                         <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-5 text-center">
// // // // //                             <h3 className="text-white font-bold text-lg">{pandit.firstName}</h3>
// // // // //                             <div className="flex justify-center mt-1">
// // // // //                                 {[...Array(5)].map((_, i) => (
// // // // //                                     <span key={i} className="text-yellow-200 text-sm">★</span>
// // // // //                                 ))}
// // // // //                             </div>
// // // // //                         </div>
// // // // //                         <div className="p-4">
// // // // //                             <p className="text-gray-700">📅 {pandit.experience} years</p>
// // // // //                             <p className="text-gray-700">🗣️ {pandit.languages}</p>
// // // // //                             <p className="text-gray-700">🔮 {pandit.skills}</p>
                            
// // // // //                             {!isPandit && (
// // // // //                                 <div className="flex gap-2 mt-4">
// // // // //                                     <button 
// // // // //                                         onClick={() => handleChat(pandit)}
// // // // //                                         className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-1"
// // // // //                                     >
// // // // //                                         <FaComments size={14} /> Chat
// // // // //                                     </button>
// // // // //                                     <button 
// // // // //                                         onClick={() => handleVideoCall(pandit)}
// // // // //                                         className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-1"
// // // // //                                     >
// // // // //                                         <FaVideo size={14} /> Call
// // // // //                                     </button>
// // // // //                                 </div>
// // // // //                             )}
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 ))}
// // // // //             </div>

// // // // //             {showChat && selectedPandit && user && !isPandit && (
// // // // //                 <ChatBox 
// // // // //                     currentUserId={user.phone || user.id || user.mobile}
// // // // //                     panditId={selectedPandit._id}
// // // // //                     panditName={selectedPandit.firstName}
// // // // //                     onClose={() => {
// // // // //                         setShowChat(false);
// // // // //                         setSelectedPandit(null);
// // // // //                     }}
// // // // //                 />
// // // // //             )}

// // // // //             {showVideo && selectedPandit && user && !isPandit && (
// // // // //                 <VideoCall 
// // // // //                     currentUserId={user.phone || user.id || user.mobile}
// // // // //                     targetUserId={selectedPandit._id}
// // // // //                     targetName={selectedPandit.firstName}
// // // // //                     onClose={() => {
// // // // //                         setShowVideo(false);
// // // // //                         setSelectedPandit(null);
// // // // //                     }}
// // // // //                 />
// // // // //             )}

// // // // //             {showPanditInbox && isPandit && (
// // // // //                 <PanditInbox 
// // // // //                     panditId={user.phone || user.id || user.mobile}
// // // // //                     onClose={() => setShowPanditInbox(false)}
// // // // //                 />
// // // // //             )}
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default PanditSection;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { useAuth } from '../../context/AuthContext';
// // // // import ChatBox from '../Chat/ChatBox';
// // // // import VideoCallChat from '../VideoCallChat';
// // // // import { FaVideo, FaComments } from 'react-icons/fa';

// // // // const PanditSection = () => {
// // // //     const [pandits, setPandits] = useState([]);
// // // //     const [loading, setLoading] = useState(true);
// // // //     const [selectedPandit, setSelectedPandit] = useState(null);
// // // //     const [showChat, setShowChat] = useState(false);
// // // //     const [showCallChat, setShowCallChat] = useState(false);
// // // //     const [callChatUser, setCallChatUser] = useState(null);
// // // //     const { user } = useAuth();

// // // //     const isPandit = user?.phone === '8888888888' || user?.mobile === '8888888888';

// // // //     useEffect(() => {
// // // //         const demoPandits = [
// // // //             { _id: '8888888888', firstName: 'Acharya Sheetal', experience: 17, languages: 'Hindi, English', skills: 'Vedic Astrology', rating: 5 },
// // // //             { _id: '7777777777', firstName: 'Pandit Suresh Mishra', experience: 10, languages: 'Hindi', skills: 'Vedic Astrology', rating: 5 },
// // // //             { _id: '6666666666', firstName: 'Acharya Shardha', experience: 15, languages: 'English', skills: 'Tarot, Vedic', rating: 5 },
// // // //             { _id: '5555555555', firstName: 'Pandit Anil Tripathi', experience: 22, languages: 'Hindi, Sanskrit', skills: 'Vedic Pujan', rating: 5 },
// // // //         ];
// // // //         setPandits(demoPandits);
// // // //         setLoading(false);
// // // //     }, []);

// // // //     const handleChat = (pandit) => {
// // // //         setSelectedPandit(pandit);
// // // //         setShowChat(true);
// // // //         setShowCallChat(false);
// // // //     };

// // // //    const handleVideoCall = (pandit) => {
// // // //     console.log('📞 Calling Pandit:', pandit.firstName, 'ID:', pandit._id);
    
// // // //     // Direct socket emit
// // // //     const tempSocket = io('http://localhost:5000');
// // // //     tempSocket.on('connect', () => {
// // // //         tempSocket.emit('call-user', {
// // // //             to: String(pandit._id),
// // // //             from: String(user?.phone || '9999999999'),
// // // //             signal: 'call_request'
// // // //         });
// // // //         console.log('✅ Call emitted to:', pandit._id);
// // // //         setTimeout(() => tempSocket.close(), 1000);
// // // //     });
    
// // // //     setCallChatUser(pandit);
// // // //     setShowCallChat(true);
// // // // };
// // // //     if (loading) {
// // // //         return <div className="flex justify-center items-center h-64">Loading Pandits...</div>;
// // // //     }

// // // //     return (
// // // //         <div className="container mx-auto px-4 py-8 mt-16">
// // // //             <div className="bg-yellow-50 p-4 rounded-lg mb-8 text-center">
// // // //                 <h2 className="text-3xl font-bold text-gray-800">Our Expert Pandits</h2>
// // // //                 <p className="text-gray-600 mt-2">Welcome {user?.name || user?.phone || 'User'}!</p>
// // // //             </div>
            
// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //                 {pandits.map((pandit) => (
// // // //                     <div key={pandit._id} className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition">
// // // //                         <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-5 text-center">
// // // //                             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
// // // //                                 <span className="text-yellow-500 text-2xl">🔱</span>
// // // //                             </div>
// // // //                             <h3 className="text-white font-bold text-lg">{pandit.firstName}</h3>
// // // //                             <div className="flex justify-center mt-1">
// // // //                                 {[...Array(5)].map((_, i) => (
// // // //                                     <span key={i} className="text-yellow-200 text-sm">★</span>
// // // //                                 ))}
// // // //                             </div>
// // // //                         </div>
// // // //                         <div className="p-4">
// // // //                             <p className="text-gray-700 text-sm">📅 {pandit.experience} years</p>
// // // //                             <p className="text-gray-700 text-sm mt-1">🗣️ {pandit.languages}</p>
// // // //                             <p className="text-gray-700 text-sm mt-1">🔮 {pandit.skills}</p>
                            
// // // //                             {!isPandit && (
// // // //                                 <div className="flex gap-2 mt-4">
// // // //                                     <button 
// // // //                                         onClick={() => handleChat(pandit)}
// // // //                                         className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-1 text-sm"
// // // //                                     >
// // // //                                         <FaComments size={14} /> Chat
// // // //                                     </button>
// // // //                                     <button 
// // // //                                         onClick={() => handleVideoCall(pandit)}
// // // //                                         className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-1 text-sm"
// // // //                                     >
// // // //                                         <FaVideo size={14} /> Call
// // // //                                     </button>
// // // //                                 </div>
// // // //                             )}
// // // //                         </div>
// // // //                     </div>
// // // //                 ))}
// // // //             </div>

// // // //             {/* Chat Box - Only Chat */}
// // // //             {showChat && selectedPandit && user && !isPandit && (
// // // //                 <ChatBox 
// // // //                     currentUserId={user.phone || user.id || user.mobile || '9999999999'}
// // // //                     panditId={selectedPandit._id}
// // // //                     panditName={selectedPandit.firstName}
// // // //                     onClose={() => {
// // // //                         setShowChat(false);
// // // //                         setSelectedPandit(null);
// // // //                     }}
// // // //                 />
// // // //             )}

// // // //             {/* Video Call + Chat Together */}
// // // //             {showCallChat && callChatUser && user && !isPandit && (
// // // //                 <VideoCallChat
// // // //                     currentUserId={user.phone || user.id || user.mobile || '9999999999'}
// // // //                     targetUserId={callChatUser._id}
// // // //                     targetName={callChatUser.firstName}
// // // //                     isInitiator={true}
// // // //                     onClose={() => {
// // // //                         setShowCallChat(false);
// // // //                         setCallChatUser(null);
// // // //                     }}
// // // //                 />
// // // //             )}
// // // //         </div>
// // // //     );
// // // // };

// // // // export default PanditSection;

// // // import React, { useState, useEffect } from 'react';
// // // import io from 'socket.io-client';
// // // import { useAuth } from '../../context/AuthContext';
// // // import ChatBox from '../Chat/ChatBox';
// // // import VideoCallChat from '../VideoCallChat';
// // // import { FaVideo, FaComments } from 'react-icons/fa';

// // // const PanditSection = () => {
// // //     const [pandits, setPandits] = useState([]);
// // //     const [loading, setLoading] = useState(true);
// // //     const [selectedPandit, setSelectedPandit] = useState(null);
// // //     const [showChat, setShowChat] = useState(false);
// // //     const [showCallChat, setShowCallChat] = useState(false);
// // //     const [callChatUser, setCallChatUser] = useState(null);
// // //     const { user } = useAuth();

// // //     const isPandit = user?.phone === '8888888888' || user?.mobile === '8888888888';

// // //     useEffect(() => {
// // //         const demoPandits = [
// // //             { _id: '8888888888', firstName: 'Acharya Sheetal', experience: 17, languages: 'Hindi, English', skills: 'Vedic Astrology', rating: 5 },
// // //             { _id: '7777777777', firstName: 'Pandit Suresh Mishra', experience: 10, languages: 'Hindi', skills: 'Vedic Astrology', rating: 5 },
// // //             { _id: '6666666666', firstName: 'Acharya Shardha', experience: 15, languages: 'English', skills: 'Tarot, Vedic', rating: 5 },
// // //             { _id: '5555555555', firstName: 'Pandit Anil Tripathi', experience: 22, languages: 'Hindi, Sanskrit', skills: 'Vedic Pujan', rating: 5 },
// // //         ];
// // //         setPandits(demoPandits);
// // //         setLoading(false);
// // //     }, []);

// // //     const handleChat = (pandit) => {
// // //         setSelectedPandit(pandit);
// // //         setShowChat(true);
// // //         setShowCallChat(false);
// // //     };

 
// // // const handleVideoCall = (pandit) => {
// // //     console.log('📞 Calling Pandit:', pandit.firstName, 'ID:', pandit._id);
    
// // //     // Direct socket emit
// // //     const tempSocket = io('http://localhost:5000');
// // //     tempSocket.on('connect', () => {
// // //         tempSocket.emit('call-user', {
// // //             to: String(pandit._id),
// // //             from: String(user?.phone || '9999999999'),
// // //             signal: 'call_request'
// // //         });
// // //         console.log('✅ Call emitted to:', pandit._id);
// // //         setTimeout(() => tempSocket.close(), 1000);
// // //     });
    
// // //     alert(`Calling ${pandit.firstName}...`);
// // // };
// // //     if (loading) {
// // //         return <div className="flex justify-center items-center h-64">Loading Pandits...</div>;
// // //     }

// // //     return (
// // //         <div className="container mx-auto px-4 py-8 mt-16">
// // //             <div className="bg-yellow-50 p-4 rounded-lg mb-8 text-center">
// // //                 <h2 className="text-3xl font-bold text-gray-800">Our Expert Pandits</h2>
// // //                 <p className="text-gray-600 mt-2">Welcome {user?.name || user?.phone || 'User'}!</p>
// // //             </div>
            
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // //                 {pandits.map((pandit) => (
// // //                     <div key={pandit._id} className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition">
// // //                         <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-5 text-center">
// // //                             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
// // //                                 <span className="text-yellow-500 text-2xl">🔱</span>
// // //                             </div>
// // //                             <h3 className="text-white font-bold text-lg">{pandit.firstName}</h3>
// // //                             <div className="flex justify-center mt-1">
// // //                                 {[...Array(5)].map((_, i) => (
// // //                                     <span key={i} className="text-yellow-200 text-sm">★</span>
// // //                                 ))}
// // //                             </div>
// // //                         </div>
// // //                         <div className="p-4">
// // //                             <p className="text-gray-700 text-sm">📅 {pandit.experience} years</p>
// // //                             <p className="text-gray-700 text-sm mt-1">🗣️ {pandit.languages}</p>
// // //                             <p className="text-gray-700 text-sm mt-1">🔮 {pandit.skills}</p>
                            
// // //                             {!isPandit && (
// // //                                 <div className="flex gap-2 mt-4">
// // //                                     <button 
// // //                                         onClick={() => handleChat(pandit)}
// // //                                         className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-1 text-sm"
// // //                                     >
// // //                                         <FaComments size={14} /> Chat
// // //                                     </button>
// // //                                     <button 
// // //                                         onClick={() => handleVideoCall(pandit)}
// // //                                         className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-1 text-sm"
// // //                                     >
// // //                                         <FaVideo size={14} /> Call
// // //                                     </button>
// // //                                 </div>
// // //                             )}
// // //                         </div>
// // //                     </div>
// // //                 ))}
// // //             </div>

// // //             {/* Chat Box - Only Chat */}
// // //             {showChat && selectedPandit && user && !isPandit && (
// // //                 <ChatBox 
// // //                     currentUserId={user.phone || user.id || user.mobile || '9999999999'}
// // //                     panditId={selectedPandit._id}
// // //                     panditName={selectedPandit.firstName}
// // //                     onClose={() => {
// // //                         setShowChat(false);
// // //                         setSelectedPandit(null);
// // //                     }}
// // //                 />
// // //             )}

// // //             {/* Video Call + Chat Together */}
// // //             {showCallChat && callChatUser && user && !isPandit && (
// // //                 <VideoCallChat
// // //                     currentUserId={user.phone || user.id || user.mobile || '9999999999'}
// // //                     targetUserId={callChatUser._id}
// // //                     targetName={callChatUser.firstName}
// // //                     isInitiator={true}
// // //                     onClose={() => {
// // //                         setShowCallChat(false);
// // //                         setCallChatUser(null);
// // //                     }}
// // //                 />
// // //             )}
// // //         </div>
// // //     );
// // // };

// // // export default PanditSection;

// // import React, { useState, useEffect } from 'react';
// // import io from 'socket.io-client';
// // import { useAuth } from '../../context/AuthContext';
// // import ChatBox from '../Chat/ChatBox';
// // import VideoCallChat from '../VideoCallChat';
// // import { FaVideo, FaComments } from 'react-icons/fa';

// // const PanditSection = () => {
// //     const [pandits, setPandits] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [selectedPandit, setSelectedPandit] = useState(null);
// //     const [showChat, setShowChat] = useState(false);
// //     const [showCallChat, setShowCallChat] = useState(false);
// //     const [callChatUser, setCallChatUser] = useState(null);
// //     const { user } = useAuth();

// //     const isPandit = user?.phone === '8888888888' || user?.mobile === '8888888888';

// //     useEffect(() => {
// //         const demoPandits = [
// //             { _id: '8888888888', firstName: 'Acharya Sheetal', experience: 17, languages: 'Hindi, English', skills: 'Vedic Astrology', rating: 5 },
// //             { _id: '7777777777', firstName: 'Pandit Suresh Mishra', experience: 10, languages: 'Hindi', skills: 'Vedic Astrology', rating: 5 },
// //             { _id: '6666666666', firstName: 'Acharya Shardha', experience: 15, languages: 'English', skills: 'Tarot, Vedic', rating: 5 },
// //             { _id: '5555555555', firstName: 'Pandit Anil Tripathi', experience: 22, languages: 'Hindi, Sanskrit', skills: 'Vedic Pujan', rating: 5 },
// //         ];
// //         setPandits(demoPandits);
// //         setLoading(false);
// //     }, []);

// //     const handleChat = (pandit) => {
// //         setSelectedPandit(pandit);
// //         setShowChat(true);
// //         setShowCallChat(false);
// //     };

// //     // ✅ Call Handler - User Side
// //     const handleVideoCall = (pandit) => {
// //         console.log('📞 Opening Call UI for:', pandit.firstName);
// //         setCallChatUser(pandit);
// //         setShowCallChat(true);
// //         setShowChat(false);
// //     };

// //     if (loading) {
// //         return <div className="flex justify-center items-center h-64">Loading Pandits...</div>;
// //     }

// //     return (
// //         <div className="container mx-auto px-4 py-8 mt-16">
// //             <div className="bg-yellow-50 p-4 rounded-lg mb-8 text-center">
// //                 <h2 className="text-3xl font-bold text-gray-800">Our Expert Pandits</h2>
// //                 <p className="text-gray-600 mt-2">Welcome {user?.name || user?.phone || 'User'}!</p>
// //             </div>
            
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //                 {pandits.map((pandit) => (
// //                     <div key={pandit._id} className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition">
// //                         <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-5 text-center">
// //                             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
// //                                 <span className="text-yellow-500 text-2xl">🔱</span>
// //                             </div>
// //                             <h3 className="text-white font-bold text-lg">{pandit.firstName}</h3>
// //                             <div className="flex justify-center mt-1">
// //                                 {[...Array(5)].map((_, i) => (
// //                                     <span key={i} className="text-yellow-200 text-sm">★</span>
// //                                 ))}
// //                             </div>
// //                         </div>
// //                         <div className="p-4">
// //                             <p className="text-gray-700 text-sm">📅 {pandit.experience} years</p>
// //                             <p className="text-gray-700 text-sm mt-1">🗣️ {pandit.languages}</p>
// //                             <p className="text-gray-700 text-sm mt-1">🔮 {pandit.skills}</p>
                            
// //                             {!isPandit && (
// //                                 <div className="flex gap-2 mt-4">
// //                                     <button 
// //                                         onClick={() => handleChat(pandit)}
// //                                         className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-1 text-sm"
// //                                     >
// //                                         <FaComments size={14} /> Chat
// //                                     </button>
// //                                     <button 
// //                                         onClick={() => handleVideoCall(pandit)}
// //                                         className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-1 text-sm"
// //                                     >
// //                                         <FaVideo size={14} /> Call
// //                                     </button>
// //                                 </div>
// //                             )}
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>

// //             {/* Chat Box - Only Chat */}
// //             {showChat && selectedPandit && user && !isPandit && (
// //                 <ChatBox 
// //                     currentUserId={user.phone || user.id || user.mobile || '9999999999'}
// //                     panditId={selectedPandit._id}
// //                     panditName={selectedPandit.firstName}
// //                     onClose={() => {
// //                         setShowChat(false);
// //                         setSelectedPandit(null);
// //                     }}
// //                 />
// //             )}

// //             {/* ✅ Video Call + Chat Together - User Side */}
// //             {showCallChat && callChatUser && user && !isPandit && (
// //                 <VideoCallChat
// //                     currentUserId={user.phone || user.id || user.mobile || '9999999999'}
// //                     targetUserId={callChatUser._id}
// //                     targetName={callChatUser.firstName}
// //                     isInitiator={true}
// //                     onClose={() => {
// //                         setShowCallChat(false);
// //                         setCallChatUser(null);
// //                     }}
// //                 />
// //             )}
// //         </div>
// //     );
// // };

// // export default PanditSection;

// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import { useAuth } from '../../context/AuthContext';
// import ChatBox from '../Chat/ChatBox';
// import VideoCallChat from '../VideoCallChat';
// import { FaVideo, FaComments } from 'react-icons/fa';

// const PanditSection = () => {
//     const [pandits, setPandits] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedPandit, setSelectedPandit] = useState(null);
//     const [showChat, setShowChat] = useState(false);
//     const [showCallChat, setShowCallChat] = useState(false);
//     const [callChatUser, setCallChatUser] = useState(null);
//     const { user } = useAuth();

//     const isPandit = user?.phone === '8888888888' || user?.mobile === '8888888888';

//     useEffect(() => {
//         const demoPandits = [
//             { _id: '8888888888', firstName: 'Acharya Sheetal', experience: 17, languages: 'Hindi, English', skills: 'Vedic Astrology', rating: 5 },
//             { _id: '7777777777', firstName: 'Pandit Suresh Mishra', experience: 10, languages: 'Hindi', skills: 'Vedic Astrology', rating: 5 },
//             { _id: '6666666666', firstName: 'Acharya Shardha', experience: 15, languages: 'English', skills: 'Tarot, Vedic', rating: 5 },
//             { _id: '5555555555', firstName: 'Pandit Anil Tripathi', experience: 22, languages: 'Hindi, Sanskrit', skills: 'Vedic Pujan', rating: 5 },
//         ];
//         setPandits(demoPandits);
//         setLoading(false);
//     }, []);

//     const handleChat = (pandit) => {
//         setSelectedPandit(pandit);
//         setShowChat(true);
//         setShowCallChat(false);
//     };

//     // ✅ Call Handler - Send notification and open call UI
// const handleVideoCall = (pandit) => {
//     console.log('📞 Opening Call UI for:', pandit.firstName);
//     setCallChatUser(pandit);
//     setShowCallChat(true);
//     setShowChat(false);
// };
//     if (loading) {
//         return <div className="flex justify-center items-center h-64">Loading Pandits...</div>;
//     }

//     return (
//         <div className="container mx-auto px-4 py-8 mt-16">
//             <div className="bg-yellow-50 p-4 rounded-lg mb-8 text-center">
//                 <h2 className="text-3xl font-bold text-gray-800">Our Expert Pandits</h2>
//                 <p className="text-gray-600 mt-2">Welcome {user?.name || user?.phone || 'User'}!</p>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {pandits.map((pandit) => (
//                     <div key={pandit._id} className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition">
//                         <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-5 text-center">
//                             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
//                                 <span className="text-yellow-500 text-2xl">🔱</span>
//                             </div>
//                             <h3 className="text-white font-bold text-lg">{pandit.firstName}</h3>
//                             <div className="flex justify-center mt-1">
//                                 {[...Array(5)].map((_, i) => (
//                                     <span key={i} className="text-yellow-200 text-sm">★</span>
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="p-4">
//                             <p className="text-gray-700 text-sm">📅 {pandit.experience} years</p>
//                             <p className="text-gray-700 text-sm mt-1">🗣️ {pandit.languages}</p>
//                             <p className="text-gray-700 text-sm mt-1">🔮 {pandit.skills}</p>
                            
//                             {!isPandit && (
//                                 <div className="flex gap-2 mt-4">
//                                     <button 
//                                         onClick={() => handleChat(pandit)}
//                                         className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-1 text-sm"
//                                     >
//                                         <FaComments size={14} /> Chat
//                                     </button>
//                                     <button 
//                                         onClick={() => handleVideoCall(pandit)}
//                                         className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-1 text-sm"
//                                     >
//                                         <FaVideo size={14} /> Call
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Chat Box - Only Chat */}
//             {showChat && selectedPandit && user && !isPandit && (
//                 <ChatBox 
//                     currentUserId={user.phone || user.id || user.mobile || '9999999999'}
//                     panditId={selectedPandit._id}
//                     panditName={selectedPandit.firstName}
//                     onClose={() => {
//                         setShowChat(false);
//                         setSelectedPandit(null);
//                     }}
//                 />
//             )}

//             {/* Voice Call UI - User Side */}
//             {showCallChat && callChatUser && user && !isPandit && (
//                 <VideoCallChat
//                     currentUserId={user.phone || user.id || user.mobile || '9999999999'}
//                     targetUserId={callChatUser._id}
//                     targetName={callChatUser.firstName}
//                     isInitiator={true}
//                     onClose={() => {
//                         setShowCallChat(false);
//                         setCallChatUser(null);
//                     }}
//                 />
//             )}
//         </div>
//     );
// };

// export default PanditSection;

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';

const PanditCallReceiver = () => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [incomingCall, setIncomingCall] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [callerId, setCallerId] = useState('');
    const [debugLogs, setDebugLogs] = useState([]);
    
    const panditId = user?.phone || user?.mobile || '8888888888';
    const audioRef = useRef(null);

    const addLog = (msg, data = null) => {
        const log = { time: new Date().toLocaleTimeString(), msg, data };
        setDebugLogs(prev => [...prev, log]);
        console.log(`[Pandit] ${msg}`, data || '');
    };

    useEffect(() => {
        addLog(`🚀 Starting with ID: ${panditId}`);
        
        // Ringtone
        audioRef.current = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
        
        const s = io('https://astrologer-backendcoll-chaat.onrender.com', {
            transports: ['websocket', 'polling']
        });
        
        setSocket(s);
        
        s.on('connect', () => {
            addLog('✅ Socket CONNECTED');
            setConnected(true);
            s.emit('user-join', String(panditId));
            addLog(`📤 Joined room: ${panditId}`);
        });
        
        s.on('disconnect', () => {
            addLog('⚠️ DISCONNECTED');
            setConnected(false);
        });
        
        // 👇 MOST IMPORTANT - Listen for incoming call
        s.on('incoming-call', (data) => {
            addLog('🔔🔔🔔 INCOMING CALL!', data);
            const fromId = data.from;
            setCallerId(fromId);
            setIncomingCall(data);
            setShowPopup(true);
            
            // Play ringtone
            if (audioRef.current) {
                audioRef.current.play().catch(e => console.log('Audio error:', e));
            }
            
            // Alert
            alert(`📞 INCOMING CALL from User ${fromId?.slice(-6)}!`);
        });
        
        // Listen to all events for debugging
        s.onAny((event, ...args) => {
            if (event.includes('call')) {
                addLog(`📡 Event: ${event}`, args[0]);
            }
        });
        
        return () => {
            if (audioRef.current) audioRef.current.pause();
            if (s) s.close();
        };
    }, [panditId]);
    
    const acceptCall = () => {
        addLog(`✅ Accepting call from: ${callerId}`);
        if (socket) {
            socket.emit('call-accepted', { to: callerId, from: panditId });
        }
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        alert(`📞 Call connected with User ${callerId?.slice(-6)}!`);
        setShowPopup(false);
        setIncomingCall(null);
    };
    
    const declineCall = () => {
        addLog(`❌ Declining call from: ${callerId}`);
        if (socket) {
            socket.emit('end-call', { to: callerId, from: panditId });
        }
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setShowPopup(false);
        setIncomingCall(null);
    };
    
    return (
        <>
            {/* Fixed position debug panel - top right */}
            <div style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                width: '300px',
                background: '#1e1e2f',
                borderRadius: '8px',
                padding: '10px',
                zIndex: 9999,
                fontFamily: 'monospace',
                fontSize: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                border: connected ? '1px solid #4caf50' : '1px solid #f44336'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span>📡 Pandit: {panditId.slice(-6)}</span>
                    <span style={{ color: connected ? '#4caf50' : '#f44336' }}>
                        {connected ? '🟢 ONLINE' : '🔴 OFFLINE'}
                    </span>
                </div>
                <div style={{ maxHeight: '150px', overflow: 'auto', fontSize: '9px' }}>
                    {debugLogs.slice(-5).map((log, i) => (
                        <div key={i} style={{ borderTop: '1px solid #333', padding: '2px 0', color: '#aaa' }}>
                            [{log.time}] {log.msg}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Incoming Call Popup */}
            {showPopup && (
                <div style={{
                    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    background: '#ff9800', padding: '30px', borderRadius: '15px',
                    textAlign: 'center', zIndex: 10000, minWidth: '300px',
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                }}>
                    <div style={{ fontSize: '50px', marginBottom: '10px' }}>📞</div>
                    <h2 style={{ color: 'white', margin: '10px 0' }}>Incoming Call!</h2>
                    <p style={{ color: 'white' }}>User <strong>{callerId?.slice(-6)}</strong> is calling</p>
                    <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <button onClick={acceptCall} style={{ background: '#4CAF50', color: 'white', padding: '10px 25px', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>
                            ✅ Accept
                        </button>
                        <button onClick={declineCall} style={{ background: '#f44336', color: 'white', padding: '10px 25px', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>
                            ❌ Decline
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default PanditCallReceiver;