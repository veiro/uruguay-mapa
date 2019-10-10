import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LlamandoDist } from './llamando-dist/llamando-dist.component';


const routes: Routes = [
  { path: '', component: LlamandoDist}
  
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
