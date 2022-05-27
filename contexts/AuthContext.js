import React, { useState, useEffect, createContext,useContext } from "react";
import axios from 'axios';


const AuthContext = createContext({
    auth: null,
    setAuth: () => {},
    user: null,
});

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [auth,setAuth] = useState(null);

    useEffect(() => {
        const isAuth = async() => {
            try{
                const res = await axios.get(
                    'http://localhost:5000/api/auth/logged-user/',
                    {
                        withCredentials:true,
                    }
                );
                setUser(res.data.username);
            } catch(error){
                setUser(null);
            };
        };

        isAuth();
    },[auth]);

    return(
        <AuthContext.Provider value={{auth,setAuth,user}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;
