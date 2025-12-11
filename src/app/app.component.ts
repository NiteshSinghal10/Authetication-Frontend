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
  googleAuthUrl = '';
  aud = 'vib3ly.shop';
  deviceType: 'WEB' | 'ANDROID' | 'IOS' = 'WEB';

  constructor (
    private loginService: LoginService,
    private route: ActivatedRoute
  ) { console.log("Hello")}


  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const code = params.get('code');
      const aud = params.get('aud') ?? this.aud;
      const deviceType: 'WEB' | 'ANDROID' | 'IOS' = (params.get('deviceType') as 'WEB' | 'ANDROID' | 'IOS' | null) ?? this.deviceType;
      const redirectUri = params.get('redirectUrl');
      const state =  params.get('state');

      console.log("step 1:", code, "Step 2:", state)


      if (code && state) {
        console.log("step 3")

        try {
          const stateObj = JSON.parse(decodeURIComponent(state));

          this.loginService.codeExchange(String(code), aud, deviceType).subscribe({
            next: (res) => {
              console.log("Token exchange successful:", res);
              

              if (stateObj.redirectUrl) {
                window.location.href = stateObj.redirectUrl;
              }
            },
            error: (error) => {
              // TODO: Add error modal here
              console.error("Token exchange failed:", error);
            }
          });
        } catch (error) {
          // TODO: Add error modal here
          console.error("Failed to parse state:", error);
        }
      } else if(redirectUri) {
        const stateData = {
          redirectUrl: redirectUri
        };

        const encodedState = encodeURIComponent(JSON.stringify(stateData));

        const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=1047484772005-2d8ekhh9ehcabiur6tordtqtfu1nlnig.apps.googleusercontent.com&redirect_uri=${environment.frontendBaseUrl}&response_type=code&scope=openid%20email%20profile%20https://www.googleapis.com/auth/user.gender.read%20https://www.googleapis.com/auth/user.birthday.read&access_type=offline&prompt=consent&state=${encodedState}`;
        this.googleAuthUrl = googleUrl;
      }
    });
  }

  get googleAuth() {
    return this.googleAuthUrl;
  }
}
