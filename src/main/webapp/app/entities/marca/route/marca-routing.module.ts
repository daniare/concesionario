import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MarcaComponent } from '../list/marca.component';
import { MarcaDetailComponent } from '../detail/marca-detail.component';
import { MarcaUpdateComponent } from '../update/marca-update.component';
import { MarcaRoutingResolveService } from './marca-routing-resolve.service';

const marcaRoute: Routes = [
  {
    path: '',
    component: MarcaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MarcaDetailComponent,
    resolve: {
      marca: MarcaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MarcaUpdateComponent,
    resolve: {
      marca: MarcaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MarcaUpdateComponent,
    resolve: {
      marca: MarcaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(marcaRoute)],
  exports: [RouterModule],
})
export class MarcaRoutingModule {}
