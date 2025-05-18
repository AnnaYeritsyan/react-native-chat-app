// import { router, Slot, Stack, useSegments } from "expo-router";
// import "../global.css";
// import { View } from "react-native";
// import {AuthContextProvider, useAuth} from "../context/authContext";
// import { useEffect } from "react";

// const MainLayout = () => {
//   const {isAuthenticated} = useAuth();
//   const segments = useSegments();

//   useEffect(() => {
// if(typeof isAuthenticated == 'undefined') return;
// const inApp = segments[0] ==  "(app)";
// if(isAuthenticated && !inApp){
// router.replace("home");
//   }else if(!isAuthenticated == false){

//     router.replace("signIn");
//   }
// },[isAuthenticated])
//   return <Slot/>
// }


// export default function _layout() {
//   return (
//    <AuthContextProvider>
//       <MainLayout/>
//     </AuthContextProvider>
//   )

// }

// app/_layout.js
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack />;
}
