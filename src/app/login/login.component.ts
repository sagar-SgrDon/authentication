import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  invalidLogin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  signIn(credentials: any) {
    this.authService.login(credentials).subscribe((result: any) => {
      if (result) {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        console.log(returnUrl);
        this.router.navigate([returnUrl || '/']);
      } else this.invalidLogin = true;
    });
  }
}
