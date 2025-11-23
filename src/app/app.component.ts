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
  title = environment.environment;

  constructor (
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const code = params.get('code');

      if (code) {
        this.loginService.codeExchange(String(code), 'Nitesh.com', 'WEB');
      }
    });
  }
}
