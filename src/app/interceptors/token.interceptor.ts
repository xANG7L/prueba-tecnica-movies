import { HttpInterceptorFn } from "@angular/common/http";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2I1NWVjYzRiZjc1M2VmZjdjYjhhNWY2ZDhkMzk2MyIsIm5iZiI6MTc1MDM4NjM5NC4xODEsInN1YiI6IjY4NTRjNmRhNDg0ZjFjN2U2Zjg0ZTMwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QzyJWm4bzMaEb5sVv3P7h0ZyDffsPdqZOi9Jtl_oLN0";
  
    if (token != undefined) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(authReq);
    }
    return next(req);
  };