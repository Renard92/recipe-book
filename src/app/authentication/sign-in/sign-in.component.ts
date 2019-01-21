import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/service/authentication.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public loading = false;
  private return: string;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => this.return = params['return'] || '/');
  }

  onSignIn(form: NgForm) {
    this.loading = true;
    this.authenticationService
      .signInpWithEmailAndPassword(form.value.email, form.value.password)
      .then(() => this.router.navigateByUrl(this.return))
      .finally(() => this.loading = false);
  }

  canSignIn(form: NgForm): boolean {
    return form.valid && !this.loading;
  }

}
