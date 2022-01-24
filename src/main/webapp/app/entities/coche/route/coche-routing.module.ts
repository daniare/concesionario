import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CocheComponent } from '../list/coche.component';
import { CocheDetailComponent } from '../detail/coche-detail.component';
import { CocheUpdateComponent } from '../update/coche-update.component';
import { CocheRoutingResolveService } from './coche-routing-resolve.service';

const cocheRoute: Routes = [
  {
    path: '',
    component: CocheComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CocheDetailComponent,
    resolve: {
      coche: CocheRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CocheUpdateComponent,
    resolve: {
      coche: CocheRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CocheUpdateComponent,
    resolve: {
      coche: CocheRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cocheRoute)],
  exports: [RouterModule],
})
export class CocheRoutingModule {}
