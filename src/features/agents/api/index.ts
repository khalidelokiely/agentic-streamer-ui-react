const BASE = 'http://localhost:80/v1/agents'

export const fetchAgents = (): Promise<Record<string, import('../../../types').AgentMetadata>> =>
    fetch(BASE).then(r => r.json())

export const fetchAgentRuns = (agentId: string | undefined) =>
    fetch(`${BASE}/${agentId}/runs`).then(r => r.json())

export const watchAgentRun = (agentRunId: string | undefined, latestOnly: boolean, clientId: string) =>
    fetch(`${BASE}/watch`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: clientId,
            agents: [
                {
                    id: agentRunId,
                    latest_only: latestOnly,
                },
            ],
        }),
    }).then(r => r.json())

export const unwatchAgentRun = (agentRunId: string | undefined, clientId: string) =>
    fetch(`${BASE}/watch/${agentRunId}?clientId=${clientId}`, {
        method: 'DELETE',
    }).then(r => r.json())
