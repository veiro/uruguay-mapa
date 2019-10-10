import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'modal-capas',
  templateUrl: './modal-capas.component.html',
  styleUrls: ['./modal-capas.component.scss'],
})
export class ModalCapas implements OnInit {

  constructor(private modalCtrl: ModalController) { }


  @Input() inCheckPadron: boolean;
  @Input() inCheckMapaCorreo: boolean;
  @Input() inCheckMapaIDEUY: boolean;
  @Input() inCheckMapaOSM: boolean;
  @Input() inCheckMapaGoogle: boolean;

  checkPadron: boolean;
  checkMapaCorreo: boolean;
  checkMapaIDEUY: boolean;
  checkMapaOSM: boolean;
  checkMapaGoogle: boolean;

  aplicarCambios = false;

  ngOnInit() {
    this.checkPadron = this.inCheckPadron;
    this.checkMapaCorreo = this.inCheckMapaCorreo;
    this.checkMapaIDEUY = this.inCheckMapaIDEUY;
    this.checkMapaOSM = this.inCheckMapaOSM;
    this.checkMapaGoogle = this.inCheckMapaGoogle;
  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true,
      'checkPadron' : this.checkPadron,
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



