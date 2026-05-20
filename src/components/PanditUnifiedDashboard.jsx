// import React, { useState, useEffect, useRef } from 'react';
// import { supabase } from '../supabaseClient';
// import VideoCallChat from './VideoCallChat';

// const PanditUnifiedDashboard = ({ currentPanditId = '8888888801' }) => {
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [activeCall, setActiveCall] = useState(null);
//   const [incomingCall, setIncomingCall] = useState(null);
//   const [typingUsers, setTypingUsers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [notification, setNotification] = useState(null);
  
//   const messagesEndRef = useRef(null);
//   const channelRef = useRef(null);

//   // Show toast notification
//   const showNotification = (msg, type = 'info') => {
//     setNotification({ msg, type });
//     setTimeout(() => setNotification(null), 3000);
//   };

//   // Fetch online users from profiles table (better than unified_interactions)
//   const fetchOnlineUsers = async () => {
//     try {
//       console.log('Fetching online users for pandit:', currentPanditId);
      
//       // Get online users from profiles table
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('is_online', true)
//         .eq('role', 'user')
//         .neq('id', currentPanditId);

//       if (error) {
//         console.error('Supabase error:', error);
//         setOnlineUsers([]);
//         return;
//       }

//       console.log('Online users fetched:', data);

//       if (data && data.length > 0) {
//         const formattedUsers = data.map(user => ({
//           id: user.id,
//           sender_id: user.id,
//           name: user.full_name,
//           phone: user.phone,
//           is_active: true
//         }));
//         setOnlineUsers(formattedUsers);
//       } else {
//         setOnlineUsers([]);
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setOnlineUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load chat messages
//   const loadMessages = async (userId) => {
//     try {
//       const { data, error } = await supabase
//         .from('unified_interactions')
//         .select('*')
//         .eq('action_type', 'message')
//         .or(`and(sender_id.eq.${currentPanditId},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${currentPanditId})`)
//         .order('created_at', { ascending: true });
      
//       if (error) {
//         console.error('Error loading messages:', error);
//         return;
//       }
      
//       if (data) setMessages(data);
//     } catch (err) {
//       console.error('Load messages error:', err);
//     }
//   };

//   // Send message
//   const sendMessage = async () => {
//     if (!newMessage.trim() || !selectedUser) return;
    
//     const messageData = {
//       sender_id: currentPanditId,
//       receiver_id: selectedUser.sender_id,
//       action_type: 'message',
//       content: newMessage,
//       is_read: false,
//       created_at: new Date().toISOString()
//     };
    
//     try {
//       const { error } = await supabase.from('unified_interactions').insert([messageData]);
//       if (!error) {
//         setMessages(prev => [...prev, messageData]);
//         setNewMessage('');
//         showNotification('Message sent!', 'success');
//       } else {
//         console.error('Send message error:', error);
//       }
//     } catch (err) {
//       console.error('Send error:', err);
//     }
//   };

//   // Update pandit online status
//   const updateOnlineStatus = async (isOnline) => {
//     try {
//       // Update profiles table
//       await supabase
//         .from('profiles')
//         .update({ is_online: isOnline, last_seen: new Date().toISOString() })
//         .eq('id', currentPanditId);
      
//       // Update unified_interactions
//       await supabase
//         .from('unified_interactions')
//         .upsert({
//           sender_id: currentPanditId,
//           action_type: 'online',
//           is_active: isOnline,
//           updated_at: new Date().toISOString()
//         });
//     } catch (err) {
//       console.error('Status update error:', err);
//     }
//   };

//   // Handle typing indicator
//   const handleTyping = async (isTyping) => {
//     if (!selectedUser) return;
    
//     if (channelRef.current) {
//       channelRef.current.httpSend({
//         type: 'broadcast',
//         event: 'typing',
//         payload: { sender: currentPanditId, isTyping }
//       });
//     }
//   };

//   // Setup realtime subscriptions
//   useEffect(() => {
//     if (!currentPanditId) return;
    
//     // Set pandit online
//     updateOnlineStatus(true);
    
//     // Fetch initial online users
//     fetchOnlineUsers();
    
//     // Subscribe to realtime changes
//     const channel = supabase.channel('pandit-dashboard');
//     channelRef.current = channel;
    
//     // Listen for new messages
//     channel
//       .on('postgres_changes', 
//         { 
//           event: 'INSERT', 
//           schema: 'public', 
//           table: 'unified_interactions'
//         },
//         (payload) => {
//           const data = payload.new;
//           console.log('New interaction:', data);
          
//           // Handle new message (both sent and received)
//           if (data.action_type === 'message') {
//             // If message is for current pandit
//             if (data.receiver_id === currentPanditId) {
//               showNotification(`📩 New message from User_${data.sender_id.slice(-6)}`, 'message');
              
//               // If chat is open with this user, add to messages
//               if (selectedUser && data.sender_id === selectedUser.sender_id) {
//                 setMessages(prev => [...prev, data]);
//               }
              
//               // Mark as read
//               supabase.from('unified_interactions')
//                 .update({ is_read: true })
//                 .eq('id', data.id);
//             }
            
//             // If message is from current pandit (sent by us)
//             if (data.sender_id === currentPanditId && selectedUser && data.receiver_id === selectedUser.sender_id) {
//               setMessages(prev => [...prev, data]);
//             }
//           }
          
//           // Handle call signal (incoming)
//           if (data.action_type === 'call_signal' && data.receiver_id === currentPanditId) {
//             console.log("📞 INCOMING CALL:", data);
//             showNotification(`📞 Incoming call from User_${data.sender_id.slice(-6)}`, 'call');
//             setIncomingCall({
//               from_user: data.sender_id,
//               name: `User_${data.sender_id.slice(-6)}`,
//               signal: data.payload?.signal,
//               call_id: data.id
//             });
//           }
          
//           // Handle call answer
//           // Incoming call signal handler - change action_type to 'call_offer'
// if (data.action_type === 'call_offer' && data.receiver_id === currentPanditId) {
//     console.log('📞 INCOMING CALL from:', data.sender_id);
//     showNotification(`📞 Incoming call from ${data.sender_id.slice(-6)}`, 'call');
//     setIncomingCall({
//         from_user: data.sender_id,
//         name: `User_${data.sender_id.slice(-6)}`,
//         offer: data.payload?.offer,
//         call_id: data.id
//     });
// }
//         }
//       )
//       .on('postgres_changes',
//         {
//           event: 'UPDATE',
//           schema: 'public',
//           table: 'profiles',
//           filter: `is_online=eq.true`
//         },
//         () => {
//           // Refresh online users when status changes
//           fetchOnlineUsers();
//         }
//       )
//       // Listen for broadcast events (typing)
//       .on('broadcast', { event: 'typing' }, ({ payload }) => {
//         if (payload.sender !== currentPanditId && payload.sender === selectedUser?.sender_id) {
//           setTypingUsers(prev => ({ ...prev, [payload.sender]: payload.isTyping }));
//           setTimeout(() => {
//             setTypingUsers(prev => ({ ...prev, [payload.sender]: false }));
//           }, 2000);
//         }
//       })
//       .subscribe((status) => {
//         console.log('Subscription status:', status);
//       });
    
//     // Refresh online users every 10 seconds
//     const interval = setInterval(fetchOnlineUsers, 10000);
    
//     return () => {
//       updateOnlineStatus(false);
//       if (channelRef.current) {
//         supabase.removeChannel(channelRef.current);
//       }
//       clearInterval(interval);
//     };
//   }, [currentPanditId]);

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Handle typing input
//   const handleMessageChange = (e) => {
//     setNewMessage(e.target.value);
//     handleTyping(e.target.value.length > 0);
    
//     // Clear typing after 2 seconds of no input
//     if (window.typingTimeout) clearTimeout(window.typingTimeout);
//     window.typingTimeout = setTimeout(() => {
//       handleTyping(false);
//     }, 2000);
//   };

//   // Initiate call
//   const initiateCall = async (user) => {
//     try {
//       setActiveCall({
//         id: user.sender_id,
//         name: user.name || `User_${user.sender_id.slice(-4)}`,
//         isInitiator: true
//       });
      
//       // Send call signal with proper offer structure
//       const callPayload = {
//         caller_name: `Pandit_${currentPanditId.slice(-4)}`,
//         status: 'ringing',
//         type: 'offer',
//         signal: null // Will be set by VideoCallChat component
//       };
      
//       const { error } = await supabase.from('unified_interactions').insert([{
//         sender_id: currentPanditId,
//         receiver_id: user.sender_id,
//         action_type: 'call_signal',
//         payload: callPayload
//       }]);
      
//       if (error) console.error('Call signal error:', error);
//     } catch (err) {
//       console.error('Initiate call error:', err);
//     }
//   };

//   // Accept call
//   const acceptCall = () => {
//     setActiveCall({
//         id: incomingCall.from_user,
//         name: incomingCall.name,
//         isInitiator: false,
//         incomingOffer: incomingCall.offer
//     });
//     setIncomingCall(null);
// };

//   // Decline call
//   const declineCall = async () => {
//     if (incomingCall) {
//       await supabase.from('unified_interactions')
//         .update({ is_active: false })
//         .eq('id', incomingCall.call_id);
//       setIncomingCall(null);
//       showNotification('Call declined', 'info');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-900">
//         <div className="text-center text-white">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
//           Loading dashboard...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-900">
//       {/* Notification Toast */}
//       {notification && (
//         <div className={`fixed top-20 right-5 z-50 px-4 py-2 rounded-lg shadow-lg animate-bounce ${
//           notification.type === 'message' ? 'bg-blue-500' :
//           notification.type === 'call' ? 'bg-green-500' :
//           notification.type === 'success' ? 'bg-green-500' : 'bg-gray-700'
//         } text-white`}>
//           {notification.msg}
//         </div>
//       )}

//       {/* Left Panel - Online Users */}
//       <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
//         <div className="p-4 border-b border-gray-700">
//           <h2 className="text-xl font-bold text-yellow-500">🎯 Pandit Dashboard</h2>
//           <p className="text-sm text-gray-400">ID: {currentPanditId}</p>
//           <p className="text-xs text-green-500 mt-1">🟢 Online</p>
//         </div>
        
//         <div className="flex-1 overflow-y-auto p-4">
//           <h3 className="text-sm font-semibold text-gray-400 mb-3">
//             Online Users ({onlineUsers.length})
//           </h3>
//           {onlineUsers.length === 0 ? (
//             <p className="text-gray-500 text-sm text-center py-4">
//               No online users at the moment
//             </p>
//           ) : (
//             <div className="space-y-2">
//               {onlineUsers.map((user) => (
//                 <div
//                   key={user.id}
//                   onClick={() => {
//                     setSelectedUser(user);
//                     loadMessages(user.sender_id);
//                   }}
//                   className={`p-3 rounded-lg cursor-pointer transition flex justify-between items-center ${
//                     selectedUser?.sender_id === user.sender_id 
//                       ? 'bg-yellow-500/20 border border-yellow-500' 
//                       : 'bg-gray-700 hover:bg-gray-600'
//                   }`}
//                 >
//                   <div className="flex-1">
//                     <div className="font-medium text-white">
//                       {user.name || `User_${user.sender_id.slice(-6)}`}
//                     </div>
//                     <div className="text-xs text-green-400 flex items-center gap-1">
//                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
//                       Online
//                     </div>
//                     {typingUsers[user.sender_id] && (
//                       <div className="text-xs text-yellow-500 animate-pulse mt-1">
//                         ✏️ Typing...
//                       </div>
//                     )}
//                   </div>
//                   <button
//                     onClick={(e) => { 
//                       e.stopPropagation(); 
//                       initiateCall(user); 
//                     }}
//                     className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700 transition flex items-center gap-1"
//                   >
//                     📞 Call
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right Panel - Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {selectedUser ? (
//           <>
//             <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
//               <div>
//                 <span className="text-white font-semibold text-lg">
//                   Chat with {selectedUser.name || `User_${selectedUser.sender_id.slice(-6)}`}
//                 </span>
//                 {typingUsers[selectedUser.sender_id] && (
//                   <span className="text-xs text-yellow-500 ml-2 animate-pulse">
//                     typing...
//                   </span>
//                 )}
//               </div>
//               <button
//                 onClick={() => initiateCall(selectedUser)}
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
//               >
//                 📞 Call User
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900">
//               {messages.length === 0 ? (
//                 <div className="text-center text-gray-500 py-8">
//                   💬 No messages yet
//                   <p className="text-xs mt-2">Start a conversation!</p>
//                 </div>
//               ) : (
//                 messages.map((msg, idx) => {
//                   const isMe = msg.sender_id === currentPanditId;
//                   return (
//                     <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
//                       <div className={`max-w-[70%] px-4 py-2 rounded-xl ${isMe ? 'bg-yellow-500 text-white rounded-br-none' : 'bg-gray-700 text-white rounded-bl-none'}`}>
//                         <p className="text-sm break-words">{msg.content}</p>
//                         <p className="text-xs opacity-70 mt-1 text-right">
//                           {msg.created_at ? new Date(msg.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
//                           {isMe && (msg.is_read ? ' ✓✓' : ' ✓')}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             <div className="p-4 bg-gray-800 border-t border-gray-700 flex gap-2">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={handleMessageChange}
//                 onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//                 className="flex-1 p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
//                 placeholder="Type a message..."
//               />
//               <button
//                 onClick={sendMessage}
//                 disabled={!newMessage.trim()}
//                 className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
//             <div className="text-6xl mb-4">💬</div>
//             <p className="text-lg">Select a user from the left panel</p>
//             <p className="text-sm">to start chatting or make a call</p>
//           </div>
//         )}
//       </div>

//       {/* Incoming Call Notification */}
//       {incomingCall && (
//         <div className="fixed top-5 right-5 bg-gradient-to-r from-green-600 to-green-500 text-white p-4 rounded-xl shadow-2xl z-50 min-w-[300px] animate-bounce">
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
//               📞
//             </div>
//             <div>
//               <h4 className="font-bold">Incoming Call</h4>
//               <p className="text-sm opacity-90">{incomingCall.name} is calling you...</p>
//             </div>
//           </div>
//           <div className="flex gap-3">
//             <button 
//               onClick={acceptCall} 
//               className="flex-1 bg-white text-green-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
//             >
//               Accept
//             </button>
//             <button 
//               onClick={declineCall} 
//               className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
//             >
//               Decline
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Active Call */}
//       {activeCall && (
//     <VideoCallChat
//         currentUserId={currentPanditId}
//         targetUserId={activeCall.id}
//         targetName={activeCall.name}
//         isInitiator={activeCall.isInitiator}
//         incomingOffer={activeCall.incomingOffer}
//         onClose={() => setActiveCall(null)}
//     />
// )}
//     </div>
//   );
// };

// export default PanditUnifiedDashboard;

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import VideoCallChat from './VideoCallChat';
import { FaUserCircle, FaPhone, FaComment, FaBell, FaSpinner, FaCheckDouble, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { RiVideoCallFill } from 'react-icons/ri';

const PanditUnifiedDashboard = ({ currentPanditId = '8888888801' }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeCall, setActiveCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [typingUsers, setTypingUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  
  const messagesEndRef = useRef(null);
  const channelRef = useRef(null);

  const showNotification = (msg, type = 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchOnlineUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_online', true)
        .eq('role', 'user')
        .neq('id', currentPanditId);

      if (error) throw error;

      const formattedUsers = (data || []).map(user => ({
        id: user.id,
        sender_id: user.id,
        name: user.full_name || `User_${user.id.slice(-6)}`,
        phone: user.phone
      }));
      
      setOnlineUsers(formattedUsers);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (userId) => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase
        .from('unified_interactions')
        .select('*')
        .eq('action_type', 'message')
        .or(`and(sender_id.eq.${currentPanditId},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${currentPanditId})`)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setMessages(data || []);
      
      await supabase
        .from('unified_interactions')
        .update({ is_read: true })
        .eq('receiver_id', currentPanditId)
        .eq('sender_id', userId)
        .eq('action_type', 'message')
        .eq('is_read', false);
        
    } catch (err) {
      console.error('Load messages error:', err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    
    const messageData = {
      sender_id: currentPanditId,
      receiver_id: selectedUser.sender_id,
      action_type: 'message',
      content: newMessage,
      is_read: false,
      created_at: new Date().toISOString()
    };
    
    try {
      const { error } = await supabase.from('unified_interactions').insert([messageData]);
      if (!error) {
        setMessages(prev => [...prev, messageData]);
        setNewMessage('');
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } catch (err) {
      console.error('Send error:', err);
    }
  };

  const updateOnlineStatus = async (isOnline) => {
    try {
      await supabase
        .from('profiles')
        .update({ is_online: isOnline, last_seen: new Date().toISOString() })
        .eq('id', currentPanditId);
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  const handleTyping = (isTyping) => {
    if (!selectedUser || !channelRef.current) return;
    
    channelRef.current.httpSend({
      type: 'broadcast',
      event: 'typing',
      payload: { sender: currentPanditId, isTyping }
    });
  };

  useEffect(() => {
    if (!currentPanditId) return;
    
    updateOnlineStatus(true);
    fetchOnlineUsers();
    
    const channel = supabase.channel('pandit-dashboard');
    channelRef.current = channel;
    
    channel
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'unified_interactions' },
        (payload) => {
          const data = payload.new;
          console.log('New interaction:', data);
          
          if (data.action_type === 'message' && data.receiver_id === currentPanditId) {
            showNotification(`📩 New message from ${data.sender_id.slice(-6)}`, 'message');
            
            if (selectedUser && data.sender_id === selectedUser.sender_id) {
              setMessages(prev => [...prev, data]);
              setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
            }
            
            supabase
              .from('unified_interactions')
              .update({ is_read: true })
              .eq('id', data.id);
          }
          
          if (data.action_type === 'call_offer' && data.receiver_id === currentPanditId) {
            showNotification(`📞 Incoming call from ${data.sender_id.slice(-6)}`, 'call');
            setIncomingCall({
              from_user: data.sender_id,
              name: `User_${data.sender_id.slice(-6)}`,
              offer: data.payload?.offer,
              call_id: data.id
            });
          }
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: 'is_online=eq.true' },
        () => fetchOnlineUsers()
      )
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        if (payload.sender !== currentPanditId && payload.sender === selectedUser?.sender_id) {
          setTypingUsers(prev => ({ ...prev, [payload.sender]: payload.isTyping }));
          setTimeout(() => setTypingUsers(prev => ({ ...prev, [payload.sender]: false })), 2000);
        }
      })
      .subscribe();
    
    const interval = setInterval(fetchOnlineUsers, 10000);
    
    return () => {
      updateOnlineStatus(false);
      if (channelRef.current) supabase.removeChannel(channelRef.current);
      clearInterval(interval);
    };
  }, [currentPanditId, selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
    handleTyping(e.target.value.length > 0);
    if (window.typingTimeout) clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => handleTyping(false), 2000);
  };

  const initiateCall = async (user) => {
    setActiveCall({
      id: user.sender_id,
      name: user.name || `User_${user.sender_id.slice(-4)}`,
      isInitiator: true
    });
  };

  const acceptCall = () => {
    setActiveCall({
      id: incomingCall.from_user,
      name: incomingCall.name,
      isInitiator: false,
      incomingOffer: incomingCall.offer
    });
    setIncomingCall(null);
  };

  const declineCall = async () => {
    if (incomingCall) {
      await supabase.from('unified_interactions')
        .update({ is_active: false })
        .eq('id', incomingCall.call_id);
      setIncomingCall(null);
      showNotification('Call declined', 'info');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center text-white">
          <FaSpinner className="animate-spin text-4xl text-yellow-500 mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl shadow-lg animate-bounce flex items-center gap-2 ${
          notification.type === 'message' ? 'bg-blue-500' :
          notification.type === 'call' ? 'bg-green-500' : 'bg-gray-700'
        } text-white`}>
          <FaBell />
          {notification.msg}
        </div>
      )}

      {/* Left Panel - Online Users */}
      <div className="w-full md:w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-5 border-b border-gray-700 bg-gradient-to-r from-yellow-500 to-orange-500">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            🎯 Pandit Dashboard
          </h2>
          <p className="text-sm text-white/80 mt-1">ID: {currentPanditId}</p>
          <p className="text-xs text-green-200 flex items-center gap-1 mt-1">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
            Online
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
            <FaUserCircle /> Online Users ({onlineUsers.length})
          </h3>
          {onlineUsers.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No online users at the moment</p>
          ) : (
            <div className="space-y-2">
              {onlineUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => {
                    setSelectedUser(user);
                    loadMessages(user.sender_id);
                  }}
                  className={`p-3 rounded-xl cursor-pointer transition-all duration-200 flex justify-between items-center ${
                    selectedUser?.sender_id === user.sender_id 
                      ? 'bg-yellow-500/20 border border-yellow-500 shadow-lg' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex-1">
                    <div className="font-medium text-white flex items-center gap-2">
                      <FaUserCircle className="text-yellow-500" />
                      {user.name || `User_${user.sender_id.slice(-6)}`}
                    </div>
                    <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      Online
                    </div>
                    {typingUsers[user.sender_id] && (
                      <div className="text-xs text-yellow-500 animate-pulse mt-1 flex items-center gap-1">
                        <span>✏️</span> typing...
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); initiateCall(user); }}
                    className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700 transition flex items-center gap-1"
                  >
                    <FaPhone size={12} /> Call
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-white md:hidden">
                  <FaArrowLeft />
                </button>
                <div>
                  <span className="text-white font-semibold text-lg flex items-center gap-2">
                    <FaUserCircle className="text-yellow-500" />
                    {selectedUser.name || `User_${selectedUser.sender_id.slice(-6)}`}
                  </span>
                  {typingUsers[selectedUser.sender_id] && (
                    <span className="text-xs text-yellow-500 animate-pulse flex items-center gap-1 mt-1">
                      <span>✏️</span> typing...
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => initiateCall(selectedUser)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <FaPhone /> Call User
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-900 to-gray-800">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <FaComment className="text-4xl mx-auto mb-3 opacity-50" />
                  <p>No messages yet</p>
                  <p className="text-xs mt-2">Start a conversation!</p>
                </div>
              ) : (
                messages.map((msg, idx) => {
                  const isMe = msg.sender_id === currentPanditId;
                  return (
                    <div key={msg.id || idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                      <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                        isMe 
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-br-none' 
                          : 'bg-gray-700 text-white rounded-bl-none'
                      }`}>
                        <p className="text-sm break-words">{msg.content}</p>
                        <div className={`flex items-center justify-end gap-1 text-[10px] mt-1 ${isMe ? 'text-yellow-100' : 'text-gray-400'}`}>
                          <span>{msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}</span>
                          {isMe && (msg.is_read ? <FaCheckDouble /> : <FaCheck />)}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-gray-800 border-t border-gray-700 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={handleMessageChange}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 p-3 bg-gray-700 text-white rounded-xl outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="px-5 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <IoMdSend size={18} /> Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <FaComment className="text-6xl mb-4 opacity-30" />
            <p className="text-lg">Select a user from the left panel</p>
            <p className="text-sm">to start chatting or make a call</p>
          </div>
        )}
      </div>

      {/* Incoming Call Notification */}
      {incomingCall && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gray-800 rounded-2xl p-6 w-80 text-center border border-yellow-500/30 shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 animate-pulse">
              <FaPhone />
            </div>
            <h3 className="text-white font-bold text-lg">Incoming Call</h3>
            <p className="text-gray-400 text-sm mb-6">{incomingCall.name} is calling...</p>
            <div className="flex gap-3">
              <button onClick={acceptCall} className="flex-1 bg-green-600 text-white py-2.5 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
                <FaPhone /> Accept
              </button>
              <button onClick={declineCall} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-semibold hover:bg-red-700 transition">
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Call */}
      {activeCall && (
        <VideoCallChat
          currentUserId={currentPanditId}
          targetUserId={activeCall.id}
          targetName={activeCall.name}
          isInitiator={activeCall.isInitiator}
          incomingOffer={activeCall.incomingOffer}
          onClose={() => setActiveCall(null)}
        />
      )}
    </div>
  );
};

export default PanditUnifiedDashboard;