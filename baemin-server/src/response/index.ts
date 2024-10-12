export class Response<T>{
    data: T | any;
    statusCode: string;
    message: string;
    constructor(statusCode: string, message: string, data: T | any) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        return this
    }
}