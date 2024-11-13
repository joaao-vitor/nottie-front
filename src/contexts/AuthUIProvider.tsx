import { createContext, ReactNode, useContext, useState } from 'react';

export enum SignType {
    SIGNIN,
    SIGNUP,
}

interface AuthUIProviderProps {
    children: ReactNode;
}

interface AuthUIContextType {
    isModalShown: boolean;
    setIsModalShown: (isModalShown: boolean) => void;
    signType: SignType;
    setSignType: (signType: SignType) => void;
}

const AuthUIContext = createContext<AuthUIContextType | undefined>(undefined);

export const AuthUIProvider: React.FC<AuthUIProviderProps> = ({
    children,
}) => {
    const [isModalShown, setIsModalShown] = useState(false);
    const [signType, setSignType] = useState(SignType.SIGNIN);


    return (
        <AuthUIContext.Provider value={{isModalShown, setIsModalShown, signType, setSignType}}>
            {children}
        </AuthUIContext.Provider>
    )
};

export const useAuthUI = (): AuthUIContextType => {
    
    const context = useContext(AuthUIContext);
    if (!context) {
        throw new Error('useAuthUI must be used within an AuthProvider');
    }
    return context;
}