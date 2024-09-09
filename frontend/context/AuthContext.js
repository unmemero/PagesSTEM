import { func } from 'prop-types';
import React, {useContext,useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const AuthContext = React.createContext();

export function useAuth(){
    return userContext(AuthContext);
}

export function AuthPrvider({children}){
    const [currentUser,setCurrentUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const history = useHistory();

    //mockup login
    function login(){
        const user ={email,role:'user'};
        setCurrentUser(user);
        history.push('/dashboard');
    }

    function logout(){
        setCurrentUser(null);
        history.push('/login');
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            setCurrentUser(user);
        }
        setLoading(false);
    },[]);

    const value = {
        currentUser,
        login,
        logout
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}