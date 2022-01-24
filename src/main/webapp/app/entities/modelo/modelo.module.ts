import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ModeloComponent } from './list/modelo.component';
import { ModeloDetailComponent } from './detail/modelo-detail.component';
import { ModeloUpdateComponent } from './update/modelo-update.component';
import { ModeloDeleteDialogComponent } from './delete/modelo-delete-dialog.component';
import { ModeloRoutingModule } from './route/modelo-routing.module';

@NgModule({
  imports: [SharedModule, ModeloRoutingModule],
  declarations: [ModeloComponent, ModeloDetailComponent, ModeloUpdateComponent, ModeloDeleteDialogComponent],
  entryComponents: [ModeloDeleteDialogComponent],
})
export class ModeloModule {}
