import { Component, OnInit } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { PatientService, Patient } from "../service/patient.service";
import { Router } from "@angular/router";
import { Observable, of, BehaviorSubject } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  constructor(
    public patient: PatientService,
    public auth: AuthService,
    public router: Router
  ) {}

  page: BehaviorSubject<number> = new BehaviorSubject(1);
  per: BehaviorSubject<number> = new BehaviorSubject(2);
  patients: Observable<Patient[]>;

  ngOnInit() {
    this.page.subscribe(
      page => (this.patients = this.patient.list(page, this.per.getValue()))
    );

    this.per.subscribe(
      per => (this.patients = this.patient.list(this.page.getValue(), per))
    );
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(["/login"]);
    });
  }
}
