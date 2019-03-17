import {ExecutionContext, Injectable, Logger, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        call$: Observable<any>,
    ): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;
        const now = Date.now();

        return call$.pipe(
            tap(() => Logger.log(
                `${method} ${url} ${Date.now() - now}ms`, context.getClass().name,
                ),
            ),
        );
    }
}
