import type { LoginRequest } from "$lib/types/login";
import type { User } from "$lib/types/user";
import type { RegisterRequest } from "$lib/types/register";
import { DefaultClient } from "$lib/utils/client";
import { SaveSessionId, GetSessionId, DeleteSessionId } from "$lib/utils/session";

const loginEndpoint = "/auth/login"
export async function Login(loginRequest: LoginRequest): Promise<boolean> {
    let isSuccess = false
    await DefaultClient.PostJSON(loginEndpoint, loginRequest)
        .then(r => r.json())
        .then(r => { SaveSessionId(r.sessionId); isSuccess = true })
    return isSuccess
}

const registerEndpoint = "/auth/register"
export async function Register(registerRequest: RegisterRequest): Promise<boolean> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    let r = await DefaultClient.PostJSON(registerEndpoint, registerRequest, DefaultClient.UserBearerAuthHeader(sessionId))
    return r.ok
}

const getRoleEndpoint = "/users/get_role"
export async function GetUserRole(): Promise<string> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.Get(getRoleEndpoint, null, DefaultClient.UserBearerAuthHeader(sessionId)).
        then(r => r.json()).
        then(r => r.roleName)
}

const getUsersEndpoint = "/users"
export async function GetUsers(limit: number, offset: number): Promise<User[]> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    let query = {
        'limit': limit,
        'offset': offset,
    }
    return await DefaultClient.Get(getUsersEndpoint, query, DefaultClient.UserBearerAuthHeader(sessionId)).
        then(r => r.json())
}

const deleteUserEndpoint = "/users/"
export async function DeleteUser(userId: number): Promise<boolean> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    let r = await DefaultClient.Delete(deleteUserEndpoint + userId, null, DefaultClient.UserBearerAuthHeader(sessionId))
    return r.ok
}

const logoutEndpoint = "/auth/logout"
export async function Logout(): Promise<boolean> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    let ok = await DefaultClient.Post(logoutEndpoint, DefaultClient.UserBearerAuthHeader(sessionId)).
        then(r => r.ok)
    if (ok) {
        DeleteSessionId()
    }
    return ok
}

const terminateUserSessionEndpoint = "/auth/terminate_session"
export async function TerminateUserSession(id: string): Promise<boolean> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.PostJSON(
        terminateUserSessionEndpoint,
        { sessionId: id },
        DefaultClient.UserBearerAuthHeader(sessionId),
    ).then(r => r.ok)
}

const getUserSessionsEndpoint = "/auth/sessions"
export async function GetUserSessions(): Promise<any[]> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.Get(
        getUserSessionsEndpoint,
        null,
        DefaultClient.UserBearerAuthHeader(sessionId),
    ).then(r => r.json())
}

