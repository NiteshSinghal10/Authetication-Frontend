import { Component, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';

import { environment } from '../environments/environment';
import { LoginService } from '../app/services';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=1047484772005-2d8ekhh9ehcabiur6tordtqtfu1nlnig.apps.googleusercontent.com&redirect_uri=${environment.frontendBaseUrl}&response_type=code&scope=openid%20email%20profile%20https://www.googleapis.com/auth/user.gender.read&https://www.googleapis.com/auth/user.birthday.read&access_type=offline&prompt=consent`;

  constructor (
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const code = params.get('code');

      if (code) {
        this.loginService.codeExchange(String(code), 'Nitesh.com', 'WEB').subscribe(res => console.log("step 2:", res));
      }
    });
  }
}
