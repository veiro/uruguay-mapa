
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//import { PuntoMapa } from 'src/app/model/punto-mapa';
import { of } from 'rxjs';
import { PuntoMapa } from 'src/app/model/punto-mapa';



@Injectable()
export class MapaService {
  constructor( private http: HttpClient) {}

  obtenerPuntosCercanos(lat, long) {
    let puntos: PuntoMapa[] = [];
    // obras
    let pto = new PuntoMapa("-34.903396", "-56.183267", "construccion"," 0000101051944", null, null, null, null, null, null);
    puntos.push(pto);
    pto = new PuntoMapa("-34.901892", "-56.182173", "construccion", "0000778853895", null, null, null, null, null, null);
    puntos.push(pto);
    pto = new PuntoMapa("-34.902697", "-56.181669", "construccion", "0000778853895", null, null, null, null, null, null);
    puntos.push(pto);

    //industria
    pto = new PuntoMapa("-34.898132", "-56.171464", "industria", null, "RENDO CRUZ MARCELO SEBASTIAN", "1", "6055554", "110377870017", "1", null);
    puntos.push(pto);
    pto = new PuntoMapa("-34.896889", "-56.173043", "industria", null, "FERNANDEZ PEREZ VIVIANA SOLEDAD", "1", "3262171", "110196920012", "1", null);
    puntos.push(pto);
    pto = new PuntoMapa("-34.897115", "-56.175069", "industria", null, "DOGOMAR PANDO SOCIEDAD DE RESPONSABILIDAD LIMITADA", "1", "6391448", "217302550019", "1", null);
    puntos.push(pto);

    //sin-registro
    pto = new PuntoMapa("-34.894808", "-56.181226", "sin-registro", null, null, null, null, null, null, "macdonals");
    puntos.push(pto);
    return puntos;
  }
  obtenerPuntosObra(): Observable<PuntoMapa[]>{
    let puntos: PuntoMapa[] = [];
    return of(puntos);
  }
  obtenerPuntosIndustria(): Observable<PuntoMapa[]>{
    let puntos: PuntoMapa[] = [];

    // industria
    let pto = new PuntoMapa("-34.898132", "-56.171464", "industria", null, "RENDO CRUZ MARCELO SEBASTIAN", "1", "6055554", "110377870017", "1", null);
    puntos.push(pto);
    pto = new PuntoMapa("-34.896889", "-56.173043", "industria", null, "FERNANDEZ PEREZ VIVIANA SOLEDAD", "1", "3262171", "110196920012", "1", null);
    puntos.push(pto);

    for (let index = 0; index < 50; index++) {
      pto = new PuntoMapa("-34.897115", "-56.175069", "industria", null, " PRUEBA3 SOCIEDAD DE RESPONSABILIDAD LIMITADA", "1", "63914483", "2173025500193", "1", null);
      puntos.push(pto);
    }

    


    return of(puntos);
  }

  obtenerAeroupuertos(url: string): Observable<any> {
    let result =  this.http.get(url, {responseType: 'text'} );
    return result;
  }

  obtenerDatosDelPadron(url: string):any {
    return this.http.get(url);
  }
}

