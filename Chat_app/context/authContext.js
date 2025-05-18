import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import  {doc,  getDoc, setDoc} from "firebase/firestore"
import { db, userRef } from "../firebaseConfig";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
const unsub = onAuthStateChanged(auth, (user) => {
    if (user) {
        setUser(user);
        setIsAuthenticated(true);
    } else {
        setUser(null);
        setIsAuthenticated(false);
    }
    return unsub
})
        
    },[])

    const login = async(email, password)=>{
        try{

        }
        catch (error) {
            console.error("Login error:", error);
        }
    }
     const logout = async()=>{
        try{

        }
        catch (error) {
            console.error("Login error:", error);
        }
    }


     const register = async(email, password, username, profileUrl)=>{
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            // setUser(response?.user);
            // setIsAuthenticated(true);
            await setDoc(doc(db, "users", response.user.uid), {
                email,
                username,
                profileUrl,
                uid: response.user.uid
            });
            return {success: true, user: response?.user};
        }
        catch (e) {
          let msg = e.message;
          if(msg.includes('(auth/invalid-email)')) msg='Invalid email';
          return {success: false,  msg};
        }
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}


export  const useAuth = () => {
    const value = useContext(AuthContext);
    if (!value ) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return value;
}