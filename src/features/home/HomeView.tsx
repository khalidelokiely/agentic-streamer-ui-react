import * as React from 'react'
import { fetchAgents } from '../agents/api'
import type { AgentMetadata } from '../../types'
import { Button } from '@/components/Button'
import { useNavigate } from "react-router-dom";

export const HomeView = () => {
    const [agents, setAgents] = React.useState<Record<string, AgentMetadata>>({})
    const [loading, setLoading] = React.useState(true)

    const navigate = useNavigate();

    function navigateToAgentRuns(agentId: string) {
        navigate(`/agents/${agentId}/runs`);
    }

    React.useEffect(() => {
        fetchAgents()
            .then(setAgents)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p className="text-slate-400 text-sm">Loading agents...</p>


    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Available Agents</h1>
                <p className="text-slate-400 text-sm mt-1">Select an agent to monitor or subscribe to live executions.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Object.entries(agents).map(([id, meta]) => (
                    <div key={id} className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-white font-semibold">{id}</span>
                            <span className="text-xs font-mono text-cyan-400 bg-slate-800 px-2 py-0.5 rounded-full">
                                {meta.category}
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm">{meta.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {meta.node_id_list.map(node => (
                                <span key={node} className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                                    {node}
                                </span>
                            ))}
                        </div>
                        <div className="flex justify-start">
                            <Button onClick={() => navigateToAgentRuns(id)} label="Check Runs"></Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}