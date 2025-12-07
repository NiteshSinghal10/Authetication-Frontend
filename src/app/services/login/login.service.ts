import { Injectable } from '@angular/core';
import { NetworkService } from '../network/network.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private networkService: NetworkService) { }

  codeExchange(code: string, aud: string, deviceType: 'ANDROID' | 'IOS' | 'WEB') {
    return this.networkService.get('/auth/token', { code, aud, deviceType })
  }
}
