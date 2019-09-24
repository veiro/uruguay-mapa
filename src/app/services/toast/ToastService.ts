import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable()
export class ToastService {
  constructor(public toastController: ToastController) {}

  async pushError(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 7000,
      color: "danger",
      cssClass: "espacio"
    });
    toast.present();
  }

  async pushErrorPermanente(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 500000,
      color: "danger",
      cssClass: "espacio"
    });
    toast.present();
  }

  async pushWarning(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      color: "medium",
      cssClass: "espacio"
    });
    toast.present();
  }
}
