import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ModeloComponent } from '../list/modelo.component';
import { ModeloDetailComponent } from '../detail/modelo-detail.component';
import { ModeloUpdateComponent } from '../update/modelo-update.component';
import { ModeloRoutingResolveService } from './modelo-routing-resolve.service';

const modeloRoute: Routes = [
  {
    path: '',
    component: ModeloComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ModeloDetailComponent,
    resolve: {
      modelo: ModeloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ModeloUpdateComponent,
    resolve: {
      modelo: ModeloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ModeloUpdateComponent,
    resolve: {
      modelo: ModeloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(modeloRoute)],
  exports: [RouterModule],
})
export class ModeloRoutingModule {}
