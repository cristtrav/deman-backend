export abstract class BaseApiResponse {
    readonly success: boolean;
    readonly timestamp: string;
    readonly message: string;

    constructor(success: boolean, message: string){
        this.success = success;
        this.message = message;
        this.timestamp = new Date().toISOString();
    }
}