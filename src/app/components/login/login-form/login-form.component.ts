import { Component, OnInit } from "@angular/core";
import { AuthService, User, Session } from "src/app/service/auth.service";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  model: User = { email: "", password: "" };

  constructor(
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      _ => this.router.navigate(["/home"]),
      // TODO: traduzir mensagens
      ({ error }) => this.presentError(error.message)
    );
  }

  async presentError(error) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000
    });
    toast.present();
  }
}
