import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { api } from '../../API/api';
import { useLocalSearchParams } from 'expo-router';


const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { userId } = useLocalSearchParams()
  console.log('userId:', userId); // Check if userId is passed correctly
  // const userId = route.params?.userId; // Pass user ID from login

  // const fetchMessages = async () => {
  //   try {
  //     const res = await api.get('/messages');
  //     console.log(res.data);
  //     setMessages(res.data);
  //   } catch (err) {
  //     console.error('Fetch error:', err);
  //   }
  // };

const sendMessage = async () => {
  if (!input.trim()) return;

  const newMessage = {
    senderId: userId,
    message: input,
  };

  try { 
    console.log(userId, input, api);
    const res = await api.post('/messages', newMessage);

    // Update messages list with the newly added message
    setMessages(prev => [...prev, res.data]);

    setInput('');
  } catch (err) {
    console.error('Send error:', err);
  }
};


  // useEffect(() => {
  //   fetchMessages();
  // }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.message, item.senderId === userId ? styles.mine : styles.their]}>
      <Text>{item.message}</Text>
      <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, padding: 8, marginRight: 8 },
  message: { marginVertical: 5, padding: 10, borderRadius: 10 },
  mine: { alignSelf: 'flex-end', backgroundColor: '#d1fcd3' },
  their: { alignSelf: 'flex-start', backgroundColor: '#f1f1f1' },
  timestamp: { fontSize: 10, color: '#888', marginTop: 4 }
});
