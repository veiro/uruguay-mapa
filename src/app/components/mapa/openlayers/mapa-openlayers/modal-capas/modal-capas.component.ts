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
  @Input() inCheckMapaGoogle: boolean;

  checkPadron: boolean;
  checkMapaCorreo: boolean;
  checkMapaGoogle: boolean;

  aplicarCambios = false;
  ngOnInit() {
    this.checkPadron = this.inCheckPadron;
    this.checkMapaCorreo = this.inCheckMapaCorreo;
    this.checkMapaGoogle = this.inCheckMapaGoogle;
  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true,
      'checkPadron' : this.checkPadron,
      'checkMapaCorreo' :  this.checkMapaCorreo,
      'checkMapaGoogle' : this.checkMapaGoogle
    });
  }

  mostrarApicarCambios(){
    this.aplicarCambios = true;
  }

  desMarcarCorreo() {
    this.checkMapaCorreo = !this.checkMapaCorreo;
    this.mostrarApicarCambios();
  }

  desMarcarGoogle() {
    this.checkMapaGoogle = !this.checkMapaGoogle;
    this.mostrarApicarCambios();
  }

}



