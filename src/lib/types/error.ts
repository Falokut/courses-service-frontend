export class ApiError {
    constructor(errorMessage: string) {
        this.errorMessage = errorMessage;
    }
    errorMessage: string;
}