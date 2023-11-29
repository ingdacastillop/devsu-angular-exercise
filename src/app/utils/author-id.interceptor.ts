import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class AuthorIdInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<unknown>, handler: HttpHandler) {
    const headers = request.headers.append(
      'authorId',
      String(environment.authorId)
    );

    return handler.handle(request.clone({ headers }));
  }
}
