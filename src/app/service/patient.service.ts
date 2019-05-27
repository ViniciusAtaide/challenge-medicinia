import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService, Session } from "./auth.service";
import { environment } from "src/environments/environment";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PatientService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  list(page, per) {
    const session: Session = JSON.parse(localStorage.getItem("session"));
    return this.http.get(`${environment.API_ENDPOINT}/v1/internal-patients`, {
      params: {
        entity_id: session.entity_id,
        responsible_crm: session.council_number,
        page,
        per
      }
    });
  }
}

export type Patient = {
  name: string;
};
