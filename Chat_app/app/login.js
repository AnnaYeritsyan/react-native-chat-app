import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { api } from '../API/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
 const { userId } = useLocalSearchParams()
 console.log('userId:', userId); 

  const handleLogin = async () => {
    try {
      const res = await api.post('/login', { email, password });
      if (res.data.success) {
      console.log(res.data)
        router.push({
          pathname: '/screens/ChatScreen',
          params: { userId: res.data.user.id } // Pass logged-in user ID
        });

      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Login failed: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <Text>
        Don't have an account? <Link href="/Register">Register</Link>
      </Text>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    </View>

  );
}
