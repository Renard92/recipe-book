import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../../shared/service/authentication.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public loading = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    this.loading = true;
    this.authenticationService
      .signUpWithEmailAndPassword(form.value.email, form.value.password)
      .finally(() => this.loading = false);
  }

  canSignIn(form: NgForm): boolean {
    return form.valid || !this.loading;
  }

}
