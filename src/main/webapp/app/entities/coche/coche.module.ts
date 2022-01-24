import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CocheComponent } from './list/coche.component';
import { CocheDetailComponent } from './detail/coche-detail.component';
import { CocheUpdateComponent } from './update/coche-update.component';
import { CocheDeleteDialogComponent } from './delete/coche-delete-dialog.component';
import { CocheRoutingModule } from './route/coche-routing.module';

@NgModule({
  imports: [SharedModule, CocheRoutingModule],
  declarations: [CocheComponent, CocheDetailComponent, CocheUpdateComponent, CocheDeleteDialogComponent],
  entryComponents: [CocheDeleteDialogComponent],
})
export class CocheModule {}
