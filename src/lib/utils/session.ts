const sessionIdKey = "session";
const sessionCookieName = "sessionId";

/**
 * Сохраняет sessionId в localStorage и устанавливает куку
 * @param sessionId - ID сессии
 */
export function SaveSessionId(sessionId: string) {
    localStorage.setItem(sessionIdKey, sessionId);
    document.cookie = `${sessionCookieName}=${sessionId}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
}

/**
 * Получает sessionId из localStorage или куки
 * @returns sessionId или null
 */
export function GetSessionId(): string | null {
    let sessionId = localStorage.getItem(sessionIdKey);

    if (!sessionId) {
        const match = document.cookie.match(new RegExp(`(^| )${sessionCookieName}=([^;]+)`));
        sessionId = match ? match[2] : null;

        if (sessionId) {
            localStorage.setItem(sessionIdKey, sessionId);
        }
    }

    return sessionId;
}

/**
 * Удаляет sessionId из localStorage и куки
 */
export function DeleteSessionId() {
    localStorage.removeItem(sessionIdKey);

    document.cookie = `${sessionCookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict`;
}
