import React, { Context, createContext, FormEvent, useContext, useState } from "react";

//  the OnboardData interface separately for clarity
export interface OnboardData {
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    gender: string;
    email: string;
}

//  the context type including the state setter function
export interface OnboardingContextType {
    onboardData: OnboardData;
    setOnboardData: any;
    handleInputChange:any;
}

// the context with a default value
const OnboardingContext: Context<OnboardingContextType> = createContext({
    onboardData: {
        username: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        gender: "",
        email: ""
    },
    setOnboardData: () => {}, // Default function
    handleInputChange:()=>{}
});

//the provider component
export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
    const [onboardData, setOnboardData] = useState<OnboardData>({
        email: "",
        firstName: "",
        lastName: "",
        gender: "",
        password: "",
        confirmPassword: "",
        username: "",
        phoneNumber: ""
    });

     const handleInputChange = (e:FormEvent) =>{
        const {name, value} = e.target as any
        setOnboardData({
            ...onboardData, [name]:value
        })
    }

    return (
        <OnboardingContext.Provider value={{ onboardData, setOnboardData, handleInputChange }}>
            {children}
        </OnboardingContext.Provider>
    );
};


export default OnboardingContext;


export const useOnboardContext = ()=> useContext(OnboardingContext)
