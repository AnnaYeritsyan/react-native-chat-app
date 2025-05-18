import { View, TextInput, FlatList, TouchableOpacity, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { api } from '../API/api';
import { AntDesign } from '@expo/vector-icons';

export default function ChatUsers() {
  const { userId, username } = useLocalSearchParams();
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const router = useRouter();
  

  const searchUsers = async () => {
    try {
      const res = await api.get(`/users/search?query=${query}`);
      const filtered = res.data.filter(user => user.id !== userId);
      setUsers(filtered);
    } catch (err) {
      console.error('Search error:', err.message);
    }
  };

  useEffect(() => {
    searchUsers();
  }, []);

  const handleSelectUser = (receiver) => {
    router.push({
      pathname: '/chat',
      params: {
        senderId: userId,
        senderUsername: username,
        receiverId: receiver.id,
        receiverUsername: receiver.username,
      },
    });
  };

  return (
    <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ marginRight: 8, fontSize: 16 }}>{username}</Text>
        <AntDesign name="user" size={24} color="black" />
      </View>
      <TextInput
        placeholder="Search users..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={searchUsers} // allow Enter to search
        style={{ borderWidth: 1, marginBottom: 8, padding: 8, borderRadius: 8 }}
      />
      <Button title="Search" onPress={searchUsers} />

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelectUser(item)}
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderColor: '#ccc',
              marginTop: 8,
              backgroundColor: '#f2f2f2',
              borderRadius: 8
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}