import type { WatchableAgentRun } from '../../../types'

const BASE = import.meta.env.VITE_API_BASE_URL + '/v1/agents'

console.log('API Base URL:', BASE)

export const getEventSourceUrl = (clientId: string) => `${BASE}/sse?clientId=${clientId}`

export const fetchAgents = (): Promise<Record<string, import('../../../types').AgentMetadata>> =>
    fetch(BASE).then(r => r.json())

export const fetchAgentRuns = (agentId: string | undefined) =>
    fetch(`${BASE}/${agentId}/runs`).then(r => r.json())

export const watchAgentRun = (clientID: string, agents: WatchableAgentRun[]) => {
    return fetch(`${BASE}/watch`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: clientID,
            agents: agents,
        }),
    })
}

export const unwatchAgentRun = (agentRunId: string | undefined, clientId: string) =>
    fetch(`${BASE}/watch/${agentRunId}?clientId=${clientId}`, {
        method: 'DELETE',
    }).then(r => r.json())
