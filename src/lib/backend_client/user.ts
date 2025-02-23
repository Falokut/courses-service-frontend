import type { LoginRequest } from "$lib/types/login";
import { DefaultClient } from "$lib/utils/client";
import { SaveSessionId } from "$lib/utils/session";

const loginEndpoint = "/auth/login"
export async function Login(loginRequest: LoginRequest): Promise<boolean> {
    let isSuccess = false
    await DefaultClient.PostJSON(loginEndpoint, loginRequest)
        .then(r => r.json())
        .then(r => { SaveSessionId(r.sessionId); isSuccess = true })
    return isSuccess
}