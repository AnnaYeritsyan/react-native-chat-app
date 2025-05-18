
// import { View, Text, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Link, useLocalSearchParams } from 'expo-router';
// import { api } from '../API/api';
// import { AntDesign } from '@expo/vector-icons';
// export default function Chat() {
//     const { senderId, senderUsername, receiverId, receiverUsername } = useLocalSearchParams();
//     const [messages, setMessages] = useState([]);
//     const [text, setText] = useState('');
//     const [editingMessageId, setEditingMessageId] = useState(null);
//     const [editedText, setEditedText] = useState('');

//     // const fetchMessages = async () => {
//     //     console.log({
//     //         senderId,
//     //         recipientId: receiverId,
//     //         message: text,
//     //     });

//     //     try {
//     //         const res = await api.get(`/messages`, {
//     //             senderId,
//     //             recipientId: receiverId,
//     //             message: text,
//     //         });
//     //         console.log('Messages:', res);
//     //         setMessages(res.data);
//     //     } catch (error) {
//     //         console.error('Fetch messages error:', error.message);
//     //     }
//     // };

// const fetchMessages = async () => {
//     try {
//         const res = await api.get('/messages', {
//             params: {
//                 userId: senderId,
//                 contactId: receiverId,
//             },
//         });
//         console.log('Messages:', res.data);
//         setMessages(res.data);
//     } catch (error) {
//         console.error('Fetch messages error:', error.message);
//     }
// };


//     const sendMessage = async () => {
//         if (!text.trim()) return;
//         try {
//             await api.post('/messages', {
//                 senderId,
//                 recipientId: receiverId,
//                 message: text,
//             });
//             setText('');
//             fetchMessages(); // Refresh chat
//         } catch (error) {
//             console.error('Send message error:', error.message);
//         }
//     };

//     const startEditing = (message) => {
//         setEditingMessageId(message.id);
//         setEditedText(message.message);
//     };

//     const saveEditedMessage = async () => {
//         if (!editedText.trim()) return;
//         try {
//             await api.put(`/messages/${editingMessageId}`, {
//                 message: editedText,
//             });
//             setEditingMessageId(null);
//             setEditedText('');
//             fetchMessages();
//         } catch (error) {
//             console.error('Edit message error:', error.message);
//         }
//     };

//    useEffect(() => {
//     if (senderId && receiverId) {
//         fetchMessages();
//     }
// }, [senderId, receiverId]);


//     return (
//         <View style={{ flex: 1, padding: 16 }}>
//             <Link href={'/chat-users'} style={{ fontSize: 18, marginBottom: 8 }}>
//                 <AntDesign name="left" size={24} color="black" />
//             </Link>
//             <Text style={{ fontSize: 18, marginBottom: 8 }}>
//                 Chat with {receiverUsername}
//             </Text>

//             <FlatList
//                 data={messages}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => {
//                     const isSender = item.senderId === senderId;
//                     const isEditing = editingMessageId === item.id;

//                     return (
//                         <View
//                             style={{
//                                 alignSelf: isSender ? 'flex-end' : 'flex-start',
//                                 maxWidth: '80%',
//                                 marginVertical: 4,
//                             }}
//                         >
//                             {isEditing ? (
//                                 <>
//                                     <TextInput
//                                         value={editedText}
//                                         onChangeText={setEditedText}
//                                         style={{
//                                             borderWidth: 1,
//                                             borderRadius: 8,
//                                             padding: 8,
//                                             backgroundColor: '#fff',
//                                         }}
//                                     />
//                                     <View style={{ flexDirection: 'row', marginTop: 4 }}>
//                                         <Button title="Save" onPress={saveEditedMessage} />
//                                         <View style={{ width: 8 }} />
//                                         <Button
//                                             title="Cancel"
//                                             color="gray"
//                                             onPress={() => {
//                                                 setEditingMessageId(null);
//                                                 setEditedText('');
//                                             }}
//                                         />
//                                     </View>
//                                 </>
//                             ) : (
//                                 <TouchableOpacity
//                                     disabled={!isSender}
//                                     onLongPress={() => startEditing(item)}
//                                     style={{
//                                         backgroundColor: isSender ? '#dcf8c6' : '#eee',
//                                         padding: 8,
//                                         borderRadius: 8,
//                                     }}
//                                 >
//                                     <Text>{item.message}</Text>
//                                 </TouchableOpacity>
//                             )}
//                         </View>
//                     );
//                 }}
//             />

//             <TextInput
//                 value={text}
//                 onChangeText={setText}
//                 placeholder="Type a message..."
//                 style={{ borderWidth: 1, padding: 10, borderRadius: 8, marginVertical: 8 }}
//             />
//             <Button title="Send" onPress={sendMessage} />
//         </View>
//     );
// }
import { View, Text, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { api } from '../API/api';
import { AntDesign } from '@expo/vector-icons';

export default function Chat() {
    const { senderId, senderUsername, receiverId, receiverUsername } = useLocalSearchParams();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editedText, setEditedText] = useState('');
    const router = useRouter();

    const fetchMessages = async () => {
        if (!senderId || !receiverId) {
            console.warn('Missing senderId or receiverId');
            return;
        }

        try {
            const res = await api.get('/messages', {
                params: {
                    userId: senderId,
                    contactId: receiverId,
                },
            });
            console.log('Fetched messages:', res.data);
            setMessages(res.data);
        } catch (error) {
            console.error('Fetch messages error:', error.message);
        }
    };

    const sendMessage = async () => {
        if (!text.trim() || !senderId || !receiverId) return;

        try {
            await api.post('/messages', {
                senderId,
                recipientId: receiverId,
                message: text,
            });
            setText('');
            fetchMessages();
        } catch (error) {
            console.error('Send message error:', error.message);
        }
    };

    const startEditing = (message) => {
        setEditingMessageId(message.id);
        setEditedText(message.message);
    };

    const saveEditedMessage = async () => {
        if (!editedText.trim()) return;

        try {
            await api.put(`/messages/${editingMessageId}`, {
                message: editedText,
            });
            setEditingMessageId(null);
            setEditedText('');
            fetchMessages();
        } catch (error) {
            console.error('Edit message error:', error.message);
        }
    };

    useEffect(() => {
        if (senderId && receiverId) {
            fetchMessages();
        }
    }, [senderId, receiverId]);

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 8 }}>
                <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, marginBottom: 8 }}>
                Chat with {receiverUsername}
            </Text>

            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const isSender = item.senderId === senderId;
                    const isEditing = editingMessageId === item.id;

                    return (
                        <View
                            style={{
                                alignSelf: isSender ? 'flex-end' : 'flex-start',
                                maxWidth: '80%',
                                marginVertical: 4,
                            }}
                        >
                            {isEditing ? (
                                <>
                                    <TextInput
                                        value={editedText}
                                        onChangeText={setEditedText}
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 8,
                                            padding: 8,
                                            backgroundColor: '#fff',
                                        }}
                                    />
                                    <View style={{ flexDirection: 'row', marginTop: 4 }}>
                                        <Button title="Save" onPress={saveEditedMessage} />
                                        <View style={{ width: 8 }} />
                                        <Button
                                            title="Cancel"
                                            color="gray"
                                            onPress={() => {
                                                setEditingMessageId(null);
                                                setEditedText('');
                                            }}
                                        />
                                    </View>
                                </>
                            ) : (
                                <TouchableOpacity
                                    disabled={!isSender}
                                    onLongPress={() => startEditing(item)}
                                    style={{
                                        backgroundColor: isSender ? '#dcf8c6' : '#eee',
                                        padding: 8,
                                        borderRadius: 8,
                                    }}
                                >
                                    <Text>{item.message}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    );
                }}
            />

            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Type a message..."
                style={{ borderWidth: 1, padding: 10, borderRadius: 8, marginVertical: 8 }}
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
}
