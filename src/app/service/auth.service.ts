import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable, from } from "rxjs";
import { Storage } from "@ionic/storage";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  session: Session;

  redirectUrl: string;
  constructor(public http: HttpClient) {}

  login({ email, password }): Observable<Object> {
    return this.http
      .post(`${environment.API_ENDPOINT}/v1/users/signin`, {
        user: {
          email,
          password
        }
      })
      .pipe(
        tap((data: Response) => {
          this.session = {
            token: data.auth.token,
            council_number: data.auth.user.council_number,
            entity_id: data.auth.user.entities[0].id
          };
          localStorage.setItem("session", JSON.stringify(this.session));
        })
      );
  }

  logout() {
    return this.http.delete(`${environment.API_ENDPOINT}/v1/users/logout`).pipe(
      tap(() => {
        this.session = null;
        localStorage.setItem("session", JSON.stringify(this.session));
      })
    );
  }
}

export type User = {
  email: string;
  password: string;
};

type Response = {
  auth: {
    token: string;
    user: {
      council_number: string;
      entities: [
        {
          id: string;
        }
      ];
    };
  };
};

export type Session = {
  token: string;
  council_number: string;
  entity_id: string;
};
