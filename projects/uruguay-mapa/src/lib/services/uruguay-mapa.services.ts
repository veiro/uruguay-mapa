import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class UruguayMapaServices {
  constructor(private http: HttpClient) {}
 
  obtenerDatosDelPadron(url: string):any {
    return this.http.get(url);
  }
}

