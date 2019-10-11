import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UruguayMapaComponent } from './uruguay-mapa.component';
import { OverlayMessageComponent } from './overlay-message/overlay-message.component';
import { PopUpOpcionesComponent } from './pop-up-opciones/pop-up-opciones.component';
import { ModalClusterComponent } from './modal-cluster/modal-cluster.component';
import { ModalCapas } from './modal-capas/modal-capas.component';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UruguayMapaComponent,
    OverlayMessageComponent,
    PopUpOpcionesComponent,
    ModalClusterComponent,
    ModalCapas
  ],
  entryComponents: [
      ModalCapas,
      ModalClusterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    UruguayMapaComponent
  ]
})
export class UruguayMapaModule { }
