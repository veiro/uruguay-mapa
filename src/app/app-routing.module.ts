import { LandingComponent } from './landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LlamadoNpmCompiladoCompnent } from './llamado-npm-compilado/llamado-npm-compilado.component';


const routes: Routes = [
  { path: '', component: LlamadoNpmCompiladoCompnent},
];
@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [
      RouterModule
  ]
})

export class AppRoutingModule {}
