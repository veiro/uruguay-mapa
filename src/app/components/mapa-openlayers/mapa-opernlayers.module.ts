
import { NgModule, ErrorHandler } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapaOpenlayersComponent } from './mapa-openlayers.component';
import { OverlayMessageComponent } from './overlay-message/overlay-message.component';
import { PopUpOpcionesComponent } from './pop-up-opciones/pop-up-opciones.component';
import { ModalClusterComponent } from './modal-cluster/modal-cluster.component';
import { ModalCapas } from './modal-capas/modal-capas.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [      
      MapaOpenlayersComponent,
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
      BrowserModule,
      FormsModule,
      IonicModule.forRoot(),
      IonicStorageModule.forRoot(),
      AppRoutingModule,
      HttpClientModule
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
//   bootstrap: [
//       AppComponent
//   ]
   exports: [
    MapaOpenlayersComponent,
  ],
})

export class MapaUruguay { }
