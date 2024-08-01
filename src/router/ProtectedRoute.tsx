import React from 'react';
import { useAuthContext } from '../providers/Auth.providers';
import { Navigate } from 'react-router-dom';


export const HideAuthRoute = ({children}:{children: React.ReactElement})=>{
    const { loading, accessToken} = useAuthContext();

   
    

    if(loading ) return <div>Loading...</div>;


    if(!accessToken) return children;

    return <Navigate to={"/"} />
}


export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    const { loading, accessToken } = useAuthContext();



    if(loading) return <div>Loading...</div>;

    if(accessToken){
        return children;
    }



    return <Navigate to={"/login"} />
};
