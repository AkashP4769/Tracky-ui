enum TrackingStatus {
    tracking = 'tracking',
    finished = 'finished',
    error = 'error',
}

interface Session {
    id: number
    app_id: number
    user_id: number
    custom_session: boolean
    started_at: Date
    ended_at: Date | null
    duration: number | null
    status: TrackingStatus
}

interface OnlineApp {
    app_name: string
    pid: number
    process_name: string
    sessions: Session
}

export type { OnlineApp, Session, TrackingStatus }