import { Component, OnInit } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { PatientService, Patient } from "../service/patient.service";
import { Observable, from } from "rxjs";
import { Router } from "@angular/router";

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

  patients = [{ name: "teste" }, { name: "teste" }, { name: "teste" }];
  page: number = 1;
  per: number = 5;

  ngOnInit() {
    this.patient.list(this.page, this.per);
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(["/login"]);
    });
  }
}
