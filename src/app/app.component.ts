import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ToastService } from './services/toast/ToastService';
import { Meta } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEsUy from '@angular/common/locales/es-UY';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-root',
  styleUrls: ['app.css'],
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _toast: ToastService,
    private meta: Meta,
    private router: Router,
    public cookieService: CookieService
  ) {

    this.meta.addTag({ name: 'google', content: 'notranslate' });
    this.meta.addTag({ name: 'Content-Language', content: 'es' });
    registerLocaleData(localeEsUy, 'es-uy');
    this.initializeApp();
  }

  error = false;

  

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


 
}
