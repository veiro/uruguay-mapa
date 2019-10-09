import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pop-up-opciones',
  templateUrl: './pop-up-opciones.component.html',
  styleUrls: ['./pop-up-opciones.component.scss'],
})
export class PopUpOpcionesComponent implements OnInit {

  @Output() eventoCerrarPopUp: EventEmitter<boolean> = new EventEmitter();


  urlGoogleMaps = '';
  urlConsultaPadron = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cargarPopUp(coordenadas: number[], urlConsultaPadron: string) {
    this.urlGoogleMaps = 'https://maps.google.com/?q=' + coordenadas[1] + ',' + coordenadas[0];
    this.urlConsultaPadron = urlConsultaPadron;
  }

  cerrarPopUp() {
    this.eventoCerrarPopUp.emit(true);
  }

  buscarObrasPorPadron() {
  }

}



