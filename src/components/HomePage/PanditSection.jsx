// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useAuth } from '../../context/AuthContext';
// // // // // import ChatBox from '../Chat/ChatBox';
// // // // // import PanditInbox from '../PanditInbox';
// // // // // // import PanditInbox from '../Pandit/PanditInbox';

// // // // // const PanditSection = () => {
// // // // //     const [pandits, setPandits] = useState([]);
// // // // //     const [loading, setLoading] = useState(true);
// // // // //     const [selectedPandit, setSelectedPandit] = useState(null);
// // // // //     const [showChat, setShowChat] = useState(false);
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
// // // // //                         onClick={() => {
// // // // //                             console.log('🔔 Opening Pandit Inbox for:', user?.phone);
// // // // //                             setShowPanditInbox(true);
// // // // //                         }}
// // // // //                         className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center gap-2"
// // // // //                     >
// // // // //                         💬 Messages Inbox
// // // // //                     </button>
// // // // //                 </div>
// // // // //             )}
            
// // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // //                 {pandits.map((pandit) => (
// // // // //                     <div key={pandit._id} className="bg-white rounded-xl shadow-lg overflow-hidden border">
// // // // //                         <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-5 text-center">
// // // // //                             <h3 className="text-white font-bold text-lg">{pandit.firstName}</h3>
// // // // //                         </div>
// // // // //                         <div className="p-4">
// // // // //                             <p className="text-gray-700">📅 {pandit.experience} years</p>
// // // // //                             <p className="text-gray-700">🗣️ {pandit.languages}</p>
// // // // //                             <p className="text-gray-700">🔮 {pandit.skills}</p>
                            
// // // // //                             {!isPandit && (
// // // // //                                 <button 
// // // // //                                     onClick={() => {
// // // // //                                         console.log('📱 Opening chat with:', pandit.firstName, 'ID:', pandit._id);
// // // // //                                         setSelectedPandit(pandit);
// // // // //                                         setShowChat(true);
// // // // //                                     }}
// // // // //                                     className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
// // // // //                                 >
// // // // //                                     💬 Chat Now
// // // // //                                 </button>
// // // // //                             )}
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 ))}
// // // // //             </div>

// // // // //             {showChat && selectedPandit && user && !isPandit && (
// // // // //                 <ChatBox 
// // // // //                     currentUserId={user.phone || user.id || user.mobile || '9999999999'}
// // // // //                     panditId={selectedPandit._id}
// // // // //                     panditName={selectedPandit.firstName}
// // // // //                     onClose={() => {
// // // // //                         setShowChat(false);
// // // // //                         setSelectedPandit(null);
// // // // //                     }}
// // // // //                 />
// // // // //             )}

// // // // //             {showPanditInbox && isPandit && (
// // // // //                 <PanditInbox 
// // // // //                     panditId={user.phone || user.id || user.mobile || '8888888888'}
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
// // // // import VideoCall from '../VideoCall/VideoCall';
// // // // // import PanditInbox from '../Pandit/PanditInbox';
// // // // import { FaVideo, FaComments } from 'react-icons/fa';
// // // // import PanditInbox from '../PanditInbox';

// // // // const PanditSection = () => {
// // // //     const [pandits, setPandits] = useState([]);
// // // //     const [loading, setLoading] = useState(true);
// // // //     const [selectedPandit, setSelectedPandit] = useState(null);
// // // //     const [showChat, setShowChat] = useState(false);
// // // //     const [showVideo, setShowVideo] = useState(false);
// // // //     const [showPanditInbox, setShowPanditInbox] = useState(false);
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
// // // //         setShowVideo(false);
// // // //     };

// // // //     const handleVideoCall = (pandit) => {
// // // //         setSelectedPandit(pandit);
// // // //         setShowVideo(true);
// // // //         setShowChat(false);
// // // //     };

// // // //     if (loading) {
// // // //         return <div className="flex justify-center items-center h-64">Loading Pandits...</div>;
// // // //     }

// // // //     return (
// // // //         <div className="container mx-auto px-4 py-8 mt-16">
// // // //             <div className="bg-yellow-50 p-4 rounded-lg mb-8 text-center">
// // // //                 <h2 className="text-3xl font-bold text-gray-800">Our Expert Pandits</h2>
// // // //                 <p className="text-gray-600 mt-2">Welcome {user?.name || user?.phone || 'User'}!</p>
// // // //             </div>
            
// // // //             {isPandit && (
// // // //                 <div className="flex justify-end mb-4">
// // // //                     <button 
// // // //                         onClick={() => setShowPanditInbox(true)}
// // // //                         className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center gap-2"
// // // //                     >
// // // //                         <FaComments /> Messages Inbox
// // // //                     </button>
// // // //                 </div>
// // // //             )}
            
// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //                 {pandits.map((pandit) => (
// // // //                     <div key={pandit._id} className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition">
// // // //                         <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-5 text-center">
// // // //                             <h3 className="text-white font-bold text-lg">{pandit.firstName}</h3>
// // // //                             <div className="flex justify-center mt-1">
// // // //                                 {[...Array(5)].map((_, i) => (
// // // //                                     <span key={i} className="text-yellow-200 text-sm">★</span>
// // // //                                 ))}
// // // //                             </div>
// // // //                         </div>
// // // //                         <div className="p-4">
// // // //                             <p className="text-gray-700">📅 {pandit.experience} years</p>
// // // //                             <p className="text-gray-700">🗣️ {pandit.languages}</p>
// // // //                             <p className="text-gray-700">🔮 {pandit.skills}</p>
                            
// // // //                             {!isPandit && (
// // // //                                 <div className="flex gap-2 mt-4">
// // // //                                     <button 
// // // //                                         onClick={() => handleChat(pandit)}
// // // //                                         className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-1"
// // // //                                     >
// // // //                                         <FaComments size={14} /> Chat
// // // //                                     </button>
// // // //                                     <button 
// // // //                                         onClick={() => handleVideoCall(pandit)}
// // // //                                         className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-1"
// // // //                                     >
// // // //                                         <FaVideo size={14} /> Call
// // // //                                     </button>
// // // //                                 </div>
// // // //                             )}
// // // //                         </div>
// // // //                     </div>
// // // //                 ))}
// // // //             </div>

// // // //             {showChat && selectedPandit && user && !isPandit && (
// // // //                 <ChatBox 
// // // //                     currentUserId={user.phone || user.id || user.mobile}
// // // //                     panditId={selectedPandit._id}
// // // //                     panditName={selectedPandit.firstName}
// // // //                     onClose={() => {
// // // //                         setShowChat(false);
// // // //                         setSelectedPandit(null);
// // // //                     }}
// // // //                 />
// // // //             )}

// // // //             {showVideo && selectedPandit && user && !isPandit && (
// // // //                 <VideoCall 
// // // //                     currentUserId={user.phone || user.id || user.mobile}
// // // //                     targetUserId={selectedPandit._id}
// // // //                     targetName={selectedPandit.firstName}
// // // //                     onClose={() => {
// // // //                         setShowVideo(false);
// // // //                         setSelectedPandit(null);
// // // //                     }}
// // // //                 />
// // // //             )}

// // // //             {showPanditInbox && isPandit && (
// // // //                 <PanditInbox 
// // // //                     panditId={user.phone || user.id || user.mobile}
// // // //                     onClose={() => setShowPanditInbox(false)}
// // // //                 />
// // // //             )}
// // // //         </div>
// // // //     );
// // // // };

// // // // export default PanditSection;

// // // import React, { useState, useEffect } from 'react';
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

// // //    const handleVideoCall = (pandit) => {
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
    
// // //     setCallChatUser(pandit);
// // //     setShowCallChat(true);
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

 
// // const handleVideoCall = (pandit) => {
// //     console.log('📞 Calling Pandit:', pandit.firstName, 'ID:', pandit._id);
    
// //     // Direct socket emit
// //     const tempSocket = io('http://localhost:5000');
// //     tempSocket.on('connect', () => {
// //         tempSocket.emit('call-user', {
// //             to: String(pandit._id),
// //             from: String(user?.phone || '9999999999'),
// //             signal: 'call_request'
// //         });
// //         console.log('✅ Call emitted to:', pandit._id);
// //         setTimeout(() => tempSocket.close(), 1000);
// //     });
    
// //     alert(`Calling ${pandit.firstName}...`);
// // };
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

// //             {/* Video Call + Chat Together */}
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

//     // ✅ Call Handler - User Side
//     const handleVideoCall = (pandit) => {
//         console.log('📞 Opening Call UI for:', pandit.firstName);
//         setCallChatUser(pandit);
//         setShowCallChat(true);
//         setShowChat(false);
//     };

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

//             {/* ✅ Video Call + Chat Together - User Side */}
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

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';
import ChatBox from '../Chat/ChatBox';
import VideoCallChat from '../VideoCallChat';
import { FaVideo, FaComments } from 'react-icons/fa';

const PanditSection = () => {
    const [pandits, setPandits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPandit, setSelectedPandit] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [showCallChat, setShowCallChat] = useState(false);
    const [callChatUser, setCallChatUser] = useState(null);
    const { user } = useAuth();

    const isPandit = user?.phone === '8888888888' || user?.mobile === '8888888888';

    useEffect(() => {
        const demoPandits = [
            { _id: '8888888888', firstName: 'Acharya Sheetal', experience: 17, languages: 'Hindi, English', skills: 'Vedic Astrology', rating: 5 },
            { _id: '7777777777', firstName: 'Pandit Suresh Mishra', experience: 10, languages: 'Hindi', skills: 'Vedic Astrology', rating: 5 },
            { _id: '6666666666', firstName: 'Acharya Shardha', experience: 15, languages: 'English', skills: 'Tarot, Vedic', rating: 5 },
            { _id: '5555555555', firstName: 'Pandit Anil Tripathi', experience: 22, languages: 'Hindi, Sanskrit', skills: 'Vedic Pujan', rating: 5 },
        ];
        setPandits(demoPandits);
        setLoading(false);
    }, []);

    const handleChat = (pandit) => {
        setSelectedPandit(pandit);
        setShowChat(true);
        setShowCallChat(false);
    };

    // ✅ Call Handler - Send notification and open call UI
const handleVideoCall = (pandit) => {
    console.log('📞 Opening Call UI for:', pandit.firstName);
    setCallChatUser(pandit);
    setShowCallChat(true);
    setShowChat(false);
};
    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading Pandits...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <div className="bg-yellow-50 p-4 rounded-lg mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Our Expert Pandits</h2>
                <p className="text-gray-600 mt-2">Welcome {user?.name || user?.phone || 'User'}!</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {pandits.map((pandit) => (
                    <div key={pandit._id} className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition">
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-5 text-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="text-yellow-500 text-2xl">🔱</span>
                            </div>
                            <h3 className="text-white font-bold text-lg">{pandit.firstName}</h3>
                            <div className="flex justify-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-yellow-200 text-sm">★</span>
                                ))}
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-700 text-sm">📅 {pandit.experience} years</p>
                            <p className="text-gray-700 text-sm mt-1">🗣️ {pandit.languages}</p>
                            <p className="text-gray-700 text-sm mt-1">🔮 {pandit.skills}</p>
                            
                            {!isPandit && (
                                <div className="flex gap-2 mt-4">
                                    <button 
                                        onClick={() => handleChat(pandit)}
                                        className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-1 text-sm"
                                    >
                                        <FaComments size={14} /> Chat
                                    </button>
                                    <button 
                                        onClick={() => handleVideoCall(pandit)}
                                        className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-1 text-sm"
                                    >
                                        <FaVideo size={14} /> Call
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Box - Only Chat */}
            {showChat && selectedPandit && user && !isPandit && (
                <ChatBox 
                    currentUserId={user.phone || user.id || user.mobile || '9999999999'}
                    panditId={selectedPandit._id}
                    panditName={selectedPandit.firstName}
                    onClose={() => {
                        setShowChat(false);
                        setSelectedPandit(null);
                    }}
                />
            )}

            {/* Voice Call UI - User Side */}
            {showCallChat && callChatUser && user && !isPandit && (
                <VideoCallChat
                    currentUserId={user.phone || user.id || user.mobile || '9999999999'}
                    targetUserId={callChatUser._id}
                    targetName={callChatUser.firstName}
                    isInitiator={true}
                    onClose={() => {
                        setShowCallChat(false);
                        setCallChatUser(null);
                    }}
                />
            )}
        </div>
    );
};

export default PanditSection;