export function GetRole(roleName: string): string {
    switch (roleName) {
        case 'student':
            return 'студент'
        case 'lector':
            return 'лектор'
        case 'admin':
            return 'администратор'
        default:
            return ''
    }
}