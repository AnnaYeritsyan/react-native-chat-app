import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { api } from '../API/api';

export default function Chat() {
  const { username } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const res = await api.get('/messages');
    setMessages(res.data.reverse());
  };

  const sendMessage = async () => {
    if (!message) return;
    await api.post('/messages', { username, text: message });
    setMessage('');
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            <Text style={{ fontWeight: 'bold' }}>{item.username}:</Text> {item.text}
          </Text>
        )}
      />
      <TextInput placeholder="Type message..." value={message} onChangeText={setMessage} />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}
