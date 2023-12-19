import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();
  //Check for JWT Token
  let token = cookieService.get('Authorizer');
  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwtDecode(token);

    //Check if token is experied
    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();
    if (expirationDate < currentTime) {
      authService.logout();
      return router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url },
      });
    } else {
      //Token is still valid
      if (user.roles.includes('Writer')) {
        return true;
      } else {
        alert('Unauthorized');
        return false;
      }
    }
  } else {
    //Logout using authService
    authService.logout();
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  }
};
