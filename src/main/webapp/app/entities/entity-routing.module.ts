import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'marca',
        data: { pageTitle: 'concesionarioApp.marca.home.title' },
        loadChildren: () => import('./marca/marca.module').then(m => m.MarcaModule),
      },
      {
        path: 'modelo',
        data: { pageTitle: 'concesionarioApp.modelo.home.title' },
        loadChildren: () => import('./modelo/modelo.module').then(m => m.ModeloModule),
      },
      {
        path: 'coche',
        data: { pageTitle: 'concesionarioApp.coche.home.title' },
        loadChildren: () => import('./coche/coche.module').then(m => m.CocheModule),
      },
      {
        path: 'venta',
        data: { pageTitle: 'concesionarioApp.venta.home.title' },
        loadChildren: () => import('./venta/venta.module').then(m => m.VentaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
