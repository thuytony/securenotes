import React, { useState, ReactNode, ReactElement, useContext } from 'react';

type SecurityContextType = {
    isShowNote: boolean;
    setShowNote: React.Dispatch<React.SetStateAction<boolean>>;
};

const SecurityContext = React.createContext<SecurityContextType | undefined>(
    undefined,
);

function useSecurity(): SecurityContextType {
    const context = useContext(SecurityContext);
    if (!context) {
        throw new Error('useSecurity must be used within an SecurityProvider');
    }
    return context;
}

const SecurityProvider = (props: { children: ReactNode }): ReactElement => {
    const [isShowNote, setShowNote] = useState<boolean>(false);

    return (
        <SecurityContext.Provider
            {...props}
            value={{ isShowNote, setShowNote }}
        />
    );
};

export { SecurityProvider, useSecurity, SecurityContext };
