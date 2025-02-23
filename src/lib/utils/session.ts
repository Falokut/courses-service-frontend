const sessionIdKey = "session"

export function SaveSessionId(sessionId: string) {
    localStorage.setItem(sessionIdKey, sessionId)
}

export function GetSessionId(): string | null {
    return localStorage.getItem(sessionIdKey)
}