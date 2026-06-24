import * as React from 'react'
import { useParams, Link } from 'react-router-dom' // 🌟 Step 1: Import Link
import { fetchAgentRuns } from '../agents/api'
import type { AgentRun } from '../../types'
import { Button } from '@/components/Button'
import { Toast } from '@/components/Toast'
import { useWatchlist } from '@/context/WatchlistContext'

export const RunsView = () => {
    const { agentId } = useParams<{ agentId: string }>()
    const [runs, setRuns] = React.useState<AgentRun[]>([])
    const [loading, setLoading] = React.useState(true)
    const [toast, setToast] = React.useState<string | null>(null)
    const { toggleWatchAgent, isWatching } = useWatchlist();

    React.useEffect(() => {
        fetchAgentRuns(agentId)
            .then(setRuns)
            .finally(() => setLoading(false))
    }, [agentId])

    if (loading) return <p className="text-slate-400 text-sm">Loading runs...</p>

    return (
        <div className="space-y-6">
            {/* 🌟 THE INDUSTRY-STANDARD HEADER LAYOUT */}
            <div className="flex items-start gap-4">

                {/* Back Button Action Frame */}
                <Link
                    to="/" // 🌟 Step 2: Set explicit parent layout target
                    className="mt-1 p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all duration-150 shadow-sm shrink-0"
                    aria-label="Back to agents"
                >
                    {/* Back Arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </Link>

                {/* Main Identity Info (Sized automatically by content boundaries) */}
                <div className="flex gap-4 items-start flex-1 min-w-0">
                    <div className="text-slate-400 mt-1 shrink-0 bg-slate-950 p-2 rounded-lg border border-slate-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                    </div>
                    <div className="truncate">
                        <h1 className="text-2xl font-bold tracking-tight text-white truncate">Runs for Agent: {agentId}</h1>
                        <p className="text-slate-400 text-sm mt-1">List of runs executed by the selected agent.</p>
                    </div>
                </div>
            </div>

            {/* Run Cards Loop Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {runs.map(run => (
                    <div key={run.agent_run_id} className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-white font-semibold">{run.agent_run_id}</span>
                        </div>
                        <p className="text-slate-400 text-sm">{run.task_description}</p>
                        <div className="flex justify-start">
                            <Button onClick={() => {
                                toggleWatchAgent(run.agent_run_id)
                                setToast(`${isWatching(run.agent_run_id) ? 'Unwatched' : 'Watching'} run: ${run.agent_run_id}`)
                            }} label={isWatching(run.agent_run_id) ? 'Unwatch' : 'Watch'}>Run</Button>
                        </div>
                    </div>
                ))}
            </div>
            {toast && <Toast message={toast} onDone={() => setToast(null)} />}
        </div>
    )
}