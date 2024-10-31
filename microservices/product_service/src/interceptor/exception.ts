
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): Observable<any> {
        const ctx = host.switchToRpc(); // Sử dụng switchToRpc cho microservices
        const errorResponse = {
            statusCode: exception instanceof HttpException ? exception.getStatus() : 500,
            message: exception.message || 'Internal server error',
            timestamp: new Date().toISOString(),
            path: ctx.getContext().getPattern(), // Lấy pattern (route) của RPC
        };

        // Trả về lỗi dưới dạng Observable cho RPC
        return throwError(() => new RpcException(errorResponse));
    }
}
