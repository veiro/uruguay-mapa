import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LlamandoDist } from './llamando-dist/llamando-dist.component';
import { UruguayMapaModule } from 'uruguay-mapa';
@NgModule({
  declarations: [
      LlamandoDist,
      AppComponent,
  ],
  entryComponents: [
  ],
  imports: [
      UruguayMapaModule,
      BrowserModule,
      
      IonicModule.forRoot(),
      IonicStorageModule.forRoot(),
      AppRoutingModule,
      HttpClientModule
  ],
  providers: [
      Geolocation,
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
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule { }
