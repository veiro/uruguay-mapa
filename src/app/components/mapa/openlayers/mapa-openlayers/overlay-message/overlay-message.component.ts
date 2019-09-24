import { PuntoMapa } from './../../../../../model/punto-mapa';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-overlay-message',
  templateUrl: './overlay-message.component.html',
  styleUrls: ['./overlay-message.component.scss'],
})
export class OverlayMessageComponent implements OnInit {

  @Input() puntoMensaje: OverlayMensaje;
  @Output() eventoCerrarPopUp: EventEmitter<boolean> = new EventEmitter();


  esObra = false;
  esIndustria = false;

  nroObra: string;
  denominacion: string;
  aportacion: string;
  empresa: string;
  contribuyente: string;
  local: string;
  identificador: string;

  constructor() { }

  ngOnInit() {
  }

  cargarPopUp(){
    this.esObra = false;
    this.esIndustria = false;
    var propiedades = this.puntoMensaje.propiedades;
    
    if (propiedades.Tipo == 'industria') {
      this.esIndustria = true;
      this.denominacion = propiedades.Denominacion;
      this.empresa = propiedades.Empresa.trim();
      this.aportacion = propiedades.Aportacion.trim();
      this.contribuyente = propiedades.Contribuyente.trim();
      this.local = propiedades.Local.trim();

    } else if (propiedades.Tipo == 'construccion') {
      this.esObra = true;
      this.nroObra = propiedades.Obra.trim();
    }


  }
  cerrarPopUp(){
    this.eventoCerrarPopUp.emit(true);
  }

}

export class OverlayMensaje {
  id: string;
  propiedades: any;
}


