import { OverlayMessageComponent } from './components/mapa-openlayers/overlay-message/overlay-message.component';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastService } from './services/toast/ToastService';
import { IonicStorageModule } from '@ionic/storage';
import { MapaService } from './services/mapa/mapa.service';
import { MapaOpenlayersComponent } from './components/mapa-openlayers/mapa-openlayers.component';
import { LandingComponent } from './landing/landing.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CookieService } from 'ng2-cookies';
import { PopUpOpcionesComponent } from './components/mapa-openlayers/pop-up-opciones/pop-up-opciones.component';
import { ModalCapas } from './components/mapa-openlayers/modal-capas/modal-capas.component';
import { ModalClusterComponent } from './components/mapa-openlayers/modal-cluster/modal-cluster.component';
import { LlamandoDist } from './llamando-dist/llamando-dist.component';
import { UruguayMapaComponent } from 'uruguay-mapa';

@NgModule({
  declarations: [
      UruguayMapaComponent,
      LlamandoDist,
      AppComponent,
      MapaOpenlayersComponent,
      LandingComponent,
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
      CookieService,
      MapaService,
      ToastService,
      StatusBar,
      SplashScreen,
      {
        provide: RouteReuseStrategy,
        useClass: IonicRouteStrategy
      }
  ],
  bootstrap: [
      AppComponent
  ]
})

export class AppModule { }
