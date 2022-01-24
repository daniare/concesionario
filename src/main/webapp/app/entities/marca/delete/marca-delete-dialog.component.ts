import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMarca } from '../marca.model';
import { MarcaService } from '../service/marca.service';

@Component({
  templateUrl: './marca-delete-dialog.component.html',
})
export class MarcaDeleteDialogComponent {
  marca?: IMarca;

  constructor(protected marcaService: MarcaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.marcaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
