import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IModelo } from '../modelo.model';
import { ModeloService } from '../service/modelo.service';

@Component({
  templateUrl: './modelo-delete-dialog.component.html',
})
export class ModeloDeleteDialogComponent {
  modelo?: IModelo;

  constructor(protected modeloService: ModeloService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.modeloService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
