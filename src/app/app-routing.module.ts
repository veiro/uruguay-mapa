
import { MapaOpenlayersComponent } from './components/mapa/openlayers/mapa-openlayers/mapa-openlayers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: MapaOpenlayersComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
