import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { ApiRequest } from '../services/api.services';
import { SERVER_BASE_URL } from '../config';
import { useQuery } from '@tanstack/react-query';

export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    accessToken: string | null;
    tokenDispatch: any;
   
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    loading: true,
    setLoading: () => { },
    accessToken: null,
    tokenDispatch:()=>{}
    
});

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    


    const authReducer = (_:any, action:any)=>{

       

        switch(action.type.toUpperCase()){
            case "LOGOUT":{
                return null
            }
            case "LOGIN":{
               
                return action.payload;
            }

            default:
                return null
        }


    }

    const [accessToken, tokenDispatch] = useReducer(authReducer, null);




    const { refetch, isPending, data }: any = useQuery({
        queryFn: () => new ApiRequest(`${SERVER_BASE_URL}/api/auth/refresh`, "post").apiRequest({}, {}, accessToken),
        queryKey: ["refetchToken"],
        enabled:false

    })

    
    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            (config) => {
                config.withCredentials = true;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Cleanup the interceptor on component unmount
        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, []);

    useEffect(() => {
        const refetchToken = () => {
            try {
                refetch()
            } catch (error) {
                console.error(error);
                tokenDispatch({type:"LOGOUT"})
                setIsAuthenticated(false);
                setLoading(false);

            }
        }

        refetchToken()
    }, []);

    useEffect(() => {
        if (data) {
            tokenDispatch({payload:data?.data?.accessToken, type:"LOGIN"});
            
        }
        setLoading(isPending)
    }, [data, isPending])

   


    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading, accessToken, tokenDispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
