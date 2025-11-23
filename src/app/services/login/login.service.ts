import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http'
import { NetworkService } from '../network/network.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private networkService: NetworkService) { }

  codeExchange(code: string, aud: string, deviceType: 'ANDROID' | 'IOS' | 'WEB') {
    let params = new HttpParams();

    params = params.appendAll({
      code,
      aud,
      deviceType
    });

    return this.networkService.get('/auth/token', params)
  }
}
