export class RegisterRequest {
    constructor() {
        this.username = "";
        this.password = "";
        this.fio = "";
        this.roleId = 0;
    };
    fio: string;
    username: string;
    password: string;
    roleId: number;
}