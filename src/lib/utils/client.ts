import { env } from '$env/dynamic/public';
import { apiFetch } from "./fetch"

export class Client {
    baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    public PostJSON(endpoint: string, reqObj: any, additionalHeaders?: Headers): Promise<Response> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        if (additionalHeaders != undefined && additionalHeaders != null) {
            additionalHeaders.forEach((value, name) => {
                headers.append(name, value)
            })
        }
        let reqOptions: RequestInit = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(reqObj),
        }

        return apiFetch(this.baseUrl + endpoint, reqOptions)
    }

    public Get(endpoint: string, queryParams?: any, headers?: Headers): Promise<Response> {
        let reqOptions: RequestInit = {
            method: "GET",
            headers: headers
        }
        let query = this.getQuery(queryParams)
        return apiFetch(this.baseUrl + endpoint + query, reqOptions)
    }

    public Delete(endpoint: string, queryParams?: any, headers?: Headers): Promise<Response> {
        let reqOptions: RequestInit = {
            method: "DELETE",
            headers: headers
        }
        let query = this.getQuery(queryParams)
        return apiFetch(this.baseUrl + endpoint + query, reqOptions)
    }

    public UserBearerAuthHeader(token: string): Headers {
        let headers = new Headers();
        headers.set("Authorization", 'Bearer ' + token)
        return headers
    }

    private getQuery(params?: any): string {
        if (params == undefined || params == null)
            return ""
        return "?" + new URLSearchParams(params).toString();
    }
}


const apiPath = env.PUBLIC_API_PATH ? env.PUBLIC_API_PATH : "";
export let DefaultClient = new Client(apiPath);