import { PuntoMapa } from '../../../../../model/punto-mapa';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'modal-cluster',
  templateUrl: './modal-cluster.component.html',
  styleUrls: ['./modal-cluster.component.scss'],
})
export class ModalClusterComponent implements OnInit {

  @Input() info: Informacion;

  constructor(private modalCtrl: ModalController) { }


  ngOnInit() { }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}

export class Informacion {
  puntos: any;
}


