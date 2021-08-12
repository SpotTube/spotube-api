import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const data = next.handle().pipe(
      map((data = {}) => {
        // Paginate results
        if (data && typeof data === 'object' && 'docs' in data) {
          const { docs, ...meta } = data;
          return { data: docs, meta };
        }

        return { data };
      }),
    );

    return data;
  }
}
