import type { LoginRequest } from "$lib/types/login";
import type { RegisterRequest } from "$lib/types/register";
import { DefaultClient } from "$lib/utils/client";
import { SaveSessionId, GetSessionId } from "$lib/utils/session";

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

const getRoleEndpoint = "/user/get_role"
export async function GetUserRole(): Promise<string> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.Get(getRoleEndpoint, null, DefaultClient.UserBearerAuthHeader(sessionId)).
        then(r => r.json()).
        then(r => r.roleName)
}