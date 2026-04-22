import React, { createContext, useState } from "react";

export const DashboardLayoutContext = createContext();

const DashboardLayoutProvider = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <DashboardLayoutContext.Provider
            value={{
                sidebarOpen,
                setSidebarOpen,
                searchOpen,
                setSearchOpen,
            }}
        >
            {children}
        </DashboardLayoutContext.Provider>
    );
};

export default DashboardLayoutProvider;