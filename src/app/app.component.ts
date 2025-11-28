import { Component, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';

import { environment } from '../environments/environment';
import { LoginService } from '../app/services';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=1047484772005-2d8ekhh9ehcabiur6tordtqtfu1nlnig.apps.googleusercontent.com&redirect_uri=${environment.frontendBaseUrl}&response_type=code&scope=openid%20email%20profile%20https://www.googleapis.com/auth/user.gender.read%20https://www.googleapis.com/auth/user.birthday.read&access_type=offline&prompt=consent`;
  aud = 'vib3ly.shop';
  deviceType: 'WEB' | 'ANDROID' | 'IOS' = 'WEB';

  constructor (
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const code = params.get('code');
      const aud = params.get('code') ?? this.aud;
      const deviceType: 'WEB' | 'ANDROID' | 'IOS' = (params.get('deviceType') as 'WEB' | 'ANDROID' | 'IOS' | null) ?? this.deviceType;
      const redirectUri = params.get('redirectUri') ?? '';

      if (code) {
        this.loginService.codeExchange(String(code), aud, deviceType).subscribe(res => {
          if(redirectUri) {
            window.location.assign(redirectUri)
          }
        });
      }
    });
  }
}
