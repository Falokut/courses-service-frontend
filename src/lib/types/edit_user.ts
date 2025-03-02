export interface EditUserRequest {
    userId: number;
    fio: string;
    username: string;
    password: string;
    roleId: number;
}