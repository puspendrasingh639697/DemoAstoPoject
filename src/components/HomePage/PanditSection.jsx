// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { supabase } from '../../supabaseClient';
// // import ChatBox from '../ChatBox';
// import VideoCallChat from '../VideoCallChat';
// import ChatBox from '../Chat/ChatBox';

// const PanditSection = () => {
//     const { user } = useAuth();
//     const currentUserId = user?.id || user?.phone || 'USER_TEMP_ID';
    
//     const [panditsList, setPanditsList] = useState([]);
//     const [activeChatPandit, setActiveChatPandit] = useState(null);
//     const [activeCall, setActiveCall] = useState(null);
//     const [unreadCounts, setUnreadCounts] = useState({});
//     const [onlinePandits, setOnlinePandits] = useState({});
//     const [notification, setNotification] = useState(null);
    
//     const channelRef = useRef(null);

//     // Show notification
//     const showNotification = (msg) => {
//         setNotification(msg);
//         setTimeout(() => setNotification(null), 3000);
//     };

//     // Load pandits from database
//     const loadPandits = async () => {
//         const { data } = await supabase
//             .from('profiles')
//             .select('*')
//             .eq('role', 'pandit');
        
//         if (data) {
//             setPanditsList(data);
//             data.forEach(pandit => {
//                 checkOnlineStatus(pandit.id);
//                 loadUnreadCount(pandit.id);
//             });
//         }
//     };

//     const checkOnlineStatus = async (panditId) => {
//         const { data } = await supabase
//             .from('profiles')
//             .select('is_online')
//             .eq('id', panditId)
//             .single();
//         if (data) {
//             setOnlinePandits(prev => ({ ...prev, [panditId]: data.is_online }));
//         }
//     };

//     const loadUnreadCount = async (panditId) => {
//         const { count } = await supabase
//             .from('unified_interactions')
//             .select('*', { count: 'exact', head: true })
//             .eq('action_type', 'message')
//             .eq('receiver_id', currentUserId)
//             .eq('sender_id', panditId)
//             .eq('is_read', false);
        
//         if (count > 0) {
//             setUnreadCounts(prev => ({ ...prev, [panditId]: count }));
//         }
//     };

//     // ✅ FIXED: Setup realtime - ALL .on() BEFORE .subscribe()
//     const setupRealtime = () => {
//         // First, check if channel exists and remove it
//         if (channelRef.current) {
//             supabase.removeChannel(channelRef.current);
//         }
        
//         // Create new channel
//         const channel = supabase.channel('user-messages');
        
//         // ✅ Add ALL listeners BEFORE subscribe
//         channel
//             .on('postgres_changes', 
//                 { 
//                     event: 'INSERT', 
//                     schema: 'public', 
//                     table: 'unified_interactions',
//                     filter: `receiver_id=eq.${currentUserId}`
//                 },
//                 (payload) => {
//                     const data = payload.new;
//                     console.log('New message received:', data);
                    
//                     if (data.action_type === 'message') {
//                         showNotification(`📩 New message from Pandit`);
                        
//                         // Update unread count
//                         setUnreadCounts(prev => ({
//                             ...prev,
//                             [data.sender_id]: (prev[data.sender_id] || 0) + 1
//                         }));
                        
//                         // Browser notification
//                         if (Notification.permission === 'granted') {
//                             new Notification('New Message', {
//                                 body: `Message from Pandit`,
//                                 icon: '/logo.png'
//                             });
//                         }
//                     }
//                 }
//             )
//             .on('postgres_changes',
//                 {
//                     event: 'UPDATE',
//                     schema: 'public',
//                     table: 'profiles',
//                     filter: `role=eq.pandit`
//                 },
//                 (payload) => {
//                     if (payload.new.is_online !== payload.old.is_online) {
//                         setOnlinePandits(prev => ({
//                             ...prev,
//                             [payload.new.id]: payload.new.is_online
//                         }));
//                     }
//                 }
//             );
        
//         // ✅ Now subscribe
//         channel.subscribe((status) => {
//             console.log('Channel status:', status);
//         });
        
//         channelRef.current = channel;
//     };

//     const updateOnlineStatus = async (isOnline) => {
//         await supabase
//             .from('profiles')
//             .update({ is_online: isOnline, last_seen: new Date().toISOString() })
//             .eq('id', currentUserId);
//     };

//     useEffect(() => {
//         loadPandits();
//         setupRealtime();
//         updateOnlineStatus(true);
        
//         // Request notification permission
//         if (Notification.permission === 'default') {
//             Notification.requestPermission();
//         }
        
//         return () => {
//             updateOnlineStatus(false);
//             if (channelRef.current) {
//                 supabase.removeChannel(channelRef.current);
//             }
//         };
//     }, [currentUserId]);

//     const openChat = (pandit) => {
//         setActiveChatPandit(pandit);
//         setUnreadCounts(prev => ({ ...prev, [pandit.id]: 0 }));
//     };

//     const initiateCall = (pandit) => {
//         setActiveCall({
//             id: pandit.id,
//             name: pandit.full_name,
//             isInitiator: true
//         });
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             {/* Notification Toast */}
//             {notification && (
//                 <div className="fixed top-20 right-5 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
//                     {notification}
//                 </div>
//             )}

//             {/* Header */}
//             <div className="text-center mb-8">
//                 <h1 className="text-3xl font-bold text-gray-800">🔱 Astrology User Panel</h1>
//                 <p className="text-gray-500 mt-1">My ID: {currentUserId}</p>
//                 <p className="text-green-500 text-sm">🟢 Online</p>
//             </div>

//             {/* Pandit Cards Grid */}
//             <div className="max-w-6xl mx-auto">
//                 <h2 className="text-xl font-semibold text-gray-700 mb-4">📿 Available Pandits</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {panditsList.map((pandit) => (
//                         <div key={pandit.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
//                             <div className="p-6">
//                                 <div className="flex items-center justify-between mb-3">
//                                     <div className="flex items-center gap-2">
//                                         <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
//                                             🙏
//                                         </div>
//                                         <div>
//                                             <h3 className="font-bold text-lg text-gray-800">{pandit.full_name}</h3>
//                                             <p className="text-xs text-gray-500">Vedic Astrologer</p>
//                                         </div>
//                                     </div>
//                                     <div className={`w-2 h-2 rounded-full ${onlinePandits[pandit.id] ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
//                                 </div>
                                
//                                 <div className="flex gap-3 mt-4">
//                                     <button 
//                                         onClick={() => openChat(pandit)}
//                                         className="flex-1 bg-yellow-500 text-white py-2 rounded-xl font-semibold hover:bg-yellow-600 transition flex items-center justify-center gap-2"
//                                     >
//                                         💬 Chat
//                                         {unreadCounts[pandit.id] > 0 && (
//                                             <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
//                                                 {unreadCounts[pandit.id]}
//                                             </span>
//                                         )}
//                                     </button>
//                                     <button 
//                                         onClick={() => initiateCall(pandit)}
//                                         className="flex-1 bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
//                                     >
//                                         📞 Call
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Active Chat */}
//             {activeChatPandit && (
//                 <ChatBox 
//                     currentUserId={currentUserId}
//                     panditId={activeChatPandit.id}
//                     panditName={activeChatPandit.full_name}
//                     onClose={() => setActiveChatPandit(null)}
//                 />
//             )}

//             {/* Active Call */}
//             {activeCall && (
//                 <VideoCallChat 
//                     currentUserId={currentUserId}
//                     targetUserId={activeCall.id}
//                     targetName={activeCall.name}
//                     isInitiator={true}
//                     onClose={() => setActiveCall(null)}
//                 />
//             )}
//         </div>
//     );
// };

// export default PanditSection;
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../supabaseClient';
import VideoCallChat from '../VideoCallChat';
import ChatBox from '../Chat/ChatBox';

const PanditSection = () => {
    const { user } = useAuth();
    const currentUserId = user?.id || user?.phone || 'USER_TEMP_ID';
    
    const [panditsList, setPanditsList] = useState([]);
    const [activeChatPandit, setActiveChatPandit] = useState(null);
    const [activeCall, setActiveCall] = useState(null);
    const [unreadCounts, setUnreadCounts] = useState({});
    const [onlinePandits, setOnlinePandits] = useState({});
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const channelRef = useRef(null);

    // Show notification
    const showNotification = (msg, type = 'info') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3000);
        
        // Browser notification for new messages
        if (type === 'message' && Notification.permission === 'granted') {
            new Notification('📩 New Message', {
                body: msg,
                icon: '/logo.png',
                silent: false
            });
        }
    };

    // Load pandits from database
    const loadPandits = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', 'pandit')
            .order('full_name');
        
        if (data) {
            setPanditsList(data);
            // Load online status and unread counts for each pandit
            data.forEach(pandit => {
                checkOnlineStatus(pandit.id);
                loadUnreadCount(pandit.id);
            });
        }
        setLoading(false);
    };

    const checkOnlineStatus = async (panditId) => {
        const { data } = await supabase
            .from('profiles')
            .select('is_online')
            .eq('id', panditId)
            .single();
        if (data) {
            setOnlinePandits(prev => ({ ...prev, [panditId]: data.is_online }));
        }
    };

    const loadUnreadCount = async (panditId) => {
        const { count } = await supabase
            .from('unified_interactions')
            .select('*', { count: 'exact', head: true })
            .eq('action_type', 'message')
            .eq('receiver_id', currentUserId)
            .eq('sender_id', panditId)
            .eq('is_read', false);
        
        if (count > 0) {
            setUnreadCounts(prev => ({ ...prev, [panditId]: count }));
        }
    };

    // Mark messages as read when opening chat
    const markMessagesAsRead = async (panditId) => {
        await supabase
            .from('unified_interactions')
            .update({ is_read: true })
            .eq('receiver_id', currentUserId)
            .eq('sender_id', panditId)
            .eq('action_type', 'message')
            .eq('is_read', false);
        
        setUnreadCounts(prev => ({ ...prev, [panditId]: 0 }));
    };

    // Setup realtime subscriptions
    const setupRealtime = () => {
        if (channelRef.current) {
            supabase.removeChannel(channelRef.current);
        }
        
        const channel = supabase.channel('user-messages');
        
        channel
            .on('postgres_changes', 
                { 
                    event: 'INSERT', 
                    schema: 'public', 
                    table: 'unified_interactions',
                    filter: `receiver_id=eq.${currentUserId}`
                },
                (payload) => {
                    const data = payload.new;
                    console.log('📨 New message received:', data);
                    
                    if (data.action_type === 'message') {
                        // Update unread count
                        setUnreadCounts(prev => ({
                            ...prev,
                            [data.sender_id]: (prev[data.sender_id] || 0) + 1
                        }));
                        
                        // Show notification
                        const pandit = panditsList.find(p => p.id === data.sender_id);
                        const panditName = pandit?.full_name || 'Pandit';
                        showNotification(`📩 New message from ${panditName}`, 'message');
                        
                        // Update messages in active chat if open
                        if (activeChatPandit && activeChatPandit.id === data.sender_id) {
                            // ChatBox will handle this via its own subscription
                        }
                    }
                }
            )
            .on('postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'profiles',
                    filter: `role=eq.pandit`
                },
                (payload) => {
                    if (payload.new.is_online !== payload.old.is_online) {
                        setOnlinePandits(prev => ({
                            ...prev,
                            [payload.new.id]: payload.new.is_online
                        }));
                    }
                }
            );
        
        channel.subscribe((status) => {
            console.log('🔌 Realtime channel status:', status);
        });
        
        channelRef.current = channel;
    };

    const updateOnlineStatus = async (isOnline) => {
        await supabase
            .from('profiles')
            .update({ is_online: isOnline, last_seen: new Date().toISOString() })
            .eq('id', currentUserId);
    };

    useEffect(() => {
        loadPandits();
        setupRealtime();
        updateOnlineStatus(true);
        
        // Request notification permission
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
        
        // Refresh online status every 30 seconds
        const interval = setInterval(() => {
            panditsList.forEach(pandit => checkOnlineStatus(pandit.id));
        }, 30000);
        
        return () => {
            updateOnlineStatus(false);
            if (channelRef.current) {
                supabase.removeChannel(channelRef.current);
            }
            clearInterval(interval);
        };
    }, [currentUserId]);

    const openChat = (pandit) => {
        markMessagesAsRead(pandit.id);
        setActiveChatPandit(pandit);
    };

    const initiateCall = (pandit) => {
        setActiveCall({
            id: pandit.id,
            name: pandit.full_name,
            isInitiator: true
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading pandits...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl shadow-lg animate-bounce ${
                    notification.type === 'message' ? 'bg-blue-500' : 'bg-green-500'
                } text-white max-w-sm`}>
                    <div className="flex items-center gap-2">
                        <span>{notification.type === 'message' ? '💬' : '📞'}</span>
                        <span>{notification.msg}</span>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full shadow-lg mb-4">
                    <span className="font-semibold">🔱 Astrology User Panel</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Welcome, {user?.name || 'Devotee'}! 🙏</h1>
                <p className="text-gray-500 mt-2">ID: {currentUserId}</p>
                <div className="inline-flex items-center gap-2 mt-2 bg-green-100 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 text-sm font-medium">Online</span>
                </div>
            </div>

            {/* Pandit Cards Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-700">📿 Available Pandits</h2>
                    <span className="text-sm text-gray-500">{panditsList.length} pandits available</span>
                </div>
                
                {panditsList.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-md">
                        <div className="text-5xl mb-4">🙏</div>
                        <p className="text-gray-500">No pandits available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {panditsList.map((pandit) => (
                            <div 
                                key={pandit.id} 
                                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="relative p-6">
                                    {/* Online Status Badge */}
                                    <div className="absolute top-4 right-4">
                                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                                            onlinePandits[pandit.id] 
                                                ? 'bg-green-100 text-green-600' 
                                                : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${onlinePandits[pandit.id] ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                            {onlinePandits[pandit.id] ? 'Online' : 'Offline'}
                                        </div>
                                    </div>
                                    
                                    {/* Avatar */}
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl shadow-lg mb-3">
                                            🙏
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-800">{pandit.full_name}</h3>
                                        <p className="text-xs text-gray-500 mt-1">Vedic Astrologer</p>
                                        <div className="flex items-center gap-1 mt-2">
                                            <span className="text-yellow-500">★</span>
                                            <span className="text-yellow-500">★</span>
                                            <span className="text-yellow-500">★</span>
                                            <span className="text-yellow-500">★</span>
                                            <span className="text-yellow-500">★</span>
                                            <span className="text-xs text-gray-500 ml-1">(128)</span>
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex gap-3 mt-6">
                                        <button 
                                            onClick={() => openChat(pandit)}
                                            className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 relative"
                                        >
                                            💬 Chat
                                            {unreadCounts[pandit.id] > 0 && (
                                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                                                    {unreadCounts[pandit.id]}
                                                </span>
                                            )}
                                        </button>
                                        <button 
                                            onClick={() => initiateCall(pandit)}
                                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                                            disabled={!onlinePandits[pandit.id]}
                                        >
                                            📞 Call
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Active Chat */}
            {activeChatPandit && (
                <ChatBox 
                    currentUserId={currentUserId}
                    panditId={activeChatPandit.id}
                    panditName={activeChatPandit.full_name}
                    onClose={() => setActiveChatPandit(null)}
                />
            )}

            {/* Active Call */}
            {activeCall && (
                <VideoCallChat 
                    currentUserId={currentUserId}
                    targetUserId={activeCall.id}
                    targetName={activeCall.name}
                    isInitiator={true}
                    onClose={() => setActiveCall(null)}
                />
            )}
        </div>
    );
};

export default PanditSection;