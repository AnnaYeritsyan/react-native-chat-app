import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { api } from '../../API/api';

const ChatsScreen = () => {
  const navigation = useNavigation();
  const { userId } = useLocalSearchParams(); // userId is a string
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await api.get(`/users/search?query=${searchQuery}`);
      setResults(res.data.filter(u => u.id !== userId)); // ✅ use userId directly
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleStartChat = async (receiver) => {
    try {
      const res = await api.post('/chats/start', {
        senderId: userId, // ✅ correct
        receiverId: receiver.id
      });

      navigation.navigate('chat', {
        chatId: res.data.id,
        userId,
        contactId: receiver.id
      });
    } catch (err) {
      console.error('Chat start error:', err);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Search username..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 5
        }}
      />
      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleStartChat(item)}
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderColor: '#ccc'
            }}
          >
            <Text>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChatsScreen;
