import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage'; // Your custom hook path

export interface WatchableAgentRun {
    id: string;
    latest_only: boolean;
}

interface WatchlistContextType {
    watchedAgents: WatchableAgentRun[];
    toggleWatchAgent: (agentRunId: string) => void;
    isWatching: (agentRunId: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [watchedAgents, setWatchedAgents] = useLocalStorage<WatchableAgentRun[]>('watchedAgents', []);

    const toggleWatchAgent = (agentRunId: string) => {
        setWatchedAgents((prev) => {
            const isAlreadyWatching = prev.some(agent => agent.id === agentRunId);

            if (isAlreadyWatching) {
                // Clean removal without splice mutations
                return prev.filter(agent => agent.id !== agentRunId);
            } else {
                // Add new track targeting latest runs by default
                return [...prev, { id: agentRunId, latest_only: true }];
            }
        });
    };

    const isWatching = (agentRunId: string) => {
        return watchedAgents.some(agent => agent.id === agentRunId);
    };

    return (
        <WatchlistContext.Provider value={{ watchedAgents, toggleWatchAgent, isWatching }}>
            {children}
        </WatchlistContext.Provider>
    );
};

// Reusable hook to consume the data easily anywhere
export const useWatchlist = () => {
    const context = useContext(WatchlistContext);
    if (!context) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    return context;
};