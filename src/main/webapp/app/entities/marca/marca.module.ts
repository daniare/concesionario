import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MarcaComponent } from './list/marca.component';
import { MarcaDetailComponent } from './detail/marca-detail.component';
import { MarcaUpdateComponent } from './update/marca-update.component';
import { MarcaDeleteDialogComponent } from './delete/marca-delete-dialog.component';
import { MarcaRoutingModule } from './route/marca-routing.module';
import { MarcaCreateComponent } from './create/marca-create.component';

@NgModule({
  imports: [SharedModule, MarcaRoutingModule],
  declarations: [MarcaComponent, MarcaDetailComponent, MarcaUpdateComponent, MarcaDeleteDialogComponent, MarcaCreateComponent],
  entryComponents: [MarcaDeleteDialogComponent],
})
export class MarcaModule {}
