export interface AgentMetadata {
    type: string
    description: string
    category: string
    node_id_list: string[]
}

export interface AgentRun {
    agent_run_id: string
    task_name: string
    task_description: string
    created_by: string
    created_at: number
}

export interface AgentEvent {
    agent_run_id: string
    node_name: string
    status: 'THINKING' | 'EXECUTING_TOOL' | 'COMPLETE'
    payload: string
    timestamp: number
}

export interface WatchableAgentRun {
    id: string
    latest_only: boolean
}

export interface WatchAgentRunRequest {
    client_id: string
    agents: WatchableAgentRun[]
}