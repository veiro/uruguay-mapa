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
import { IonicStorageModule } from '@ionic/storage';
import { LlamadoNpmCompiladoCompnent } from './llamado-npm-compilado/llamado-npm-compilado.component';
//import { UruguayMapaComponent } from 'projects/uruguay-mapa/src/lib/uruguay-mapa.component';

@NgModule({
  declarations: [
     // UruguayMapaComponent,
      AppComponent,
      LlamadoNpmCompiladoCompnent      
    
  ],
  entryComponents: [
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
