import type { Role } from "$lib/types/role";
import { GetRole } from "$lib/types/roles";
import { DefaultClient } from "$lib/utils/client";


let roles: Role[] = [];

const getRolesEndpoint = "/roles"
export async function GetRoles(): Promise<Role[]> {
    if (roles.length > 0) {
        return roles;
    }
    let respRoles: any[] = await DefaultClient.Get(getRolesEndpoint).then(r => r.json());

    respRoles.forEach((v) => {
        let roleName: string = GetRole(v.name)
        if (roleName == "") return;
        roles.push({
            id: v.id,
            name: roleName,
        })
    })

    return roles;
}