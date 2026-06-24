import * as React from 'react'
import type { AgentEvent } from '../../types'
import { Badge } from '../../components/Badge'
import { StatusIcon } from '../../components/StatusIcon'
import { ActionMenu } from '@/components/ActionMenu'
import { ActionMenuItem } from '@/components/ActionMenuItem'
import { useClientSession } from '@/hooks/useClientSession'
import { getEventSourceUrl, unwatchAgentRun, watchAgentRun } from '../agents/api'
import { useWatchlist } from '@/context/WatchlistContext'

const STATUS_STYLES: Record<string, string> = {
    THINKING: 'bg-yellow-900/40 text-yellow-300 border border-yellow-700/50',
    EXECUTING_TOOL: 'bg-indigo-900/40 text-indigo-300 border border-indigo-700/50',
    COMPLETE: 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50',
}

const STATUS_DOT: Record<string, string> = {
    THINKING: 'bg-yellow-400',
    EXECUTING_TOOL: 'bg-indigo-400',
    COMPLETE: 'bg-emerald-400',
}

export const WatchlistView = () => {
    const clientId = useClientSession()
    const [events, setEvents] = React.useState<Record<string, AgentEvent>>({})
    const [connected, setConnected] = React.useState(false)
    const { toggleWatchAgent } = useWatchlist();

    const UnwatchAgentRun = (agentRunId: string) => {
        setEvents(prev => {
            const updatedEvents = { ...prev }
            delete updatedEvents[agentRunId]
            unwatchAgentRun(agentRunId, clientId)
            return updatedEvents
        })
    }

    // Inside your component...
    React.useEffect(() => {
        // If using the unique session storage ID strategy, swap this string out
        let es: EventSource | null = null;

        // 1. Open the stream pipe first
        es = new EventSource(getEventSourceUrl(clientId));

        // 2. Leverage the live callback engine
        es.onopen = async () => {
            setConnected(true);
            console.log(`⚡ SSE Connection established for ${clientId}. Synchronizing watchlist...`);

            try {
                // Read current local state tracks
                const localData = window.localStorage.getItem("watchedAgents");
                const savedAgents = localData ? JSON.parse(localData) : [];

                // Only issue network traffic if the client actually has targets to track
                if (savedAgents.length > 0) {
                    const response = await watchAgentRun(clientId, savedAgents);

                    if (!response.ok) {
                        throw new Error(`Server responded with status ${response.status}`);
                    }
                    console.log("Watchlist synchronized successfully.");
                }
            } catch (error) {
                console.error("Failed to sync watchlist context after connection mount:", error);
            }
        };

        es.onerror = () => {
            setConnected(false);
        };

        // 3. Listen for core broadcast loops
        es.addEventListener('SSE_EVENT_AGENT_RUN_WATCH', (e) => {
            const event = JSON.parse(e.data);
            setEvents(prev => ({
                ...prev,
                [event.agent_run_id]: event
            }));
        });

        // 4. Isolated Cleanup boundary
        return () => {
            if (es) {
                es.close();
            }
            setConnected(false);
        };
    }, []); // Fires cleanly on layout mount
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Live Watch List</h1>
                    <p className="text-slate-400 text-sm mt-1">Real-time agent execution stream.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${connected ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
                    <span className="text-xs font-mono text-slate-400">
                        {connected ? 'CONNECTED' : 'DISCONNECTED'}
                    </span>
                </div>
            </div>

            {Object.keys(events).length === 0 && (
                <p className="text-slate-500 text-sm">
                    {connected ? 'Waiting for agent events...' : 'Connecting to stream...'}
                </p>
            )}

            <div className="space-y-2">
                {Object.values(events).map((event) => (
                    <div key={event.agent_run_id} className="rounded-lg border border-slate-800 bg-slate-900 p-4 flex items-start gap-4">
                        <StatusIcon className={STATUS_DOT[event.status] ?? 'bg-slate-500'} />
                        <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-white text-sm font-medium font-mono">{event.agent_run_id}</span>
                                <Badge
                                    label={event.status}
                                    className={STATUS_STYLES[event.status] ?? 'bg-slate-800 text-slate-300'}
                                >
                                    {null}
                                </Badge>
                            </div>
                            <p className="text-slate-400 text-xs">{event.node_name} — {event.payload}</p>
                        </div>
                        <span className="text-slate-600 text-xs font-mono shrink-0">
                            {new Date(event.timestamp).toLocaleTimeString()}
                        </span>
                        <ActionMenu>
                            <ActionMenuItem label="Unwatch" onClick={() => {
                                toggleWatchAgent(event.agent_run_id)
                                UnwatchAgentRun(event.agent_run_id)
                            }} />
                        </ActionMenu>
                    </div>
                ))}
            </div>
        </div>
    )
}