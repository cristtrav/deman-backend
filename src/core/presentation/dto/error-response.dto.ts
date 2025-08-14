import { ResponseBase } from "./response-base";

export class ErrorResponseDTO extends ResponseBase { 
    readonly error: ErrorMetadata;

    private constructor(message: string, error: ErrorMetadata){
        super(false, message);
        this.error = error;
    }

    static error(message = 'Error en la operación', error: ErrorMetadata): ErrorResponseDTO {
        return new ErrorResponseDTO(message, error);
    }
}

export class ErrorMetadata {
    code: string;
    statusCode: number;
    details?: any;
}

export class ValidationErrorDetail {
    field: string;
    message: string;
    value?: any;
}

