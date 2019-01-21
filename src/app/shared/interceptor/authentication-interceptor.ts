import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.authenticationService.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = request.clone({
      params: request.params.set('auth', authToken)
    });

    const handle = next.handle(authReq);

    handle.subscribe(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.authenticationService.setAuthorizationToken(null);
            this.router.navigate(['sign-in']);
          }
        }
      }
    );

    // send cloned request with header to the next handler.
    return handle;
  }
}
