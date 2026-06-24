import React from 'react';

const SidebarContext = React.createContext({ isCollapsed: false });

// Export a custom hook for clean consumption inside your items
export const useSidebar = () => React.useContext(SidebarContext);

export const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    return (
        <SidebarContext.Provider value={{ isCollapsed }}>
            <nav
                className={`h-screen bg-slate-950 border-r border-slate-900 flex flex-col p-4 box-border shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'
                    }`}
                aria-label="Main Navigation"
            >
                {/* 1. Header Section */}
                <div className={`flex items-center gap-2 px-2 py-1 mb-6 ${isCollapsed ? 'flex-col justify-center' : 'justify-between'}`}>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse shrink-0" />
                        {!isCollapsed && (
                            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase duration-200 animate-fade-in">
                                Streamer.IO
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-slate-900 transition-colors focus:outline-none"
                        aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    >
                        {isCollapsed ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="m14 15 3-3-3-3" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="m16 9-3 3 3 3" /></svg>
                        )}
                    </button>
                </div>

                {/* 2. 🌟 Flexible Navigation Body Container */}
                <div className="flex-1 flex flex-col gap-1 min-h-0">
                    {children}
                </div>
            </nav>
        </SidebarContext.Provider>
    );
};