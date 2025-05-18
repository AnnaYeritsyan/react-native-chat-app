// import { Link } from "expo-router";
// import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

// export default function StartPage() {
//   return (
//     <View className="flex-1 justify-center items-center">
//       <ActivityIndicator  size="large" color="#0000ff" />
//     </View>
//   );
// }
// app/index.js
import { View, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Button title="Login" onPress={() => router.push('/login')} />
      <Button title="Register" onPress={() => router.push('/register')} />
    </View>
  );
}


