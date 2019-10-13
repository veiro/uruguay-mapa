import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'modal-capas',
  templateUrl: './modal-capas.component.html',
  styleUrls: ['./modal-capas.component.scss'],
})
export class ModalCapas implements OnInit {

  constructor(private modalCtrl: ModalController) { }


  @Input() inShowPadron: boolean;
  @Input() inCheckPadron: boolean;
  @Input() inShowRoutes: boolean;
  @Input() inCheckRoutes: boolean;
  @Input() inShowMapaCorreo: boolean;
  @Input() inCheckMapaCorreo: boolean;
  @Input() inShowMapaIDEUY: boolean;
  @Input() inCheckMapaIDEUY: boolean;
  @Input() inShowMapaOSM: boolean;
  @Input() inCheckMapaOSM: boolean;
  @Input() inShowMapaGoogle: boolean;
  @Input() inCheckMapaGoogle: boolean;

  checkPadron: boolean;
  checkRoutes: boolean;
  checkMapaCorreo: boolean;
  checkMapaIDEUY: boolean;
  checkMapaOSM: boolean;
  checkMapaGoogle: boolean;

  aplicarCambios = false;

  ngOnInit() {
    this.checkPadron = this.inCheckPadron;
    this.checkRoutes = this.inCheckRoutes;
    this.checkMapaCorreo = this.inCheckMapaCorreo;
    this.checkMapaIDEUY = this.inCheckMapaIDEUY;
    this.checkMapaOSM = this.inCheckMapaOSM;
    this.checkMapaGoogle = this.inCheckMapaGoogle;
  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true,
      'checkPadron' : this.checkPadron,
      'checkRoutes' : this.checkRoutes,
      'checkMapaCorreo' :  this.checkMapaCorreo,
      'checkMapaIDEUY' :  this.checkMapaIDEUY,
      'checkMapaOSM' :  this.checkMapaOSM,
      'checkMapaGoogle' : this.checkMapaGoogle
    });
  }

  mostrarApicarCambios() {
    this.aplicarCambios = true;
  }

  marcarCapaBase(capa) {
    switch (capa) {
      case 'CORREO':
        this.checkMapaIDEUY = false;
        this.checkMapaOSM = false;
        this.checkMapaGoogle = false;
        break;
      case 'IDEUY':
        this.checkMapaCorreo = false;
        this.checkMapaOSM = false;
        this.checkMapaGoogle = false;
        break;
      case 'OSM':
        this.checkMapaCorreo = false;
        this.checkMapaIDEUY = false;
        this.checkMapaGoogle = false;
        break;
      case 'GOOGLE':
        this.checkMapaCorreo = false;
        this.checkMapaIDEUY = false;
        this.checkMapaOSM = false;
        break;
    }
    this.mostrarApicarCambios();
  }
}



