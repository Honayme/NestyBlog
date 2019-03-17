import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger} from '@nestjs/common';
// https://github.com/nestjs/nest/issues/538
@Catch(HttpException)

export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const argument = host.switchToHttp();
        const request = argument.getRequest();
        const response = argument.getResponse();
        const status = exception.getStatus();

        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: exception.message.error || exception.message || null,
        };

        Logger.error(
            `${request.method} ${request.url}`,
            JSON.stringify(errorResponse),
            'ExceptionFilter',
        );

        response.status(status).json(errorResponse);
    }
}
